#!/usr/bin/env node
// tina/__generated__/{_schema,_lookup,_graphql}.json から tina/tina-lock.json を再構成する。
// `tinacms build --skip-cloud-checks` の後に実行すると、TinaCloud が見るスキーマと
// 実際のローカルスキーマがズレる "GraphQL Schema Mismatch" エラーを防げる。
//
// 使い方:
//   npx tinacms build --skip-cloud-checks
//   node scripts/sync-tina-lock.mjs

import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(p, 'utf8'));

const lock = {
  schema: read('tina/__generated__/_schema.json'),
  lookup: read('tina/__generated__/_lookup.json'),
  graphql: read('tina/__generated__/_graphql.json'),
};

writeFileSync('tina/tina-lock.json', JSON.stringify(lock));
console.log('✓ tina/tina-lock.json updated from local schema');
