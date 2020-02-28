---
title: SlackApp快速開発 - Firestoreでデータ保持したり読み出したりする
tags:
  - 開発
  - Slack
  - Bolt
  - GoogleAppEngine
  - Firestore
date: 2019-11-02T08:15:53.289Z
image: /images/covers/2019-11-02-develop-slack-app-comfortably-fast-with-firestore.jpg
---
SlackAppを作っていて少々込みいったことやChatOps的なことをやりたくなってくると、DBのように保持しておく必要のあるデータを持ちたくなります。今回はデータ保持しておく際の保存先としてCloud Firestoreを使って組みこんでみます。

シリーズ：
+ [SlackApp快速開発 \- ローカル開発環境構築 \(with Bolt \+ TypeScript)](/develop-slack-app-comfortably-fast-with-bolt-and-typescript/)
+ [SlackApp快速開発 \- デプロイ\(GAE with CircleCI\)](/develop-slack-app-comfortably-fast-deploying-on-gae-with-ci/)
+ [SlackApp快速開発 \- BoltでHTTPリクエストを受け、Cronで定時実行](/develop-slack-app-comfortably-fast-receive-http-request-for-cron/)
+ [SlackApp快速開発 \- Firestoreでデータ保持したり読み出したりする](/develop-slack-app-comfortably-fast-with-firestore/)

## Firestore is何？
FirestoreはGoogleの提供するNoSQL系のデータストアです。データのリアルタイム性やクライアントサイドからでも操作可能なところが特徴です。またある程度のアクセスまで無料に使えて導入も比較的簡単なためお手軽NoSQLサーバーとして扱うことができます。

## Why Firestore
普通につかってもお手軽ですが、前々回にGAEにデプロイしたのでさらに管理は楽です。また、NoSQLのためスキーマレスでSlackApp程度の規模のものの場合、カッチリとスキーマを設定せずに柔軟に扱うほうが向いているケースも多いでしょう。

## Firestoreを使う
まずプロジェクトでFirestoreを有効にする必要があります。

<LinkCard url="https://firebase.google.com/docs/firestore/quickstart?hl=ja" site-name="Firebase" title="Cloud Firestore を使ってみる | Firebase" />

そして、プロジェクトに`firebase-admin`を追加します。
``` sh
$ npm install firebase-admin
```

### Firestore用のサービスキーを取得する
FirestoreをGCP系以外（ローカル含む）から使う場合には、以前デプロイの時にGAE用のサービスキーを取得したようにFirebase用をキーを取得します。

[サービス アカウント – IAM と管理 – Google Cloud Platform](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?hl=ja&supportedpurview=project)からプロジェクトを指定して、Firebase Admin SDKの「操作」から鍵を作成しダウンロードしておきます。

今回はそれを`serviceAccountKey.json`という名前でプロジェクトルートに置いておくことにしましょう。

### Firebaseのinitializerを作る
Boltの初期化と同じようにFirestoreの初期化用のファイルを`/src/initializers/firestore.ts`に作ります。

```ts
import * as admin from 'firebase-admin'

if (process.env.NODE_ENV === `production`) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
} else {
  const serviceAccount = require(`../../serviceAccountKey.json`)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}
export const firestore = admin.firestore()
```

このシリーズでは本番環境はGAEを使用するので本番と開発環境で初期化方法を分けています。

GAEの場合、同じプロジェクトにあるFirebaseには鍵を指定せずに使うことができます。開発環境では先ほどダウンロードしてきた鍵JSONを読み込む必要があります。

この鍵ファイルは秘匿情報なので、gitignoreとgcloudignoreに無視対象として追記するを忘れないようにご注意します。

## Firestoreのデータを使ってみる
実際にFirestoreに格納する、格納したデータを使う、実装をしてみます。サンプルのためシンプルに、`/set 文字列`で任意の文字列を記録し、`/get`で任意の文字列をメッセージとして返すようにしてみます。

### Firestoreにデータを格納する
では`/set`というスラッシュコマンドを作ってみます。

`/src/commands/set.ts`に以下のように書きます。
```ts
import { app } from '../initializers/bolt'
import { firestore } from '../initializers/firestore'

export default function() {
  app.command(`/set`, async ({ payload, ack, context }) => {
    ack()
    const usersRef = firestore.collection(`users`)
    const user: = {
      message: payload.text,
    }
    // firestoreにデータ登録
    await usersRef
      .doc(payload.user_id)
      .set(user)

    // 成功をSlack通知
    const msg: Message = {
      token: context.botToken,
      text: `メッセージを登録しました`,
      channel: payload.channel_id,
    }
    return app.client.chat.postMessage(msg).catch(err => {
      throw new Error(err)
    })
  })
}
```

ここではusersというコレクションの中に、idをSlackのIDにしたドキュメントを作り、messageというプロパティに指定した文字列を格納しています。

### Firestoreからデータを読み出して表示する
setとほぼ同じです。`/src/commands/get.ts`を作り、以下のように書きます。

```ts
import { app } from '../initializers/bolt'
import { firestore } from '../initializers/firestore'

export default function() {
  app.command(`/get`, async ({ payload, ack, context }) => {
    ack()

    // firestoreのデータを取得
    const usersRef = firestore.collection(`users`)
    const user = await challengersRef.doc(body.user_id).get()

    // Slack通知
    const msg: Message = {
      token: context.botToken,
      text: user.message,
      channel: payload.channel_id,
    }
    return app.client.chat.postMessage(msg).catch(err => {
      throw new Error(err)
    })
  })
}
```

詳しくはfirestoreの使い方になりますが、コレクションのリファレンスの中のSlackIDがidになってるデータをとってきて、メッセージにしています。

### Slashコマンドとして登録する
上記2つのファイルを作ってもindexに登録しないと使えませんので`/src/index.ts`を以下のようにします。
```ts
import { app } from './initializers/bolt'
import echo from './commands/echo'
import notify from './requests/notify'
import set from './commands/set'
import get from './commands/get'

;(async () => {
  // Start your app
  const server = await app.start(process.env.PORT || 3000)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

echo()
notify()
set()
get()
```

そしてSlackAppのWebの設定画面からset,getをSlashコマンドとして登録するのも忘れずに。

### 試す
以上まで行ったら実際にメッセージで`/set おためし`とコマンドを打ってみます。
Appからの発言で`メッセージを登録しました`と返答がきていて、firestoreのWebコンソールでみてみるとコレクションに`users`が追加されていて、その中にドキュメントとして1件登録されていればOKです。

また`/get`と打つと登録した文字列が返ってくればOKです。

## 感想
Firestoreの扱いさえ慣れればやることは簡単です。ですが、Firestoreは同期、非同期、クエリ、ドキュメント、リファレンスとの関係性の理解が必要なのでその部分で苦労するかもしれません。とはいえ、小さく使うなら無料で収まりますし、導入も手軽なので気軽に使えます。

また、GAEにデプロイしているなら1プロジェクト内で簡潔できることや、全てJS(TS)で書きききれるのも見逃がせません。小さいものを作るにはシンプルなほうが楽です。

サンプルコードはどれも簡素なものですが、複雑なことをやろうとしてもここからの応用ですでにいろいろなことができるはずです。あとはアイデア次第ですね！
