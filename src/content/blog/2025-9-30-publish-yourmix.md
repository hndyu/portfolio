---
title: "Next.jsで制作したレシピ生成・検索ウェブアプリ「YourMix」"
description: "趣味と学習を融合したポートフォリオ作品。カクテルレシピを検索できるWebアプリをNext.jsとCloudflare Workersで構築しました。未完成ながら公開し、今後も改善を重ねていきます。"
pubDate: "2025-09-30"
updatedDate: "2025-12-06"
heroImage: "../../images/publish-yourmix/hero-image.avif"
---

## 目次

## 概要

個人的にカクテルが好きなので、レシピを検索するウェブアプリを作成しました。ドッグフーディングできることは重要だと考えているので、自分の趣味を反映しました。

- [公開URL](https://yourmix.hndyu.workers.dev/)
- [リポジトリ](https://github.com/hndyu/yourmix)

他のレシピサイトとの差別化として、材料を指定するとAIがオリジナルのレシピを生成してくれる機能を中心にしています。一般的なレシピ検索機能も備えていますが、あくまでメインはAIが作成する、実質的に無限のレシピにあります。

作り始めた時期は2025年5月ですが、独学での制作に限界を感じたため、職業訓練の授業が十分進むまで保留していました。

納得いくまで作り込んでからリリースするつもりでいましたが、ポートフォリオが必要のため、未完成のまま一旦公開しています。今後は随時記事を更新/追加公開していこうかと考えています。

## アーキテクチャ

```mermaid
C4Context
  title YourMix アーキテクチャ図

  Person(user, "ユーザー", "ブラウザ経由でアクセス")

  System_Boundary(cloudflare, "Cloudflare") {
    Container(next_app, "Next.js Application", "Node.js, OpenNext", "UI提供、バックエンドAPI")
    ContainerDb(d1, "D1 Database", "SQL Database", "レシピ、材料データ等を保存")
  }

  System_Ext(google_ai, "Google AI", "Gemini API", "AIによるカクテルレシピ生成")

  Rel(user, next_app, "利用", "HTTPS")
  Rel_Back(user, next_app, "ウェブページ表示")

  Rel(next_app, d1, "読み書き", "Drizzle ORM")
  Rel(next_app, google_ai, "レシピ生成をリクエスト", "API")
```

## 技術選定

- エディタ：いくつか試しており、まだひとつに定めてはいません。現時点ではレート制限を考えてGemini CLIを使う機会が増えているため、どのエディタを選ぶかは重要ではなくなってきています。
  - VS Code
    - 一時期は盤石の地位が脅かされていると感じていましたが、AI関連のアップデートやオープンソース化により巻き返しが進んでいると思います。今でも大きいシェアを持っているでしょうし、結果として確実にMCP対応がされるなどの安心感から、手堅い選択肢だと考えるようになりました。
    - ただ、デフォルトで選択できるモデルがGPTに偏っているのは露骨なので苦笑しています。まあ他社も同様のことはするでしょうし、MicrosoftとOpenAIの関係を考えれば当然ではあるので責めるわけではないのですが。
  - Cursor
    - コミットメッセージの下書きをAIに作成してもらえるところは地味に便利です。とはいえいかにもAIくさく、冗長な文章になりがちなので手直しは必須です。この機能も含めてVS Codeが同質化を進めているので、今後が正念場だろうと思います。2.0の評価を見定めたいところです。
    - VS Codeからショートカットキーがいくつか変更されているので戸惑います。
  - Google Antigravity
    - Google謹製でありGemini 3の能力をフルに活かせるであろうという安心感もさることながら、比較的緩いレートで使用できるのが嬉しいポイントです。Gemini CLIからの移行も視野に入ります。
    - Gemini.mdで指定しても基本的に英語でTask・ToDo・Walkthroughを出力してくるので、AIとのコミュニケーションコストがかかりがちなのが難点です。
- ランタイム：Node.js
- ホスティング：Cloudflare Workers
  - 当初デプロイに失敗し続けていましたが、[公式ドキュメント](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)をきちんと読み直したところコマンドからの実行が正解でした。
  - [OpenNext](https://opennext.js.org/)を使ってNext.js製アプリをデプロイするのですが、互換性が完全ではないためなのかicon.tsxの配置時などエラーが起きることがあり、まだ安定性に欠ける印象です（OpenNextが原因かどうかの確信はありません）。
- データベース：Cloudflare D1
  - 一定の無料利用が可能であること、Workersとの連携を考えての採用です。
- ORM
  - Drizzleを採用しました。Prismaは職業訓練校で使用したので、せっかくなら別のものを使ってみようという考えです。選定の際には[Github Star History](https://www.star-history.com)を参考にすることがままありますが、今のところ両者の伸びは平行線のようです。健全な競争があるのはいいことですね。
- フレームワーク：Next.js
  - ウェブアプリ開発におけるデファクトスタンダードに近いかと考えているため、経験を積むためにも導入しました。機能をすべて使いこなせるとは思いませんが、できるだけ学んでいきたいと思います。
- リンター・フォーマッタ：Biome
  - 個別にESlintやPrettierを導入するより楽でした。configやプラグインの設定がほとんど不要というだけでも新規プロジェクトに採用したくなります。
- UIライブラリ：MUI
  - 以前から気になっていたので採用しました。そのままのデザインだとカクテルのサイトとしてはミスマッチになりそうだと考え、全体的に色彩を調整しています。
  - Gemini 2.5世代でも知識が古いようで、生成するコードがMUI v7の仕様に沿っていないという事態が頻発します。[公式ドキュメント](https://mui.com/material-ui/migration/upgrade-to-grid-v2/)に従えば解決しますが、モデル側のアップデートで解消することを期待しています。
- テスト：Playwright、Vitest
  - まだ不慣れなため、主にAIの書くテストに頼っています。Github ActionsでPlaywrightを実行するとエラーが頻発したので、やむなく手動での実行のみ行っています。

## 今後

技術的に難しいものもありますが、[仕様書](https://github.com/hndyu/yourmix/tree/master/docs)に記載がある内容は実装を進めていきたいと思います。
直近で対応したいもの・現在対応中のものはGithub Projectsで管理するようにしています。
