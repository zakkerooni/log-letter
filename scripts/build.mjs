#!/usr/bin/env node
// ビルドラッパー: TinaCMS Cloud の env vars があれば admin もビルドする。
// なければ Astro のみでサイトを公開 (admin は無効)。

import { execSync } from "node:child_process";

const hasTina = process.env.PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN;

if (hasTina) {
  console.log("→ TinaCMS env vars detected. Building admin UI...");
  execSync("npx tinacms build", { stdio: "inherit" });
} else {
  console.log("→ TinaCMS env vars not set. Skipping admin build.");
  console.log("  (set PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to enable /admin)");
}

console.log("→ Building Astro site...");
execSync("npx astro build", { stdio: "inherit" });
