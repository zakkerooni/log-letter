# MiKS Postcard Shop

金沢発のポストカード・ライブラリー。Astro + Tailwind CSS v4 + Stripe + Cloudflare Pages（SSR）で構築。デザインは [lost-found-store.jp](https://lost-found-store.jp) の世界観を踏襲。

## コマンド

| Command           | 説明                                    |
| ----------------- | --------------------------------------- |
| `npm install`     | 依存関係のインストール                  |
| `npm run dev`     | ローカル開発サーバー（localhost:4321）  |
| `npm run build`   | 本番ビルド（`./dist/` に出力）          |
| `npm run preview` | ビルド成果物のプレビュー                |

## ローカル開発

`.env` を作成し、Stripe テストキーを設定。

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
```

`npm install && npm run dev` で起動。テストカード `4242 4242 4242 4242` で購入フローを確認できます。

## Cloudflare Pages デプロイ

- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Compatibility flags**: `nodejs_compat`

### 環境変数 (Environment Variables)
Cloudflare Pages のダッシュボードで設定すると、コードを触らずにサイトを更新できます。

- `STRIPE_SECRET_KEY`: Stripe の秘密鍵（※リポジトリには絶対にコミットしない）
- `PUBLIC_LOGO_URL`: ロゴ画像の URL（未設定なら `/images/logo.png` → テキスト「MiKS」にフォールバック）
- `PUBLIC_FAVICON_URL`: タブのアイコン URL
- `PUBLIC_INSTAGRAM_URL`: Instagram のリンク
- `PUBLIC_CONTACT_EMAIL`: 問い合わせ先メール

## Stripe 商品メタデータ
Stripe ダッシュボード > 商品編集 > メタデータで設定。

- `creator`: 作家名（カードに表示されます）

商品画像・商品名・説明・価格は Stripe 側のフィールドをそのまま使用します。
