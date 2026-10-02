import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("node_modules/@iconify-icons/ph/package.json", "utf8"));
const keys = new Set(Object.keys(pkg.exports));

const wanted = [
  "user-circle", "code", "briefcase", "stack", "terminal-window", "folder-open",
  "file-text", "envelope-simple", "gear-six", "squares-four", "compass", "sun",
  "moon", "magnifying-glass", "app-window", "minus", "corners-out", "corners-in",
  "x", "caret-left", "caret-right", "arrow-right", "arrows-clockwise", "image",
  "camera", "check", "check-circle", "info", "desktop", "hard-drive", "palette",
  "warning-circle", "circle-notch", "map-pin", "user", "monitor", "calendar-blank",
  "link-simple", "arrow-square-out", "selects", "sliders-horizontal", "eye"
];

const missing = [];
const present = [];
for (const name of wanted) {
  (keys.has("./" + name) ? present : missing).push(name);
}

const lines = [
  `total exports: ${keys.size}`,
  `PRESENT (${present.length}): ${present.join(", ")}`,
  `MISSING (${missing.length}): ${missing.join(", ")}`
];

fs.writeFileSync("iconcheck.txt", lines.join("\n"), "utf8");
console.log(lines.join("\n"));
