# POST — Postcard Library

金沢のポストカード・ライブラリー。Astro + Stripe + Cloudflare Workers。
本番: [https://log-letter.com](https://log-letter.com)

## 編集する

ブラウザで [`https://log-letter.com/admin`](https://log-letter.com/admin) を開く → ログイン → ビジュアル編集。
詳しくは [EDITING.md](./EDITING.md)。

## ローカルで触る

```bash
npm install
cp .env.example .env   # Stripe テストキー等を記入
npm run dev            # → http://localhost:4321
```

## デプロイ

`main` ブランチに push すると Cloudflare Workers が自動デプロイ（1〜2 分）。
`https://log-letter.com` に反映されます。

## ファイル構成（要点）

```
src/
├── copy/                 ← ★ 文言（編集 OK）
│   ├── site.ja.json
│   └── legal/*.md
├── styles/
│   ├── tokens.json       ← ★ 色・フォント（編集 OK）
│   └── global.css
├── components/, layouts/, pages/
└── pages/api/
    ├── checkout.js       ← Stripe 決済
    └── stripe-webhook.js ← Stripe Webhook 受信

tina/
└── config.ts             ← TinaCMS スキーマ定義
```

★ マークがコードを書かずに編集できるところ。Stripe ダッシュボードで商品管理、`public/images/` で画像差し替え。
