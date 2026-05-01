# POST — 本番公開チェックリスト

`log-letter.com` 取得後、本番公開までの手順を順番に。各ステップ終わったらチェック。

---

## 1. 特商法ページ ✍️ — 完了

[`src/content/legal/tokushoho.md`](src/content/legal/tokushoho.md) は記入済み:
- 販売業者: 株式会社MiKS
- 運営統括責任者: 吉崎 努
- 所在地: 〒920-0964 石川県金沢市本多町 3-5-10-201
- 電話番号: 非掲載（請求があれば遅滞なく開示）
- メール: info@miks-inc.com
- 販売 URL: https://log-letter.com

> 郵便番号は金沢市本多町の標準値 920-0964 で入れています。実際の登記郵便番号と異なる場合は教えてください。

### 連絡先の集約方針

サイト各所（ヘッダー/フッター/モバイルナビ/プライバシー・配送ページ）の **Contact リンクは [https://miks-inc.com/](https://miks-inc.com/) に集約** しました。情報変更時は MiKS サイト側だけ更新すれば OK。

特商法ページのみ法律要件で `info@miks-inc.com` を直接記載。

---

## 2. Stripe を本番モードに切替 💳

### 2-1. Live モード起動

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. 左サイドバー上部 **テスト環境/本番環境** トグルを **本番環境** に
3. 初回はアクティベート画面が出るので、**事業者情報** を入力（株式会社 MiKS の登記情報・代表者情報・銀行口座）
4. 審査は通常 1〜2 営業日

### 2-2. 本番商品を登録

⚠️ Test モードの商品は本番にコピーされません。本番モードで登録し直す。

- Products → **+ Add product**
- Name / Description / Price / Image を設定
- **Metadata** → key=`creator`, value=`クリエイター名`（フィルター用）

### 2-3. API キーを Cloudflare に設定

1. Stripe → Developers → API keys → **Standard keys** タブ
2. **Secret key** の `Reveal live key` → コピー（`sk_live_xxx`）
3. Cloudflare ダッシュボード → Workers & Pages → `post` → Settings → Variables and Secrets → `STRIPE_SECRET_KEY` の **Edit**（鉛筆アイコン）
4. 値を `sk_live_xxx` に上書き → 保存
5. **Deployments → Redeploy** で再デプロイ（環境変数を反映）

### 2-4. Webhook を登録

1. Stripe → Developers → **Webhooks** → **+ Add endpoint**
2. **Endpoint URL**: `https://log-letter.com/api/stripe-webhook`
3. **Listen to**: `Events on your account`
4. **Select events**: `checkout.session.completed` のみ ON（最低限）
5. **Add endpoint** → 作成された endpoint の詳細画面で **Signing secret** をクリック → コピー（`whsec_xxx`）
6. Cloudflare → Worker の Variables and Secrets → **+ Add → Secret**
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_xxx`
7. 再デプロイ

### 2-5. 本番テスト購入

- [ ] 自分のクレカで **本物の決済** を 1 件実行
- [ ] success ページに到達
- [ ] Stripe Dashboard で支払い確認
- [ ] Cloudflare → Worker → Observability → Logs で `[order]` ログ確認
- [ ] Stripe Dashboard で **即返金**（Payments → 該当決済 → Refund）

---

## 3. www サブドメインを追加 🌐

`www.log-letter.com` でアクセスされても表示できるように。

1. Cloudflare → Worker `post` → Settings → Domains & Routes → **+ Add → Custom Domain**
2. `www.log-letter.com` を入力 → **Add Custom Domain**
3. SSL 証明書発行を待つ（数分）

---

## 4. メール転送（Cloudflare Email Routing）📧

`info@log-letter.com` 宛のメールを `info@miks-inc.com`（既存 Gmail）に転送します。
**カスタマー視点では POST 専用ドメインのメアドが見えるので信頼性も上がる + Gmail 側のフィルターも楽。**

### 4-1. Email Routing 有効化

1. Cloudflare → アカウントホーム → Websites → `log-letter.com` を開く
2. 左メニュー **Email** → **Email Routing**
3. **Get Started** → 必要な MX/TXT レコードが自動追加される（`Add records and enable` をクリック）
4. **Destination addresses** タブ → **+ Add destination address** → `info@miks-inc.com` を入力
5. Gmail に届く確認メールのリンクをクリックして検証
6. **Routing rules** タブ → **Custom address** で以下を作成：

| Custom address          | Action                | Destination          |
|-------------------------|-----------------------|----------------------|
| `info@log-letter.com`   | Send to an email      | `info@miks-inc.com`  |
| `shop@log-letter.com`   | Send to an email      | `info@miks-inc.com`  |

7. **Catch-all** ルールも有効化（`*@log-letter.com` → `info@miks-inc.com`）すると取りこぼしゼロ

### 4-2. Gmail 側のフィルター設定（別事業との区別）

Gmail の検索ボックスに右端の **絞り込みアイコン** をクリック → 以下の条件:

| 条件                      | 値                          |
|---------------------------|-----------------------------|
| To（宛先）                | `*@log-letter.com`          |

→ **フィルタを作成** → 以下にチェック:
- **ラベルを付ける**: `POST` という新規ラベルを作成
- **受信トレイをスキップ**（必要なら ON。読む時はラベル POST から開く）
- **重要マークを付ける**

これで `log-letter.com` ドメイン宛に来たメール（顧客問い合わせ・Stripe 通知の Cc など）だけが POST ラベルに振り分けられ、別事業のメールと混在しなくなります。

### 4-3. Stripe の通知メールも分離（任意）

Stripe Dashboard → Settings → **Team and security** → 自分のメンバー設定で「通知の宛先」を `shop@log-letter.com` に変えると、Stripe からの注文通知も自動で POST ラベルに入ります。

### 4-4. サイト側の連絡先表示

サイトの Contact リンクはすべて [https://miks-inc.com/](https://miks-inc.com/) に集約済み（特商法ページのメアド表記のみ法律要件で残置）。
情報変更時は MiKS サイトだけ更新すれば全て同期されます。

---

## 5. Google Analytics 4 設定 📊

1. [Google Analytics](https://analytics.google.com/) にログイン → 管理 → **プロパティを作成**
2. プロパティ名: `POST — log-letter.com` 等
3. **データストリーム** → **ウェブ** → URL `https://log-letter.com` を入力
4. 表示される **測定 ID**（`G-XXXXXXXXXX`）をコピー
5. Cloudflare → Worker → Variables and Secrets → **+ Add → Variable**（Secret ではなく Variable）
   - Name: `PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX`
6. 再デプロイ
7. ローカルでも反映したい場合は `.env` にも同じ値

---

## 6. Google Search Console 登録 🔍

1. [Search Console](https://search.google.com/search-console) → **プロパティを追加**
2. **ドメイン** タイプ（`log-letter.com`）を選択（`www` も DNS タイプ含めて自動カバー）
3. 表示される TXT レコードを Cloudflare DNS に追加
   - Cloudflare → `log-letter.com` → DNS → **+ Add record**
   - Type: `TXT`、Name: `@`、Content: 表示された `google-site-verification=xxx`
4. Search Console に戻って **確認**
5. プロパティが認証されたら、左メニュー **サイトマップ** に移動
6. URL `sitemap-index.xml` を入力 → **送信**

---

## 7. Cloudflare 追加設定 🔒

`log-letter.com` ゾーン内で:

### SSL/TLS
- **Overview** → 暗号化モード **Full**
- **Edge Certificates** → **Always Use HTTPS** ON、**Automatic HTTPS Rewrites** ON、**Minimum TLS Version** = `TLS 1.2`

### Security
- **Bots** → **Bot Fight Mode** ON
- **Settings** → **Security Level** = `Medium`

### Speed
- **Optimization** → **Auto Minify**（HTML/CSS/JS）ON
- **Optimization** → **Brotli** ON

### Web Analytics（GA より軽く Cookie 不要）
- 左メニュー **Web Analytics** → **Enable** → 自動で `log-letter.com` に有効化

---

## 8. 画像配置 🖼️

[`public/images/`](public/images/) に配置（ファイル名はこのまま）:

| ファイル          | 用途                       | 推奨サイズ      |
|-------------------|----------------------------|-----------------|
| `hero.jpg`        | トップ最上部のヒーロー画像 | 1800 × 1000 px  |
| `about-1.jpg`     | About ページ左            | 800 × 1000 px   |
| `about-2.jpg`     | About ページ右            | 800 × 1000 px   |
| `ogp.jpg`         | SNS シェア用              | 1200 × 630 px   |

OGP 画像（`ogp.jpg`）はないと Twitter/Facebook シェアが寂しいので **最優先で 1 枚** 用意。

---

## 9. 公開直前 最終チェック 🎯

push する前に手元で確認:

```bash
npm install
cp .env.example .env  # 値を埋める（テストキーで OK）
npm run dev
```

- [ ] http://localhost:4321 でトップ表示
- [ ] About / 商品詳細 / カート / 特商法 / プライバシー / 配送 全ページ崩れなし
- [ ] フッターの「by 株式会社MiKS」が出ている
- [ ] OGP の Twitter Card Validator で確認 → https://cards-dev.twitter.com/validator
- [ ] スマホ実機でも一通り動作確認

問題なければ:

```bash
git add -A
git commit -m "公開準備：特商法・本番ドメイン・メール設定"
git push
```

→ Cloudflare が 1〜2 分で自動デプロイ → **`https://log-letter.com` で本番公開** 🎉

---

## 10. 公開後 1 週間でやること

- [ ] Search Console にインデックス登録依頼（URL 検査ツール → 各主要ページ）
- [ ] Instagram プロフィールに `log-letter.com` を追加
- [ ] Stripe Live モードで実際に 1 件売れるかモニター
- [ ] Cloudflare Web Analytics でアクセス源を確認
