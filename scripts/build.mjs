#!/usr/bin/env node
// ビルドラッパー: TinaCMS Cloud の env vars があれば admin もビルドする。
// なければ Astro のみでサイトを公開 (admin は無効)。

import { execSync } from "node:child_process";

// Client ID は tina/config.ts に直接記述済み。
// --skip-cloud-checks で TinaCloud との schema validation をスキップし、
// TINA_TOKEN なしで admin UI をビルドできる (token は dummy で OK)。
// 認証は admin 画面から GitHub OAuth で行われるので問題ない。
console.log("→ Building TinaCMS admin UI (skip-cloud-checks)...");
execSync("npx tinacms build --skip-cloud-checks", {
  stdio: "inherit",
  env: { ...process.env, TINA_TOKEN: process.env.TINA_TOKEN || "dummy" },
});

console.log("→ Building Astro site...");
execSync("npx astro build", { stdio: "inherit" });
