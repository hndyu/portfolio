---
title: "Gemini CLI v0.26.0の新機能hooksでWindows通知を送る方法"
description: "Gemini CLIに待望のhooks機能が追加。BurntToastと組み合わせて、AIエージェントの承認待ちや完了タイミングをデスクトップ通知する方法を解説します。"
pubDate: "2026-02-03"
# updatedDate: "2026-02-03"
heroImage: "../../images/gemini-cli-hooks-notification/hero-image.avif"
---

## 目次

## 3行まとめ
1. Gemini CLI単体では、処理完了などを通知する機能がありませんでした。
2. v0.26.0でhooksが追加され、特定のイベント時に任意のコマンドを実行可能になりました。
3. 非常に便利なのでWindows環境で通知を飛ばすための設定方法を共有します。

## 背景
AIエージェントが動作する際、ユーザーの確認が必要であったりエージェントの動作が完了したタイミングで通知が出ることが多いかと思います。しかしGemini CLIにはこの機能が存在しておらず、エージェントの行動が止まっているかどうか、完了したのかどうかを人間が逐一監視する必要がありました。

以前よりユーザーから機能要望は挙がっていましたが（[Issueの一例]((https://github.com/google-gemini/gemini-cli/issues/4310))）、なかなか実装されず待ち遠しい思いをしていました。同じGoogle製のAntigravityには当初からこの機能が搭載されていたのとは対照的です。

しかし、2026-01-27にリリースされたバージョン0.26.0で、ついにhooksが搭載され、これにより柔軟なコマンド実行が可能になり、ユーザーに通知を送ることも可能になりました。

## 導入
### 1. BurntToast導入
[BurntToast](https://github.com/Windos/BurntToast)はWindowsで簡単に通知を出すためのPowerShellモジュールです。

PowerShellを開き、以下の1行を実行するだけです。

```powershell
Install-Module -Name BurntToast
```

### 2. setting.jsonに追記
.gemini/setting.jsonにhooksを追記します。

以下の例では、Notification（システム通知が発生したとき）とAfterAgent（エージェントループが終了したとき）に通知を送ります。

```json
{
  "hooks": {
      "Notification": [
          {
              "matcher": "*",
              "hooks": [
                  {
                      "name": "windows-notifier",
                      "type": "command",
                      "command": "powershell -Command \"New-BurntToastNotification -Text 'Geminiが許可を求めています'\"",
                      "description": "ユーザー確認が必要な時に音と通知で知らせる"
                  }
              ]
          }
      ],
      "AfterAgent": [
          {
              "matcher": "*",
              "hooks": [
                  {
                      "name": "completion-notifier",
                      "type": "command",
                      "command": "powershell -Command \"New-BurntToastNotification -Text 'Geminiの処理が完了しました'\"",
                      "description": "返答が完了した時に通知"
                  }
              ]
          }
      ]
  }
}
```

これだけで完了です。

## 結果
通常通りにGemini CLIを使用すると、以下画像の通りに通知が送られてきます。

![Gemini CLIからの「Geminiの処理が完了しました」という内容のWindows通知](../../images/gemini-cli-hooks-notification/notification.avif)

これでエディタを離れ別の作業を進めやすくなり、開発体験が大きく向上しました。

### 注意点
モデルが混雑していたり、APIのレートリミットに到達した場合の確認時にはこれらのフックが発火しませんでした。過度に時間がかかっている場合はターミナルを確認しに行くのがよさそうです。

また、429（Too Many Requests）エラーにより通知が来なくなることがあります。長時間Gemini CLIを使用していると起きやすいと思いますが、時間経過で解決します。

## 余談：NotebookLMの活用
当初はChatGPTの力を借り、別途スクリプトファイルを用意してコマンドで実行する方法を取ろうとしていましたが、文字コードやパスに関する問題に悩まされました。そこで、NotebookLMに公式ドキュメントを読み込ませて実装の手助けをしてもらったところ、BurntToastを提案されあっさり解決しました。最新ドキュメントの理解と要約が必要な場面ではNotebookLMに軍配が上がるかもしれません。

## 参考
- [Gemini CLI hooks 公式ドキュメント](https://geminicli.com/docs/hooks/)
- [公式リリースブログ](https://developers.googleblog.com/tailor-gemini-cli-to-your-workflow-with-hooks/)