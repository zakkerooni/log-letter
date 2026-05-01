#!/usr/bin/env node
// tokens.json → src/styles/_tokens.css への変換スクリプト
// Figma Tokens Studio 互換のフラット構造 ({ value, type }) を CSS カスタムプロパティに変換する。

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "src/styles/tokens.json");
const OUT = resolve(ROOT, "src/styles/_tokens.css");

// camelCase → kebab-case
const toKebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// CSS variable name mapping. font.jp → --font-jp, size.heroTitle → --hero-title 等。
const VAR_PREFIX = {
  color: "",
  font: "font-",
  size: "",
};

function flattenTokens(json) {
  const lines = [];
  for (const [group, entries] of Object.entries(json)) {
    if (group.startsWith("_")) continue;
    const prefix = VAR_PREFIX[group] ?? `${toKebab(group)}-`;
    for (const [key, token] of Object.entries(entries)) {
      if (!token || typeof token !== "object" || !("value" in token)) continue;
      const name = `--${prefix}${toKebab(key)}`;
      lines.push(`  ${name}: ${token.value};`);
    }
  }
  return lines.join("\n");
}

const json = JSON.parse(readFileSync(SRC, "utf8"));
const body = flattenTokens(json);

const header = `/* AUTO-GENERATED from src/styles/tokens.json — DO NOT EDIT BY HAND.
   トークン値を変更したい場合は tokens.json を編集してください。 */`;

const css = `${header}\n:root {\n${body}\n}\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, css, "utf8");

console.log(`✔ tokens → ${OUT.replace(ROOT + "/", "")}`);
