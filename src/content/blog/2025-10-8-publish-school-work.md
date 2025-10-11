---
title: "公共職業訓練校での制作実績まとめ"
description: "ReactやPHP、HTML/CSSなど、職業訓練校で学習・制作したWebアプリやデモページをまとめています。各作品の公開URLとGitHubリポジトリも掲載しています。"
pubDate: "2025/10/8"
# updatedDate: "2025/9/30"
heroImage: "/2025-10-8-publish-school-work-hero-image.avif"
---

## 目次

## 概要
公共職業訓練校で制作したページを記載していきます。

都度公開していればよかったのですが、ずっと溜め込んでいたままだったため一気に対応することになりました。

今後、制作した作品は当ページに追記していきます。

## React

### LINEクローンアプリ
![LINEクローンアプリのスクリーンショット](/2025-10-8-publish-school-work-school-line_clone.avif)

- [公開URL](https://lineclone-a156c.web.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-line_clone)

Firebaseを採用し、Googleアカウントでのログイン機能やFirestore Databaseへの読み書きを実装した、LINE風の双方向メッセージアプリです。デプロイ先もFirebase Hostingにしています。

Firestore Databaseのルールをひとまず2025/11/30までのテストモードに設定しているため、期日をすぎると当アプリは動作しなくなります。

### ECサイトデモ
![ECサイトデモのスクリーンショット](/2025-10-8-publish-school-work-school-ec-shop.avif)

- [公開URL](https://school-ec-shop.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-ec-shop)

ECサイトのデモページです。決済機能はないため、[Stripe](https://stripe.com/jp)で実装できるか試してみる予定です。

### メモアプリ1
![メモアプリのスクリーンショット](/2025-10-8-publish-school-work-school-basic-memo-app.avif)

- [公開URL](https://basic-memo-app-mocha.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-basic-memo-app)

Reactの基礎やuseStateを学ぶための簡単なメモアプリです。なお、DB等は使用していないので内容は保存されません。

### Redux ショッピングカートアプリ
![Redux ショッピングカートアプリのスクリーンショット](/2025-10-8-publish-school-work-school-redux-basic-app.avif)

- [公開URL](https://school-redux-basic-app.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-redux-basic-app)

Reduxを用いてECサイトのショッピングカート部分を制作しました。

学習曲線としてはやや急に感じましたが、状態管理ライブラリとしての知名度・人気を考えると、乗り越える壁のように思います。

### お天気アプリ
![お天気アプリのスクリーンショット](/2025-10-8-publish-school-work-school-weather-app.avif)

- [動画(Youtube)](https://youtu.be/0IQv1-uapCY)
- [Githubリポジトリ](https://github.com/hndyu/school-weather-app)

都市名や国名で検索すると[Axios](https://github.com/axios/axios)で[OpenWeatherMap](https://openweathermap.org/)のAPIを叩き、現地の天気を表示してくれるアプリです。

フロントエンドの実装しかないため、API KEYが見られないようアプリは公開していません。

### TypeScript ToDoアプリ
![TypeScript ToDoアプリのスクリーンショット](/2025-10-8-publish-school-work-school-todo-typescript.avif)

- [公開URL](https://school-todo-typescript.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-todo-typescript)

TypeScriptの練習のために制作したシンプルなToDoアプリです。

### クイズアプリ
![クイズアプリのスクリーンショット](/2025-10-8-publish-school-work-school-quiz-app-six.avif)

- [公開URL](https://school-quiz-app-six.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-quiz-app)

useStateとuseEffectの勉強のために作ったクイズアプリです。

### ToDoアプリ
![TypeScript ToDoアプリのスクリーンショット](/2025-10-8-publish-school-work-school-react-todo.avif)

- [公開URL](https://school-react-todo.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-react-todo)

[uuid](https://www.npmjs.com/package/uuid)を用いてIDを管理するToDoアプリです。

### useContextデモ
![useContextデモのスクリーンショット](/2025-10-8-publish-school-work-school-my-app.avif)

- [公開URL](https://school-my-app.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-my-app)

職業訓練校で採用されている教本のひとつ、[『モダンJavaScriptの基本から始めるReact実践の教科書』](https://www.sbcr.jp/product/4815610722/)の内容に基づいたデモになります。

グローバルなstate管理のためのuseContextを理解・実践するための、簡単な状態変更が行えるページを制作しました。

### メモアプリ2
![useContextデモのスクリーンショット](/2025-10-8-publish-school-work-school-text-todo.avif)

- [公開URL](https://school-text-todo.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-text-todo)

こちらも『モダンJavaScriptの基本から始めるReact実践の教科書』に基づいています。

### API利用デモ
![API利用デモのスクリーンショット](/2025-10-8-publish-school-work-school-my-app-ts.avif)

- [公開URL](https://school-my-app-ts.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-my-app-ts)

こちらも『モダンJavaScriptの基本から始めるReact実践の教科書』に基づいています。

Express.jsを用いてJSONを返すだけのAPIをバックエンドに作成、フロントエンドでは受け取った内容を表示するシンプルな実装となりました。

その後、[JSON Placeholder](https://jsonplaceholder.typicode.com/)で代用する内容に変更しリリースしました。

### Tailwind.css デモ
![Tailwind.css デモのスクリーンショット](/2025-10-8-publish-school-work-school-tailwindcss-portfolio.avif)

- [公開URL](https://school-portfolio-gamma.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-tailwindcss-portfolio)

Tailwind.cssを用いてポートフォリオ風のページを制作しました。内容はほぼすべて仮のものです。

Tailwindは慣れてくるとスピーディーに開発を進められるのがメリットだと感じましたが、レスポンシブ対応を進めていくうちにclassの値がどんどん肥大化していくのが気になりました。可読性や保守性が悪化しそうなので、このあたりの管理をうまくやる必要があるのかな、と思います。

### useContext練習
![useContext練習のスクリーンショット](/2025-10-8-publish-school-work-school-context-rensyu.avif)

- [公開URL](https://school-context-rensyu.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-context-rensyu)

useContextを理解するためのシンプルなページです。

### useState + TypeScript練習
![useState + TypeScript練習のスクリーンショット](/2025-10-8-publish-school-work-school-ts-tutorial.avif)

- [公開URL](https://school-ts-tutorial.vercel.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-ts-tutorial)

ログイン・ログアウトを切り替えるシンプルな実装でuseStateによる状態管理を学びました。

## PHP + SQL
訓練校の方針によりXAMPPで動作させています。今ですとDockerのほうが採用されやすいかと思いますが(実際、以前在籍していた会社では使用していました)、未経験者には少々とっつきにくいところがありますので、そういった事情によるものかもしれません。

今のところローカルでしか動作しないためデプロイはしていません。各ページの挙動に関しては動画でご確認いただけます。

### 家計簿アプリ
- [動画(Youtube)](https://youtu.be/2NLGcb00MiY)
- [Githubリポジトリ](https://github.com/hndyu/school-phpKakeibo)

CRUD実践のための簡単な家計簿アプリです。収支の登録・編集・削除が行えます。デザインはBootstrapに任せています。

### フォームデモ
- [動画(Youtube)](https://youtu.be/uEsTv0OLlYU)
- [Githubリポジトリ](https://github.com/hndyu/school-PHP_form)

シンプルなフォーム送信のデモです。SMTPの設定まではしていないので送信完了ページでWarningが出ます。

### 2ch風BBS
- [動画(Youtube)](https://youtu.be/_4wJR86ZJPA)
- [Githubリポジトリ](https://github.com/hndyu/school-PHP_BBS)

書き込みが行える2ちゃんねる風のBBSです。

## HTML + CSS
Githubへのアップロード、およびNetlify Dropを使ったデプロイは、コマンドやGithub Desktopではなくドラッグ&ドロップで行いました。今後更新する予定のない静的サイトであればこれで十分だと感じました。

Netlify Dropは便利ですが、今でも日本にサーバーがないようなので、ページの読み込みには少し時間がかかる場合があります。

### 背景動画
![背景動画のスクリーンショット](/2025-10-8-publish-school-work-school-videowebsite.avif)

- [公開URL](https://school-videowebsite.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-videoWebsite)

動画を背景でループ再生するページですが、ファイル自体がかなり重く(20MB)、再生までに時間がかかることがあります。もう少し圧縮しておくべきだったかもしれません。

### 3Dスクロール(CSS)
![3Dスクロール(CSS)のスクリーンショット](/2025-10-8-publish-school-work-school-three-d-scroll-site.avif)

- [公開URL](https://school-three-d-scroll-site.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-three-d-scroll-site)

CSSで3D風に表示することもできることを学ぶためのページです。

### ECサイト
![ECサイトのスクリーンショット](/2025-10-8-publish-school-work-school-shoes-ecommerce.avif)

- [公開URL](https://school-shoes-ecommerce.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-shoes_ecommerce)

### 音楽再生
![音楽再生のスクリーンショット](/2025-10-8-publish-school-work-school-musicwebsite.avif)

- [公開URL](https://school-musicwebsite.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-musicWebsite)

### レスポンシブデザイン1
![レスポンシブデザイン + JSのスクリーンショット](/2025-10-8-publish-school-work-school-fashion.avif)

- [公開URL](https://school-fashion.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-Fashion)

訓練校で採用している教本[『1冊ですべて身につくJavaScript入門講座』](https://www.sbcr.jp/product/4815615758/)に基づいたページです。

### レスポンシブデザイン2
![レスポンシブデザイン1のスクリーンショット](/2025-10-8-publish-school-work-school-wcbcafe.avif)

- [公開URL](https://school-wcbcafe.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-WCBCafe)

訓練校で採用している教本[1冊ですべて身につくHTML & CSSとWebデザイン入門講座［第2版］](https://www.sbcr.jp/product/4815618469/)に基づいたページです。

### レスポンシブデザイン3
![レスポンシブデザイン2のスクリーンショット](/2025-10-8-publish-school-work-school-lprwd.avif)

- [公開URL](https://school-lprwd.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-LPRWD)

### PC向けLP
![PC向けLPのスクリーンショット](/2025-10-8-publish-school-work-school-playstationlp.avif)

- [公開URL](https://school-playstationlp.netlify.app/)
- [Githubリポジトリ](https://github.com/hndyu/school-playstationLP)
