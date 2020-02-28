---
title: ブログシステムをVuePressに移行しました
tags:
  - 開発
  - Blog
  - Vue.js
date: 2019-06-30T10:00:00.000Z
image: /images/covers/2019-06-30-replace-blog-system-to-vuepress.jpg
---
以前、VuePressを使ってみたという記事を書きましたがその続編というか実際にブログをリプレイスしてみた所感です。結論から言えば、VuePressで本格的にブログをやるのはまだちょっと早い、という印象でした。

<LinkCard url="https://blog.solunita.net/vuepress-first-impression/" site-name="Trial and Spiral" title="VuePressを使ってみた所感" description="先週、毎週最低1記事を書くチャレンジを再スタートさせたんですが、どうせだからブログシステム自体をリニューアルしようと考えています。そこでVuePressはどうかな？ と思って使ってみた所感。" image-url="https://blog.solunita.net/ogp_default.png" />

## VuePressについて
<LinkCard url="https://v1.vuepress.vuejs.org/" title="VuePress 1.x" description="Vue-powered Static Site Generator" />

以前も書きましたが、いわゆる静的サイトジェネレータです。もとはドキュメント用として始まったようですが、やはりBlogとしての用途も検討はされているようです。同系統のGatsby.jsやNuxt.js、Gridsomeよりもさらに静的サイトジェネレータ寄りです。

前回の触ってみた時点ではアルファ版でしたが、今は正式にv1がリリースされました。それに伴ないブログ系のプラグインなども変わっています。

## VuePressでブログをやること
**「現時点」では正直オススメしません**。ブログとしての方向性は一応NPMとしては`@vuepress`配下に`plugin-blog`として存在する

<LinkCard url="https://www.npmjs.com/package/@vuepress/plugin-blog" site-name="npm" title="@vuepress/plugin-blog" description="Offical blog plugin for VuePress" image-url="https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png" />

があります。これは前述のように公式でブログサポートは議論されていて、いちおうそこで認められてはいるようです。

<LinkCard url="https://github.com/vuejs/vuepress/issues/36" site-name="GitHub" title="Blog Support roadmap (Resolved) · Issue #36 · vuejs/vuepress" description="Hello, I&amp;#39;m excited to use vuepress for my personal website but I kinda want blog support before I switch, so I was thinking I&amp;#39;d kickstart that discussion on that now. This issue is to seek ..." image-url="https://avatars1.githubusercontent.com/u/6128107?s=400&v=4" />

VuePressのオフィシャルには載っていないんですが、リポジトリ側ではオフィシャルと言っていますね。単純にドキュメントの更新が追いついてないだけかな。

ですが、blog-pluginのGitHubのほうで言及があるように`Status:WIP`になっていますし、またメインで開発している方が同じく作っているBlogテーマが前提になっているような感じです。

<LinkCard url="https://github.com/ulivz/vuepress-theme-blog" site-name="GitHub" title="ulivz/vuepress-theme-blog" description="Default blog theme for VuePress. Contribute to ulivz/vuepress-theme-blog development by creating an account on GitHub." image-url="https://avatars0.githubusercontent.com/u/23133919?s=400&v=4" />

つまり何が言いたいかというと、VuePress自体の完成度はかなり上がってv1になって実用レベルになっているんですが、ブログに関するプラグインや知見についてはまだまだ育ちきってないようです。

ブログプラグインのReadmeに載っているフィードやOGPまわりといったブログにとって生命線というべき部分もカバーしきれてないのが痛いです。

別のプラグインを使えばなんとかなる部分もあり、がんばって自作すればできるとは思います。ただしそれはなかなかに大変ですね。

## 僕の場合
と、こう書いておいてなお僕が移行した理由は単純に後に引けなくなった、という側面が強いですね。v1になるちょっと前にカスタムしてそろそろできた！　という段階でv1が発表されBlogプラグインにも修正が入り、使い方も変わったりして作業が巻き戻ったりとなかなかにハードでした。まあこれは完全にタイミングが悪かったですね。

今この知見をもってVuePressを選択するか、というとNOですね。本当に時期尚早ですね。逆に言えばブログ周りのプラグインが育ちきってくればYESになる日もくるでしょう。

プラグインやカスタマイズまわりは割とシンプルで、Plugableみたいなイメージですね。なので既存のものを上手くつかってもできない場合は自分で実装すればいいや、と思います。思いますが、それってもうVuePressを選ぶ意味ないのでは……とも思います。

また、まだ若いプロジェクトということは同時にドキュメントもしっかりしていないという状況もツライですね。

Hexoに比べてどうか、というとうーんHexoのほうが今はまだブログとしてはやりやすいかもですね。ただしテーマを自作となるとVue.jsのSFCやScopedCSSまわりはかなり開発しやすいので甲乙つけがたいです。

今回僕は前述のブログテーマをフォークしつつベースはそちらにのっとりながらガシガシに自作しました。開発自体はVue.jsの知見がちゃんとあればそこまで苦労しないです、ここは良いところですね。

VuePressも火がつけば開発者も開発スピードも上がって快適な状況ができてくるとは思うんですが、Gatsby.jsやGridsomeよりもさらに静的サイトジェネレータなので、JAMStack良いよね！　みたいな風潮についていけないので成長も緩やかなままかもなあと予想しています。ただし以前も述べたようにVueのEvanさんが開発しているというのは強みですね。

全然VuePressと関係ないところで言えば、OGPをちゃんとやろうと思ってロゴを少しアップデートしました。なかなか良くなったなと思っています。ちなみにロゴや家紋みたいなアイコンは全部自作しています。わりとそういう作業は好きです。

## まとめ
+ VuePressはブログ利用にはまだ早い
+ やるならテーマ開発からやる知識と根性が必要
+ 開発自体はしやすいし、plugableなレイヤー構造も良い感じだとは思います
