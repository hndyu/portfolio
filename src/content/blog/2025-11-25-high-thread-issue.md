---
title: "高スレッドCPU環境でVitestがEMFILEエラーになる原因と対処法"
description: "ハイスペックなPCでVitestを実行した際にのみテストが失敗する問題に遭遇しました。原因であるファイルディスクリプタ上限のエラーと、@mui/icons-materialの名前付きインポートを修正することによる解決策を解説します。"
pubDate: "2025/11/25"
# updatedDate: "2025/10/13"
heroImage: "../../images/high-thread-issue/hero-image.avif"
---

## 目次

## 3行まとめ
1. Vitestを使っていたらハイスペックなPCのときに顕在化しやすい問題（同じテストコードなのにFailする環境がある）に遭遇しました
2. 原因はどうやらOSのファイルディスクリプタ上限
3. 解決策の1つは名前付きインポートをデフォルトインポートに変更することでした

## 背景

職業訓練校内で実行した際はPassしたテストが、自宅のPCだとFailしました（[該当コミット](https://github.com/hndyu/yourmix/commit/93cf12a44432d81468383738b08217aa0551b91e)）。

![EMFILE: too many open files というエラーメッセージが表示されたコンソール画面](../../images/high-thread-issue/fail.avif)

## 原因
エラー内容はEMFILE: too many open files。初めて見るエラーだったのでとりあえず検索したところ、[Vitest公式リポジトリのIssue](https://github.com/vitest-dev/vitest/issues/3576)が最初に現れました。

Issueには高スレッド環境でのみ問題が起きるとあります。これは自宅でのみFailした理由の説明になりえます。以下の通り、PC環境に違いがあるからです。

- 職業訓練校のPC：i7-9700（8コア8スレッド）
- 自宅のPC：i7-13700（16コア24スレッド）

AIの力も借りつつ調べたところ、[Vitestは複数のプロセスでテストを実行する](https://vitest.dev/guide/features.html#threads)ため、PCのスレッド数やテストコードの内容によってはファイルディスクリプタの上限に到達してしまうようでした。特にlodash-esや@mui/icons-materialなど、モジュール数が多いライブラリを採用していると起こりやすいようです。これらを名前付きインポート(`import { SomeIcon } from "@mui/icons-material"`)で使用すると、Vitestはライブラリの全モジュールを読み込み対象としてしまい、結果としてファイルディスクリプタを大量に消費します。

つまり本質的にはVitestが原因ではなく、他のテストランナーでも同様の問題が発生する可能性があります。場合によっては低スレッド数のPCでも再現できるかもしれません。

## 対処
### 対処法その1（成功）

前述のIssueには以下のようなコメントがあります。

> [After going through the code base and converting every named import to a default import from the relevant file, the issue was resolved.](https://github.com/vitest-dev/vitest/issues/3576#issuecomment-2631819571)

実際に私も@mui/icons-materialの名前付きインポートを使用していたので、デフォルトのインポートで解決できるか試してみました。

```diff
// 修正前：名前付きインポート（多くのファイルを開く原因）
- import {
- 	HelpOutline,
- 	Liquor,
- 	LocalBar,
- 	LocalDrink,
- 	Restaurant,
- 	WineBar,
- } from "@mui/icons-material";
// 修正後：デフォルトのインポート（必要なファイルのみを開く）
+ import HelpOutline from "@mui/icons-material/HelpOutline";
+ import Liquor from "@mui/icons-material/Liquor";
+ import LocalBar from "@mui/icons-material/LocalBar";
+ import LocalDrink from "@mui/icons-material/LocalDrink";
+ import Restaurant from "@mui/icons-material/Restaurant";
+ import WineBar from "@mui/icons-material/WineBar";
```

結果、確かにテストにPassできました！（[該当コミット](https://github.com/hndyu/yourmix/commit/eb6fbef12b2a6c4fc30fceeae4b37c37b892137c)）

![全てのテストがPassしたことを示すVitestの実行結果画面](../../images/high-thread-issue/pass.avif)

### 対処法その2（失敗）

Vitestを[並列処理を行わない設定](https://vitest.dev/config/fileparallelism.html)で実行してみましたが、こちらはFailのままでした。

テスト実行時間は明確に伸びたので並列処理は行われていないように思えましたが、Passできなかった原因はわからずじまいです。その1の対処法でトラブルは解決していることもあり、あまり深追いもしませんでした。上記ページ内にあるようにVitest公式としても並列実行を推奨していますので、デフォルトのインポートで済むならそのほうが望ましいでしょう。

## Copilot（GPT-5）の見解（参考）
なぜ高スレッド環境で問題が起きるのかを質問した際の回答を記録として残しておきます。

### 🔍 背景
- Node.jsやOSには「同時に開けるファイル数（ファイルディスクリプタ）」の上限があります。
- Vitestはテストを並列実行するために**スレッドごとに大量のファイルを読み込む**（モジュールや依存関係を開く）。
- スレッド数が増えると、同時に開かれるファイル数も比例して増える。

### 🧩 なぜ高スレッド環境で問題になるのか
- **低スレッド環境**
  - 例えば4〜8スレッド程度なら、同時に開くファイル数は上限に届かない。
  - OSが許容する範囲で処理できるためエラーは出にくい。
- **高スレッド環境（例：32スレッド）**
  - 各スレッドが同時に数百〜数千ファイルを開こうとする。
  - 合計するとOSのファイルディスクリプタ上限を超えてしまう。
  - 結果としてEMFILE（Too many open files）が発生。

### 💡 例えで説明
- **低スレッド環境**は「小さな図書館で数人が本を借りる」イメージ。棚の本は十分あるので問題なし。
- **高スレッド環境**は「大人数が一斉に本を借りに来る」イメージ。貸し出しカウンター（ファイルディスクリプタ）が足りなくなり「もう貸せません」とエラーになる。

### ✅ まとめ
- 問題の本質は「**スレッド数が増えると同時に開くファイル数が爆発的に増える**」こと。
- OSのファイルディスクリプタ上限を超えるため、高スレッド環境でのみ顕著にエラーが出る。
- 回避策はスレッド数を制限するか、インポート方法を工夫して「同時に開くファイル数」を減らすこと。
