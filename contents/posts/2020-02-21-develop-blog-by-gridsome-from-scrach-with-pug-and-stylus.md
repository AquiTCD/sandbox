---
title: Gridsomeでイチからブログを作る - 環境構築 with Pug and Stylus
slug: develop-blog-by-gridsome-from-scrach-with-pug-and-stylus
tags:
  - 開発
  - blog
  - Gridsome
  - Vue.js
  - Pug
  - Stylus
date: 2020-02-20T22:09:46.260Z
---
さて今回も前回に引き続き、Vue.jsベースのSSG（静的サイトジェネレータ）であるGridsomeを使ってブログを作っていきます。今回は、HTMLにPug、CSSにStylusを使えるように設定していきます。つまりまだ環境構築です。

## Pug is何？
<LinkCard url="https://pugjs.org/api/getting-started.html" title="Getting Started – Pug" />

PugはHTMLのメタ言語であり、CSSに対してのSassやStylusなどと同様のものです。以前はJadeという名前でしたが、バージョンがあがったときに権利まわりの問題からPugに改称されました。

特筆すべきは、インデントベースで簡略化した記法でありながらもJavaScriptでの変数や式、ブロック展開まで備え、機能としても申し分ないところでしょう。

また、同じようなHTMLテンプレートにSlimというRubyで実装されたものがありますが、このSlimの記法と酷似しているため、すでにSlimを使ってる方は学習コストがぜんぜんかからずに導入できるのも魅力です。

たとえばHTMLで書くと
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Pug</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5)
    </script>
  </head>
  <body>
    <h1>Pug - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>Pug is a terse and simple templating language with a strong focus on performance and powerful features.</p>
    </div>
  </body>
</html>
```

のような文書を、Pugで書くと

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```
のように書くことができます。

### Pugを使うべきか否か
個人的には大好きなのですが、世間的には賛否両論あるようです。良いところは記法がシンプルなところです。単純に記述量が減ります。インデントベースなのでタグの閉じ忘れがなく、HTMLの階層構造がそのままコードに反映されるため、見通しが良くなります。

否定的な意見として、Vue.jsで使う場合に特に良く言われるのがLinter、Formatter(≒Prettier)の対応ができていないこと。リント、フォーマットはHTMLのようなValidな書きかたに従わなくてもブラウザが吸収してくれて上手く表示してしまうものにとって特に効果があります。そしてPugも最終的にはHTMLになるので、そもそも最初からLinter,Formmatterをキッチリ決めてHTMLを書くほうが良い、という意見が一番強いように思えます。

他には単純にPug記法に対する学習コストを嫌う場合や、そもそも記法が好きになれない、という話もあるようです。

ちなみに僕はインデントベースであることで誰が書いても同じコードになりやすいことや、記法が簡素になることで見通しがよくコードリーディング時のノイズを抑えることができることに魅力を感じていて生HTMLは書きたくない派です。

## Pugを導入する
まずGridsome用にプラグインが用意されているため、そちらを使います。
<LinkCard url="https://gridsome.org/plugins/gridsome-plugin-pug" title="gridsome-plugin-pug - Gridsome" description="Pug plugin for Gridsome." />

```
$ yarn add -D pug gridsome-plugin-pug
```

そうしたら`gridsome.config.js`に以下のように追記し、
```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-pug',
      options: {
        pug: { /* `pug-plain-loader` のオプション */ },
        pugLoader: { /* `pug-loader` のオプション */ }
      }
    }
  ]
};
```

実際Pugで書きたいVueのSFC（シングルファイルコンポーネント）のファイルで`<template lang="pug">`と記述するだけです。
```markup
<template lang="pug">
  Layout
    h1 About us
    p.message
      | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque
      | omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum
      | odit fugit assumenda rem dolores inventore iste reprehenderit maxime!
      | Iusto.
    button(@click="increment") count up {{ state.count }}
</template>

<script lang="ts">
// ...略
</script>
```
なお1つのtemplate内でHTMLと混在させて書くことはできないので注意してください。

## Stylus is何？
以前も書きましたが、SassやLessなどと同様のCSSメタ言語です。柔軟な書き方ができるのが特徴です。詳しくはこちらを御参照ください。

[StylusをlintとformatでSupremacyにしよう \| Trial and Spiral](/format-and-lint-stylus-as-supremacy/)

## Stylusを選ぶべきか否か
StylusはVue.js界隈ではわりと使われる傾向にあります。が、それでもSassには遠く及びません。Stylus自体が高機能で柔軟な書き方ができますが、CSS系Linterの代表格であるStyleLintでは対応されていません。

また豊富に存在するSass系のCSSライブラリと組み合わせることも難しいです（ちなみにStylus系のCSSライブラリも多くはないものの存在します）

一応VSCodeのVuterでVueファイル内のStylusにはLintもFormmatも使うことができます。個人的には制約がなければ絶対Stylusなんですが、まあ強くはおすすめしません。

## Stylusを導入する
Stlusを導入します。ついでにPostCSSも入れちゃいましょう。

<LinkCard url="https://gridsome.org/docs/config/#cssloaderoptions" title="Project configuration - Gridsome" description="Gridsome is a free &amp; open source Vue.js-powered framework for building websites &amp; apps that are fast by default 🚀." />
にも説明がありますが、
```
$ yarn add -D stylus autoprefixer stylus-loader postcss-loader
```
でパッケージを導入後
`gridsome.config.js`に以下の部分を追記します。

```js
module.exports = {
  // 略
  css: {
    loaderOptions: {
      stylus: { preferPathResolver: `webpack` },
      postcss: {
        sourceMap: false,
        plugins: [
          require(`autoprefixer`)({
            flexbox: `no-2009`,
          }),
        ],
      },
    },
  },
}
```
あとは`<style lang="stylus">`と書くだけです。

### GlobalなCSSとScopedなCSS
Vue.jsではコンポーネントだけにスタイルの影響範囲をとどめる方法としてScopedの設定が提供されています。通常、影響範囲のコントロールがしにくいCSSでは必須の機能で、Vue.jsのコンポーネントは基本的に全てScopedで書くと思っていいでしょう。

では、ScopedではないCSSを書きたい場合はどうするか。1つのプラクティスとしては全体を包むコンポーネントにScopedを設定せずに書く方法をオススメします。
従来のCSSとは違い、個々のコンポーネントがスタイルをそれぞれ設定するようになった結果、グローバルで設定する必要があるスタイルはかなり限られます。それは通じょう、Vue.js内に記述しても問題ない程度に減るはずです。

Gridsomeの場合、App.vueが一番大きな外側のレイヤーになります。デフォルトでは存在しないのでまずこれを作成します。公式の説明はこちら。
<LinkCard url="https://gridsome.org/docs/overriding-app/#overriding-appvue" title="Overriding App.vue - Gridsome" description="Gridsome is a free &amp; open source Vue.js-powered framework for building websites &amp; apps that are fast by default 🚀." />

作ったら以下のように書いてみます。
```markup
<template lang="pug">
  router-view
</template>

// query, scriptは略

<style lang="stylus">
:root
  font-size: 16px
html
  color: #fff
body
  background-color: #000
</style>

<style lang="stylus" scoped>
// こちらにはApp.vue用のCSSを記述
</style>
```
実はVueのStyleブロックは複数書いても問題ないため、GlobalのものとScopedなものそれぞれ書きます。

### 関数や変数を共用する
Stylusも変数はもちろん、Sassのmixinのように関数を作ることができます。これらはVueのSFCを跨いで使いたいことのほうが多いため共通して使えるようにします。

ここでは1例として変数をまとめたファイルとmixinをまとめたファイルをそれぞれ用意してみます。
変数用のファイルを`src/assets/_variables.styl`とし
```stylus
$font-color-base: #f00
```
とファイルを作ります。

同じようにmixinを`src/assets/_mixins.styl`とし、
```stylus
inverted-bg-color(value)
  background-color: invert(value)
```

とします。
これをSFCから直接使うことができるようにします。
公式には

<LinkCard url="https://gridsome.org/docs/assets-css/#global-preprocessor-files-ie-variables-mixins" title="Use CSS in Gridsome - Gridsome" description="Gridsome is a free &amp; open source Vue.js-powered framework for building websites &amp; apps that are fast by default 🚀." />

にありますが、まずはloaderをインストールします。
```
$ yarn add -D style-resources-loader
```

`gridsome.config.js`で次のように`module.exports`の外と中にそれぞれ追記します。

```js
const path = require(`path`)
function addStyleResource(rule) {
  rule
    .use([`style-resource`])
    .loader(`style-resources-loader`)
    .options({
      patterns: [
        path.resolve(__dirname, `./src/assets/_variables.styl`),
        path.resolve(__dirname, `./src/assets/_mixins.styl`),
      ],
    })
}

module.exports = {
  // 略
  chainWebpack(config) {
    const types = [`vue-modules`, `vue`, `normal-modules`, `normal`]
    types.forEach(type => {
      addStyleResource(config.module.rule(`stylus`).oneOf(type))
    })
  },
}
```
そうすると、SFCを以下のように書いても、そのスタイルが適用されます。

```markup
<template lang="pug">
  router-view
</template>

// query, scriptは略

<style lang="stylus">
:root
  font-size: 16px
html
  color: $font-color-base
body
  inverted-bg-color: $font-color-base
</style>
```

## まとめ
今回はHTMLとCSSをより書きやすくするため、PugとStylusを導入しました。前回のTypeScript同様、人によっては不必要です。Sassを導入する場合も基本的には同様の手順になります。

これでようやく開発していく下地が整いました。このような記法はあとから変えると修正がたくさん発生してしまうため、方針が決まっているなら最初の段階で整えておくにこしたことはありません。

次回はMarkdownファイルを使って実際にブログとして記事を書いていく方法を紹介します（予定）
