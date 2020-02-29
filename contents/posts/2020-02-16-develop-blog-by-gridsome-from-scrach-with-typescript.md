---
title: Gridsomeでイチからブログを作る - 環境構築 with TyepeScript
slug: develop-blog-by-gridsome-from-scrach-with-typescript
tags:
  - 開発
  - blog
  - Gridsome
  - Vue.js
date: 2020-02-16T01:54:56.249Z
---
静的サイトジェネレータの1つにGridsomeがあります。Vue.jsベースですが、ReactベースのGatsby.jsというフレームワークに強くインスパイアを受け開発されています。

今回はStartarと呼ばれるScaffoldingを使わずに、必要なpluginだけ都度いれていくスタイルでイチからブログを構築していきます。

## Gridsome is何？
<LinkCard url="https://gridsome.org/" title="Modern Site Generator for Vue.js - Gridsome" description="Gridsome is a free &amp; open source Vue.js-powered framework for building websites &amp; apps that are fast by default 🚀." />
GridsomeはVue.js版のGatsby.jsのとも言えるJAMstack思想のものと開発されている静的サイトジェネレータです。静的サイトとしてビルドされるので高速かつセキュアに動作する上、Vue.jsの開発の知見がそのまま使えることが特徴です。

もちろんテンプレートHTMLとScoped CSSを使ってサイトを開発していけるため、Vue.jsに慣れている方にとっては手軽に、そして慣れてない方にはVue.jsの入門としても良いかもしれません。

サイトの内容はmarkdownファイルで書いていくことはもちろん、WordPressはContentfulなどのCMSとも合わせてつかうこともできます。

## なぜ今回Starterを使わないで作るのか
Starterと呼ばれるScaffoldingは便利な反面、ものによっては更新されておらず、内部で使われている技術が古ものだったり、カスタマイズしずらかったりします。
一定期間のみのサイトや作って終りのサイトならともかく、継続的に更新していくものだとすると、依存は少ないに越したことはありません。

また多くの場合、そこまで複雑なこともしていないためイチから必要に応じてプラグインを組み合わせていくスタイルで最新かつ柔軟な環境を作っていきたいと思います。

## Gridsomeのインストール
[Introduction \- Gridsome](https://gridsome.org/docs/#how-to-install)
に従って進めます。

事前にNode.jsをインストールしておいたとこから
```sh
$ npm install --global @gridsome/cli #グローバルにCLIをインストール
$ gridsome create blog-sample # blog-sampleがプロジェクトの名前
$ cd blog-sample # 生成されたプロジェクトに移動
```
という感じですね。Starterを指定しないことで、自動でDefaultのStarterが使われます。

## ディレクトリとファイル構成を知る
公式にはここに説明があります。
[Directory structure \- Gridsome](https://gridsome.org/docs/directory-structure/)

生成されたGridsomeのディレクトリはこういう感じです。
```
├── gridsome.config.js
├── gridsome.server.js
├── src
│   ├── components
│   ├── favicon.png
│   ├── layouts
│   │   └── Default.vue
│   ├── main.js
│   ├── pages
│   │   ├── About.vue
│   │   └── Index.vue
│   └── templates
└── static
```

主には`src`の中を触っていく感じになりますが、ざっと見てみましょう。

+ `gridsome.config.js`: 基本となる設定ファイル
+ `gridsome.server.js`: 通常の設定とは別に動的になにかを生成したりするときに使います
+ `src`: Vue.jsベースの開発は基本この中でやっていきます
  + `components`: ページやレイアウトの中で使うパーツごとのコンポーネントはこの中
  + `layouts`: コンテンツによってレイアウトを指定できます。そのための各レイアウトを格納するところ
    + `Default.vue`: デフォルトレイアウト。特に必要なければこれだけでも十分です
  + `main.js`: グローバルスタイルやスクリプトの設定、ClientAPIの使用など
  + `pages`: ここに追加したものが自動的にページとして扱われます
    + `Index.vue`: rootになるもの
    + `About.vue`: サンプルとして作られています。ここには`/about`でアクセスできます
  + `templates`: Pagesで作る以外、特定のデータソースを元にした内容を表示するための`vue`ファイルを格納します
+ `static`: ビルドされたときにプロジェクトルートにあたるところに配備されるものです。例えば`robots.txt`などのために使います

その他にも適宜ファイルやディレクトリを追加していきますが、それはその都度説明します。

## TypeScriptを導入する
使いたくなってから導入するのはツラいこともあるので、最初から入れてしまいましょう。TypeScriptのTypeScriptたる書きかたをせずに設定次第ではJSとしても書けるので、今から導入しない手はないでしょう。

まず、TypeScript用のプラグインを入れます。
基本的には
[gridsome\-plugin\-typescript \- Gridsome](https://gridsome.org/plugins/gridsome-plugin-typescript)
に書いてあるとおりでOKです。

```
$ yarn -D typescript ts-loader gridsome-plugin-typescript
```

次にconfigにpluginを使うのを追記します。
```
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    }
  ]
}
```

tsconfigというTypeScriptのコンパイルオプションを設定します。
プロジェクトのルートディレクトリに`tsconfig.json`ファイルを作成して以下のように書きます。
（ここはオリジナルのドキュメントとちょっと変えました）
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "outDir": "./dist/",
    "sourceMap": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ],
      "~/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "./src/**/*",
    "./plugins/**/*",
    "./gridsome.config.js",
    "./gridsome.server.js"
  ]
}
```

最後に型定義ファイルを設定します
`src`ディレクトリ直下に`vue-shims.d.ts`というファイルで以下のように書きます。
```
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
```

以上で設定は完了です。これで従来`*.vue`ファイルの中で`<script>`と書いていた場所を`<sciprt lang='ts'>`とするとTypeScriptで記述できます。
同様に`main.js`も`main.ts`とするとTypeScript`で書くことができます。

### Linter(ESLint)を設定する
Linter（静的構文解析）のないプログラミングなんて現代ではやっちゃいけないことだと思っていますので、JavaScript用のLinterであるESLintを導入します。ESLintでは追加でプラグインによってTypeScriptや、フォーマッタのPrettierにも対応できるのでいっぺんに全部やってしまいます。

まず必要なライブラリをガっと入れてしまいましょう。

```
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue gridsome-plugin-typescript prettier
```

ESLintの細かい設定は複雑で、解説するとそれだけで1冊本が出てしまうんじゃないかというレベルなので細かい話は割愛します。

ライブラリのインストールが終わったら忘れないうちに除外設定を入れます。
`.eslintignore`というファイルをプロジェクトルートに作り
```
# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist
# don't lint nyc coverage output
coverage

*.d.ts
src/.temp
```
これは[typescript\-eslint/README\.md at master · typescript\-eslint/typescript\-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)にあるものに手を加えただけのものです。

そして闇深い設定ファイル`.eslintrc.js`も作って以下のように書きます。
```js
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2018,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'vue',
    'gridsome',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:gridsome/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],
  rules: {
    'prettier/prettier': ['error',
      {
        printWidth: 80, // sample
      }
    ],
    'quotes': ['error', 'backtick'], // sample
  },
}
```

設定の方針としては、Vue.js用の設定をしつつひとまず推奨設定をひととおり、という感じです。
`extends`がキモではありますが、ここは記述順に敏感な箇所なのでカスタムする場合はご注意ください。

最後のルールは追加ルールでサンプルを記載しました。ここはprettierの設定、ESLintやTypeScriptの設定をお好みで書いてください。

`.eslintrc`ファイルは他にもYAMLやJSONでも書けますが、コメントが書ける、式がかける、という点で優位なJSで書くのがオススメです。

以上でESLintはOKです。すでに存在する既存のJSファイルやVueファイルにも修正が必要ですが、そこは適宜なり一括なりでfixしてください。

### Composition APIに対応する
Gridsomeで今現在使われているVue.jsは2.6系ですが、v3では従来の書き方に加えCompositionAPIが追加される予定です（従来の書き方はOptionAPIと呼称されます）。

実はv2でもライブラリによってComposition APIを使えるようになるので、今のうちから取り入れてしまいましょう。

まずは必要なライブラリをインストールします。
```
$ yarn add -D @vue/composition-api
```

次にGridsome内で使えるようにします。デフォルトの`main.js`を以下のように変更します。

```js
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueCompositionApi from '@vue/composition-api'

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component(`Layout`, DefaultLayout)
  Vue.use(VueCompositionApi)
}
```

`VueCompositionApi`を`import`して`use`するだけです。
もちろん前に説明したように`main.ts`にしてもOKです。ただしその場合はtsconfigやESLintの設定によってはエラーが出るので適宜修正してください。

これで`*.vue`内で使えるようになりますので例として`src/pages/About.vue`で試してみます。
以下のように変更します。
```vue
<template>
  <Layout>
    <h1>About us</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque
      omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum
      odit fugit assumenda rem dolores inventore iste reprehenderit maxime!
      Iusto.
    </p>
    <button @click="increment">count up {{ state.count }}</button>
  </Layout>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
export default createComponent({
  setup() {
    const state = reactive<{ count: number }>({
      count: 0,
    })
    function increment() {
      state.count++
    }
    return {
      state,
      increment,
    }
  },
})
</script>
```
これで、`http://localhost:8080/about/`にアクセスしてみて、ボタンを押すたびにカウントアップされていれば成功です。

## まとめ
今回はGridsomeでのサイト開発の環境構築をTypeScriptを導入するところまでやってみました。
やってしまえばどうってことないんですが、最近のフロントエンドは使うライブラリが多くなりすぎてツラみがありますね。
