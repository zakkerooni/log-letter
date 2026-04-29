# POST Shop — 編集ガイド

## 目次
1. [環境変数（.env）](#環境変数env)
2. [バナー（お知らせバー）](#バナーお知らせバー)
3. [リンク先の変更](#リンク先の変更)
4. [画像の差し替え](#画像の差し替え)
5. [文章の変更](#文章の変更)
6. [表示/非表示の切り替え](#表示非表示の切り替え)
7. [色・フォント・デザイン](#色フォントデザイン)
8. [商品管理（Stripe）](#商品管理stripe)
9. [カート・決済](#カート決済)
10. [法的ページ](#法的ページ)
11. [検索・フィルター](#検索フィルター)
12. [Google Analytics](#google-analytics)
13. [サイトマップ・SEO](#サイトマップseo)
14. [配送設定](#配送設定)
15. [ファイル構成](#ファイル構成)

---

## 環境変数（.env）

プロジェクトルートに `.env` ファイルを作成（`.env.example` をコピーして編集）：

```env
# === 必須 ===
STRIPE_SECRET_KEY=sk_live_xxxxx

# === バナー ===
# テキストを入れると表示、空欄 or 行削除で非表示
PUBLIC_BANNER_TEXT=GW期間中の配送について — 4/29〜5/6は発送をお休みいたします

# === SNS・連絡先 ===
PUBLIC_INSTAGRAM_URL=https://instagram.com/yourname
PUBLIC_CONTACT_EMAIL=info@miks-inc.com

# === アナリティクス ===
# 空欄ならGAタグは挿入されない
PUBLIC_GA_ID=G-XXXXXXXXXX
```

**変更後は `npm run dev` を再起動してください。**

---

## バナー（お知らせバー）

| やりたいこと | 方法 |
|---|---|
| バナーを表示 | `.env` の `PUBLIC_BANNER_TEXT` にテキストを入れる |
| バナーを非表示 | `PUBLIC_BANNER_TEXT=`（空欄）にする or 行を削除 |
| 文言を変更 | `PUBLIC_BANNER_TEXT` の値を書き換える |
| 色を変更 | `src/styles/global.css` → `.announce-bar` の `background` を変更 |
| 文字サイズ変更 | 同上 → `font-size` を変更 |

---

## リンク先の変更

| リンク | ファイル | 場所 |
|---|---|---|
| ヘッダーナビ | `src/layouts/Layout.astro` | `<nav class="header-left">` 内 |
| フッターナビ | `src/layouts/Layout.astro` | `<footer>` 内 |
| モバイルメニュー | `src/layouts/Layout.astro` | `<div class="mobile-nav">` 内 |
| Instagram | `.env` | `PUBLIC_INSTAGRAM_URL` |
| メールアドレス | `.env` | `PUBLIC_CONTACT_EMAIL` |
| カートアイコン | `src/layouts/Layout.astro` | ミニカートドロワーを開く（変更不要） |
| ロゴのリンク先 | `src/layouts/Layout.astro` | `<a href="/" class="logo-main">` |

---

## 画像の差し替え

すべて `public/images/` に配置するだけ：

| 画像 | ファイルパス | サイズ目安 | 備考 |
|---|---|---|---|
| ヒーロー画像 | `public/images/hero.jpg` | 1800×1000px | トップページ上部。なければ背景色が表示される |
| About画像（左） | `public/images/about-1.jpg` | 800×1000px | Aboutページ。なければ非表示 |
| About画像（右） | `public/images/about-2.jpg` | 800×1000px | 同上 |
| OGP画像 | `public/images/ogp.jpg` | 1200×630px | SNSシェア時のサムネイル |
| ファビコン | `public/favicon.svg` | SVG | ブラウザタブのアイコン |
| 商品画像 | Stripeで設定 | 正方形推奨 | コード変更不要 |

**画像フォーマット**: WebP/AVIF対応ブラウザが増えているので、可能であれば `.webp` に変換するとページ速度向上。その場合 `.astro` ファイル内の `src="..."` も変更。

---

## 文章の変更

### トップページ

| 文章 | ファイル | 探し方 |
|---|---|---|
| ヒーロータイトル | `src/pages/index.astro` | `<h1 class="hero-title">` |
| ヒーローサブテキスト | `src/pages/index.astro` | `<p class="hero-sub">` |
| Picksセクション見出し | `src/pages/index.astro` | `Picks` で検索 |
| Archiveセクション見出し | `src/pages/index.astro` | `Library Archive` で検索 |

### コンセプト（トップ＆About共通）

| 文章 | ファイル |
|---|---|
| コンセプト見出し | `src/components/AboutBlock.astro` — `<h2>` |
| コンセプト文 | `src/components/AboutBlock.astro` — `<div class="about-text">` 内 |

### Aboutページ

| 文章 | ファイル |
|---|---|
| About見出し | `src/pages/about.astro` — `<h2>` |
| About本文 | `src/pages/about.astro` — `<div class="about-text">` 内の `<p>` |
| 「Back to Archive」ボタン文言 | `src/pages/about.astro` — `<a>` |

### 商品詳細

| 文章 | ファイル |
|---|---|
| 商品メタ情報（サイズ等） | `src/pages/product/[id].astro` — `<div class="detail-meta">` 内 |
| 「Add to Cart」ボタン | `src/pages/product/[id].astro` — `<button>` |

### ヘッダー・フッター

| 文章 | ファイル |
|---|---|
| ロゴテキスト「POST」 | `src/layouts/Layout.astro` — `<a class="logo-main">` |
| ロゴ上の tagline | `src/layouts/Layout.astro` — 1つ目の `<span class="logo-tagline">` |
| ロゴ下の tagline | `src/layouts/Layout.astro` — 2つ目の `<span class="logo-tagline">` |
| フッター会社情報 | `src/layouts/Layout.astro` — footer内 |
| フッター著作権表示 | `src/layouts/Layout.astro` — `<div class="footer-bottom">` |

### 購入完了

| 文章 | ファイル |
|---|---|
| 完了メッセージ | `src/pages/success.astro` — `<div class="about-text">` 内 |

---

## 表示/非表示の切り替え

### バナー
→ 上記「バナー」セクション参照

### ヒーローセクション
`src/pages/index.astro` で `<!-- Hero -->` セクションをコメントアウト：
```html
<!-- <section class="hero">...</section> -->
```

### コンセプトセクション（トップ）
`src/pages/index.astro` で `<AboutBlock />` をコメントアウト：
```html
<!-- <AboutBlock /> -->
```

### Picksカルーセル
`src/pages/index.astro` で `<!-- Picks Carousel -->` セクションをコメントアウト

### フィルターバー
`src/pages/index.astro` — クリエイターが1人だけの場合は自動非表示。強制非表示にしたい場合はフィルターの `{creators.length > 1 && ...}` を `{false && ...}` に

### 売り切れ商品
`src/pages/index.astro` — `soldOutProducts` セクションをコメントアウトすれば非表示

### 検索アイコン
`src/layouts/Layout.astro` で `data-search-open` の `<button>` をコメントアウト

### Instagramアイコン
`src/layouts/Layout.astro` で Instagram の `<a>` をコメントアウト

### 商品詳細の画像ズーム
`src/styles/global.css` で `.detail-main-img:hover img { transform: scale(1.8); }` を削除

### 商品カードの Quick View
`src/styles/global.css` で `.product-card-quick` 関連のスタイルを削除、`ProductCard.astro` から `<div class="product-card-quick">` を削除

### Back to Topボタン
`src/layouts/Layout.astro` で `<button class="back-top">` をコメントアウト

### ページローディングバー
`src/layouts/Layout.astro` で `<div class="page-loader">` をコメントアウト

### 法的ページリンク（フッター）
`src/layouts/Layout.astro` のフッター内 legal リンクをコメントアウト

---

## 色・フォント・デザイン

`src/styles/global.css` の `:root` で一括管理：

```css
:root {
  --bg: #ffffff;        /* 背景色 */
  --fg: #1a1a1a;        /* テキスト色 */
  --muted: #888;        /* サブテキスト色 */
  --border: #e0e0e0;    /* ボーダー色 */
  --card-bg: #f6f5f3;   /* カード背景色 */
  --accent: #ff6400;    /* アクセント色（バナー・カート・購入ボタン） */
}
```

### フォント変更
同じく `:root` 内：
```css
  --font-display: Georgia, serif;              /* 見出し */
  --font-body: Arial, sans-serif;              /* 本文・UI */
  --font-jp: 'Zen Kaku Gothic New', sans-serif; /* 日本語本文 */
  --font-jp-serif: 'Noto Serif JP', serif;     /* 日本語セリフ */
```
Google Fontsを変更する場合は `Layout.astro` の `<link>` も更新。

### 主要なサイズ調整
| 項目 | CSS | デフォルト |
|---|---|---|
| ロゴサイズ | `.logo-main` → `font-size` | 32px |
| ヒーロータイトル | `.hero-title` → `font-size` | 48px |
| セクション見出し | `.section-title` → `font-size` | 24px |
| 商品名 | `.product-card-name` → `font-size` | 14px |
| 購入ボタン高さ | `.detail-buy-btn` → `height` | 44px |
| グリッド列数 | `.product-grid` → `grid-template-columns` | repeat(4, 1fr) |
| カード間隔 | `.product-grid` → `gap` | 40px 28px |
| 最大幅 | 各セクションの `max-width` | 1400px |

---

## 商品管理（Stripe）

**すべて Stripe ダッシュボードで管理。コード変更不要。**

| 操作 | 方法 |
|---|---|
| 商品を追加 | Stripe → Products → Create product |
| 商品名を変更 | Stripe → 商品を開く → Name |
| 価格を変更 | Stripe → 商品のPrice |
| 画像を変更 | Stripe → 商品の Images（正方形推奨） |
| 説明文を追加 | Stripe → 商品の Description |
| クリエイター名を設定 | Stripe → 商品の Metadata → key: `creator`, value: `名前` |
| 商品を非公開に | Stripe → 商品の Active を OFF（サイトで「Sold Out」表示） |
| 商品を完全に非表示 | Stripe → 商品を Archive |

### Picksに表示される商品
`src/pages/index.astro` — `products.data.slice(0, 6)` で先頭6件。Stripeでの作成順（新しい順）で表示されます。

---

## カート・決済

| 設定 | 場所 |
|---|---|
| 数量上限 | `src/layouts/Layout.astro` と `src/pages/cart.astro` — `MAX_QTY` 定数（デフォルト10） |
| 決済後のリダイレクト先 | `src/pages/api/checkout.js` — `success_url` / `cancel_url` |
| 決済キャンセル時のリダイレクト | 同上（デフォルトはカートページ） |

### トースト通知
- テキスト変更: `Layout.astro` の `showToast()` 呼び出し箇所
- 表示時間: `Layout.astro` — `setTimeout` の `3500`ms を変更
- スタイル: `global.css` → `.toast`

### ミニカートドロワー
- スタイル: `global.css` → `.mini-cart` 関連
- 幅: `.mini-cart` → `width`（デフォルト 400px、モバイルは 100vw）

---

## 法的ページ

**⚠️ 公開前に必ず記入してください：**

| ページ | ファイル | 要記入箇所 |
|---|---|---|
| 特定商取引法 | `src/pages/legal/tokushoho.astro` | 責任者名、住所、電話番号、販売URL |
| プライバシーポリシー | `src/pages/legal/privacy.astro` | 必要に応じて内容を確認・修正 |
| 配送・返品 | `src/pages/legal/shipping.astro` | 送料、配送方法、日数を実態に合わせて修正 |

---

## 検索・フィルター

### 検索
- 商品名とクリエイター名でリアルタイム絞り込み
- `Layout.astro` の `window.__products` にデータを渡す仕組み
- 各ページで `<script define:vars={{ searchData }}>` で商品データを提供

### フィルター
- クリエイター別フィルターがアーカイブセクションに自動表示
- クリエイターが1名のみの場合は非表示
- タグでフィルタリングしたい場合: Stripeのメタデータに `tag` キーを追加し、`index.astro` のフィルターロジックを拡張

---

## Google Analytics

`.env` に設定するだけ：
```
PUBLIC_GA_ID=G-XXXXXXXXXX
```
空欄ならタグは挿入されません。Google Tag Manager を使いたい場合は `Layout.astro` の `<head>` 内のスクリプトを差し替え。

---

## サイトマップ・SEO

### サイトマップ
`@astrojs/sitemap` を使用。ビルド時に自動生成されます。
`astro.config.mjs` の `site` を本番ドメインに変更：
```js
site: 'https://your-domain.com',
```

### SEO
- OGP: `Layout.astro` の `<head>` 内で設定済み
- JSON-LD: トップページ（Store）と商品詳細（Product）に設定済み
- description: `Layout.astro` で設定。ページ個別にしたい場合は props で渡す

---

## 配送設定

配送料の設定は2箇所：
1. **Stripe Checkout** — `src/pages/api/checkout.js` で `shipping_options` を追加可能
2. **表記** — `src/pages/legal/shipping.astro` と `src/pages/legal/tokushoho.astro` の送料記載

Stripe Checkoutで配送先住所を収集したい場合、`checkout.js` に追加：
```js
shipping_address_collection: {
  allowed_countries: ['JP'],
},
```

---

## ファイル構成

```
astro/
├── .env.example          ← コピーして .env を作成
├── GUIDE.md              ← このファイル
├── astro.config.mjs      ← Astro設定（サイトURL・プラグイン）
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── hero.jpg      ← ヒーロー画像
│       ├── about-1.jpg   ← About画像（左）
│       ├── about-2.jpg   ← About画像（右）
│       └── ogp.jpg       ← OGP画像
└── src/
    ├── components/
    │   ├── AboutBlock.astro    ← コンセプトブロック
    │   └── ProductCard.astro   ← 商品カード
    ├── layouts/
    │   └── Layout.astro        ← 共通レイアウト（ヘッダー・フッター・カート・検索）
    ├── pages/
    │   ├── 404.astro           ← Not Found
    │   ├── about.astro         ← Aboutページ
    │   ├── cart.astro          ← カートページ
    │   ├── index.astro         ← トップページ
    │   ├── success.astro       ← 購入完了
    │   ├── api/
    │   │   └── checkout.js     ← Stripe決済API
    │   ├── legal/
    │   │   ├── privacy.astro   ← プライバシーポリシー
    │   │   ├── shipping.astro  ← 配送・返品ポリシー
    │   │   └── tokushoho.astro ← 特商法表記
    │   └── product/
    │       └── [id].astro      ← 商品詳細（動的ルート）
    └── styles/
        └── global.css          ← 全スタイル
```
