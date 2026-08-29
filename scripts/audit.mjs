/**
 * Automated QA audit — loads the site in headless Chromium at three viewports
 * and checks layout, images, headings, links, and key interactions.
 *
 * Usage: node scripts/audit.mjs [url]
 */
import puppeteer from "puppeteer-core";
import Chromium from "@sparticuz/chromium";

process.env.LD_LIBRARY_PATH = `/tmp/chromelibs:${process.env.LD_LIBRARY_PATH || ""}`;

const URL = process.argv[2] || "http://localhost:5173/";
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const issues = [];
const pass = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
  issues.push(msg);
  console.log(`  ✗ ${msg}`);
};

const executablePath = await Chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath,
  args: [...Chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
  headless: "shell",
});

/* ---------- Static structure checks (desktop) ---------- */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(`PAGE ERROR: ${e.message}`));
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  // Scroll through the page so lazy-loaded images fetch, then return to top.
  // NOTE: use behavior:"instant" — the site's `scroll-behavior: smooth` would
  // otherwise animate every scrollTo call and the page would barely move.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  // Wait until every image has finished loading (max ~15s, dev server may be cold)
  await page.waitForFunction(
    () => [...document.images].every((i) => i.complete),
    { timeout: 15000 }
  ).catch(() => {});
  await new Promise((r) => setTimeout(r, 400));

  console.log("\n── Structure & content ──────────────────────────");

  const headings = await page.evaluate(() =>
    [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => ({
      level: Number(h.tagName.slice(1)),
      text: h.textContent.trim().slice(0, 60),
    }))
  );
  const h1s = headings.filter((h) => h.level === 1);
  h1s.length === 1 ? pass(`exactly one <h1>: "${h1s[0]?.text}"`) : fail(`${h1s.length} h1 elements found`);

  // Heading hierarchy shouldn't skip levels
  let prev = 0;
  let skip = false;
  headings.forEach((h) => {
    if (prev && h.level > prev + 1) skip = true;
    prev = h.level;
  });
  !skip ? pass("heading hierarchy has no skipped levels") : fail("heading hierarchy skips levels");

  // All internal anchors resolve
  const badAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .filter((a) => a.getAttribute("href") !== "#" && !a.getAttribute("href").startsWith("#main"))
      .filter((a) => !document.querySelector(a.getAttribute("href")))
      .map((a) => `${a.getAttribute("href")} → ${a.textContent.trim().slice(0, 30)}`)
  );
  badAnchors.length === 0 ? pass("all internal anchor links resolve") : fail(`broken anchors: ${badAnchors.join(", ")}`);

  // External links open safely
  const unsafeBlank = await page.evaluate(() =>
    [...document.querySelectorAll('a[target="_blank"]')].filter((a) => a.rel && !a.rel.includes("noopener")).length
  );
  unsafeBlank === 0 ? pass("target=_blank links have rel=noopener") : fail(`${unsafeBlank} target=_blank links missing rel=noopener`);

  // Images: alt text + loaded
  const imgInfo = await page.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => ({
      alt: i.alt,
      loaded: i.complete && i.naturalWidth > 0,
      src: i.src.split("/").pop().slice(0, 40),
    }))
  );
  const noAlt = imgInfo.filter((i) => !i.alt).map((i) => i.src);
  const notLoaded = imgInfo.filter((i) => !i.loaded).map((i) => i.src);
  noAlt.length === 0 ? pass(`all ${imgInfo.length} images have alt text`) : fail(`images missing alt: ${noAlt.join(", ")}`);
  notLoaded.length === 0 ? pass("all images loaded") : fail(`images failed to load: ${notLoaded.join(", ")}`);

  // Buttons / links have accessible names
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll("button, a")]
      .filter((el) => !el.textContent.trim() && !el.getAttribute("aria-label") && !el.getAttribute("title"))
      .map((el) => `${el.tagName}.${(el.className.toString() || "").slice(0, 40)}`)
  );
  unnamed.length === 0 ? pass("all buttons/links have accessible names") : fail(`unnamed controls: ${unnamed.slice(0, 5).join(" | ")}`);

  errors.length === 0 ? pass("no console errors") : fail(`console errors: ${errors.join(" | ").slice(0, 300)}`);

  /* ---- Interaction tests ---- */
  console.log("\n── Interactions (desktop) ───────────────────────");

  // FAQ accordion
  const faqTest = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("#faq button[aria-expanded]")][1];
    if (!btn) return { ok: false, why: "faq buttons not found" };
    const before = btn.getAttribute("aria-expanded");
    btn.click();
    return new Promise((res) =>
      setTimeout(() => {
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        const openH = panel && panel.scrollHeight;
        res({
          ok: btn.getAttribute("aria-expanded") === "true" && before === "false" && openH > 0,
          why: `expanded=${btn.getAttribute("aria-expanded")} panelH=${openH}`,
        });
      }, 400)
    );
  });
  faqTest.ok ? pass("FAQ accordion opens with animation") : fail(`FAQ accordion: ${faqTest.why}`);

  // Department modal
  const deptModal = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label^="View Cardiology"]');
    if (!btn) return { ok: false, why: "Cardiology button missing" };
    btn.click();
    return new Promise((res) =>
      setTimeout(() => {
        const dialog = document.querySelector('[role="dialog"]');
        res({ ok: !!dialog && dialog.textContent.includes("Cardiology"), why: dialog ? "dialog content ok" : "no dialog" });
      }, 350)
    );
  });
  deptModal.ok ? pass("department modal opens with content") : fail(`department modal: ${deptModal.why}`);

  // Close modal with Escape
  const modalClosed = await page.evaluate(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    return new Promise((res) => setTimeout(() => res(!document.querySelector('[role="dialog"]')), 300));
  });
  modalClosed ? pass("modal closes on Escape") : fail("modal did not close on Escape");

  // Doctor modal + book CTA prefill
  const doctorFlow = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label^="View profile of Dr. Ananya"]');
    if (!btn) return { ok: false, why: "doctor card button missing" };
    btn.click();
    return new Promise((res) =>
      setTimeout(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const bookBtn = [...dialog.querySelectorAll("button")].find((b) => b.textContent.includes("Book Appointment"));
        bookBtn.click();
        setTimeout(() => {
          const dept = document.getElementById("appt-department");
          res({
            ok: dept && dept.value === "cardiology" && !document.querySelector('[role="dialog"]'),
            why: `dept=${dept && dept.value}`,
          });
        }, 400);
      }, 350)
    );
  });
  await new Promise((r) => setTimeout(r, 700));
  doctorFlow.ok ? pass("doctor modal → Book pre-fills appointment form") : fail(`doctor booking flow: ${doctorFlow.why}`);

  // Appointment form validation
  const formValidation = await page.evaluate(() => {
    const form = document.querySelector("#appointment form");
    if (!form) return { ok: false, why: "form not found" };
    const name = document.getElementById("appt-name");
    name.focus();
    document.getElementById("appt-name").dispatchEvent(new Event("input", { bubbles: true }));
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    return new Promise((res) =>
      setTimeout(() => {
        const errors = [...document.querySelectorAll("#appointment .field-error")].map((e) => e.textContent.trim());
        res({ ok: errors.length >= 4, why: `${errors.length} errors: ${errors.slice(0, 2).join("; ")}` });
      }, 300)
    );
  });
  formValidation.ok ? pass("appointment form shows inline validation errors") : fail(`form validation: ${formValidation.why}`);

  // Fill form and submit → success state
  const formSuccess = await page.evaluate(async () => {
    const set = (id, value) => {
      const el = document.getElementById(id);
      const setter = Object.getOwnPropertyDescriptor(el.constructor.prototype, "value").set;
      setter.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    };
    set("appt-name", "Test Patient");
    set("appt-phone", "9876543210");
    set("appt-email", "test@example.com");
    set("appt-department", "cardiology");
    set("appt-date", new Date(Date.now() + 86400000).toISOString().slice(0, 10));
    set("appt-time", "morning");
    const form = document.querySelector("#appointment form");
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 1400));
    const status = document.querySelector('[role="status"]');
    return {
      ok: !!status && status.textContent.includes("Request Received"),
      why: status ? status.textContent.slice(0, 80) : "no success panel",
    };
  });
  formSuccess.ok ? pass("appointment form submits → polished success state") : fail(`form success: ${formSuccess.why}`);

  // Back to top appears after scroll
  const backToTop = await page.evaluate(async () => {
    window.scrollTo(0, 3000);
    await new Promise((r) => setTimeout(r, 500));
    const btn = [...document.querySelectorAll("button")].find((b) => b.getAttribute("aria-label") === "Back to top");
    const style = btn && getComputedStyle(btn);
    return { ok: btn && style.opacity === "1", why: btn ? `opacity=${style.opacity}` : "not found" };
  });
  backToTop.ok ? pass("back-to-top button appears on scroll") : fail(`back to top: ${backToTop.why}`);

  await page.close();
}

/* ---------- Responsive layout checks ---------- */
console.log("\n── Responsive layout ────────────────────────────");
for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 700));

  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const realOverflow = doc.scrollWidth - doc.clientWidth;
    // Elements that overflow to the right and are NOT clipped by an overflow-hidden ancestor
    const offenders = [];
    const clipped = (el) => {
      let node = el.parentElement;
      while (node && node !== document.body) {
        const s = getComputedStyle(node);
        if (["hidden", "clip", "auto", "scroll"].includes(s.overflowX)) return true;
        node = node.parentElement;
      }
      return false;
    };
    document.querySelectorAll("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > doc.clientWidth + 1 && !clipped(el)) {
        offenders.push(`${el.tagName}.${(el.className.toString() || "").slice(0, 50)} right=${Math.round(r.right)}`);
      }
    });
    return { realOverflow, offenders: offenders.slice(0, 6) };
  });

  result.realOverflow <= 1
    ? pass(`${vp.name}: no horizontal page overflow`)
    : fail(`${vp.name}: page overflows by ${result.realOverflow}px`);
  result.offenders.length === 0
    ? pass(`${vp.name}: no unclipped off-canvas elements`)
    : fail(`${vp.name}: off-canvas: ${result.offenders.join(" | ")}`);

  // Tap targets on mobile
  if (vp.name === "mobile") {
    const smallTargets = await page.evaluate(() =>
      [...document.querySelectorAll("button, a[href]")]
        .filter((el) => {
          const s = getComputedStyle(el);
          if (s.display === "none" || s.visibility === "hidden") return false;
          if (el.classList.contains("sr-only")) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
        })
        .map((el) => `${el.tagName} ${el.getAttribute("aria-label") || el.textContent.trim().slice(0, 25)} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`)
    );
    smallTargets.length === 0 ? pass("mobile: no tiny tap targets") : fail(`mobile tiny tap targets: ${smallTargets.slice(0, 5).join(" | ")}`);

    // Mobile menu opens
    const menu = await page.evaluate(async () => {
      const btn = document.querySelector('button[aria-controls="mobile-menu"]');
      if (!btn) return { ok: false, why: "hamburger not found" };
      btn.click();
      await new Promise((r) => setTimeout(r, 450));
      const drawer = document.getElementById("mobile-menu");
      const link = drawer && [...drawer.querySelectorAll("a")].find((a) => a.getAttribute("href") === "#departments");
      link.click();
      await new Promise((r) => setTimeout(r, 450));
      return { ok: !document.getElementById("mobile-menu"), why: "drawer closed after link click" };
    });
    menu.ok ? pass("mobile menu opens and closes on link click") : fail(`mobile menu: ${menu.why}`);
  }

  await page.close();
}

await browser.close();

console.log("\n════════════════════════════════════════════════");
console.log(issues.length === 0 ? "AUDIT PASSED — no issues found" : `AUDIT FINISHED — ${issues.length} issue(s)`);
issues.forEach((i) => console.log(" • " + i));
process.exit(issues.length ? 1 : 0);
