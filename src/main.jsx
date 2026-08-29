import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import hospitalConfig from "./config/hospital";
import { applyThemeColors } from "./lib/utils";

/* Self-hosted fonts (no external requests) */
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import "./index.css";

/* Apply configured brand colours (see src/config/hospital.js) */
applyThemeColors(hospitalConfig.colors);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
