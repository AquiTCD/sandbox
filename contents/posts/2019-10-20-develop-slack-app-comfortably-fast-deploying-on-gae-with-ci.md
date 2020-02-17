---
title: SlackApp快速開発 - デプロイ(GAE with CircleCI)
tags:
  - Slack
  - Bolt
  - GoogleAppEngine
  - CircleCI
date: 2019-10-20T11:42:00.678Z
image: 2019-10-20-develop-slack-app-comfortably-fast-deploying-on-gae-with-ci.jpg
---
## 概要
前回、BoltベースのSlackAppを開発するためのローカル環境を作りました。今回はそれを実際に使えるようにデプロイします。デプロイ先はGoogleAppEngine(以下GAE)で、最終的にCircleCIを利用して自動的にデプロイされることを目指します。SlackAppと快速開発と言いながらほとんどはGAEとCircleCIの話なのでSlackApp以外にも簡単に応用できます。

また、今回はGAEにデプロイするためGAE特有の事情にも触れますが、他のPaaSへのデプロイにも応用できる知見も多いと思います。

シリーズ：
+ [SlackApp快速開発 \- ローカル開発環境構築 \(with Bolt \+ TypeScript)](/develop-slack-app-comfortably-fast-with-bolt-and-typescript/)
+ [SlackApp快速開発 \- デプロイ\(GAE with CircleCI\)](/develop-slack-app-comfortably-fast-deploying-on-gae-with-ci/)
+ [SlackApp快速開発 \- BoltでHTTPリクエストを受け、Cronで定時実行](/develop-slack-app-comfortably-fast-receive-http-request-for-cron/)
+ [SlackApp快速開発 \- Firestoreでデータ保持したり読み出したりする](/develop-slack-app-comfortably-fast-with-firestore/)

## なぜGoogleAppEngine
まずBoltでSlackAppを作る場合サーバーレスではなくNode.jsが動きサーバーとして扱えるものが必要です。自分でNode.jsが動くサーバーを立てて運用するのは少々面倒ですので、PaaSで考えてみます。そうなるとお手軽なのが、Heroku, Now, GAEあたりでしょうか。

中でもGAEは同じプロジェクトとしてFirestoreをDBとしてデータを保持しやすく、またCronでの定期実行も備えています。扱い方にもよりますがFirestoreを使ってGAEで運用しても基本的には無料の範囲で収まるはずです。

逆に言えば保持しておくようなデータの扱いやCronも使わない、もしくは別の仕組みを使って実現する、ということであればGAEでやるメリットはあまりありません。ただし、スラッシュコマンドなどは3秒以内にレスポンスを返す必要があり、インスタンスがスリープするようなものは注意する必要があります。

## GAEにローカルからデプロイ
GAEのNode.js環境に関するドキュメントはこちら

<LinkCard url="https://cloud.google.com/appengine/docs/standard/nodejs/?hl=ja" site-name="Google Cloud" title="Google App Engine Node.js スタンダード環境のドキュメント | Node.js 用 App Engine スタンダード環境に関するドキュメント | Google Cloud" description="App Engine スタンダード環境での Node.js の使用" />

最小限の設定としては
+ gcloud CLIをインストールしてセットアップ
+ GAEビルド用のコマンドをpackage.jsonに追加
+ `app.yaml`にデプロイ設定を記述
+ gcloud CLIで`app deploy`コマンドを叩く

だけです。

### gcloud CLIのインストール
これは公式に案内されているとおり

<LinkCard url="https://cloud.google.com/sdk/docs/?hl=ja#install_the_latest_cloud_tools_version_cloudsdk_current_version" site-name="Google Cloud" title="Google Cloud SDK のドキュメント | Cloud SDK | Google Cloud" />

です。が、macOSの場合は非公式のbrew cask経由でもインストール可能です。

```sh
$ brew cask install google-cloud-sdk
```

インストールが完了したら、Googleアカウントとプロジェクトのセットアップを行います。これも公式ドキュメントが一番正しくわかりやすいので紹介します。

<LinkCard url="https://cloud.google.com/sdk/docs/quickstarts?hl=ja" site-name="Google Cloud" title="クイックスタート | Cloud SDK | Google Cloud" />

### GAE用のビルドコマンドを追加
前回ローカル開発環境では`prestart`内でTypeScriptのビルドをしました。しかし、GAEは基本的にread-onlyのため、ビルドが成功しません。
これに対応するには`gcp-build`というGAE用のビルドコマンドを設定します。`gcp-build`を通した場合は生成されるファイル郡は期待通りに配備されます。

package.jsonのscriptを以下のように書き替えます。
```json
{
  "scripts": {
    "gcp-build": "tsc -p .",
    "prestart": "npm run gcp-build",
    "start": "node ./dist/index.js",
    "watch": "nodemon",
    "dev": "nf start",
  },
}
```

従来のビルドコマンドを`gcp-build`に設定して、`prestart`からは`gcp-build`コマンドを呼ぶようにします。「[カスタム ビルドステップの実行  \|  Node\.js 用 App Engine スタンダード環境に関するドキュメント  \|  Google Cloud](https://cloud.google.com/appengine/docs/standard/nodejs/running-custom-build-step?hl=ja)」で紹介している方法と同一です。

余談ですが、GAE以外でデプロイするのであっても同じように`build`みたいなコマンドにビルドを設定したほうが良いでしょう。見通しが良くなりますし、CI上で実行するケースもあるかもしれません。

### app.yamlの設定
デプロイの方法についてはこちら

<LinkCard url="https://cloud.google.com/appengine/docs/standard/nodejs/testing-and-deploying-your-app?hl=ja" site-name="Google Cloud" title="アプリケーションのテストとデプロイ | Node.js 用 App Engine スタンダード環境に関するドキュメント | Google Cloud" />

簡単に言えば、`gcloud app deploy`コマンドを叩くと先の手順で設定されたgcloudのプロジェクトに対して`app.yaml`の設定に従ってデプロイされる、というだけです。

最小設定はruntimeさえ指定すればデプロイできちゃいます。

```yaml
runtime: nodejs10
```

と書くだけですね。

ただし、GAEのAlwaysFreeの対象はオートスケーリングされるF1インスタンスの実行時間ベースです。つまり無料に抑えたいのであればできる限りオートスケールしないような制御をすると安心できます（通常のSlackAppの運用であればそうそうスケールされることはなさそうですが）。

一例として僕の運用しているものを記載します。

```yaml
runtime: nodejs10
instance_class: F1
automatic_scaling:
  min_idle_instances: automatic
  max_idle_instances: 1
  min_pending_latency: 3000ms
  max_pending_latency: automatic
  target_cpu_utilization: 0.95
  target_throughput_utilization: 0.95
  max_concurrent_requests: 80
```

デフォルト値の設定から調整してを極力1インスタンスで頑張るように設定している感じです。
各設定の詳細についてはこちら
<LinkCard url="https://cloud.google.com/appengine/docs/standard/nodejs/config/appref?hl=ja" site-name="Google Cloud" title="app.yaml 構成ファイル | Node.js 用 App Engine スタンダード環境に関するドキュメント | Google Cloud" />

また、無料対象については「[GCP の無料枠 \- 無料の長期トライアル、Always Free  \|  Google Cloud](https://cloud.google.com/free/?hl=ja)」を参照してみてください。

### デプロイ対象から外す設定
`.gcloudignore`というファイルにデプロイ対象に含めないファイルを指定できます。このファイルは`init`した場合すでにできてるかもしれません。書き方は`.gitignore`と同様です。

ignoreしたいファイルの設定例は以下のとおりです。
```
.gcloudignore
.git
.gitignore
node_modules/
__tests__/
.circleci/
.github/
nodemon.json
Procfile
.env
serviceAccountKey.json
/dist/
```

基本的には開発用の設定ファイルを対象外にします。また、`node_modules`もデプロイ時にinstallされるのでローカルからのデプロイ対象から外します。ビルド自体もデプロイ作業後に行なわれるため、ビルドされたものである`/dist/`ディレクトリ以下は含める必要がありません。

### デプロイしてみるその前に
実際にデプロイしてみるんですが、前回ローカル開発環境の中ではSlackで利用するためのキーを秘匿するために環境変数にしました。GAEでも環境変数の設定が必要です。

GAEの場合、環境変数も`app.yaml`に記載します。勘の鋭い方は「`app.yaml`はデプロイ設定なのでGit管理したい。でも環境変数を含めたファイルをGit管理対象にはしなくない。どうすれば……」と思うはずです。
これに対して解決方法はいくつかありますが、1つの解決例については後述します。今はまず「デプロイができて、それが正常に動作する」を目指しましょう。いったんベタ書きで記載します。

先程設定した`app.yaml`の最後に以下のように追記（もちろんマスクしてある部分は実際に使うキーを記述）します。ここで使うキーは開発用Slackワークスペースではなく、本番用のSlackワークスペースです。
```yaml
env_variables:
  SLACK_BOT_TOKEN: xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx
  SLACK_SIGNING_SECRET: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### デプロイしてみる
```sh
$ gcloud app deploy app.yaml
```

を叩くだけです。成功したら、`https://{プロジェクト名}.appspot.com/`のようなGAEの公開URLが表示されます。特に設定を変更しない限りはこのURLは固定で、次にデプロイしても同じURLで公開されます。ということはSlack側で設定しているURLは一度設定した以後変更しなくて良いということです。もちろんGAE側の設定で独自ドメインを使うこともできます。

ちなみにGAEではデプロイ時に`npm install`された後、自動で`npm run start`が走るようになっています。それによって自動的にビルドされ、Boltサーバーが起動するはずです。

## CircleCIでデプロイする
デプロイの度に一々手元でデプロイコマンドを叩くのは面倒なのでCIでできるようにします。また、CIでデプロイできるようにしておくことで他にコントリビューターが居る場合でも自分が必要以上に関与しなくてよくなります。

今回CIはCircleCIを使うことにしました。CircleCIの概要と詳細については以下をご参照ください。

<LinkCard url="https://circleci.com/docs/ja/2.0/about-circleci/#section=welcome" title="概要 - CircleCI" description="CircleCI 2.0 入門" />

まずはGitHubにリポジトリを作り、CircleCIと連携させておきます。その際に後ほど説明する手順を行なうまでは、環境変数の含まれた`app.yaml`をpushしないようにご注意ください。

### CircleCIを設定する

#### Orb
紹介したドキュメントにもあるように、CircleCIの設定は`.circleci/config.yml`に書きます。

CircleCIではOrbと言う再利用可能な共通設定の型が用意されているものがあります。今回はgcloud用のOrbを使います。

<LinkCard url="https://circleci.com/orbs/registry/orb/circleci/gcp-cli" title="CircleCI Orb Registry - circleci/gcp-cli" />

そして、このOrbを使ってGAEをデプロイするには必要な情報をCircleCI側のプロジェクトの環境変数として設定する必要があります。
必要な環境変数は3つで
+ `GCLOUD_SERVICE_KEY`: [インスタンスのサービス アカウントの作成と有効化  \|  Compute Engine ドキュメント  \|  Google Cloud](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances?hl=ja)からサービスアカウントのページに進み、対象のGAEの「鍵を作成」から出力されるJSON
+ `GOOGLE_PROJECT_ID`: [GCP Console の [ダッシュボード] ページ](https://console.cloud.google.com/home?hl=JA)から確認できます
+ `GOOGLE_COMPUTE_ZONE`: プロジェクトのリージョン。忘れてしまったら`gcloud app describe --project {プロジェクトID}`で確認できます

これらを[環境変数の使い方 \- CircleCI](https://circleci.com/docs/ja/2.0/env-vars/#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E5%86%85%E3%81%A7%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)を参考にCircleCIからプロジェクトの環境変数として設定します。`GCLOUD_SERVICE_KEY`はJSONの内容をそのままコピー&ペーストで入れてOKです。

#### Slack用環境変数もCircleCIで扱う
さて、さきほど`app.yaml`にベタ書きしたSlackの環境変数ですが、このままだと`app.yaml`をGit管理対象に含められません。少々強引ですが`app.yaml`からCircleCIにSlackの環境変数を扱わせるようにします。

gcloudの環境変数と同様に、CircleCIのプロジェクトの環境変数に`SLACK_BOT_TOKEN`、`SLACK_SIGNING_SECRET`を設定します。`app.yaml`からは`env_variables`ごと削除します。

そして後程記載するCircleCIでデプロイ時にデプロイコンテナ内で`app.yaml`にシェルスクリプトで追記します（多少強引で泥臭い対処なのでもっと良い方法があれば教えてほしいところ）。

### PullRequestをマージしたときにデプロイする
CircleCIはデフォルトではpushされたときに走ります。これをPullRequestがマージされたタイミングでのみデプロイが自動実行されるように制御します。通常良くあるGit運用を踏襲しmasterブランチはトピックブランチのマージコミットのみ、リリース可能な状態、というルールを守るようにします。

具体的にはCircleCIにはfilter機能を使います。特定のブランチやタグに関する変更時のみトリガーされる設定です。今回の場合はmasterに変更があったときのみデプロイジョブが実行されるようにすればOKです。

### 設定を書く
以上を踏まえて実際に`config.yml`を書きます。

```yaml
version: 2.1
orbs:
  gcp-cli: circleci/gcp-cli@1.8.2

jobs:
  deploy:
    working_directory: ~/repo
    docker:
      - image: google/cloud-sdk:latest

    steps:
      - checkout
      - run:
          name: Overwrite env variables
          command: |
            echo "env_variables:" >> app.yaml
            echo "  SLACK_BOT_TOKEN: ${SLACK_BOT_TOKEN}" >> app.yaml
            echo "  SLACK_SIGNING_SECRET: ${SLACK_SIGNING_SECRET}" >> app.yaml
      - gcp-cli/initialize
      - run:
          name: Deploy to Google App Engine
          command: |
            gcloud app --quiet deploy app.yaml

workflows:
  version: 2
  deploy:
    jobs:
      - deploy:
          filters:
            branches:
              only:
                - master
```

ステップを見てみましょう。

checkout:
これは最新の状態にするためのもので特に説明はいりませんね。

Overwrite env variables:
前述のとおり、app.yamlに対してシェルからCircleCIに登録した環境変数を用いて追記しています。良い方法には思えませんが、この方法であればapp.yamlをGit管理下に置きつつ、GAE内で使う環境変数を秘匿したままにできます。

gcp-cli/initialize:
orbで定義されているものです。これによって、gcloudでデプロイする準備をします。

Deploy to Google App Engine:
ほぼローカルから叩いたときと同じデプロイコマンドです。違いは`--quiet`オプションで、デプロイ時に入力を求められる状況が発生しても無視してデプロイを進めることができるオプションです。

そして最後のほうにfilterでmasterブランチのみを対象としています。PullRequestをマージすれば当然リモートのmasterブランチが進みますのでこのデプロイが走ります。

## 感想
最初はいろいろ設定が上手くいかず苦労しました。filter部分を外せばトピックブランチにpushしても設定したジョブが走るので、まずはそれで試して期待通りに行くようになってfilterをつけるような試行錯誤しました。

また当初は`gcp-build`コマンドの扱いが特別なことを知らずにGAEではビルドできないものだと思っていました。その時はCircleCI内でビルドして、ビルド結果をデプロイするようにして一応上手くいっていましたが。

ちなみにマージしたときにデプロイしたくない場合（例えばREADMEの更新のみの場合）はマージコミットのメッセージに`[skip ci]`と書けば大抵のCIはトリガーされません。いろいろ考えましたが今のところはその対応で十分に感じています。

とまあいろいろ苦戦したものの最終的になんとかなりました。いろいろ作っていて思うのはデプロイファーストという概念もあるように、デプロイの確立を早めにやっておくと後が楽だなぁとよく思います。
