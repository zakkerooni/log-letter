# 編集ガイド（はじめに読むやつ）

このサイトは、コードをほぼ触らずに **文言・画像・色・フォント** を編集できるように整理されています。
迷ったらまずこのファイルを開いてください。詳細リファレンスは [GUIDE.md](./GUIDE.md) にあります。

---

## 1. 文言（コピー）を変える

ほぼすべてのテキストは **1 つの JSON ファイル** に集まっています。

📄 `src/content/site.ja.json`

```jsonc
"home": {
  "heroTitle": "Postcard Library",     ← トップの大見出し
  "heroSub":   "Kanazawa — Record of a Moment",
  ...
},
"about": {
  "heading": "The Record of a Moment",
  "paragraphs": [
    "ポストカードは、ある瞬間の「記録」である。…",
    "金沢の静かな空気感や、…"
  ]
}
```

- `"キー": "値"` の **値（右側）だけ** を変更してください。キー名（左側）は変えないでください。
- 段落を増やしたいときは `paragraphs` 配列に文字列を追加するだけ。
- GitHub の Web エディタ（リポジトリで `.` を押す or ファイル右上の鉛筆アイコン）から直接編集できます。

### 法務ページの文章

📄 `src/content/legal/tokushoho.md` `privacy.md` `shipping.md`

普通の Markdown として書けます。`# 見出し`、`- 箇条書き`、表（`| 項目 | 内容 |`）が使えます。

---

## 2. 色・フォントを変える

📄 `src/styles/tokens.json`

```jsonc
"color": {
  "accent": { "value": "#ff6400", ... }   ← この値を変える
}
```

### Figma と同期したい場合

1. Figma の **Tokens Studio** プラグインをインストール（[tokens.studio](https://tokens.studio/)）
2. プラグイン内 `Settings → Sync providers` で **GitHub** を選択
3. このリポジトリと `src/styles/tokens.json` を指定
4. Figma 側で色やフォントを編集 → "Push to GitHub" でコミット
5. Cloudflare Pages が自動で再デプロイ（1〜2 分で本番反映）

> 直接 `tokens.json` を編集しても OK。保存して Git に push するだけで反映されます。

---

## 3. 画像を差し替える

`public/images/` に同じファイル名で上書きするだけ。

| ファイル          | 用途                       | サイズ目安      |
|-------------------|----------------------------|-----------------|
| `hero.jpg`        | トップ最上部の大画像       | 1800 × 1000 px  |
| `about-1.jpg`     | About ページ左側           | 800 × 1000 px   |
| `about-2.jpg`     | About ページ右側           | 同上            |
| `ogp.jpg`         | SNS シェア時のサムネイル   | 1200 × 630 px   |

商品画像は **Stripe ダッシュボード** で管理（コード変更不要）。

---

## 4. 商品の追加・編集

すべて [Stripe ダッシュボード](https://dashboard.stripe.com/products) で完結します。

| やりたいこと   | 方法                                                    |
|----------------|---------------------------------------------------------|
| 新商品追加     | Products → Create product（画像・価格を設定）           |
| クリエイター名 | 商品 → Metadata → key=`creator`, value=`名前`          |
| 売り切れ表示   | 商品 → Active を OFF（サイトでは "Sold Out" 表示）      |
| 完全に非表示   | 商品 → Archive                                          |

---

## 5. 連絡先・SNS・お知らせバナー

📄 `.env`（プロジェクトルート、ローカルだけ）  
本番は **Cloudflare Pages の環境変数** に同じものを登録します。

```env
PUBLIC_BANNER_TEXT=送料無料キャンペーン中     # 空欄ならバナー非表示
PUBLIC_INSTAGRAM_URL=https://instagram.com/yourname
PUBLIC_CONTACT_EMAIL=info@your-domain.jp
PUBLIC_GA_ID=G-XXXXXXXXXX                    # 空欄なら GA タグ挿入なし
```

---

## 6. 変更を本番に反映する

GitHub に push するだけ。Cloudflare Pages が約 1〜2 分で自動再デプロイします。

```bash
git add -A
git commit -m "コピーを更新"
git push
```

> GitHub Web エディタで編集 → "Commit changes" を押した時点で push と同じ扱いです。

---

## 7. 困ったら

- 開発サーバを起動: `npm install && npm run dev` → http://localhost:4321
- 詳しい編集ポイント・CSS 調整・本番公開手順 → [GUIDE.md](./GUIDE.md)
- JSON が壊れて画面がエラーに → 直前のコミットに戻す（GitHub の「History」から）
