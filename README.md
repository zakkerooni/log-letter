# POST Shop

金沢のポストカード・ライブラリー。Astro + Stripe + Cloudflare Pages。

## 🚀 セットアップ

```bash
npm install
npm run dev
```

## 📦 環境変数

`.env.example` を `.env` にコピーして値を設定：

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
PUBLIC_BANNER_TEXT=お知らせバナーのテキスト
PUBLIC_INSTAGRAM_URL=https://instagram.com/yourname
PUBLIC_CONTACT_EMAIL=info@example.com
PUBLIC_GA_ID=G-XXXXXXXXXX
```

## ☁️ Cloudflare Pages デプロイ

1. GitHubリポジトリと連携
2. **Build command** を以下に設定：
   ```
   npm install && npm run build
   ```
3. **Build output directory**: `dist`
4. 環境変数を設定（上記の値）
5. デプロイ

> ⚠️ `package-lock.json` は含めていません。Cloudflareの `npm install` で自動生成されます。

## 📖 編集ガイド

詳細は [`GUIDE.md`](./GUIDE.md) を参照。

- バナー・SNSリンク・メールの変更
- 画像の差し替え（`public/images/`）
- 文章・色・フォントの変更
- 商品管理（Stripe）
- 法的ページの記入
