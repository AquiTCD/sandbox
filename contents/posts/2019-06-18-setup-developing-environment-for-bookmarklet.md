---
title: GulpとTypeScriptでブックマークレット開発環境を作ってみた
tags:
  - 開発
  - ブックマークレット
  - Jest
  - Gulp
  - TypeScript
date: 2019-06-18T23:43:31.000Z
image: /images/covers/2019-06-18-setup-developing-environment-for-bookmarklet.jpg
---

Bookmarkletってご存じですか？　最近ではあまり聞かないですが、ブラウザのブックマークに登録しておくと選択したらちょっと便利な機能があるやつです。例えば簡単に文字列を整形してコピーしたり、凄く単機能な拡張と思えば近いでしょうか。

## 作ろうと思った背景
前にも書いたように最近ちょこちょことブログをVuePressに移行しててよしぼちぼち完成だ！　と思った矢先にアルファ版だったVeuPressが正式版になって同時にブログ関係のプラグインもアップデートされました。そしたら今まで進めてた移行用のものが使えなくなってしまった。

あとは、よくある他サイトのリンクをブログカードみたいなリンク表示するやつをVueのコンポーネントで実装しようと思ったらあまり上手くいかず。あとは静的に表現したかったのもあって、それならブックマークレットでOGPとかからデータ抜いてしまえ、という苦肉の策が背景です。

## アプローチ
ブックマークレットの正体はJavaScriptの即時関数（無名関数とも言う）。なので、ペロっと書いてしまってちゃんと動けばそれでいいんですが、せっかくなので「ぼくのかんがえたさいきょうのブックマークレット開発環境」を作ってみることにしてみました。

それを目指すべきてんこもりの恩恵としては
+ Linterが効く（ESlint)
+ Formatterが効く（Prettier)
+ 型（とその補完）が効く（TypeScript)
+ Minify(Uglify)が効く
+ TDDできる

これらをまとめてビルドするのはNPM Scriptで十分かと思ったんですが、せっかくなのでGulpでやることにしました。

つまり、GulpでESLintを通したTypeSciprtをコンパイル、Uglifyしてソースとは別のディレクトリに吐かせればいい。というわけですね。

## Gulpとは
Gulp。ちょっと前に大流行したタスクランナー的なやつです（そのころはWebpackとかありませんでしたね）。v4が出る出るといってモタモタしてたらWebpackの登場で下火になった印象です。なので調べるとv3の情報がけっこうでます。

雑に言うと`gulpfile`というタスクを書いたファイルに使うプラグインと実行するタスクを書いて、コマンドから実行するやつ、という感じです。`gulpfile`はわりと読みやすいのが人気が出た理由でしょうか。

## セットアップ
まず今回の仕様に合わせてセットアップしていきます。ここではNode.jsとyarnが入っている前提です。
```sh
$ yarn init
```
して適当に対話的に設定をします。

gulpに依存するものを入れていきます。
```sh
$ yarn add -D gulp gulp-eslint gulp-replace gulp-typescript gulp-uglify
```
ただこれだけでは全然足りないのでどんどん入れます。
次はTypeScriptまわり

```sh
$ yarn add -D typescript typescript-require ts-node
```
`typescript-require`を入れるとGulpfileをTSで書くことが可能になります。

型定義ファイルも入れます。
```sh
$ yarn add -D @types/gulp @types/gulp-replace @types/gulp-uglify @types/jquery @types/node
```
jQueryは迷ったんですが、ブックマークレットでjQueryを使う方法もあるので入れておきます。

続いてESlint(+Prettier)まわり。今回はESlintの中でPrettierをかけます（最近それが良いのか分離したほうが良いのか悩んでますが、今回はこれで
```sh
$ yarn add -D eslint eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```
多分最小構成だとこれなんですが、standardとかに寄せたいのでさらに
```sh
$ yarn add -D eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
```

これでひとまず全部ですかね。ちなみにJestでテストを書くことも考えてたんですが、今回は割愛します。
（余裕があれば後日やる）

ディレクトリ構成はこんな感じです
```
├── dist
│   └── sample.js
├── src
│   └── sample.ts
├── gulpfile.ts
├── package.json
├── tsconfig.json
└── yarn.lock
```
`/src`ディレクトリで開発し、ビルドした成果物は`/dist`に入るようにします。

## ESlint設定
とりあえず一例ですが、ESlintの設定です。さきほど入れたものからわかるように、ESlint経由でTypeScriptも対応させ、Prettierも中で動かします。
```js eslintrc.js
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    jQuery: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // サンプルです
    'prettier/prettier': ['error', {
      semi: false,
    }],
    'no-eval': 'error',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: true }]
  },
}
```
`rules`のところはサンプルですが、それ以外の設定はおおむねこんな感じでしょうか。

## tsconfig
TypeScript用の設定として`tsconfig.json`を用意する必要があります。通常は
```sh
$ tsc --init
```
を実行することで作られます。今回はこんな感じにしました。
```json tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "removeComments": true,
    "strict": true,
    "noImplicitAny": false,
    "alwaysStrict": false,
    "baseUrl": "./src/",
    "paths": {
      "#/*": [
        "*"
      ]
    },
    "esModuleInterop": true
  }
}
```


## gulpfile
Gulpは`gulpfile.js`でタスクを定義するんですが、`typescript-require`を入れたので`gulpfile.ts`にTypeScriptで書いていきます。
```ts gulpfile.ts
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import ts from 'gulp-typescript'
import uglify from 'gulp-uglify'
import replace from 'gulp-replace'
const tsProject = ts.createProject(`tsconfig.json`)
const srcDir = `src`
const destDir = `dist`

export default () => {
  return gulp
    .src(`${srcDir}/*.ts`)
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(tsProject())
    .pipe(
      uglify({
        mangle: true,
        compress: true,
      })
    )
    .pipe(replace(/^(.*)$/, `javascript:$1`))
    .pipe(gulp.dest(destDir))
}
```
と、こんな感じにしてみました。tsで書いてますが、tsの要素ないですね。..
ちなみにGulpですが、v3までは`gulp.task`としてタスクを設定していましたが、v4からは`export`のJSそのままの書き方ができます。

残念ながらこのへんの情報が少ないです。現在のv4でも`gulp.task`でも書けるのでどちらでもいいのですが、どっちが良いのかイマイチわかりません。でもせっかくなので新しい書きかたでやりたいですね。

## サンプルで実行テスト
こんな感じで開発環境ができたのでちゃんとできるかやってみましょう。
`/src`の中に`sample.ts`を作って書いてみます。
```ts sample.ts
;(() => {
  const title = document.title
  prompt(`title is`, title)
})()
```

期待している動作は、ブックマークレットを実行したときに開いているページのタイトルを取得して、プロンプトに表示する、という動作です。
プロンプトに表示しておくのはコピー&ペーストしやすいようにですね。

ちなみに最初の行の`;(() => {`ってなんだ？　と思うかもしれませんが、アロー関数で即時関数を作っています。

そしたらコマンドで
```sh
$ gulp
```
を叩きます。デフォルトタスクが走りますので`gulpfile`に書いたとおり
1. リント + フォーマット
2. TypeScriptをJSに変換
3. JSを圧縮
4. 最初に`javascript:`という文字列を追加（ブックマークレットとして動作させるため）。
5. `/dist`ディレクトリに出力

が順番に実行されます。

`/dist`を見ると`sample.js`が出力されていて中身は
```js sample.js
javascript:!function(){var t=document.title;prompt("title is",t)}();
```
となっているでしょう。

これをブラウザのブックマークとして登録します。
適当なブックマークを作って、URLに`sample.js`をコピー&ペーストするだけです。
そしたら適当なページを開いて実行してみます。プロンプトが表示されてページのタイトルが表示されたら成功です。

## 感想
実は変換まわりの設定が上手くいかずけっこうてこずりました。あとは今やTypeScriptで即時関数を作ることなんてなかったのでよくわからず苦戦しました。でもなんとかうまくいって良かったです。

本当のことを言えばテストを導入してTDDで作れるようにも考えたんですが、どのような風にテスト環境を作ったらいいのかに悩んだのでいったんテストは忘れます。おそらくJest+Puppetterが良さそうかな、と見当をつけています。

（追記： 書きました）。
[ブックマークレットをテスト駆動開発する \- Trial and Spiral](https://blog.solunita.net/test-driven-develop-bookmarklet/)

ブックマークレット自体はそんな複雑なことを書くことなんてほとんどないので、この環境はオーバーキル気味ですが、いったん環境を作ってしまえば使えるし、今さらES6以前の書き方なんて考えたくもないので結果的には良かったんじゃないかな、と思っています。

というかすでに必要なブックマークレットができてしまったので無用の長物になってしまっているのは内緒です。

余談ですが、ここまでやってあらためてググってみたらほとんど同じことを考えていた人がすでに居らっしゃったようです。
[TypeScriptを使ってgulpでブックマークレット開発(BoW) - Qiita](https://qiita.com/suzuki_sh/items/da7c4bfff3dd09a1a7a3)
