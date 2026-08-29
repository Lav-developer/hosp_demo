/**
 * Screenshot inspector — captures the site at desktop / tablet / mobile widths.
 * Usage: node scripts/screenshot.mjs [url] [outdir]
 */
import puppeteer from "puppeteer-core";
import Chromium from "@sparticuz/chromium";
import fs from "node:fs";
import path from "node:path";

/* Chromium runs with extra shared libs (nss/nspr) placed in /tmp/chromelibs */
process.env.LD_LIBRARY_PATH = `/tmp/chromelibs:${process.env.LD_LIBRARY_PATH || ""}`;

const URL = process.argv[2] || "http://localhost:5173/";
const OUT = process.argv[3] || "shots";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

fs.mkdirSync(OUT, { recursive: true });

const executablePath = await Chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath,
  args: [...Chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
  headless: "shell",
});

const consoleErrors = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[${vp.name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[${vp.name}] PAGE ERROR: ${err.message}`));

  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  // Let scroll-reveal animations settle; disable them for stable full-page shots
  await page.evaluate(() => {
    const style = document.createElement("style");
    style.textContent = "[data-reveal]{opacity:1 !important; transform:none !important; transition:none !important}";
    document.head.appendChild(style);
  });
  await new Promise((r) => setTimeout(r, 600));

  await page.screenshot({ path: path.join(OUT, `${vp.name}-full.png`), fullPage: true });

  // Horizontal overflow check
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    return [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > docW + 1 || el.getBoundingClientRect().left < -1)
      .slice(0, 8)
      .map((el) => `${el.tagName}.${(el.className && el.className.toString().slice(0, 60)) || ""}`);
  });
  if (overflow.length) console.log(`⚠️  Overflow at ${vp.name}:`, JSON.stringify(overflow, null, 1));

  // Above-the-fold shot
  await page.screenshot({ path: path.join(OUT, `${vp.name}-fold.png`) });
  await page.close();
  console.log(`✓ ${vp.name} captured`);
}

await browser.close();

console.log("\nConsole/page errors:", consoleErrors.length ? "" : "none");
consoleErrors.slice(0, 20).forEach((e) => console.log("  -", e));
