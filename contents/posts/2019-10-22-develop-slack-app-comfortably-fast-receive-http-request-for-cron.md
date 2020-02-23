---
title: SlackApp快速開発 - BoltでHTTPリクエストを受け、Cronで定時実行
slug: develop-slack-app-comfortably-fast-receive-http-request-for-cron
tags:
  - 開発
  - Slack
  - Bolt
  - GoogleAppEngine
  - Cron
date: 2019-10-22T04:30:24.710Z
cover: >-
  posts/2019-10-22-develop-slack-app-comfortably-fast-receive-http-request-for-cron/cover.jpg
---
## 概要
前々回、BoltベースのSlackAppを開発しはじめました。BoltはSlackAppに特化したサーバーフレームワークで、スラッシュコマンドやSlackイベントをトリガーに動作するアクションが非常に書き易いのが特徴です。今回は公式ドキュメントにはないHTTPリクエストを受ける方法を実装して、HTTPリクエスト経由のCronによる定時実行を実現します。

Slackに備わるリマインダや定時実行に比べてサーバー上で処理できるため、例えばDBからデータを取得して対象のメンバーにだけお知らせする、など用途はかなり広がります。前回、前々回を踏襲した内容なので合わせてご参照ください。

シリーズ：
+ [SlackApp快速開発 \- ローカル開発環境構築 \(with Bolt \+ TypeScript)](/develop-slack-app-comfortably-fast-with-bolt-and-typescript/)
+ [SlackApp快速開発 \- デプロイ\(GAE with CircleCI\)](/develop-slack-app-comfortably-fast-deploying-on-gae-with-ci/)
+ [SlackApp快速開発 \- BoltでHTTPリクエストを受け、Cronで定時実行](/develop-slack-app-comfortably-fast-receive-http-request-for-cron/)
+ [SlackApp快速開発 \- Firestoreでデータ保持したり読み出したりする](/develop-slack-app-comfortably-fast-with-firestore/)

## なぜHTTPリクエストを実装するか
前回GAEにデプロイしましたが、GAEでは`cron.yaml`で定時実行を設定できます。これはコマンド経由ではなくHTTPリクエスト経由なのでエンドポイントが必要です。また、例えばGAE以外にデプロイした場合でも[Gogle Cloud Scheduler](https://cloud.google.com/scheduler/?hl=ja)をはじめ、[cron\-job\.org](https://cron-job.org/en/)や[EasyCron\.com](https://www.easycron.com/)などを手軽にサードパーティサービスで実現できます。

Cronを使わない場合でも、HTTPリクエストを受けれるようにすると応用の範囲が広がります。
例えばデプロイ時にCIからリクエストをすることで特定の設定でデプロイ状況についてSlackにメッセージを飛ばしたりできます。もちろんSlack側のIncomming Webhookでも設定できますが、SlackApp内の処理でより複雑なことができますし、SlackApp側の設定をいちいちWebから変更する必要もありません。

さらにはBoltの内部的なサーバー部分はExpressです。Expressと同様にテンプレートをレンダリングすることも可能ですが今回はふれません。

## BoltでHTTPリクエストを受ける
### BoltでExpressReciverを設定する
前々回でやったように環境変数にそれぞれ`SLACK_BOT_TOKEN`と`SLACK_SIGNING_SECRET`を設定してある前提で進めます。

Bolt内部のExpressを設定するには、Boltの初期化時に明示的に`ExpressReciver`の設定をします。それを`new`するときに指定することで`receiver`をExpressとして扱うことができます。

具体的は前々回でBoltの初期化をしていた`/src/initializers/bolt.ts`を以下のように変更します。

```ts
const { App, ExpressReceiver } = require(`@slack/bolt`)

// Initialize your own ExpressReceiver
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: `/slack/events`,
})

// Initializes your app with your bot token and signing secret
const config = {
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver,
}

export const app = new App(config)
```

こうすることによってSlackイベントだけでなくHTTPリクエストを受けとる準備ができました。

### HTTPリクエストを受けとる
例えば`/slack/notify`に`GET`リクエストをしたときに、特定のチャンネルに`@channel お知らせです`とメッセージを送る実装をしてみます。

ファイルの置き場所は`/src/requests/notify.ts`とします。

```ts
import { app } from '../initializers/bolt'

export default function() {
  app.receiver.app.get(`/slack/notify`, (req, res) => {
    res.sendStatus(200)

    const msg = {
      token: process.env.SLACK_BOT_TOKEN,
      text: `<!channel>\nお知らせです`,
      channel: `CXXXXXXXX`, // 表示するチャンネルのID
    }
    return app.client.chat.postMessage(msg)
  })
}
```

まず先程receiverを設定したboltを読み込むと`app.receiver`でExpressReciverを使えます。`app.receiver.app.get()`と書けば、Expressのルーティングを使うことができます。
第一引数にはエンドポイントのパスを指定します。

リクエストを受けたらまずレスポンスを返してしまいます。これはBoltで最初に`ack()`と返すのと同じですよね。

その後でメッセージを送信するJSONを作ります。
Boltで受けたときの`context`が使えないので、tokenはそのまま環境変数からもってきてしまいましょう。
textは特筆すべきことはないですが、`<!channel>`と書くとメンション扱いの`@channel`になります（単純に`@channel`と書く通知にならずただの文字列として処理されてしまいます）。
channelはメッセージを表示する先のChannelIDを入れます。これはWebからSlackを表示してURLから調べるのが簡単かもしれません。

最後にメッセージを飛ばすところです。BoltにはSlackのWeb APIを扱うために`app.client`が実装されているので、メッセージを表示するには`app.client.chat.postMessage()`を使うといいでしょう。この引数に先程作ったJSONを乗せます。

### 有効化
前々回作ったものは`index.ts`に全て集約していたので、最終的にこちらにも変更が必要です。

```ts
import { app } from './initializers/bolt'
import echo from './commands/echo'
import notify from './requests/notify'

;(async () => {
  // Start your app
  const server = await app.start(process.env.PORT || 3000)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

echo()
notify()
```

やり方は以前作った`echo`と同様に今回作った`nofify`を追加するだけです。

### 動作確認
ここまでできたらいったん動作確認します。メッセージを飛ばす先のチャンネルは開発用のSlackワークスペースのものを指定するように注意してください。

`npm run dev`か`yarn dev`で開発環境を起動したら、`https://slack-app-example.serveo.net/slack/notify`にブラウザやCurlでGETリクエストを送ってみます（`slack-app-example`は前々回にServeoに指定したサブドメインですので変更している可能性があります）

どうでしょう？　期待通り、指定したチャンネルにメッセージが表示されたでしょうか？

## Cronで定時実行する
さてこれまででHTTPリクエストを受けて動作する実装ができました。例えばこの`notify`を毎月1日に定期的に実行したいような場合はCronで実行します。GAEのCronの説明になりますが、他のHTTPリクエストによるCronを使う場合も考え方は同じです。

### Cron.yamlを書く
GAEでCronを使うには`cron.yaml`を作って配備するだけです。書き方はこちら

<LinkCard url="https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml?hl=ja" site-name="Google Cloud" title="cron.yaml を使用したジョブのスケジューリング | Node.js ドキュメントに対応した App Engine フレキシブル環境 | Google Cloud" />

例えば今回実装した`notify`を実行するのであれば

```yaml
cron:
  - description: send notification
    url: /slack/notify
    schedule: 1 of month 10:00
    timezone: Asia/Tokyo
```

のように書きます。Cronのタイミング設定は`0 10 1 * *`みたいな書き方ではなく自然言語に近い書き方をします。このあたりはドキュメントを参照してみてください。

### Cronを有効化する
こうしてできた`cron.yaml`ですがただルートディレクトリに置いただけでは有効化されません。デプロイ時に明示的に`cron.yaml`を指定する必要があります。

前回、CircleCIでデプロイできるようにしましたが、デプロイコマンドを以下のように修正します。

```yml
gcloud app --quiet deploy app.yaml cron.yaml
```

これでデプロイしなおせばCronが有効化されます。GAEのコンソールにCronの項目があるので確認すると指定したCronの情報が記載されているはずです。

### 実行する
前回、PRをマージするだけでデプロイできるようにしています。あとはこの変更を追加したプルリクエストを作ってマージするだけでデプロイされるはずです。

余談ですが、僕は定期実行以外にも定型文を指定のチャンネルに飛ばすエンドポイントを作っていて、デプロイ開始時とデプロイ完了時にCicleCIからCurlで叩いています。GAEはデプロイするときもサービスは停止せずインスタンスを切り替えるのがシームレスなので問題なく動作します。


## 感想
このReceiverを使う方法は今のところ公式で明確に案内されていません。しかし、Expressを別途立てるのも無駄ですし、Boltリポジトリ内のIssueで同じ方法をみたのでニーズはあるはずです。今回はSlackAppに絞っているので言及しませんでしたが、SlackAppとExpressによる動的なWebサイトをBoltだけで運用することも可能でしょう。

また定時実行ジョブはなにもSlackに通知するだけでなく、内部的な処理だけを行うこともあるでしょう。応用範囲はかなり広いと思います。ここまで来るともうBotの枠を出てAppらしくなってきますね。
