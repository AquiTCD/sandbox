---
title: コンポーネント時代のCSSの命名ルールを考えてみよう
slug: try-to-think-about-naming-rule-for-css-classes-in-scoped-css-generation
tags:
  - 開発
  - Vue.js
  - CSS
date: 2019-01-27T01:02:34.000Z
---

このブログはHexoというNode.js系の静的サイトジェネレータで作ってる。テーマはイチからフルスクラッチで自分で作った。でも自分で作ったがゆえにまだ手のゆき届いてないところがあったり。そんなこんなで久々にテーマをどう作ってたってところから見なおしてたり。

そんなことから、そういえば以前はBEMやらFLOCSSだったり、SMACSSのルールに基づいてCSSを書いてたなあ、と思った。一方、React, Angular, Vueの三大巨頭が牽引するコンポーネント時代に突入してきた今、CSSの効果範囲はScopedにものが主流になってきている。ScopedなCSSはそれに適したまた別の命名ルールが存在するのでは、と思って考えてみたという話。

## ScopedなCSSとは
まずScopedなCSSについて簡単に説明したい。
そもそもScopedなCSSというのはJS系フレームワーク産の発想ではなくて、一時期はちゃんとFirefoxにも実装されたようにCSSそのもので提案された考えかた。

CSSは名前のとおりカスケーディングに処理されているけれど、カスケーディングがゆえに乱暴に言えば全てがグローバルに宣言されていると同じようなもので、そこから、あるDOMの中でだけに絞って作用させたい用途としてScopedが生まれたんだと思う（この辺あいまいです……）

残念ながらそれは正式に採用されることはなくなったようだけど、WebComponentよりも先駆けてコンポーネント指向の急先鋒となったReact, Angular, Vueには実装の形は違えど、各コンポーネント内だけでしか作用しないCSSの書き方がある。それを今回は便宜上「ScopedなCSS」と呼んでいる。

## デファクトスタンダードなBEM
さて、Scopedじゃない時代、人は常にCSSの影響範囲と戦ってきた。基本的にはそれぞれにクラスをちゃんと指定して、クラス名の命名規則とつけかたで頑張りましょうという戦略。

そこで生まれたのがBEM(Mind Bemding)という手法。`block__element--modifier`という命名規則で、親子関係がしっかりしているのが特徴。OOCSS（オブジェクト指向CSS）としても構造がわかりやすく、今やCSS命名規則のデファクトスタンダードと言っても過言ではなさそう。

## 僕はSMACSSが好き
BEMもSMACSSもどちらもある単位ごとに分けて管理しよう、って概念はかなり近い。個人的にはBEMよりはSMACSSのほうがわかりやすい気がする。その反面、Mに相当するモジュールの自由度が高くて悩むこともしばしばある。でもそれはBEMにしてみてもブロックでの区切りかたに悩むのと同じようなもので。

SMACSSが大きくBEMと違うのは、ステート（状態）をマルチクラスとして宣言するところ。BEMの場合で言えばModifierに相当し、例えば同じように書くとしたらBEMなら`.module--state`と指定してたのをSMACSSなら`.module.is-state`というような感じ。

個人的にはこちらのほうがCSSの特性を考えると、状態の変化を上手くあつかうには適していると思っているのでこっちのほうが好きだ。

## オレオレルールを模索する
じゃあコンポーネント指向になった構造でScoped CSSになったとき、どうするのが良さそうか、っていう話。

AtomicDesign的な思想をベースとすると、コンポーネントの単位はその「責務」によって分割されるべきで、これがCSSのデザインのブロックやモジュールとは非常に似つつも完全に同一でないのでちょっと混乱しやすい。

まず、SMACSSで言うようなレイアウトのプレフィックスはいらないくなってくるはず。つけたいなら付けてもいいけど、Scopedである以上、レイアウトを扱う部分とモジュールの部分は別コンポーネントになるべきだ。もし必要になるのであったらそれはCSSの話じゃなくてコンポーネントを責務にわけた設計にしたほうが良い。

コンポーネント内でのクラス名はBEM的なのが良さそう。BEMのツライところとして、1つのまとまりだけどHTMLの構造上Elementが多層になったりするとBEMのルールだけではなかなかやりづらいようなことがある。BEEMとかにしたいときとかあるはず。BEMの規則にのっとるとこれはダメなので別のブロックとしてとらえてまた別の命名を考える、となるんだろう。けどコンポーネント指向の場合、そんなに多層になるのであればそもそもコンポーネントの切りかたが悪そうな気もしてくる。

BEMで言うモディファイア、SMACSSで言うステートは、SMACSS流にのっとって`is-state`とか`has-state`と`is`もしくは`has`プレフィックスをつけて、変化するところだけを指定する。これはその状態が変化したときには、SMACSS的にマルチクラス的に指定してクラスを付けかえるほうがやりやすい。`has`も加えたのは、`is`だけだと意味がおかしいことがあるので。

その結果、僕が「これでいってみよう！」と思ったのは、Scopedなコンポーネント内だけで
```
.some_block--some_element.is-state
```
というような書きかた。

説明すると

+ 複数語の場合、単語の区切りは`_`（アンダースコア1つ）
+ 階層的になる場合、`--`（ハイフン2つ）でつなげる
+ 状態の変化した場合の指定は`is-`もしくは`has-`というプレフィックスのクラスを足す

ここでBEMに慣れ親しみすぎてると「おいおいハイフンとアンダースコアの使い方が変じゃない？」と思うかもしれない。僕がこう定めてみたのにはちゃんと理由があって、文字の選択をする場合などで

+ ハイフンで区切られた単語はハイフンを挟んで別の単語として認識される
+ アンダースコアで区切られた単語は1語として認識される

という特徴があるため。試しに上の`some_block`とか`some_element`とかをダブルクリックとかで選択してみてほしい。

ブロックと要素の区切りがハイフン2つにしたのは、BEMがやってるように、前後は別のまとまりというのを認識しやすくするため。単語の区切りが1つはなのはそれとの差別化。これでBEMに慣れすぎていても、blockとelementは違うくくりだな、と混乱しないようになってると思う。

## まとめ
ScopedなCSSをメインで書くようになってから、命名ルールすら適当でも問題なくできちゃうぐらい便利で、今までなあなあで来てしまってた。それでもやっぱりルールは欲しいもので、あっちではBEMっぽく書いてこっちではSMACSSっぽく書いて、みたいにやってしまってたのでなんかずっと喉につかえた小骨のように気持ちわるかった。

単純な静的なページでもReact, Angular, Vueなどが使われはじめてみんなScopedなCSSで書けるようになってきていて最近は以前ほどOOCSS派生のルールみたいなものを聞かなくなってた気がする。それでも今回、一応自分の中では「こういうルールで行く！」と思えるようなものを決めれたのはなかなか良かったと思う。

他のみなさんはこのコンポーネント時代のCSS命名をどのようなルールでやってるか凄く興味があるなぁ。
