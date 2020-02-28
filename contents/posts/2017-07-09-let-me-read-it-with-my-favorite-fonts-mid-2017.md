---
title: 俺の好きなフォントで読ませろ2017年夏決定版
date: 2017-07-09T00:00:00.000Z
tags:
  - カスタマイズ
  - 開発
  - Hack
  - CSS
  - Mac
image: /images/covers/2017-07-09-let-me-read-it-with-my-favorite-fonts-mid-2017.jpg
---
俺の好きなフォントで読ませろ2017年夏決定版
------------------------------------------------------------

WebサイトにCSSを書くとき、`font-family`をどうするか問題。そこに銀の弾丸はない。常々、サイト側がfont-familyを設定するのは装飾的な要素のフォントを使うとき以外はエゴだと思ってる。かといってレガシーめなブラウザだとあまり美しくないフォントがデフォルトになってることもまだあるので、やはりfont-familyをある程度設定されるのは今のところは仕方ないと思ってる。

俺は俺の好きなフォントで読むぜ
------------------------------------------------------------
そもそもだ、あまり読みやすさにこだわってるサイトはそんな多くない気がする。特に日本語のブログ界隈。そこで、もういっそ俺の好きなフォント設定で読ませやがれ、と思ってStylishで殴りつける方法で解決することにした。  
註：[Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=ja)：ユーザー側でスタイルシートを設定できるブラウザ拡張。

Gist
------------------------------------------------------------
```css
/*
Force global font setting
^(?!https?://(.*).?(localhost|192.168.)).*$
*/

@font-face {
  font-family: 'Noto Sans';
  font-weight: 100;
  font-weight: 200;
  font-weight: 300;
  font-weight: 400;
  font-weight: 500;
  src: local('NotoSans');
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans';
  font-weight: 600;
  font-weight: 700;
  font-weight: 800;
  font-weight: 900;
  src: local('NotoSans-Bold');
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans CJK JP';
  font-weight: 100;
  font-weight: 200;
  font-weight: 300;
  font-weight: 400;
  font-weight: 500;
  src: local('NotoSansCJKjp-Regular'),
       local('SourceHanSansJP-Regular'),
       local('Noto Sans CJK JP'),
       local('Source Han Sans JP'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.woff2) format('woff2'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.woff) format('woff'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Regular.otf) format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans CJK JP';
  font-weight: 600;
  font-weight: 700;
  font-weight: 800;
  font-weight: 900;
  src: local('NotoSansCJKjp-Bold'),
       local('SourceHanSansJP-Bold'),
       local('Noto Sans CJK JP'),
       local('Source Han Sans JP'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff2) format('woff2'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.woff) format('woff'),
       url(//fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Bold.otf) format('opentype');
  font-display: swap;
}
@font-face {
  font-family: 'YakuHanJPs';
  font-weight: 100;
  font-weight: 200;
  font-weight: 300;
  font-weight: 400;
  font-weight: 500;
  src: url("https://cdn.jsdelivr.net/npm/yakuhanjp@2.0.0/dist/fonts/YakuHanJPs/YakuHanJPs-Regular.woff2") format("woff2"),
      url("https://cdn.jsdelivr.net/npm/yakuhanjp@2.0.0/dist/fonts/YakuHanJPs/YakuHanJPs-Regular.woff") format("woff");
  font-display: swap;
}
@font-face {
  font-family: 'YakuHanJPs';
  font-weight: 600;
  font-weight: 700;
  font-weight: 800;
  font-weight: 900;
  src: url("https://cdn.jsdelivr.net/npm/yakuhanjp@2.0.0/dist/fonts/YakuHanJPs/YakuHanJPs-Bold.woff2") format("woff2"),
      url("https://cdn.jsdelivr.net/npm/yakuhanjp@2.0.0/dist/fonts/YakuHanJPs/YakuHanJPs-Bold.woff") format("woff");
  font-display: swap;
}
*:not([class*="ico"]):not(.fa):not(.DPvwYc):not(i){
  font-family: 'Noto Sans', 'YakuHanJPs', 'Noto Sans CJK JP', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
}
h1, h1 *:not(p), h2, h2 *:not(p), h3, h3 *:not(p), h4, h4 *:not(p), h5, h5 *:not(p),
li, li *:not(p), dd, dd *:not(p), dt, dt *:not(p), th, th *:not(p), td, td *:not(p),
figcaption, figcaption *:not(p), caption, caption *:not(p),
cite, cite *:not(p), label, label *:not(p), select > option {
  font-feature-settings: "palt" 1;
}
pre, pre *,
code, code *,
kbd, kbd *,
samp, samp *,
var, var *,
.blob-wrapper * {
  font-family: Hasklig, 'Source Han Code JP', monospace !important;
  text-align: left;
}
p {
  letter-spacing: 0.038em;
  word-wrap: break-word;
  font-feature-settings: "palt" 0;
}
:lang(en) p {
  text-align: left;
}
```

ちょっと説明とか
------------------------------------------------------------
### 使用フォント
以下のフォントを使ってるのでまんま使うならインストールしておいてください。

+ 源真ゴシック
+ Noto Sans
+ Hasklig
+ Nasu

完全に個人的な趣味。アルファベットはNoto Sansを使って、日本語は源真ゴシック。コーディングフォントはまだ納得行ってないけど今のところ良く使ってる構成で。こういう和英混植の場合の英字フォントを先に指定して、優先させるハックは好みのフォントを設定しやすいので好き。

もし好きなフォントがあって使いたかったら適宜CSSを修正してください。

### 上手く表示できないこと
コード表示まわりはいろいろややこしかったりするんですが、上手いこと全称セレクタとか`:not`セレクタとかで回避したつもりです。が、対応しきれない場合があります（特にアイコンフォント）。

行がぴっしりそろうように、スペースで単語を区切らない日本語を逆手にとった`text-align:justify`ハックしてます。故に、日本語だけのときはいいんですが、長めのアルファベットが連続した場合、行の表示が変になることがあります。

### 適用範囲
頭の部分にコメントアウトしてあるけど、開発するときは当たってほしくないので正規表現でサイトを指定。Stylish側の設定が「正規表現がマッチするサイト」という形なので、正規表現は設定したドメインを「含まないもの」にしておく。お好みで。

フォントに関してあれこれ
------------------------------------------------------------
一番いいのは、既存のフォントを元に自分の好きなフォントを組み合わせてつくれたら良いんだけど。Font forge使ってやろうとしたけどリガチャ回りとか上手くいかず挫折。そのうちまたチャレンジする。

次に良いのはブラウザ側の標準機能で、英字フォントはこれ、和文にはこれ、monospaceだったらこれ、みたいにできればいい（現状ある程度は細かくできるけど）。ただし、これだと冒頭で言ったようにサイト側のCSSに設定されてるとアウトなので痛し痒し。これが「font-familyの決定版！」とか言うのにエゴだと良いたくなる元凶。

ただ、せっかく作ったサイトをあまり美しくないフォントで見られるのはたまらねえ、って意見もわからなくない。けど、それこそがエゴなんだけど。そんなことを言う前に`letter-spacing`と`line-height`を追いこめ（上記設定でどちらにも触れてないのは、一律にStylishで汎用的に上書きするのが難しかったため、妥協した）。

OSのデフォルトフォントと、ブラウザのデフォルトフォントと、捨てられない下方互換が生んだ膿なんだろうなぁ。ブラウザのデフォルトフォント問題はそのうち解決されそう。なのでサイト側のCSS最適解が`font-family:sans-serif;`だけになるのもそう遠くない日だろう。
