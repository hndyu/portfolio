---
title: "ポートフォリオサイト構築の技術選定"
description: "ポートフォリオサイトを公開するまでの技術選定プロセスを詳細に解説。エディタ、ホスティング、フレームワークの選定理由や、採用を見送った技術についても言及します。"
pubDate: "2025/4/23"
updatedDate: "2025/4/24"
heroImage: "/2025-4-23-site-publication-hero-image.avif"
---

## はじめに

ポートフォリオサイトを公開するにあたっての技術選定のプロセスを記載します。

## 目次

## 技術選定

### エディタ

**[Cursor](https://www.cursor.com/ja)を採用しました。** やはり大きなトレンドになっているものは触っておきたいというのが理由です。

まだ十分に使いこなせているとは言えませんが、ASK機能は便利だと感じます。簡単な内容であれば[Google AI StudioのAPIキー](https://aistudio.google.com/apikey)を使い、Gemini 2.0 Flashに質問すれば十分な回答が無料で得られます。

Cursor TabやAgent機能の無料プラン制限を使い切った場合は、以下の拡張機能も試してみたいと考えています。

- [Gemini Code Assist](https://marketplace.visualstudio.com/items?itemName=Google.geminicodeassist)
- [Roo Code](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)

### ホスティング

**[Cloudflare Pages](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)を採用しました。**[BandwidthがUnlimitedである](https://pages.cloudflare.com/#pricing)ことが主な理由です。将来ウェブアプリを作成する際にCloudflare D1を採用しやすそうであることもプラスに働きました。

[Vercel](https://vercel.com/)も検討しましたが、[Hobbyプランでは商用利用が不可](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)であるため今回は見送りました。すぐに収益化する予定はありませんが、制限がない方が安心です。

[Netlify](https://www.netlify.com/)は、Freeプランでは日本リージョンのCDNが利用できず、サイトの表示速度が遅くなるという情報があったため同じく見送りました。

### ランタイム

**[Node.js](https://nodejs.org/ja)を採用しました。** 競合も出てきてはいますが、安定性を重視して手堅い選択をしました。

### フレームワーク

**[Astro](https://astro.build/)を採用しました。**[State of JavaScriptでの評価が高く](https://2024.stateofjs.com/en-US/libraries/#tier_list)、以前から試してみたいと思っていたことが理由です。

Node.jsのバージョンが22.14.0だと`npm create`でtemplateが使用できない問題が発生しましたが、20.19.0に下げることで解決しました。

![npm warnが表示されているターミナルのスクリーンショット](/2025-4-23-site-publication-hero-image-スクリーンショット 2025-04-20 002102.avif)

[Hugo](https://gohugo.io/)などのSSG（Static Site Generator）も検討しましたが、Astroを使ってみたい気持ちが勝りました。

[Astroの公式チュートリアル](https://docs.astro.build/ja/tutorial/0-introduction/)を完了しています。途中で文字化けが発生する場面がありましたが、[英語版](https://docs.astro.build/en/tutorial/4-layouts/2/) を参照することで解決できました。

#### テーマ

[公式のブログテンプレート](https://github.com/withastro/astro/tree/main/examples/blog)を採用しました。

Github Star数を基準に[AstroWind](https://github.com/onwidget/astrowind)や[astro-paper](https://github.com/satnaing/astro-paper)も試しましたが、Github Actions周りのエラーが解決できず、これ以上時間をかける部分ではないと判断しました。

#### パッケージ

以下、導入した内容の抜粋です。

- [rehype-external-links](https://github.com/rehypejs/rehype-external-links)：外部リンクを`target="_blank"`かつ`rel="noopener noreferrer"`に変更。
- [remark-toc](https://github.com/remarkjs/remark-toc)：ブログ記事に目次を生成。
- [Astro | Breadcrumbs](https://github.com/felix-berlin/astro-breadcrumbs)：パンくずリストを生成。
- [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)：Prettierを導入。
- [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/)：ESLintを導入。
- [stylelint-config-html](https://github.com/ota-meshi/stylelint-config-html)：Stylelintを導入。
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss)：Tailwind.cssを導入。

#### フォーマッター

[Prettier](https://prettier.io/)を採用しました。

```js
// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
```

#### リンター

[ESLint](https://eslint.org/)と[Stylelint](https://stylelint.io/)を採用しました。

とりあえずパッケージの導入はしたもののReactは未使用なのでコメントアウトしています。

```js
// eslint.config.js

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
//import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  //pluginReact.configs.flat.recommended,
  ...eslintPluginAstro.configs.recommended,
]);
```

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-html"],
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["theme"]
      }
    ],
    "at-rule-no-deprecated": [
      true,
      {
        "ignoreAtRules": ["apply", "layer"]
      }
    ]
  }
}
```

#### CSSフレームワーク

[Tailwind.css](https://tailwindcss.com/) を導入しました。classでスタイルを定義するのは[Bootstrap](https://getbootstrap.jp/)に似ていると感じましたが、実際に使ってみてどう違うのか、なぜこんなに流行っているのかを知りたいと思います。

フォントはちょうどWindowsに標準搭載されたばかりのNotoを採用しました。

```css
/* global.css */

/* stylelint-disable-next-line import-notation */
@import "tailwindcss";

@theme {
  --font-sans:
    "Helvetica Neue", arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans",
    "Noto Sans JP", meiryo, sans-serif;
  --font-serif:
    "Times New Roman", "Hiragino Mincho ProN", "Noto Serif JP", serif;
  --font-mono: consolas, "Courier New", "BIZ UDGothic", monospace;
}

@layer base {
  html {
    @apply scroll-smooth;
  }

  main {
    @apply mx-auto max-w-full;

    width: calc(100% - 2em);
  }

  h1 {
    @apply text-2xl font-bold;
  }

  h2 {
    @apply mt-5 border-2 border-l-8 border-solid border-yellow-600 p-3 text-2xl font-bold;
  }

  /* ヘッダーのロゴ部分 */
  nav h2 {
    @apply border-none;
  }

  h3 {
    @apply mt-4 border-l-8 border-solid border-yellow-300 pl-3 text-2xl font-bold;
  }

  h4 {
    @apply mt-3 text-2xl font-bold;
  }

  h5 {
    @apply mt-2 text-xl font-bold;
  }

  h6 {
    @apply mt-1 text-lg font-bold;
  }

  p {
    @apply mt-1;
  }

  a {
    @apply text-blue-700;
  }

  /* ブログ一覧の記事タイトル */
  a:has(h4) {
    @apply text-inherit;
  }

  img {
    @apply mt-1;
  }

  ul {
    @apply mt-1 list-disc pl-5;
  }

  ol {
    @apply mt-1 list-decimal pl-5;
  }

  pre {
    @apply mt-1 p-3 font-mono;
  }

  code {
    @apply rounded bg-gray-200 px-1 font-mono;
  }

  pre code {
    all: unset;
  }
}

@layer components {
  astro-breadcrumbs {
    @apply mx-auto my-5 block;

    width: calc(100% - 2em);
  }
}

@layer utilities {
  .hero-image img {
    display: block;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: var(--box-shadow);
  }

  .prose {
    width: 720px;
    max-width: calc(100% - 2em);
    margin: auto;
    padding: 1em;
    color: rgb(var(--gray-dark));
  }

  .title {
    margin-bottom: 1em;
    padding: 1em 0;
    text-align: center;
    line-height: 1;
  }

  .title h1 {
    margin: 0 0 0.5em;
  }

  .date {
    margin-bottom: 0.5em;
    color: rgb(var(--gray));
  }

  .last-updated-on {
    font-style: italic;
  }

  /* スクリーンリーダー用のスタイル（テンプレート流用） */
  .sr-only {
    border: 0;
    padding: 0;
    margin: 0;
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;

    /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
    clip: rect(1px 1px 1px 1px);

    /* maybe deprecated but we need to support legacy browsers */
    clip: rect(1px, 1px, 1px, 1px);

    /* modern browsers, clip-path works inwards from each corner */
    clip-path: inset(50%);

    /* added line to stop words getting smushed together (as they go onto separate lines and some screen readers do not understand line feeds as a space */
    white-space: nowrap;
  }
}
```

### 分析ツール

[GA4](https://www.google.com/analytics/)と[Clarity](https://clarity.microsoft.com/lang/ja-jp)を採用しました。

タグ管理は[GTM](https://tagmanager.google.com/)で行っています。

## 採用を見送った技術

### Deno

以前[Slackワークフロー](https://docs.slack.dev/workflows/)のカスタムステップを開発する際に使ったことがありますが、標準ライブラリが開発中だった覚えがあり、まだ本格採用するには早いかもしれないという印象を受けていたので見送りました。

開発を始めてから気づきましたが、[2024年10月にDeno 2がリリースされ](https://deno.com/blog/v2.0)ておりAstroも公式にサポートされているようなので検討してもよかったかもしれません。

### Bun

Denoがnpm採用にかじを切ったのはBunの勢いが強いからだ、という意見を目にするくらいなので、存在感が強く気になってはいます。

とはいえやはり、まだ採用するには早すぎるかと判断しました。

### Biome

Astroがまだ[部分的にしかサポートしていない](https://biomejs.dev/internals/language-support/)ため、今回は見送りました。

### Markuplint

CLIでは動作したものの、@markuplint/astro-parserをinstallしてもdevDependenciesに入らず、随時Lintしてくれないのが不便だったため見送りました。

作者のかたが[Windows環境にあまり精通していない](https://github.com/markuplint/markuplint/issues/1806#issuecomment-2156634420)とのことなのでパスの問題かもしれません（だとするともう少しGoogleで情報が出てきていいように思いますが……）。vue-parserでも[同様の問題と思われるIssue](https://github.com/markuplint/markuplint/issues/2427)があります。

## 今後

- ページ数が増えてきたら[integrations](https://astro.build/integrations/)の[Astro Pagination](https://github.com/philnash/astro-components/tree/main/packages/astro-pagination)を検討します。
- ブログ一覧のCSSがほぼテンプレートそのままなので手を入れるかもしれません。
- テストを一切書いていないので、今後活用してみたいです。
