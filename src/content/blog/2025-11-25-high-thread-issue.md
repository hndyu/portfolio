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
2. 原因は@mui/icons-materialを名前付きインポートしており、大量にファイルを読み込むためでした
3. デフォルトのインポートに変更することで解決しました

## 背景

YourMixという個人的なプロジェクトではVitestを使ってテストを書いていますが、職業訓練校内で実行した際はPassしたテストが自宅のPCだとFailしました（[該当コミット](https://github.com/hndyu/yourmix/commit/93cf12a44432d81468383738b08217aa0551b91e)）。

![EMFILE: too many open files というエラーメッセージが表示されたコンソール画面](../../images/high-thread-issue/fail.avif)

## 原因
エラー内容はEMFILE: too many open files。初めて見るエラーだったのでとりあえず検索したところ、[Vitest公式リポジトリのIssue](https://github.com/vitest-dev/vitest/issues/3576)が最初に現れました。

Issueには高スレッド環境でのみ問題が起きるとあります。これは自宅でのみFailした理由の説明になりえます。以下の通り、PC環境に違いがあるからです。

- 職業訓練校のPC：i7-9700（8コア8スレッド）
- 自宅のPC：i7-13700（16コア24スレッド）

PCのスレッド数やテストコードの内容によっては大量のファイルを読み込むことになるのが原因のようでした。特にlodash-esや@mui/icons-materialなど、モジュール数が多いライブラリを採用していると起こりやすいようです。これらを名前付きインポート(`import { SomeIcon } from "@mui/icons-material"`)で使用すると、Vitestはライブラリの全モジュールを読み込み対象としてしまい、結果としてエラーにつながります。

つまり本質的にはVitestが原因ではなく、他のテストランナーでも同様の問題が発生する可能性がありそうです。場合によっては低スレッド数のPCでも再現できるかもしれません。

## 対処
### 対処法その1：デフォルトのインポート（成功）

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

### 対処法その2：並列処理を行わない（失敗）
Vitestを[並列処理を行わない設定](https://vitest.dev/config/fileparallelism.html)で実行してみましたが、こちらはFailのままでした。

テスト実行時間は明確に伸びたので並列処理は行われていないように思えましたが、Passできなかった原因はわからずじまいです。
時間が経ってから再度該当コミットをチェックアウトし、改めてテストしたところ問題が再現せず、追加の検証が難しくなってしまっています。
とはいえ、上記ページ内にあるようにVitest公式としても並列実行を推奨していますので、デフォルトのインポートだけで済むならそのほうが望ましいでしょう。

### 対処法その3：スレッドの最大数を制限（未実施）
issueでも言及されている通り[最大スレッド数を指定するコンフィグ](https://v2.vitest.dev/config/#pooloptions-threads-maxthreads)があるので、適切に小さい値を設定すればPassできたかもしれません。

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    poolOptions: {
      threads: {
        maxThreads: 8
      }
    }
  }
})
```

しかし上記の通り問題が再現しなくなってしまっているので確かめようがなく、残念ながら効果を確かめられません。
