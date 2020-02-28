---
title: SlackApp快速開発 - ローカル開発環境構築(with Bolt + TypeScript)
tags:
  - 開発
  - Slack
  - Bolt
  - TypeScript
date: 2019-10-12T14:16:33.891Z
image: /images/covers/2019-10-12-develop-slack-app-comfortably-fast-with-bolt-and-typescript.jpg
---

## 概要
SlackAppを快適にしかも（比較的）高速につくる知見がついてきたのでいったんまとめてみます。BoltというSlack公式のフレームワークをTypeScriptを使って書きます。SlackApp、Bolt、TypeScriptの詳細については各ドキュメントを参照してください。

今回は一歩づつ分けてどのように構築していくかを書いてみます。必須ではないですが、SlackAppで扱うリクエストとレスポンスの知見があるとスムーズです。

シリーズ：
+ [SlackApp快速開発 \- ローカル開発環境構築 \(with Bolt \+ TypeScript)](/develop-slack-app-comfortably-fast-with-bolt-and-typescript/)
+ [SlackApp快速開発 \- デプロイ\(GAE with CircleCI\)](/develop-slack-app-comfortably-fast-deploying-on-gae-with-ci/)
+ [SlackApp快速開発 \- BoltでHTTPリクエストを受け、Cronで定時実行](/develop-slack-app-comfortably-fast-receive-http-request-for-cron/)
+ [SlackApp快速開発 \- Firestoreでデータ保持したり読み出したりする](/develop-slack-app-comfortably-fast-with-firestore/)

## Bolt is何？
BoltはSlackが公式で開発しているNode.js用SlackApp用のフレームワークです。内部的にはExpressが使われているようで、同様に薄くて軽量かつSlackからのリクエストに対応しやすいように作られています。特にinteractive componentsやmodalに関しての書きわけがしやすい印象です。

<LinkCard url="https://slack.dev/bolt/ja-jp/tutorial/getting-started" title="Slack | Bolt" description="A framework that makes Slack app development fast and straight-forward. With a single interface for Slack’s Web API, Events API, and interactive features, Bolt gives you the full power of the Slack platform out of the box." />

## なぜBoltとTypeScript?
単純で簡素なものはサーバーレス構成で作って、CloudFunctionやLambdaなどのFaaSで動かすほうが楽で早いと思います。それでもあえてBoltを選択したのは
+ Slackの一部の機能には3秒レスポンスの壁があるので、FaaSのコールドスタートがキツかった
+ イベントリスニングに対しての書きわけがしやすい => モジュールによる分割がしやすい
+ エンドポイントは1つでまとまる => Slack側で変更が必要ない
+ 別途nodemonなどを使って開発時の変更適用が快適

という理由ですね。
さらにTypeScriptを使う理由は
+ ES6以降の書き方が簡単に導入できる
+ 長大で複雑になりやすいSlackへのリクエストが型を使うと書きやすくなる

という理由が大きいです。Webpackなどのビルドツールは使わず、TypeScriptの`tsc`でコンパイルします。

ちなみにFasSでもBoltは使えますが、Function起動ごとにサーバーも起動させるので無駄が多く、当然反応遅くなります。書き方はシンプルでもやることが冗長になってしまいます。


## 構成と戦略の概要
今いちど構成をおさらいすると

+ サーバーはBolt(厳密に言えば含まれているExpress)
+ TypeScriptで書く
+ 開発環境ははtsnodeでTypeScriptを直で動かす
+ 開発中はnodemonで変更をwatchしてすぐにサーバーに反映
+ 動作確認もすぐできるようにserveoを使ってトンネリング
+ デプロイ時はtscのみ（の非Webpack）でJSにトランスパイル


## ディレクトリ構成
基本のディレクトリ構造はこんな感じ
```sh
.
├── .env # 環境変数格納ファイル
├── package.json # プロジェクトやライブラリの設定
├── Procfile # 開発環境起動設定ファイル
├── nodemon.json # nodemon用設定ファイル
├── dist # buildされたコードの格納先
└── src
    ├── commands # スラッシュコマンド用コード ディレクトリ
    ├── index.ts # サーバー起動コード
    ├── initializers # Boltなどの初期化コードディレクトリ
    ├── listeners # ModalやAction,イベントのリスニング用コード ディレクトリ
    └── types # 型定義ディレクトリ
```

Gitまわりのファイル、ESLintやテストに関する設定は省略しています。

簡単に言えば、開発用のコードは`/src`配下に書いていき、`tsc`コマンドでコンパイルしたものが`/dist`に出力される流れになります。

## TypeScript環境を構築する
まず
```sh
npm install typescript # or yarn add typescript
```

でTypeScriptを入れます。これによって`.ts`ファイルを`tsc`コマンドで`.js`に変換できます。TypeScript自体でES6以上の書き方ができるので、型ガチガチに書かかずとも簡易Babel的に使うこともできます。

そのコンパイルには`tsconfig`という設定ファイルが必要なので

```sh
npx tsc init
```
で`tsconfig`ファイルが設定できます。

1つの例として僕のconfigを紹介します

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    "moduleResolution": "node",
    "removeComments": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "sourceMap": true,
    "strict": true,
    "target": "es2017",
    "noImplicitAny": false
  },
  "compileOnSave": true,
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

書き方に関する部分は公式ドキュメントなどを参照してください。
ここでのポイントは

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

です。`.ts`を`.js`に変換したものを`/dist`ディレクトリに出力します。

もうひとつ注意点としては、モジュールのパス解決をしやすいように下記のようにと`baseUrl`や`paths`の設定をしたくなるところですが、あえてやりません

```json
// やらない例
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": "src/*",
    }
  }
}
```

これはエディタやTSでは問題なく解釈されるものの、コンパイル時に適切に変換されるわけではないのでJSにしたときに動作しません。
別のライブラリを使えば正しく扱えますが、今回はそこまで深くディレクトリを作っていく想定ではないので相対パスだけでなんとかしていきます。

## SlackとBoltのセットアップ
まずSlackApp自体のセットアップに関しては

<LinkCard url="https://api.slack.com/apps" title="Slack API: Applications | Slack" />

からCreateNewAppします。もちろんそれ以前に開発に使うSlackワークスペースがあることが前提です。
AppをSlackにインストールしたら、`Sigining Secret`と`Bot Token`のキーをそれぞれ発行してコピーしておきます。

次にBoltをイントールします

```
npm install @slack/bolt
```

そうしたら、まずBolt起動用のファイル`src/index.ts`に作ります。

```ts
const { App } = require(`@slack/bolt`)

// Initializes your app with your bot token and signing secret
const config = {
  token: "xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx",
  signingSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}

const app = new App(config)

// Start your app
;(async () => {
  const server = await app.start(process.env.PORT || 3000)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()
```

`token`と`signingSecret`にはそれぞれSlackの設定で表示されたものを入力します。

そして起動用のコマンドを`pakcage.json`の`script`に設定します

```json
{
  "scripts": {
    "prestart": "tsc -p .",
    "start": "node ./dist/index.js",
  },
}
```

設定後、CLI上で

```sh
npm run start # or yarn start
```

を入力します。
`prestart`は`start`時に自動で実行されます。これによってTSファイルがJSに変換されて、`start`コマンドで変換されたものが実行されます。

## 開発環境をTypeScriptそのままで動かす
開発中に変更の度にコンパイルしなおすのは手間なので、TypeScriptそのままで動かします。そのために`tsnode`というライブラリを使います。

```sh
npm install --save-dev tsnode
```

そうしたら、開発用のサーバー起動コマンドとして`package.json`の`script`に追記します。

```json
{
  "scripts": {
    "prestart": "tsc -p .",
    "start": "node ./dist/index.js",
    "dev": "node --inspect -r ts-node/register ./src/index.ts"
  },
}
```

これで、

```sh
npm run dev # or yarn dev
```

とコマンドを叩けば先ほどと同じように、でもTypeScriptを直接実行する形でサーバーが動きます。

## Serveo経由でSlackとつなぐ
`/echo '文字列'`とスラッシュコマンドで発言したら、入力した文字列を返すだけの簡単コマンドを設定して動作確認までやってみましょう。

まず、先程のindexの初期化部分を分離しちゃいます。
`initializers/bolt.ts`を作成して、

```ts
const { App } = require(`@slack/bolt`)

// Initializes your app with your bot token and signing secret
const config = {
  token: "xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx",
  signingSecret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
}

export const app = new App(config)
```

と書きます。モジュールとしてexportするようにしました。

つぎに、`commands/hello.ts`を作り、

```ts
import { app } from '../initializers/bolt'
export default function() {
  app.command(`/echo`, async ({ command, ack, say }) => {
    ack()

    say(`${command.text}`)
  })
}
```

と書きます。先程のBolt初期化を使いまわし、Boltの文法で`/echo`に対する処理を書いています。

そして、`index.ts`を編集します。

```ts
import { app } from './initializers/bolt'
import echo from './commands/echo'

;(async () => {
  // Start your app
  const server = await app.start(process.env.PORT || 3000)

  console.log(`⚡️ Bolt app is running! PORT: ${server.address().port}`)
})()

echo()
```

同じく初期化を使いまわしつつ、`echo`コマンドを使えるようにします。

そしたらこれをServeoというlocalhostとトンネリングする仕組みで公開します。
Bolt起動中とは別のCLIを開いて

```sh
ssh -R 80:localhost:3000 serveo.net
```

を叩きます。その後に表示される`serveo.net`のURLが公開されているURLです。Boltではデフォルトで`/slack/events`というエンドポイントが使われます。例えばServeoのURLが`https://utilis.serveo.net`ならSlackAppの設定のSlashCommandsに登録するURLは`https://utilis.serveo.net/slack/events`になります。登録したら忘れずにreinstallしましょう。

これでインストールされたSlackワークスペースで`/echo テスト`と入力すればAppから`テスト`とメッセージが送信されるはずです。

### autosshでつなぐ
serveoとのsshは切れたりするので、autossh経由でつないできれたら自動で再接続するようにします。
macOSなら

```sh
brew install autossh
```

でインストールできるはずです。serveoにautossh経由でつなぐなら

```sh
autossh -M -0 -R 80:localhost:3000 serveo.net
```

とします。

## nodemonで開発中のコードをすぐにサーバーに反映する
さきほど、tsnodeでTypeScriptを直で読ませるようにしましたが、これでもコードを更新したらサーバーも立ち上げなおさないと反映されません。この手間を省くためにnodemonを使って、保存と同時に反映するようにします。

<LinkCard url="https://github.com/remy/nodemon" site-name="GitHub" title="remy/nodemon" description="Monitor for any changes in your node.js application and automatically restart the server - perfect for development - remy/nodemon" image-url="https://repository-images.githubusercontent.com/958314/195c4a80-7da7-11e9-9a33-54d9fffac84f" />


```sh
npm install --save-dev nodemon
```

そして`nodemon.json`ファイルを作成して

```json
{
  "watch": [
    "src"
  ],
  "ext": "ts",
  "exec": "node --inspect -r ts-node/register ./src/index.ts"
}
```

とし、合わせてpackage.jsonのscriptも修正します
```json
{
  "scripts": {
    "prestart": "tsc -p .",
    "start": "node ./dist/index.js",
    "dev": "nodemon",
  },
}
```

そして、Boltが起動中ならいったん終了します。再度

```
npm run dev
```

で立ち上げなおすと今度はnodemon経由で起動してるはずです。この状態でさきほどのechoコマンドを少し変更してみます。例えば、

```ts
import { app } from '../initializers/bolt'
export default function() {
  app.command(`/echo`, async ({ command, ack, say }) => {
    ack()

    say(`発言: ${command.text}`)
  })
}
```

のように。このファイルを保存してSlackで`/echo テスト`と入力したら`発言: テスト`とメッセージが送信されるはずです。

## foremanで開発用サーバーとserveoをまとめて実行しつつ環境変数も扱う
ここまででもだいぶ快適に開発していけるようになっていますが、さらにもう一歩いきます。
node-foremanというライブラリを使うと、複数のサーバーを1つのコマンド上で立ち上げることができます。また、foremanは環境変数も`.env`ファイルから読んでくれます。

<LinkCard url="https://github.com/strongloop/node-foreman" site-name="GitHub" title="strongloop/node-foreman" description="A Node.js Version of Foreman. Contribute to strongloop/node-foreman development by creating an account on GitHub." image-url="https://avatars2.githubusercontent.com/u/3020012?s=400&v=4" />

まずは、秘匿情報を環境変数化します。最初にベタ書きしたBotTokenとSigningSecretですね。`.env`ファイルを作り、

```
PORT=3000
SERVEO="slack-app-example"
SLACK_BOT_TOKEN= "xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx",
SLACK_SIGNING_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
```

と書きます。`PORT`と`SERVEO`を追加していますが、後述します。
Slackの秘匿情報を環境変数に移したので、コード側からは環境変数で呼ぶようにします。具体的には`initializers/bolt.ts`を編集します。

```ts
const { App } = require(`@slack/bolt`)

// Initializes your app with your bot token and signing secret
const config = {
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
}

export const app = new App(config)
```

そして、foremanで動作させる設定は`Procfile`に書きます

```
Bolt: npm run watch
Serv: autossh -M -0 -R ${SERVEO}:80:localhost:3000 serveo.net
```

とします。`.env`で設定したPORTがProcfileで実行される最初のポート番号になります。serveoはポート番号の前に任意の文字列をとることで、公開されるServeoサーバーのサブドメインを固定できます。この場合は`https://slack-app-exmaple.serveo.net`での公開に固定できます（もちろん任意の文字列で良いので自由に環境変数SERVEOを設定して大丈夫です）。これをしておくとSlackApp側の設定をいちいち変更しなくて良くなります。これが可能なのでngrokではなくServeoを使います。

なので、先程まで自動で振られてたサブドメインをSlackAppに設定していたと思いますので、あらためてスラッシュコマンドの設定を`https://slack-app-exmaple.serveo.net`に変更しておきます。

あと1つ、これを実行するためのもの、Bolt用のwatchコマンドを`package.json`の`scripts`に設定します。
```json
{
  "scripts": {
    "prestart": "tsc -p .",
    "start": "node ./dist/index.js",
    "watch": "nodemon",
    "dev": "nf start",
  },
}
```

ここまで設定ができたら、いったん全てのサーバーを終了させ、

```
npm run dev
```

を実行すると、Boltが立ち上がり同時にServeoとつなげて公開されます。ここまでやると、サーバー立ち上げ、接続はコマンド一発でおこなえて、毎回固定のURLでローカルサーバーとSlackを接続でき、さらにコードを変更しても保存するとすぐにSlack側から使うことができるようになります。

## 感想
ステップごとに説明してるのでかなり長い説明になってしまっていますが、やってることは最終的にはシンルです。いろいろ使ったことある方はすぐにセットアップできるでしょう。僕はあまり「爆速」という言葉が好きではないので使いませんが、少なくともセットアップした後はいろんなことを意識せず快適にかつ高速に、つまり「快速」で開発していくことができます。

次回はGAEにCircleCIにデプロイします
[SlackApp快速開発 \- デプロイ\(GAE with CircleCI\) \| Trial and Spiral](/develop-slack-app-comfortably-fast-with-bolt-and-typescript/)
