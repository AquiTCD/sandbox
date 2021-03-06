---
title: 初めてSlackAppを作ってみた - 帰宅予定確認Bot
slug: develop-first-slack-app
tags:
  - Slack
  - 開発
  - カスタマイズ
date: 2019-08-24T20:10:00.000Z
---
うちの家族チャットツールはSlackを使っています。家族連絡用にもっといろいろ上手いことやろうと、今回初めてSlackApp作ってみました。解説やドキュメントはしっかりあるものの実際の流れがよくわからなくて苦戦しましたので解説を交えて書いてみたいと思います。

## 開発の動機
以前はいわゆる「帰るコール」的なことをIFTTの位置情報と連携させてやっていました。ところが物理的に職場が変わったり、帰り始めたタイミングではなく、遅くなる場合にあらかじめいつぐらいになりそうか、を知りたいとのことでSlackAppを作ることにしました。

## やりたいこと
1. ある時間が来たら自分宛に帰宅時間がいつぐらいになりそうか尋ねる
2. なんらかの答えを返して妻さんに伝わるようにする、その際の入力は楽なほうがいい

というのが最低要件です。要はリマインドして、文字入力ではない簡単な返信がしたい。ということですね。問題はこれをどうやって実装するか、なんですが、SlackAppのドキュメントや開発方法を調べてみるといろんな情報がでてきます。

### 開発前でのわからなかったことと
前述のとおり調べてみてなんだかよくわからなかったのは
+ SlackAppとBotってどう違うの？
+ 定時に尋ねる発言をするって、どうやってトリガーするの？
+ 対話的にやりとりするのってどうやるの？
+ そもそも開発と実装ってサーバー立ててやる必要があるの？

あたりがぼんやりとしていて、なにをどうしていいかわかりませんでした。

### 参考書とその所感
そう思っていたときにブログコミュニティや月イチ挑戦コミュニティでお世話になっている[mottox2さん](https://mottox2.com)が技術書同人誌博覧会向けに『Slack App開発ガイド』が書かれていてPDF版でも頒布されてたのでこれ幸いと読んでみました。

<LinkCard url="https://booth.pm/ja/items/1475515" title="Slack App開発ガイド - mottox2（つのぶえ出版） - BOOTH" description="「Slackを活用したプログラムを書きたい！けど何を使ったらいいか分からない」という人に向けたSlack App開発ガイドです。 Slack Appを取り巻くものは流れが早くすでに非推奨（deprecated）になっているものも多いです。公式ドキュメントを読めば何が推奨されてのかはわかりますが、全貌を捉えるのが難しく入門する立場の人にとっては辛いのが現状でしょう。 この本では複数のSlack Appを作っていきます。その中で、開発手法に触れ慣れていくのが目的です。" image-url="https://booth.pximg.net/c/620x620/c2a55594-9acb-44a0-ad33-e191e603e143/i/1475515/2484a9e1-551a-47e1-992b-36df2da25de0_base_resized.jpg" />

内容的にはSlackAppをGoogle Cloud Functionを使って開発していくチュートリアル的な本です。Slack側の設定もGCF側の設定も記載されていますし、サンプルコードもあり、SlackAppの機能を一通り網羅してるので、これからSlackAppを開発しよう、という僕にはまさに渡りに船でした。

結論から言うとナナメ読みするより頭からいったん写経しながら全部やってみるのが結果的に近道な気がしました。あとになってふりかえってみると、僕は必要そうなところだけピックアップしてナナメ読みしてしまったことがかえって理解度が上がらず遠回りしてしまった感があります。ボリューム的にはライトなので最初から通しでやってみるのをオススメします。

## 疑問の解消
そんなこんなで最初のうちはなかなか理解度が上がらず、どう作っていいかの道筋ができませんでした。前述の疑問に答えると

### SlackAppとBotってどう違うの？
基本同一と考えて良さそう。旧来、自動化されたものはBotと呼ばれてSlackもそう言われていました。そのBotを組み込む枠組みとしてSlackAppがあって、BotはAppとして扱われるアカウントのことをさすんだろうと思います。

また、[Slackの開発ドキュメント](https://api.slack.com)ではBotUserとして、App用のアカウントにメンションを飛ばすとトリガーされるイベントがあるので、これと前述の広義の意味のBotが混乱を招いていた原因でした。

### 定時に尋ねる発言をするって、どうやってトリガーするの？
これはSlack外の何かを起点として使います。[chat.scheduleMessage](https://api.slack.com/methods/chat.scheduleMessage)というものがありますが、定期的にという用途には適しません。そもそもそれをスケジュールする何かをトリガーしなければいけないですね。

例えばCronのようなものと併用して、定時実行される関数を開発します。その中でSlackのIncomming WebhooksやWeb APIのメッセージを叩いてSlack内にメッセージを送信するのが良さそうです。

### 対話的にやりとりするのってどうやるの？
対話的な機能はSlackにはないです。ただし、Interactive Componentsなどを利用してユーザーがボタンを押したり、入力した項目に対してApp側で受けとれるように設定、実装をします。その返しとしてまたボタンや入力欄などを含めた返信をする、を交互にやりとりすれば事実上対話形式になります。

Slackのドキュメントに`Interactive Message`と`Interactive Components`という言葉がでてくるのが混乱ポイントです。ざっくり言えば前者はSlackのメッセージを表示するためのJSONをBlockやSectionをつかってボタンやフォームを表示させる方法。後者はそのボタンや入力を受けとるための設定と実装です。

### そもそも開発と実装ってサーバー立ててやる必要があるの？
単純にリクエストを受けたらSlackに対してリクエストするものがあれば十分です。

例えばSlackAppだけを作りたい場合、『Slack App開発ガイド』にもあるようにFaaSでやるのがシンプルだと思います。すでに何かのサービスがあって、SlackAppとしてSlackと連携させたい、という場合ならサーバーでSlack用のリクエストをやりとりする実装をするのが良さそうです。

ちなみに僕はデータを永続化して管理したかったので、FirebaseでFirebase Cloud FunctionとFireStoreで開発、運用していますが今のところ問題なく動いています。また基本的にはJSONのやりとりだけなのでSlack用のフレームワークを使う必要性も感じませんでした。

## 帰宅確認Botイメージ
シーケンスを図にするとこんな感じ

![](https://lh3.googleusercontent.com/IoPA2KSfQjLTQ0G6sOAiFk4ms-VpMzEz49e5R0i40eX2nVxnS0nB6GrUzQht8hIc0XbTHOXuptQWxWmTcCdk6Rl7W5DoqrR7WC1kf3jUwkKgNIks5W2rMUXXO7J2__iZ4yVJJKoOZ8plt3y2paibOuvsu7e7RfJ5DGvTYcxx1MNOBcLQm4444UaQSxAJvpc-u1idaaMIm1v3Qj960RxsF2csjAWWWQw77q1owCegyRxPw6HO4rcTGzZPuc39K8TsP6A5gyo4-it4j0Ncix99cA7W6ibTbK5uEytf3Ai5JjTu358Gw2oT5FlNREwCzKUhf3nj8NxYG5n62ETxOM7h_RmnNXpKTK3uDcnx13mqEP03y75h-xdnJbbJ0ObFgV1u_LOVRIdNj_-MHFqai4yqZid8sz2jIqrqEwlpL7JgN9yWaW8eavOESGBx3XIMlfHv93W6JQr9tAnA6zEzfoyKq5Jmcnyks6IiYuovlo70KWvRDiBIwo6L7CZW_WTUd81hzunJI_jgy7vPm0aiZckfCbL8c57jAv3uZ_7YhOdQXegPSk5lNl68JcBcykCdbkFFhmVwQ9F7vfd3YNckT_W1yvYBOwd8xQ1JpUDTv0L--wC0j4WODh6APW1_b6h7pSPIAtl4uUPYkjCvjt0XsUp4hC5uQ81uWLaKJMVG6qBZ6SdyEgzL190-PAECQAHOH8A13OFiHSNGriqTKgXR5oAKm72m=w685-h1147-no)

SlackAppは、大きくわけて5種類のトリガーがあるイメージで
1. Incomming Webhooks
2. Interactive Components
3. Slach Command
4. Event Subscription
5. Bot Users

この中でIncomming Webhooksだけ少し特殊でSlack外からURLを叩いて指定したチャンネルにメッセージを飛ばせます。
それ以外はいずれもSlack内の特定の行動をトリガーとして、指定したURLにリクエストを投げる仕組みです。

ということで、指定時間に実行するケースはまずCronかなにかで指定した関数をキック。その中でIncomming Webhook, もしくはWeb API経由でSlackにボタンなどを含めたInteractive Messageのスタイルで発言します。

次にInteractive Componentsでその返答を購読して、指定の関数をキックします。その関数の中でまた次のSlackメッセージをリクエストする、というような感じです。

このピンポン的にやりとりする流れを最初に想像できなかったので苦戦しました。ちなみに今回の帰宅確認BotではSlashCommandやEvenSubscriptionは使ってません。

なお返答結果や今の状態に関してはFireStoreでデータを持ち、更新や確認をしています。そして再確認などは定期的にCronで走らせてその永続化したステータス状況を元に処理ををわけている感じです。
Cloud Functionだと定時実行しかありませんが、AWSならCloudWatchから動的に関数をキックする時刻が決めれそうでした。

## できあがったもの
こんな感じのものができあがりました。

![](https://lh3.googleusercontent.com/QEMwYqsZ0UgEz5M69F_jl55Gjd12nvTPlZkA9T3mTJqdBceFZYCj-0-aSGX00awy3bsRIoHcGxtelTvkTP-c-zINNgz2v6myHhgVAQQZhorBSiooMjFliO08DYpF8xLN_3YzqoofBFlkuMT1_bmVJRD-aVVnCweZt3z6Ip5tWuRd9LjU4Qq2t1JD9IA0CXGH0_ZGMe7K2AxvAgAQEF39shsg8jnIYoVlXjvA1DBfVYMsPz2UGfdrxC-nxtVZIiXFOZfa7jr_MmIbx0wDdgs-SAacpdW3R4JiZ1fWKoJ9t0tgUueSnmKZPs7ZdksheNGZsWEsgu1z3mG0ud5RxZmwgu4dT1Zf0hXB8KJZ7gM8MewdJrOn9nJ5ZQVNvZMPL4oi-WHGje15GRz-ex7YS9wT-SAVz0wdRqrmIcPIjSMpUmYzA13gzvRnW10xVdnDbmaJmzjWC9ff3qDx-hDHvuLkIINcJSMsk4wtXlf5LhODzRjNzIiBUZMg05FqvcxfVP9uugmWbrdOZZenVNDPwrLprzv8aAuYGgkX3fFb4EWFgOFVuF8b2weIkHSL4BFEGZBVIjYIXeJOoEWJl65dDiQq0BTGcdGaIOLnptc0JFW--zL9vU9saOd-aNi-ppvSJHZByFoQhoy93gPt78J-kAQAMK8mzO6l42kbIypUt9EAB2BB7eS0u5vH1A2_lmGi77UTp9-6F5bj9cxbTXf5n1MKSwlw=w720-h330-no)

## まとめ
今回、最初全然イメージが掴めなかったり、どう開発してどう実装して、どう使うのかがわからなかったです。しかし、実際に理解してみたらシンプルでした。SlackApp自体がいろんなことができるように幅を持たせてあること、いろんな独自の言葉が出てくることが混乱した要因かもしれません。

しかしもっとも悪手だったのは、ドキュメントをちゃんと読もうとしなかった事、必要そうなことだけ読んでなんとかしようとしたことが原因ですね。高機能なイメージから、全体像と仕組み、何ができて何ができないのかをきちんと理解できてなかったためです。

一足飛びにやろうとしてくことに何が必要かを探そうとしたのがかえって遠回りになってしまいました。前述したとおり、まずは一通り機能を試すためにも愚直にチュートリアル的なもの作ってしまったほうが早そうです。その上で**何をつかえばどのような事ができるか**を理解した後で、**実現しようとしたことに何が必要か**を考えるほうがスムースに行きそうです。

余談ですが、うちの家族チャットがLINEではなくSlackになったのは僕の希望でした。LINEは複数のPCから同時ログインができないことが凄く不便だったためです。
