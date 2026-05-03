# 運用マニュアル

このサイトの編集・公開・運用に必要なこと全部ここ。順番にチェックを潰せば公開まで行けます。

---

## 🟢 普段の編集 — TinaCMS で

ブラウザで [https://log-letter.com/admin](https://log-letter.com/admin) を開く。
GitHub アカウントでログイン → 左サイドバーから編集対象を選択。

### 編集できるもの

| サイドバー項目 | 内容 |
|---|---|
| 🔗 連絡先リンク | 株式会社MiKS お問い合わせ URL |
| 🔍 SEO・メタ情報 | サイト名、description、OGP |
| 🔝 ヘッダー | ロゴ、タグライン、ナビ |
| 📱 モバイルメニュー | スマホ表示時のメニュー文言 |
| 🏠 トップページ | ヒーロー、Picks、Archive |
| 💭 コンセプト | トップ中段の概念文 |
| 📖 About ページ | About 本文 |
| 🛒 商品詳細 | 信頼バッジ、ボタン文言、配送案内 |
| 🛍️ カート / ミニカート | カート画面の文言 |
| 🔎 検索 | プレースホルダー |
| 🍞 トースト | 通知文言 |
| ✅ 購入完了 | success ページ |
| ❓ 404 | Not Found |
| 👣 フッター | 会社情報、リンク、コピーライト |
| ⚖️ 法務ページタイトル | 特商法・プライバシー・配送のタイトル |
| 📜 法務ページ本文 | 特商法・プライバシー・配送の本文 (Markdown) |
| 🎨 デザイントークン | 色 (背景・テキスト・アクセント等) |

### 反映までの流れ

1. TinaCMS で編集 → **Save** ボタン
2. 自動で GitHub に commit が立つ
3. Cloudflare が 1〜2 分で再デプロイ
4. `https://log-letter.com` に反映

### コードを直接触る場合

TinaCMS を経由せず手動で編集したい時は以下のファイルを GitHub Web エディタで開くだけ:

- 文言: [src/copy/site.ja.json](src/copy/site.ja.json)
- 法務本文: [src/copy/legal/*.md](src/copy/legal/)
- 色・フォント: [src/styles/tokens.json](src/styles/tokens.json) → 編集後にローカルで `npm run tokens` で `_tokens.css` 再生成 (もしくは TinaCMS 経由なら自動)

---

## 🛒 商品の追加・編集

すべて [Stripe ダッシュボード](https://dashboard.stripe.com/products) で完結。コード変更不要。

| 操作 | 方法 |
|---|---|
| 新商品追加 | Products → Create product → Name / Description / Price / Image を設定 |
| クリエイター名 | 商品 → Metadata → key=`creator`, value=`名前` |
| 売り切れ表示 | 商品 → Active を OFF (サイトでは "Sold Out" 表示) |
| 完全に非表示 | 商品 → Archive |

Picks 表示は新しい順 6 件。

---

## 🖼️ 画像の差し替え

`public/images/` に同じファイル名で上書きアップロード:

| ファイル | 用途 | 推奨サイズ |
|---|---|---|
| `hero.jpg` | トップ最上部 | 1800 × 1000 px |
| `about-1.jpg` | About 左 | 800 × 1000 px |
| `about-2.jpg` | About 右 | 800 × 1000 px |
| `ogp.jpg` | SNS シェア | 1200 × 630 px |

GitHub Web エディタからドラッグ & ドロップで上げられます。

### 商品の画像

メインの 1 枚は Stripe ダッシュボード商品ページの「画像」欄から登録。

**2 枚目以降** (商品詳細ページのギャラリーに表示) は **メタデータ** で:

1. 画像を公開 URL の取れる場所にアップロード (`public/images/` に置いて `https://log-letter.com/images/xxx.jpg` でも、Cloudflare R2 でも、外部画像ホスティングでも可)
2. Stripe ダッシュボード → 該当商品 → **その他のオプション → メタデータ** を展開
3. キーバリューで以下を追加:

| キー | 値 |
|---|---|
| `image2` | 2 枚目の画像 URL |
| `image3` | 3 枚目の画像 URL |
| `image4` | 4 枚目の画像 URL |
| ... `image8` まで | |

商品詳細ページが自動で全画像をギャラリー表示します (左右ナビゲーションとサムネイル付き)。

---

# 🚀 本番公開チェックリスト (初回のみ)

## ✅ 1. TinaCMS Cloud セットアップ

1. [https://app.tina.io](https://app.tina.io) に GitHub アカウントでログイン
2. **Create New Project** → **Import from GitHub** → `zakkerooni/POST` を選択
3. Branch: `main`、Path to schema: `tina/config.ts`
4. プロジェクト作成後、ダッシュボードに表示される:
   - **Client ID** (`PUBLIC_TINA_CLIENT_ID` に使う)
   - **Read-Only Token** はスキップ
   - **Tokens** タブ → **+ New Token** で書き込みトークンを発行 (`TINA_TOKEN`)
5. Cloudflare Worker `post` → Settings → Variables and Secrets:
   - `PUBLIC_TINA_CLIENT_ID` (Variable)
   - `TINA_TOKEN` (Secret)
6. Worker を再デプロイ

## ✅ 2. Stripe を本番モードに切替

### 2-1. Live モード起動

[Stripe Dashboard](https://dashboard.stripe.com/) → 左上トグル **テスト環境 → 本番環境** → アクティベート画面で事業者情報入力:

| 項目 | 内容 |
|---|---|
| 事業形態 | 法人 |
| 法人名 | 株式会社MiKS |
| 法人番号 | [国税庁法人番号公表サイト](https://www.houjin-bangou.nta.go.jp/) で取得 |
| 登記住所 | 〒920-0964 石川県金沢市本多町 3-5-10-201 |
| 業種 | 一般商品 / アート・工芸品 |
| ウェブサイト | https://log-letter.com |
| 代表者 | 吉崎 努 (生年月日・住所・電話番号) |
| 銀行口座 | 売上振込先 |
| 本人確認書類 | 運転免許証 or マイナンバーカード |

審査 1〜2 営業日。

### 2-2. 本番商品登録 + Live キー差替

1. Stripe Live モードで商品を登録 (Test の商品はコピーされない)
2. Developers → API keys → **Live Secret key** (`sk_live_xxx`) をコピー
3. Cloudflare Worker → Variables and Secrets → `STRIPE_SECRET_KEY` を `sk_live_xxx` に上書き → 保存 → 再デプロイ

### 2-3. Webhook を本番に登録

1. Stripe → Developers → Webhooks → **+ Add endpoint**
2. URL: `https://log-letter.com/api/stripe-webhook`
3. Events: `checkout.session.completed`
4. **Signing secret** (`whsec_xxx`) をコピー
5. Cloudflare → `STRIPE_WEBHOOK_SECRET` を `whsec_xxx` に上書き → 再デプロイ

### 2-4. 本番テスト購入

- 自分のクレカで 1 件決済 → success ページ → Stripe で確認 → 即返金

---

## ✅ 3. www サブドメイン追加

Cloudflare → Workers & Pages → `post` → Settings → Domains & Routes → **+ Add → Custom Domain** → `www.log-letter.com`

---

## ✅ 4. メール転送 (Cloudflare Email Routing)

`info@log-letter.com` 宛のメールを `info@miks-inc.com` に転送 + Gmail でフィルター。

1. Cloudflare → Websites → `log-letter.com` → **Email** → **Email Routing** → **Get Started**
2. **Add records and enable** で MX/TXT 自動追加
3. **Destination addresses** タブ → `info@miks-inc.com` を追加 → 確認メール認証
4. **Routing rules** タブ下部の **Catch-all address** → `Send to an email` → `info@miks-inc.com` → Active → Save

### Gmail フィルター

1. Gmail サイドバーの「ラベル」+ から `POST` ラベル作成
2. 検索ボックスの絞り込みアイコン → **To** に `@log-letter.com` → フィルタを作成
3. ☑ ラベルを付ける `POST` / ☑ 一致する既存スレッドにも適用 → **フィルタを作成**

---

## ✅ 5. SSL 強化 (Cloudflare)

`log-letter.com` ゾーン → **SSL/TLS**:

- **Overview** → 暗号化モード = **Full**
- **Edge Certificates**:
  - **Always Use HTTPS** ON
  - **Automatic HTTPS Rewrites** ON
  - **Minimum TLS Version** = `TLS 1.2`

---

## ✅ 6. Google Analytics

1. [analytics.google.com](https://analytics.google.com) → プロパティ作成 → URL `https://log-letter.com`
2. 測定 ID `G-XXXXXXXXXX` をコピー
3. Cloudflare Worker → Variables → `PUBLIC_GA_ID` に追加 → 再デプロイ

---

## ✅ 7. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → プロパティ追加 → **ドメイン** → `log-letter.com`
2. 表示される TXT レコードを Cloudflare DNS に追加
3. 確認 → サイトマップに `sitemap-index.xml` を送信

---

## ✅ 8. その他 Cloudflare 設定

- **Bots** → **Bot Fight Mode** ON
- **Speed → Optimization** → **Brotli** ON
- **Web Analytics** → Enable (GA より軽量、Cookie 不要)

---

## ✅ 9. 画像配置

`public/images/` に最低限:

- [ ] `ogp.jpg` (1200×630) — SNS シェア用、最優先
- [ ] `hero.jpg` (1800×1000)
- [ ] `about-1.jpg` `about-2.jpg` (各 800×1000)

---

## ✅ 10. 公開直前 最終確認

- [ ] フッターに「by 株式会社MiKS」
- [ ] `/legal/tokushoho` で代表者・所在地・メアド表示
- [ ] フッターの Contact が miks-inc.com に飛ぶ
- [ ] アドレスバーに 🔒
- [ ] スマホ実機でも表示崩れなし
- [ ] Twitter Card Validator (https://cards-dev.twitter.com/validator) で OGP 確認

---

# 🛠️ ローカル開発

```bash
npm install
cp .env.example .env   # Stripe テストキー + TinaCMS Client ID/Token を記入
npm run dev            # → http://localhost:4321
                       # 管理画面 → http://localhost:4321/admin/index.html
```

`.env` は git にコミットされません。

---

# 🔧 トラブルシューティング

| 症状 | 対処 |
|---|---|
| `/admin` を開いてもログイン画面が出ない | TinaCMS Cloud の Client ID が Cloudflare 環境変数に設定されているか確認 |
| 編集を保存できない | TINA_TOKEN が正しいか、Token に Read/Write 権限があるか |
| 公開反映されない | Cloudflare → Workers & Pages → `post` → Deployments で最新デプロイが Active か確認 |
| ビルド失敗 | Cloudflare の Build ログ確認。直近の失敗パターンは `package-lock.json` がコミットされた場合 (`.gitignore` 済み) |
