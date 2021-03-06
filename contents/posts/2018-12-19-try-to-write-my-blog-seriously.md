---
title: そろそろ本気でちゃんとブログを書こうと思った
slug: try-to-write-my-blog-seriously
tags:
  - Hack
  - 雑記
date: 2018-12-19T09:22:02.000Z
---


また随分と最後の更新から日があいたようで。
最近いろいろ思うところあって、アレでアレな現実をソバットで一蹴する生存戦略的な考えもあってアウトプットをいよいよ本腰いれて加速していこうと思いまして。
たまたまみかけたブログで紹介されてたのでとあるSlackに参加してみた顛末。

## 毎週ブログを書くSlackに参加した
「write-blog-every-week」というものなんだけど、まぁその名のとおり毎週ブログを書くことをやっていこうというやつ。

仕組みとしては
+ 書かない日がしばらく続くとたまにSlackBotから通知が来る
+ 書かない週が一定期間続くと強制的に退会になる
+ 他の人のアップしたブログ記事がFeedとして流れてくる

というわりと単純なもの。

そうやってリマインドがありつつ、Slackなので通知以外にもコミュニティ的に他のみなさんと話したり
ネタをシェアしてみたり、何か質問をしてみたりとして周ってるご様子。

一番のポイントはというと一定期間、つまり4週間更新がなく5週目になったら強制的に退会させられるということ。
新参者なので僕は知らないが、今までに退会した人はいるのだろうか……

## ハードモードでスタートです
おそらく僕が見たブログ記事がバズったからだと思うんだけど、僕がこうして参加したのと同じにように、どうやら同時期に一気に人が増えたらしい。

当初は参加承認は自動でやっていたようだけど、急激な人数の増加と人数の増加によるフィードが多すぎたり、リマインドの緊張感の薄れなどを懸念されたようで、現在はいったん参加を締めきってしまった様子。

ちなみに参加だけされて結局自分のブログを登録されなかった人も幾人かいらっしゃったらしく、退会となっていったようです。このまま人数が落ちつけば再度募集もあるらしいです。

そして、さらにはそれまで強制退会までの猶予週間が4週間から2週間に改訂されるとのこと。

こいつはのっけからハードだぜ……

## 共闘感
で、実際参加してみて一番感じたのは共闘感。

これまでブログを書くっていう作業は完全に一人の作業で、どっちかってっとちょっとしんどい。書いても別にすごくバズるわけでもなく、どこかでフィードバックが貰えるわけでもなく。それでもなんかアウトプットにしないと自分からじんわり無くなっていくようなジレンマというか。

それが他にも同じような仲間と知りあって、ちゃっとしたり、反応しあったりしてる空間というのはそれだけで気が楽になるんだなぁ、と思った。

常時そんなバシバシチャットが交わされるわけではないんだけど、誰かが新しく記事を書いたり、こういうネタが、とかあったりして良い感じで刺激がある。

### slackのおかげ？
もしかしたらそれもSlackのおかげで、Slackだと絵文字アイコンのリアクションがとりやすくって
だれかが反応したら自分も同じく反応できやすい。

自分の発言として流れるわけではなく、あくまでも誰かのリアクションに賛同みたいなライトな感じがとても居心地がよくて。乗っかれる気軽さってすごい。

いつも業務では某ChatWorkなんだけど、同じようで実は大きな差異なんだなぁと思い知った。
あとはMarkdownに準拠した記法とか。なんか独自タグみたいなのじゃないのってすごく楽。
弊社、某ChatなんとかとかいうのからSlackに乗り替えてくれないかなぁ……

Slack今まで軽くは使っていたけど今回初めてちゃんと使ってこうも良いものかと知れたのは大きい。
常々僕自身、コミュニケーションをポジティブに回すためにシステムで手助けできることはある、と思っていたのを今回あらためて実感できて良かった。

## 手助けできたこと
先日、たまたま家の都合で休みをとって自宅で趣味開発してたときに、
「Twitterで自分の記事がシェアされたときに補足するのはどうしてる？」
という話題があがっていて、僕はTwitter検索で`url:blog.solunita.net`みたいにしてますよーという返信をした。

しかしながらどうも件の方のブログのURLだと検出されないようでなんでだろうと思っていろいろ検証した結果、どうも`url:`で検出したい対象を指定するとき、指定対象（URL）に`-`が入ってると上手くいかないようだった。例えばURLが`www.example-jp.com`のような場合。

検証の結果、`url:"www.example\-jp.com"`みたいにクォートで囲んでやるとバックスラッシュでエスケープが効くようになるということをつきとめて解決できた。

Twitterの検索は公式でもあまり多くを言及してない印象だけど、それでもそこそこ高機能で、それ以外にも基本的には後方一致だったりもする。なのでサブドメインをまたいだ検索とかも結構楽。

あと、`-from:AquiTCD`でAquiTCDさんからのツイート以外（つまり自分発信じゃないものだけ）、みたいなのもできるし`-rt`でRTを弾くこともできたり。

ちなみに言えば僕はTweetDeck派なので、自分のブログのほか、自分が趣味でつくったアプリとか
chrome拡張とかを全部`OR`でつなげたごった煮な検索式でカラムを作ってウォッチしてるだけで事足りてるが、話題に上ったのはIFTTで通知をする方法とか。

Twitterの検索結果をIFTTに通知するのはすごく簡単なので、僕は天気予報とかで雨の時だけLINEに飛ばしてたりする。

## 気後れしますがやっていこう！
僕なんかでも参加してすぐに他の人の役にたてたり、まわりでも奮闘してる仲間がいて嬉しい反面、そればかりではなく。

このブログは技術以外の内容も書く雑記ブログなので「技術的なアウトプットをしようよ」みたいなところで全然関係ない話をアップしていいものかと躊躇する。

躊躇するものの、筋トレと同じく「まずは体裁はどうであれ、習慣化することに主眼を置くべし」と思って、これから本腰入れてがんばっていこうと思います。
