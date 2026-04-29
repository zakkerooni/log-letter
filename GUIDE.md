# POST Shop — 編集ガイド

## 🔗 リンク先の変更

| 変更したい箇所 | ファイル | 場所 |
|---|---|---|
| ヘッダーのナビリンク | `src/layouts/Layout.astro` | `<nav class="header-left">` 内の `<a href="...">` |
| フッターのリンク | `src/layouts/Layout.astro` | `<footer>` 内の `<a href="...">` |
| Instagram URL | `.env` ファイル | `PUBLIC_INSTAGRAM_URL=https://instagram.com/yourname` |
| メールアドレス | `.env` ファイル | `PUBLIC_CONTACT_EMAIL=your@email.com` |
| カートアイコンのリンク先 | `src/layouts/Layout.astro` | `<a href="/cart">` を変更 |
| 商品カードのリンク先 | `src/components/ProductCard.astro` | `<a href={'/product/${product.id}'}}>` |

---

## 📢 バナー（お知らせバー）

### 表示/非表示
`.env` ファイルで制御：
```
# 表示する場合（テキストを入れる）
PUBLIC_BANNER_TEXT=GW期間中の配送について — 4/29〜5/6は発送をお休みいたします

# 非表示にする場合（空にする or 行を削除）
PUBLIC_BANNER_TEXT=
```

### 内容変更
`.env` の `PUBLIC_BANNER_TEXT` の値を書き換えるだけ。

### バナーの色を変更
`src/styles/global.css` の `.announce-bar` → `background: var(--accent);` を変更。
`--accent` の色は `:root` で定義（デフォルト `#ff6400`）。

---

## 🖼 画像の差し替え

画像はすべて `public/images/` に配置：

| 画像 | ファイルパス | 使用箇所 |
|---|---|---|
| ヒーロー画像 | `public/images/hero.jpg` | トップページ上部 |
| About画像1 | `public/images/about-1.jpg` | Aboutページ左 |
| About画像2 | `public/images/about-2.jpg` | Aboutページ右 |
| OGP画像 | `public/images/ogp.jpg` | SNSシェア時のサムネ |
| ファビコン | `public/favicon.svg` | ブラウザタブ |

**商品画像** → Stripeダッシュボードで各商品に設定。コード変更不要。

---

## ✏️ 文章の変更

| 変更したい文章 | ファイル |
|---|---|
| ヒーローのタイトル・サブ | `src/pages/index.astro` — `<h1 class="hero-title">` と `<p class="hero-sub">` |
| コンセプト文（トップ） | `src/components/AboutBlock.astro` |
| About ページの文章 | `src/pages/about.astro` — `<div class="about-text">` 内 |
| 商品詳細のメタ情報（サイズ等） | `src/pages/product/[id].astro` — `<div class="detail-meta">` 内 |
| 購入完了メッセージ | `src/pages/success.astro` |
| フッターの会社情報 | `src/layouts/Layout.astro` — `<footer>` 内 |
| ページタイトル・meta description | `src/layouts/Layout.astro` — `<head>` 内 |

---

## 🛒 カート・決済（Stripe）

### 設定
`.env` に Stripe のシークレットキーを設定：
```
STRIPE_SECRET_KEY=sk_live_xxxxx
```

### 仕組み
1. 商品データ → Stripe Products API から自動取得（`index.astro`）
2. 「Add to Cart」ボタン → `POST /api/checkout` → Stripe Checkout へリダイレクト
3. 決済完了 → `/success` ページへ戻る

### 商品の追加・編集・削除
すべて **Stripe ダッシュボード** で管理。コード変更不要。
- 商品名、価格、画像、説明文 → Stripeで設定
- クリエイター名 → Stripeの商品メタデータに `creator` キーで設定

---

## 🎨 デザイン（色・フォント等）

`src/styles/global.css` の `:root` で一括管理：
```css
:root {
  --bg: #ffffff;        /* 背景色 */
  --fg: #1a1a1a;        /* テキスト色 */
  --muted: #888;        /* サブテキスト色 */
  --border: #e0e0e0;    /* ボーダー色 */
  --card-bg: #f6f5f3;   /* カード背景色 */
  --accent: #ff6400;    /* アクセント色（バナー・カート・購入ボタン） */
  --font-display: Georgia, serif;              /* 見出しフォント */
  --font-body: Arial, sans-serif;              /* 本文フォント */
  --font-jp: 'Zen Kaku Gothic New', sans-serif; /* 日本語本文 */
  --font-jp-serif: 'Noto Serif JP', serif;     /* 日本語セリフ */
}
```

---

## 📁 .env ファイルまとめ

```env
STRIPE_SECRET_KEY=sk_live_xxxxx
PUBLIC_BANNER_TEXT=GW期間中の配送について — 4/29〜5/6は発送をお休みいたします
PUBLIC_INSTAGRAM_URL=https://instagram.com/yourname
PUBLIC_CONTACT_EMAIL=info@miks-inc.com
```

`PUBLIC_` プレフィックスの変数はクライアントにも公開されます。
`STRIPE_SECRET_KEY` はサーバーサイドのみ（公開されません）。
