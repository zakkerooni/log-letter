# POST Shop

金沢のポストカード・ライブラリー。Astro + Stripe + Cloudflare Pages。

## 🚀 セットアップ

```bash
npm install
cp .env.example .env   # Stripe テストキー等を記入
npm run dev
```

→ http://localhost:4321

## 📖 編集する

- **はじめに読む** → [`EDITING.md`](./EDITING.md)
  文言・画像・色・フォントの編集方法をまとめた、コードを触らない人向けガイド
- **詳細リファレンス** → [`GUIDE.md`](./GUIDE.md)
  CSS のカスタマイズ、本番公開（Stripe live 切替・独自ドメイン）の手順

### 編集ポイント早見表

| 編集したい内容        | 触るファイル                           |
|-----------------------|----------------------------------------|
| サイト全体の文言      | `src/content/site.ja.json`             |
| 法務ページの本文      | `src/content/legal/*.md`               |
| 色・フォント          | `src/styles/tokens.json`（Figma 同期可）|
| バナー・SNS・連絡先   | `.env` / Cloudflare 環境変数           |
| 画像                  | `public/images/`                       |
| 商品                  | Stripe ダッシュボード                  |

## ☁️ Cloudflare Pages デプロイ

1. GitHub リポジトリと連携
2. **Build command**: `npm install && npm run build`
3. **Build output directory**: `dist`
4. 環境変数を設定（`.env.example` 参照）
5. デプロイ

> `package-lock.json` は含めていません。Cloudflare の `npm install` で自動生成されます。
