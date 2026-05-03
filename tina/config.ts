import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Client ID は admin UI に埋め込まれて公開される値なのでハードコード OK。
  // Token は TinaCloud の build 時認証用、Cloudflare Build env var で設定する。
  clientId: "0aa9a3ca-90a5-47f3-9c9d-0228bde46a52",
  token: process.env.TINA_TOKEN!,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "site",
        label: "サイト全体の文言",
        path: "src/copy",
        match: { include: "site" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name: "links",
            label: "🔗 連絡先リンク",
            type: "object",
            fields: [
              {
                name: "companyContactUrl",
                label: "Contact 先 URL (株式会社MiKS のお問い合わせ窓口)",
                type: "string",
              },
              {
                name: "companyHomeUrl",
                label: "ブランド表記の MiKS inc. リンク先 (会社トップページ)",
                type: "string",
              },
              {
                name: "instagramUrl",
                label: "Instagram URL",
                type: "string",
              },
            ],
          },
          {
            name: "meta",
            label: "🔍 SEO・メタ情報",
            type: "object",
            fields: [
              { name: "siteName", label: "サイト名", type: "string" },
              { name: "siteSuffix", label: "ブラウザタブ末尾", type: "string" },
              { name: "description", label: "説明文 (meta description)", type: "string", ui: { component: "textarea" } },
              { name: "ogDescription", label: "OG 説明文", type: "string", ui: { component: "textarea" } },
              { name: "storeJsonLdName", label: "JSON-LD 店舗名", type: "string" },
              { name: "storeJsonLdDescription", label: "JSON-LD 店舗説明", type: "string", ui: { component: "textarea" } },
              { name: "addressLocality", label: "所在地 (市区町村, 英)", type: "string" },
              { name: "addressCountry", label: "国コード", type: "string" },
            ],
          },
          {
            name: "header",
            label: "🔝 ヘッダー",
            type: "object",
            fields: [
              { name: "tagAbove", label: "ロゴ上タグライン", type: "string" },
              { name: "logo", label: "ロゴテキスト", type: "string" },
              { name: "logoImage", label: "ロゴ画像 (SVG/PNG。設定するとテキストの代わりに表示)", type: "image" },
              { name: "tagBelow", label: "ロゴ下タグライン", type: "string" },
              { name: "navArchive", label: "Archive リンク文言", type: "string" },
              { name: "navAbout", label: "About リンク文言", type: "string" },
            ],
          },
          {
            name: "mobileNav",
            label: "📱 モバイルメニュー",
            type: "object",
            fields: [
              { name: "home", label: "Home", type: "string" },
              { name: "archive", label: "Archive", type: "string" },
              { name: "about", label: "About", type: "string" },
              { name: "cart", label: "カート", type: "string" },
              { name: "contact", label: "Contact", type: "string" },
              { name: "tokushoho", label: "特商法リンク", type: "string" },
              { name: "privacy", label: "プライバシーリンク", type: "string" },
            ],
          },
          {
            name: "home",
            label: "🏠 トップページ",
            type: "object",
            fields: [
              { name: "heroTitle", label: "ヒーロータイトル", type: "string" },
              { name: "heroSub", label: "ヒーローサブ", type: "string" },
              { name: "picksLabelSm", label: "Picks 小見出し", type: "string" },
              { name: "picksHeading", label: "Picks 見出し", type: "string" },
              { name: "archiveRecordsSuffix", label: "Archive 件数末尾 (例: Records)", type: "string" },
              { name: "archiveHeading", label: "Archive 見出し", type: "string" },
              { name: "filterAll", label: "フィルター All ラベル", type: "string" },
            ],
          },
          {
            name: "concept",
            label: "💭 コンセプト (トップに表示)",
            type: "object",
            fields: [
              { name: "smallLabel", label: "小見出し", type: "string" },
              { name: "heading", label: "見出し", type: "string" },
              { name: "body", label: "本文 (空行で段落区切り)", type: "string", ui: { component: "textarea" } },
            ],
          },
          {
            name: "about",
            label: "📖 About ページ",
            type: "object",
            fields: [
              { name: "smallLabel", label: "小見出し", type: "string" },
              { name: "heading", label: "見出し", type: "string" },
              { name: "body", label: "本文 (空行で段落区切り)", type: "string", ui: { component: "textarea" } },
              { name: "backToArchive", label: "戻るボタン文言", type: "string" },
            ],
          },
          {
            name: "product",
            label: "🛒 商品詳細ページ",
            type: "object",
            fields: [
              { name: "addToCart", label: "カートに入れるボタン", type: "string" },
              { name: "added", label: "追加完了メッセージ", type: "string" },
              { name: "buyNow", label: "すぐ購入するボタン", type: "string" },
              { name: "soldOut", label: "売り切れラベル", type: "string" },
              { name: "quickView", label: "クイックビュー", type: "string" },
              { name: "qtyLabel", label: "数量ラベル", type: "string" },
              { name: "taxNote", label: "税込表記", type: "string" },
              { name: "trustShip", label: "信頼バッジ・発送", type: "string" },
              { name: "trustPay", label: "信頼バッジ・決済", type: "string" },
              { name: "trustSsl", label: "信頼バッジ・SSL", type: "string" },
              { name: "stockLabel", label: "在庫表示", type: "string" },
              { name: "stockNote", label: "在庫補足", type: "string" },
              { name: "deliveryNote", label: "配送案内 (HTML 可)", type: "string", ui: { component: "textarea" } },
              { name: "metaSize", label: "商品メタ・サイズ", type: "string" },
              { name: "metaPrint", label: "商品メタ・印刷", type: "string" },
              { name: "metaShip", label: "商品メタ・発送", type: "string" },
              { name: "metaFee", label: "商品メタ・送料", type: "string" },
              { name: "relatedHeading", label: "関連商品見出し", type: "string" },
            ],
          },
          {
            name: "cart",
            label: "🛍️ カートページ",
            type: "object",
            fields: [
              { name: "heading", label: "見出し", type: "string" },
              { name: "empty", label: "空メッセージ", type: "string" },
              { name: "backToArchive", label: "戻るボタン", type: "string" },
              { name: "totalLabel", label: "合計ラベル", type: "string" },
              { name: "checkout", label: "Checkout ボタン", type: "string" },
              { name: "continue", label: "買い物を続けるリンク", type: "string" },
              { name: "remove", label: "削除リンク", type: "string" },
            ],
          },
          {
            name: "miniCart",
            label: "🛍️ ミニカート (右ドロワー)",
            type: "object",
            fields: [
              { name: "heading", label: "見出し", type: "string" },
              { name: "empty", label: "空メッセージ", type: "string" },
              { name: "totalLabel", label: "合計", type: "string" },
              { name: "checkout", label: "レジに進むボタン", type: "string" },
              { name: "continue", label: "買い物を続けるリンク", type: "string" },
            ],
          },
          {
            name: "search",
            label: "🔎 検索",
            type: "object",
            fields: [
              { name: "placeholder", label: "プレースホルダー", type: "string" },
              { name: "empty", label: "該当なしメッセージ", type: "string" },
            ],
          },
          {
            name: "toast",
            label: "🍞 トースト通知",
            type: "object",
            fields: [
              { name: "viewCart", label: "「カートを見る」リンク", type: "string" },
            ],
          },
          {
            name: "success",
            label: "✅ 購入完了ページ",
            type: "object",
            fields: [
              { name: "smallLabel", label: "小見出し", type: "string" },
              { name: "body", label: "本文 (空行で段落区切り、HTML 可)", type: "string", ui: { component: "textarea" } },
              { name: "subNote", label: "補足", type: "string" },
              { name: "backToHome", label: "戻るボタン", type: "string" },
            ],
          },
          {
            name: "notFound",
            label: "❓ 404 ページ",
            type: "object",
            fields: [
              { name: "title", label: "タイトル", type: "string" },
              { name: "message", label: "メッセージ", type: "string" },
              { name: "backToHome", label: "戻るボタン", type: "string" },
            ],
          },
          {
            name: "footer",
            label: "👣 フッター",
            type: "object",
            fields: [
              { name: "brandTitle", label: "ブランド見出し", type: "string" },
              { name: "brandLines", label: "ブランド説明行", type: "string", list: true },
              { name: "menuTitle", label: "Menu 列見出し", type: "string" },
              { name: "connectTitle", label: "Connect 列見出し", type: "string" },
              { name: "instagramLabel", label: "Instagram ラベル", type: "string" },
              { name: "linkArchive", label: "Archive リンク", type: "string" },
              { name: "linkAbout", label: "About リンク", type: "string" },
              { name: "linkContact", label: "Contact リンク", type: "string" },
              { name: "linkTokushoho", label: "特商法リンク", type: "string" },
              { name: "linkPrivacy", label: "プライバシーリンク", type: "string" },
              { name: "linkShipping", label: "配送ポリシーリンク", type: "string" },
              { name: "copyright", label: "コピーライト ({year} は自動置換)", type: "string" },
            ],
          },
          {
            name: "legal",
            label: "⚖️ 法務ページタイトル",
            type: "object",
            fields: [
              { name: "legalPageTitle", label: "統合ページタイトル (/legal)", type: "string" },
              { name: "tokushohoTitle", label: "特商法セクションタイトル", type: "string" },
              { name: "privacyTitle", label: "プライバシーセクションタイトル", type: "string" },
              { name: "shippingTitle", label: "配送セクションタイトル", type: "string" },
            ],
          },
          {
            name: "shipping",
            label: "📦 送料設定 (実際の決済に反映)",
            type: "object",
            fields: [
              { name: "fee", label: "送料 (円)", type: "number" },
              { name: "freeThreshold", label: "送料無料になる小計 (円)", type: "number" },
            ],
          },
        ],
      },

      {
        name: "legal",
        label: "📜 法務ページ本文",
        path: "src/copy/legal",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name: "body",
            label: "本文",
            type: "rich-text",
            isBody: true,
          },
        ],
      },

      {
        name: "tokens",
        label: "🎨 デザイントークン (色・フォント)",
        path: "src/styles",
        match: { include: "tokens" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            name: "color",
            label: "色",
            type: "object",
            fields: [
              { name: "bg", label: "背景色", type: "object", fields: [
                { name: "value", label: "値 (HEX)", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
              { name: "fg", label: "テキスト色", type: "object", fields: [
                { name: "value", label: "値", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
              { name: "muted", label: "サブテキスト色", type: "object", fields: [
                { name: "value", label: "値", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
              { name: "border", label: "ボーダー色", type: "object", fields: [
                { name: "value", label: "値", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
              { name: "cardBg", label: "カード背景色", type: "object", fields: [
                { name: "value", label: "値", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
              { name: "accent", label: "アクセント色 (バナー・カート・購入ボタン)", type: "object", fields: [
                { name: "value", label: "値", type: "string", ui: { component: "color" } },
                { name: "type", label: "type", type: "string", ui: { component: "hidden" } },
              ]},
            ],
          },
        ],
      },
    ],
  },
});
