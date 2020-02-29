---
title: StylusをlintとformatでSupremacyにしよう
slug: format-and-lint-stylus-as-supremacy
tags:
  - 開発
  - フロントエンド
  - CSS
  - Stylus
  - VSCode
date: 2020-01-14T01:30:00.000Z
---
CSSメタ言語（CSSプリプロセッサ）といえばSass(SCSS)がデファクトスタンダードですが、個人的にはStylusが大好きです。Stylusは高機能であると同時に記法に自由度があるのが良くもあり、逆に言えばカオスを作りやすいです。
そんなStylusにlinterとformatterを用いて秩序を持ちこみSupremacy（至高）にしようというお話です。

## Stylus is何？
前述のとおりLessやSassと同じようなCSSプリプロセッサです。SCSSより後発なため、LessとSassと良いとこどりと言われるように、高機能かつ自由度が高いのが特徴です。

<LinkCard url="http://stylus-lang.com/" title="Expressive, dynamic, robust CSS — expressive, robust, feature-rich CSS preprocessor" />

SCSSのように`{}`で書くこともできれば、SASSのようにインデントベースで書くこともできます。またプロパティの`:`や行末の`;`も書かなくても扱えます（書いてもよい）。

さらに特徴的なのが透過的mixinと呼ばれる拡張機能です。他のプリプロセッサのように呼び出しに記号が必要ないためあたかもCSSプロパティの1つのように書くことができます。変数にも記号が必要ないのでこれも透過的に設定してくことができます。

また、組み込み関数も豊富で特になにも入れずに色の計算や合成も楽にこなせます。

### 個人的意見
個人的にはインデントベースに書けるのが魅力的です。CSSの複数のプロパティを1行に書くことってありますか？　ないですよね？　となると行末を示す`;`は必要ないはず。SCSSを書くときにネストしたクラスをインデントしないで書くことがありますか？　ないですよね？　となると`{}`で囲む必要もありませんよね。

必要ないものを極力排除すると、ノイズが減り、本質が見やすくなります。同時にミスも減ります。個人のクセが排除され誰が書いても同じになってきます。これは共同作業をするうえで重要だと考えています。

透過的mixinは書いてて楽しいです。使いやすいプロパティライクな関数で設定していけるのはあたかもCSSを拡張してるようです。が、あまりオレオレ関数を使いすぎるとカオスを生み出す原因になるのでほどほどに。透過的であるがゆえに、CSSの知識がないとそれが透過的mixinなのか、CSSプロパティなのか判別しにくくなってしまいます。

そして`import`が生のCSSも読み込めるのも大きなポイントです。これによってCSSで提供されているライブラリなども自由に組み合わせていけます。

## Stylintでlintする
StylusにはStylintというlinterライブラリがあります。他のCSS用linterと同様に設定にそぐわない書き方を静的解析して検出します。

<LinkCard url="https://simenb.github.io/stylint/" title="Stylint by rossPatton" />

良くできて必要十分な機能を持ちますが、CSSやSCSS用のlinterであるStylelintと名前が紛らわしいのが難点です。

よくあるlinterと同様に`.stylintrc`というファイルに設定を書いて適用できます。扱いに困ることは特にないでしょう。

## Stylus Supremacyでformatする
さらにStylus Supremacyというformatterも存在します。こちらもよくあるformatterと同様に静的解析し自動修正もできます。

<LinkCard url="https://thisismanta.github.io/stylus-supremacy/" title="Manta&#39;s Stylus Supremacy" description="Make your Stylus files look great again!" />

公式ページが良く書かれていて、各設定項目がどう違うかひと目でわかるのはもちろん、インタラクティブに設定を変えて変更した結果も見ることができます。

さらに特筆すべきはStylus Supremacy側で前述のStylintとの統合が図られ、`.stylintrc`内にSupremacy用の設定を書いて両方の設定を1ファイルで適用できます。もちろん両方の設定に従って自動修正が効きます。

この両方を設定し効かせることで冒頭に言ったようにStylusの諸刃の剣でもある自由度の高い書き方に秩序を生み出し、弱点を克服することが可能になります。

### 設定例
一例として僕の使っている設定を記載しておきます。
```json
{
  "blocks": false,
  "brackets": "never",
  "colons": "always",
  "colors": "always",
  "commaSpace": "always",
  "commentSpace": "always",
  "cssLiteral": "never",
  "customProperties": [],
  "depthLimit": false,
  "duplicates": true,
  "efficient": "always",
  "exclude": [],
  "extendPref": "@extend",
  "globalDupe": false,
  "groupOutputByFile": true,
  "indentPref": 2,
  "leadingZero": "always",
  "maxErrors": false,
  "maxWarnings": false,
  "mixed": false,
  "mixins": [],
  "namingConvention": false,
  "namingConventionStrict": false,
  "none": "always",
  "noImportant": true,
  "parenSpace": "never",
  "placeholders": "always",
  "prefixVarsWithDollar": "always",
  "quotePref": "single",
  "reporterOptions": {
    "columns": [
      "lineData",
      "severity",
      "description",
      "rule"
    ],
    "columnSplitter": "  ",
    "showHeaders": false,
    "truncate": true
  },
  "semicolons": "never",
  "sortOrder": "alphabetical",
  "stackedProperties": "never",
  "trailingWhitespace": "never",
  "universal": false,
  "valid": false,
  "zeroUnits": "never",
  "zIndexNormalize": false,
  "stylusSupremacy.alwaysUseImport": true,
  "stylusSupremacy.alwaysUseNot": false,
  "stylusSupremacy.insertNewLineAroundBlocks": false,
  "stylusSupremacy.insertNewLineAroundImports": true,
  "stylusSupremacy.insertNewLineAroundOthers": false,
  "stylusSupremacy.insertNewLineBeforeElse": false,
  "stylusSupremacy.insertParenthesisAfterNegation": false,
  "stylusSupremacy.insertParenthesisAroundIfCondition": true,
  "stylusSupremacy.newLineChar": "\n",
  "stylusSupremacy.preserveNewLinesBetweenPropertyValues": true,
  "stylusSupremacy.selectorSeparator": ",\n",
  "stylusSupremacy.sortProperties": "alphabetical"
}
```

### 修正例
前述のとおり、StylusはSCSS的な書き方もできればSASS的な書き方もできます。試しにSCSS的に書いたものを上記設定に基いて変換してみた例を紹介します。

```
$font-stack: Helvetica
$primary-color: #333

body {
  font: 100% $font-stack;
  color: $primary-color;
}
#main {
  width: 600px;
  p {
    margin: 0 0 1em;
    em {
      color: #f00;
    }
  }
  .notesArea {
    border: 1px solid $red;
  }
}

.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

これをStylint, Supremacyを効かせたStylusにすると
```
$font-stack: Helvetica
$primary-color: #333
body
  color: $primary-color
  font: 100% $font-stack
#main
  width: 600px
  p
    margin: 0 0 1em
    em
      color: #f00
  .notesArea
    border: 1px solid $red
.nav
  ul
    list-style: none
    margin: 0
    padding: 0
  li
    display: inline-block
  a
    display: block
    padding: 6px 12px
    text-decoration: none
```

のようになります。SCSSに慣れすぎた人にとってはカッコがないとわかりにくのかもしれませんが、慣れです。ちゃんとシンタックスハイライトが効けば全然問題なくなるでしょう。

## Vue.jsで使う
Vue.jsの単一ファイルコンポーネント（SFC）ではStylusも扱えます。VuePressなどオフィシャルに近いものでも実際に使われているほか、Vuesaxなどコンポーネントライブラリでも採用されています。

しかし残念ながら`eslint-plugin-vue`と`prettier`の関係のように完成されたエコシステムにはStylintもSupremacyも対応できておらずCLIだけでの自動修正は対応できていない現状です。

とはいえ、打つ手がないわけではなくVSCodeのVeturという拡張にStyleがStylusの場合、Supremacyをかけることができます。エディタ依存になってしまうため、CIなどで制御することは難しいですが、それでも可能なことは喜ぶべきです。

<LinkCard url="https://marketplace.visualstudio.com/items?itemName=octref.vetur" title="Vetur - Visual Studio Marketplace" />

## 感想
僕はCSSプリプロセッサの中ではStylusが一番好きです。関数も書きやすいし、よりJSを書くような感じで書けるのが良いところです。また前述のようにCSSやHTMLのようにエラーを明示せずに吸収してしまような場合、より明確にエラーになるインデントベースの記法が適していると思っています。
（余談ですが、SCSSとSASSを選べるならSASSを選びます）

とは言うものの、SCSSがすでに対応してるエコシステムに載っかることが難しく、だからこそシェアも伸びず、というなかなかツライ現状なのが正直なところです。

それでもStylintやSupremacyを使えば、Stylusの弱点を克服し実用十分どころか高機能で書きやすいものへと引き上げてくれるでしょう。
Stylus自体は使ったことがあっても、linterやformatterまで指定されているのをあまり見たことがないので言及してみました。一人でもStylus好きな人が増えますように。
