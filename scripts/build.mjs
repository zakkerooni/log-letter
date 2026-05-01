#!/usr/bin/env node
// ビルドラッパー: TinaCMS Cloud の env vars があれば admin もビルドする。
// なければ Astro のみでサイトを公開 (admin は無効)。

import { execSync } from "node:child_process";

// Client ID は tina/config.ts に直接記述済み。Token のみ env var が必須。
if (process.env.TINA_TOKEN) {
  console.log("→ TINA_TOKEN detected. Building admin UI...");
  execSync("npx tinacms build", { stdio: "inherit" });
} else {
  console.log("→ TINA_TOKEN not set. Skipping admin build.");
  console.log("  Set TINA_TOKEN in Cloudflare Build → Variables and secrets to enable /admin");
}

console.log("→ Building Astro site...");
execSync("npx astro build", { stdio: "inherit" });
