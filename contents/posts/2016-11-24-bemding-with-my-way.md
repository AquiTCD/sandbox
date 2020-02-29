---
title: 最近割と上手くいってるオレオレBEMding
slug: bemding-with-my-way
tags:
  - 開発
  - CSS
  - Hack
date: 2016-11-24T00:00:00.000Z
---
HTML/CSSでの開発手法としていろいろあるなかで、もっとも有名ものの1つで命名規則のBEM（MindBEMding）っていうのがありまして。構成の手法としてSMACSSやFLOCSSなんていうのが、あっていったいどれがいいの？　悩んだあげくにFLOCSSベースのオレオレBEMdingに落ちついて、それが割と上手くいってるって話。

## オレオレBEMding
そもそもMindBEMdingってなに？　って話なんだけど、Block,Element,Modifierで区切ってClass名をつけていきましょうよ。構成も理解しやすいし、名前も一意になるよ（意図しないスタイルの競合が起こらない）という手法で、具体的には、`block__element--modifier`という書式が一般的。詳しくは解説のドキュメントを漁ってください。

### 壮大なる勘違い
で、なるほどな、と思ってやってたわけだけど、最初はblockとelementの真意を理解してなかった。というのも、HTMLのマークアップはけっこう入れ子になっていくもんで。それでいてBEMってのはシングルクラス的なものだとぼんやり解釈してたんだけど、結果として、BBBEMとかBEEMとか平気で書いてた。

こりゃちがった。原意的に言ってるかはよく知らないんだけど、原則的に最多の状況でBEMまでが許される。BとかBEとかBMは可。そしてその原則を守ろうとするとシングルクラスよりマルチクラス的になる。

例えば、グローバルナビを想像すると、グローバルナビはページ全体をBlockとしたときの1つのElementだけど、ナビの中のメニュー要素の1つはナビをBlockとしたElement。これをシングルクラスかつBEMにのっとることは半ば不可能で、無理にやろうとすると、BEEMとかになっちゃう。

BEMはただの命名規則にとどまらずに、BlockとElementとModifierの構造もわかりやすくするためにある。単純にトップダウン的に__で繋げていけば良いってもんじゃない。

と、これを理解せずに単純にやってたわけですよ。BEEMとか酷いときはBEEEEEMとかを量産してたわけですよ。

### オレ的BEMコンポーネント設計
そして大事なのが、Blockは自身の位置情報を保持してはいけないこと。スタイル的に言えば、positionとかmarginとかの情報は持たせない（自身のサイズやpaddingは内包する要素になるので可とする）

コンポーネント的に使うために、Block自身が自分がどこに位置するかのスタイルを持たせない。こうすると例えば、何かの変更により位置が変わったときにBlock自体のスタイルを変更する必要がなく、そのBlockを1コンポーネントとしたときに流動性が上がる。

じゃあどうやってそのコンポーネントの位置を決めるかというと、そのコンポーネントは階層構造を見ると視点を上に上げていくとコンポーネントブロックはその上のブロックに対するelement要素になるはず。そのelement要素に位置情報としてのpositionやmarginを設定することで、コンポーネントの位置を設定する。

これがマルチクラスじゃなきゃ不可能だと僕が思ってる所以。つまりそれまでトップダウン的に考えてたんだけど、ボトムアップなアプローチで考えるべきだと思いなおした。

### FLOCSSとの親和性
別にSMACSSでも良いんだけどね。FLOCSS的に上で書いたようなコンポーネント単位の部品をガツガツ切り出していく。

FLOCSS的なcomponentとprojectってどう分けるの？　と思ってたけど、componentが一番小さいパーツ、projectはcomponentを1つまたは複数内包するもの、layoutはトップダウン的にページ全体から見たもの。layoutに限ってはBEMでいうBlock部分での自身の位置をスタイルしていい例外条件にする。

つまりlayoutが複数のprojectを内包していて、projectが複数のcomponentを内包している。

ただ、このオレオレFLOCSSはちょっと自分でもまだ甘いな、と思っていて、そもそものFLOCSSが定めるprojectとcomponentの定義から外れてる気がするし、componentとprojectが上手く噛み合わないときもたまにあったり、componentの数がたくさんできてしまったりしている。これは今後の課題。

あと、自覚してるけどなおせてないのはcomponentが例えばtopButtonとか、位置を表現してしまってたりすること。これは自分の命名が悪いですね。流動可能なcomponentに位置を意味する命名をしてしまうと、他の場所で流用するときに齟齬がでるし、流用しにくいものになってしまうので。

### でちょっと小細工
で、本来のBEMでは`Block__Element--modifier`とelementには`__`、modifierには`--`という感じで区切ってつなげる。実はこれは厳格には決まってない。オレオレBEMdingだから厳格に決まってても破るけど。ちなみに単語間は-と1つのハイフンで区切る。で、僕がいろいろ調べて今使ってるのが、`pre-blockName_element.is-modifier`という書き方。

#### blockについて
blockはlower camelcaseで表記する。複数の単語を使う場合、topNaviとか、そんな感じ。これはJSで慣例的に使われてるし、CSSでスネークケースでJSでキャメルケースだと混乱しやすいので統一したかったので。かつ、prefixとして、FLOCSSの何にあたるかを一文字つける。layoutならl-、projectならp-、componentならc-。それでSASS的なファイルをパーシャルにするのも、そのとおりにする。そうすると探しやすいし使いやすいし、わかりやすい。

#### elementについて
elementも同様にlower camelcaseで表記。なのでハイフンやアンダースコアの用途が他で被らないので、`_`とアンダースコア1つだけつける。ハイフンじゃないのは、アンダースコアのほうが区切りを視認しやすいから。

#### modifierについて
ここまで書いてきたとおり、マルチクラス前提の構築なので、modifierは別クラスで当てる。こうすると、JSでのクラス変化による操作も使える。というかそれ前提の書き方になってる。prefixとしてis-を付ける。かつ、スタイルでは、その上要素があること限定で付ける。

例えばセレクタで`.c-topNavi_item.is-current`みたいに書く。CSS側でスペース空けずに書いたセレクタの場合、そこだけ限定で当たるのを利用する。SASSとか（僕は最近Stylus派だけど）なら`&amp;.is-current`とかやってもいいね。

で、これの効能が思ったより良くて、シングルクラス的にmodifierまで設定するよりも各modifier共通のスタイルはその上の段階（BとかBEとか）で普通にスタイルできるのも良い。modifierが各modifierで異なるスタイルだけ持つことのになるので無理無理BEMdingよりよっぽど自然になる。

## 今んとこ上手く割といってます
そんなこんなで結構アレンジしたけども、それでいて本質にのっとってる（気がする）オレオレBEMdingでした。BEMっぽいのは多々あるけど、ほんとにそれがいいのか、っていうのを確認できてないので、しばらくはこのオレオレBEMdingを使いながら遊んでいきます。

## 参考
<div class="cstmreba"><div class="link-card-box"><div class="link-card-image"><a href="http://okakacacao.wpblog.jp/technology/bem-re-introduction" target="_blank"><img src="http://capture.heartrails.com/128x128?http://okakacacao.wpblog.jp/technology/bem-re-introduction"></a></div><div class="link-card-info"><div class="link-card-name"><a href="http://okakacacao.wpblog.jp/technology/bem-re-introduction" target="_blank">BEM再入門 – おかかウェブ</a></div><div class="link-card-detail"><div class="link-card-detail-select">CSS 設計として有名な BEM ですが、なんとなく使っている方も多いと思います。 ...</div><div class="link-card-detail-memo"></div></div><div class="link-card-footer"></div></div></div></div>
<div class="cstmreba"><div class="link-card-box"><div class="link-card-image"><a href="http://qiita.com/mozisan/items/5d5aeef2cdeee2856ae5" target="_blank"><img src="http://capture.heartrails.com/128x128?http://qiita.com/mozisan/items/5d5aeef2cdeee2856ae5"></a></div><div class="link-card-info"><div class="link-card-name"><a href="http://qiita.com/mozisan/items/5d5aeef2cdeee2856ae5" target="_blank">BEM記法を以前よりもっと改善したいという思惑 - Qiita</a></div><div class="link-card-detail"><div class="link-card-detail-select">この記事はBEM記法を自分なりに改良したいという思惑の後続記事です。 ...</div><div class="link-card-detail-memo"></div></div><div class="link-card-footer"></div></div></div></div>
