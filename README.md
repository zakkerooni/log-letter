# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).



# MiKS Postcard Shop 管理

## 🛠️ Cloudflare 環境変数 (Environment Variables)
以下のキーをCloudflareで設定すると、コードを触らずにサイトを更新できます。

- `STRIPE_SECRET_KEY`: Stripeの秘密鍵（※ここには値を書かない）
- `PUBLIC_LOGO_URL`: ロゴ画像のURL（未設定ならテキスト表示）
- `PUBLIC_FAVICON_URL`: タブのアイコンURL
- `PUBLIC_INSTAGRAM_URL`: Instagramのリンク
- `PUBLIC_CONTACT_EMAIL`: 問い合わせ先メール

## 🏷️ Stripe 商品メタデータ
Stripeの商品編集画面 > メタデータで設定
- `creator`: 作家名