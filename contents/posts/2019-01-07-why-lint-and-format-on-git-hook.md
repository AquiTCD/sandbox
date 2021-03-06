---
title: LintとFormatをGitHook時にかけてる理由
slug: why-lint-and-format-on-git-hook
tags:
  - 開発
  - Git
date: 2019-01-07T23:23:41.000Z
---

LinterとFormatterをかけないコーディングはツラくて個人的にはちょっと悲しくなるんだけど、問題はどのタイミングでやるかってこと。個人的にやっていたものを昨年なかごろから業務にも取り入れてみてそこそこ上手く回っているので書き残しておきたい。

## いつかけるか
LinterとFormatterをかけるとしたらいつがいいのかいろいろ考えて、結論から先に言えばGit commit時にしている。なんでそう結論づけたかっていう話の比較を交えてご紹介したい。

### Save時
一番頻繁にかかる一例としてファイルの保存時。例えばVSCodeなんかではFixOnSaveとかって設定があるようにわりとメジャーだと思う。

Saveするときにかかるので一番頻繁だし、適当に書いてもガっとキレイにFormatは効くし、変なコードはすぐに警告が出る。良い。

でも残念ながらできるかどうかははエディタ頼みになってしまう。独りで開発しているときは十分かもしれないけど、みんな違うエディタだったり対応できないエディタの使用者がいたら？

例えもし開発者それぞれが使うエディタで全部対応できたとしても、エディタごとに設定もプラグインとかも違ってくるのでどうしてもノウハウが属人化してしまう。

一番大事なのは自分以外も加わるとしたら強制できないのであまり有効でないところ。ルールを適用するならそれは守られなければ意味がない。

### GitHookにひっかける
GitにはGitHookという機能があって、commit時やpush時に設定したスクリプトを回すことができる。最初に言ったようにこのフックにひっかけてpre-commit時にLinterとFormatterをかける運用にしている。

理由はcommitをしないことには開発は進められないし、エディタがなんであろうと強制できる。そしてローカル上でエラーが出るのでそのcommitする開発者が自分でエラー箇所を修正することになる。また最悪どうしようもないときは`--no-verify`オプションをつけることで一時的にGit Hookを飛ばすこともできる。

ちなみにpre-pushも検討してみたけど、push時に弾かれたり修正が入ることでコミットログがエラーやコーディングスタイルの修正だけになったりして、それは別コミットにすべきじゃないと思ったのでpre-commitにした。

### Pull Request時にCIで回す
他の候補としてPull Request時にCI等の外部サービス経由で回すことももちろん検討した。これも結局はpre-pushと同じようにコミットをキチンと整理したいこと、その後のマージ戦略まで影響するのがちょっと面倒で見送った。

ただし方法としては一番、開発環境に依存しない方法だし悪くはないと思う。pre-commitにしろpre-pushにしろ、CIにしろ、ポイントとしては
1. Lintに通ってないコードを採用しない（できない）。
2. Formatterのルールにのっとってないコードを紛れこまさない
3. 1と2を共同開発者全員で共有する

というのが前提として守りたいルールだった。

## もうひとつの目的
なし崩し的にチームリーダー的なポジションになって後輩を抱えるにことになったけど、なにもイチから教えることはなくて「こういうコードがいいよね」っていうのはLinterやFormatterに助けてもらうことにした。

なにより僕がレビューコメントや口頭で「こういうコードがいいよ」っていうより、ルールの説明のドキュメントのほうがよっぽど説得力がある。

まずチームにJoinすることになったときにルールを確認してもらって、できればその時になんでそういうルールを設定してあるかもコメント等で共有する。そしてそのルールに納得してもらうようにした。反論は出なかったものの今でも合わないルールがあったら変えるからいつでも相談して欲しいとは伝えてある。

そうすることで例えばLinterではうっかり使用されない変数、到達しえない分岐、デバッグ用のコードなど紛れこんだままだったり、同じ結果だとしてもよりリーダーブルな書き方だったり、そういったことがPull Requestに紛れこまないことによってレビューの時間コストも抑えれるし、エラーが出たら自身でちゃんとルールを参照して修正してもらうようにしてる。そうすることで自身で徐々により良いコードを書けるようになってもらう作戦。

またFormatをキチっとやるのことも僕は大事だと思っていてインデントが不揃いだったり、なんか感覚的に気持ち悪いっていうことだけじゃなく、コーディングスタイルを統一することで読みやすくして、本質じゃないノイズを極力カットすることで本質にフォーカスしやすくするのが狙い。

この目的にあたって注意したのは「**ルールは聖域、無視しちゃダメ**」ということ。もちろんキビしすぎるルールは時に枷となって開発スピードを鈍化させたりもするんだけど、そういう場合もキチっと直すことを意識した。なんども苦労するようであればそれはルール自体を変更したり緩めたりすることで対応する。

これは**Linterのルールは割れ窓理論的に悪化しやすい**と思っていて「ああ、このルールはまあ無視してもいいよ」みたいにしてしまうと次第にどんどん広がっていき、最終的にはルールは守られず、無いもの同然になってしまう。その経験が僕にはある。だから「**ルールは聖域、無視したいのであればルールの変更を提案しよう**」として運用して、事実上手くいってる。

## 実践
じゃあpre-commit時にLinterとFormatterをかけるための具体的な方法なんだけど、それはちょっと次回に回したいと思います。使ってる言語と環境にも寄るんだけど、僕の主戦場がRubyとJS(TS)なのでそれら限定になってしまう。とはいえフックさせて回すのはNPMライブラリだけでやってるので他の言語のプロジェクトでもNPMを同時に使えば実現できそう。

そんな`husky`と`lint-staged`を使った具体的な設定はまた次回。

追記
書きました。
<div class="linkbox"><div class="linkbox_image"><a href="https://blog.solunita.net/how-to-lint-and-format-by-git-hook/" target="_blank" >NO IMAGE</a></div><div class="link_info"><div class="link_title"><a href="https://blog.solunita.net/how-to-lint-and-format-by-git-hook/" target="_blank" >LintとFormatをGitのコミット時に自動でかける方法 - Trial and Spiral</a> </div><div class="link_description">今回はそれの具体的な方法を書いていこうと思う</div></div></div>
