---
title: 日本語特化のBootstrapテーマ「Ayame」を作ってみた
slug: developed-ayame-as-a-bootstrap-theme
tags:
  - カスタマイズ
  - 開発
  - CSS
date: 2017-05-03T00:00:00.000Z
---
Bootstrapテーマで日本語特化したものに「Honoka」というのがあって。
ちょっと最近Bootstrapテーマを使う機会があったため、HonokaをForkしてAyameというのを作ってみた。

![](https://raw.githubusercontent.com/AquiTCD/Ayame/master/docs/img/sample.png)

きっかけ
------------------------------------------------------------
現状でダーク系のテーマがみあたらなかったことがまず大きな理由。
それに加えてHonokaは凄く素敵なテーマだけど、個人的に日本語特化であればもうちょっと行間も調整すべきだし、
約物についても調整したい。さらにもっと個人的なことを言えば、日本語フォントは16pxだと少し小さいめな気がしてて、
できれば18pxぐらいが良いと思ってたから。

あいかわらずの自分で作ってしまえ精神。

やったこと
------------------------------------------------------------
前述のとおり、行間、文字間の調整、YakuHanJPを使用、フォントサイズの拡大。がメイン。
色はダーク系にして、せっかくなので和風の配色をとりいれてみた。
「Ayame」は僕が大好きなゲームのキャラ、天誅から女性主人公の「彩女」より。
アヤメと菖蒲をかけて、メインの色を菖蒲色にした。

Fork元のHonokaはGruntでBower対応なんだけど、それはぜんぶぶったぎった。
Gulpにして、本当はnpmとかで配布したいとは思うけどまぁとりあえずそこはおいおいで。

Scssもぶったぎった。個人的にScssよりStylusのほうが好きだから。

つまり
------------------------------------------------------------
つまるところ、かなりオレオレ仕様です。そもそも広く配布しようと思って始めなかったし、
なんかFork元とそのファミリーの命名が女性形なので、なんか適当に女性にするかー、
せっかくだから和風にするかー、日本語特化だし、みたいな感じ。

あと、リリースとかビルドとか配布とか関してももっと上手くやるべきだと思うんだけど、かなり粗削り。
まぁもともとがオレオレ仕様なものをついでに配布してみた、的なのでいいか。

実は
------------------------------------------------------------
僕はBootstrapが嫌いだ。一番の理由は`col-6`とかっていうクラス名を使うところ。
現状でのCSSフレームワークにおける最適解のひとつであろうことはわかってるんだけど、
クラス名というかHTMLのマークアップ側で確定したデザイン情報を持たせるのが良くないと思う。
マークアップは論理構造だけにすべきだ。

とはいえ、サクっとなんか作るときに、Bootstrap準拠のものがけっこうあったりして、
そこに労力を費やすべきじゃないこともしばしばあるので、今回のようにBootstrapを使うこともままある。

Ayame
------------------------------------------------------------
忘れてました。リポジトリは以下。
一応リリースのところにCSSいれてあるので、そちらを使うか、Cloneでどうぞ。

- ["Ayame" は日本語も美しく表示できるBootstrapテーマです。](http://ayame.solunita.net/)
