---
title: Git 初回コミットのメッセージをちゃんと決めてみる作戦
slug: what-is-the-your-favorite-message-at-first-commit
tags:
  - 開発
  - Git
date: 2019-02-10T13:52:52.000Z
---

新しいことをいろいろやろうとすると、それがSandboxであれ`git init`することはそこそこあると思う。で、毎度毎度うっすら「初回のコミットメッセージって何か決まりあるんかな」と思うけど、まあわかればいいか、と思って適当にやるっていう感じだった。今回はそれをちゃんの決めてみようというお話。

## なんで決めるか
僕の行動原理として「小さなことでも何度か考えるなら論理的にルールを決めると楽」という実感がある。
これはインデントがどうとか、コーディングフォーマットにも通じるんだけど、要は本質じゃないものからのノイズを減らして本質にフォーカスしやすくする、という戦略のつもり。
余談だけど僕がSCSS嫌いでSASS好きなのもそういう理由だったり（Stylusはもっと好き）。

なんかカッコつけたけど、毎回3秒でも悩みたくないから決めちゃっておきたい、でも自分の中だけにでも納得のいく論理的理由が必要、という面倒な自分を御したいだけな話。ちょっと最近いろいろと忙し気味なので、そういう時はこういう簡単なことをサクっと処理する時間にあてていきたい所存。

## 一般的にどうか
そもそも絶対こうじゃなきゃいけない、というものはない様子。ならばまず最初に狙うべきは「一番多い」というところ。 Gitは複数人で扱う前提とすれば「誰もが迷わずそれが初回コミットであることを認識できる」というのが必須条件になってくるはずで。

そうすると良く見かけるのは`first commit`か`initial commit`のどちらかだろうと思う。ちなみに今までの僕は`initial commit`を使ってきてる。
これは予想だけど、僕も含めGitを初めて扱い始めたころのチュートリアル的なものに影響される人が多いんだと思う。

もう1つ日本語メインでやっている人の場合は「初回コミット」というのも見かける気がする。考慮すべきはまあこのあたりかなぁ。

### 調べてみた
ちょっと面白い記事を見つけたので紹介したい。
<div class="linkbox"><div class="linkbox_image"><a href="https://masalmon.eu/2017/02/21/firstcommit/" target="_blank" ><img src="https://masalmon.eu/img/barbie_office.jpg" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://masalmon.eu/2017/02/21/firstcommit/" target="_blank" >First commit or initial commit? - Maëlle's R blog</a> </div><div class="link_description">When I create a new .git repository, my first commit message tends to be “1st commit”. I’ve been wondering what other people use as initial commit message. Today I used the gh package to get first commits of all repositories of the ropensci and ropenscilabs organizations.</div></div></div>

すごい簡単に説明すると、スクリプト書いてある分野のGitHubのリポジトリの最初のコミットメッセージを集計してみた、的な感じ。

これを見る限りではやはり`first commit`、`initial commit`が郡を抜いて多い。ついで`add readme`のようで、これはとりあえず最初にreadmeだけアップした、みたいな感じなのだろう。
タイポや省略形もあるのでザっと見た感じで分けると

+ first派（`1st commit`, `first commiit`など）
+ initial派（`init`, `initial`, `initial commit`など）
+ add派（`add files`, `add readme`, `create readme`, など雑多）

の三種類に大別できるかなーって感じ。

注意すべきは対象がrOpenSciのものだけみたいなので、少し偏りがある可能性も否めない。

## 僕は`init`に決めた
まあ「最初のコミットだよ」ってわかればなんでも良さそう。先程の例に習って僕もスクリプト回してみようかと思ったけど、結局やらずに決めてしまった。

僕は`init`で行こうと思う。

理由として、

+ `commit`という情報はそれがコミットメッセージである以上、書かなくてもわかるので省略
+ Gitの最初のコマンドは`$ git init`ですので
+ 正直わりとどうでもよくなったので短かくてわかりやすいのでいいやってなった

という理由。
これでもう初回のコミット時にメッセージどうしようか思いを馳せることはなくなった、1リポジトリあたり3秒ぐらいの時間的コストをカット、同時にその一瞬思考をそっちにまわす脳内ワーキングメモリコストもカット（わりと無視できる程度な差なのは否めないw）

## ちなみにrebaseはできる
今回初回コミットについて調べる過程でメッセージとは違う軸の話として、

> 最初のコミットは前コミットが存在しないためrebaseができない、だから初回コミットはあえて空コミットにする

みたいな話を見かけたけど、よくよく調べてみると
```
$ git rebase -i --root`
```
とか`--root`オプションで一番最初のコミットを含めて修正できるし、実際試したら出来たのでこれは採用しなかった。

ただ、最初を空コミットにして`create this repository`とかにしてもアリかなぁとも思った。いやいややっぱりナシで、僕はもう`init`に決めたんだ、迷わないんだ！
