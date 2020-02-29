---
title: ブックマークレットをテスト駆動開発する
slug: test-driven-develop-bookmarklet
tags:
  - 開発
  - ブックマークレット
  - Jest
  - Gulp
  - TypeScript
  - Puppeteer
date: 2019-06-23T00:26:28.000Z
---

前回、TypeScriptとGulpで無駄にモダンなブックマークレット開発環境を作ってみました。せっかくそこまで環境を作ったので、今回はテスト駆動開発できるようにしてみました。

（前回の記事はこちら）。
[GulpとTypeScriptでブックマークレット開発環境を作ってみた \- Trial and Spiral](https://blog.solunita.net/setup-developing-environment-for-bookmarklet/)

## テスト環境構築
テストフレームワークとして、Jestを使います。また、ブックマークレットである以上
1. 動かすためのページに行く
2. ブックマークレットのJavaScript(即時関数）を実行

という手順が必要になります。通常のユニットテストだけでは不十分なので今回はPuppeteerというヘッドレスブラウザも合わせて使います。要はコードからブラウザ操作を自動でやらせると思っていただければ。

### 関連ライブラリのインストール
ちょうど良く、jest-puppeteerというライブラリがあるのでそれを入れます。
[jest\-puppeteer puppeteer jest](https://github.com/smooth-code/jest-puppeteer)

READMEにあるように関連ライブラリも一緒に入れます。
```shell
$ yarn add -D jest-puppeteer puppeteer jest
```

さらにTSとGulpでやっているので必要なものを入れます。
```shell
$ yarn add -D gulp-jest ts-jest
```

そして関係する型も入れます
```shell
$ @types/expect-puppeteer @types/jest @types/jest-environment-puppeteer @types/puppeteer
```

### 設定ファイル
jestの設定は`package.json`に書いてもいいんですが、見通しを良くするため、今回はファイルを別に分けてみます。ファイルはルートディレクトリに`jest.config.js`を作って以下を書きます。

また、jsonではなくjsファイルなのでコメントアウトやJS式が使える利点もありますね。
`jest.config.js`
```js
module.exports = {
  preset: `jest-puppeteer`,
  moduleNameMapper: {
    '^#/(.+)': `<rootDir>/dist/$1`,
  },
  moduleFileExtensions: [`ts`, `tsx`, `js`],
  transform: {
    '^.+\\.(ts|tsx)$': `ts-jest`,
  },
  globals: {
    'ts-jest': {
      tsConfig: `tsconfig.json`,
    },
  },
  testMatch: [`**/__tests__/*.+(ts|tsx|js)`],
}
```
一番重要なのは最初の`preset: 'jest-puppeteer'`と`globals`の指定ですね。それ以外はお好みです。

あとはオプショナルとして、puppeteerの設定も可能です。設定なしのデフォルトでも問題なく動いてくれますのでなくても大丈夫ですが、言及しておくと同じくルートディレクトリに`jest-puppeteer.config.js`を作って設定できます、たとえば
`jest-puppeteer.config.js`
```js
module.exports = {
  launch: {
    dumpio: true,
    headless: true,
  },
  browserContext: `default`,
}
```
みたいな感じです。特筆すべきは`headless: false`にするとヘッドレスモードをオフにできるので実際にGoogleChromeが動く様子がみれます。デバッグで使うこともありますね。

## テストを書いてみる
設定ファイルに指定したようにテスト用のファイルは`__tests__`というディレクトリの中に作っていきます。前回にサンプルとして「見てるページのタイトルをプロンプトに表示する」というブックマークレットを作りました。まずはそのテストを書いてみます。

`__tests__`の中に`sample.test.ts`というファイルを作って以下のようにテストを書いてみます。
`sample.test.ts`
```ts
describe(`Google`, () => {
  beforeAll(async () => {
    await page.goto(`https://google.com`)
  })

  it(`should be titled "Google"`, async () => {
    await expect(page.title()).resolves.toMatch(`Google`)
  })

  it(`should be title in prompt`, async () => {
    let value
    await page.on(`dialog`, async dialog => {
      value = await dialog.defaultValue()
      await dialog.accept()
    })
    await page.addScriptTag({ path: './dist/sample.js' })
    expect(value).toMatch(`Google`)
  })
})
```

少し解説すると、`beforeAll`でサンプルとしてGoogleのトップに飛ぶようにしています。

最初のテストはブックマークレット関係なしでGoogleのサイトに飛べてるか、タイトルの値が取得できるかを見ています。このテストがパスしないのであれば、ブックマークレット以外の部分で問題があると考えたほうが良いですね。

2つめのテストが今回のテストです。ポイントはいくつかあります。

まず先にダイアログ（プロンプト）の表示を取得するように設定しておきます。具体的には`page.on('dialog',`でダイアログを待って、`dialog.defaultValue()`はダイアログが開いたときの入力欄の文字列を取得できます。取得したらその一応念のために`accept()`でダイアログを閉じておきます（OKを押したときの動作）。

その後で`page.addScriptTag({ path: './dist/sample.js' })`でブックマークレットを動作させます。ちょっと強引ですがこの方法に落ちつきました。もしもっと良い方法があれば教わりたいです。
なお注意点としてはこのパスはテストを走らせるコマンドを叩くところからの相対パス（=ルートディレクトリから）で書く必要があります。

`path`で指定したjsファイルをページに対してスクリプトとして挿入します。このJSはブックマークレット、すなわち即時関数であるためaddしたらすぐに実行される流れです。

そうしてあらかじめ待ち受けていたダイアログの文字列取得が動いて、`value`に入るので、それを`expect`でアサーションにかける、という流れですね。

さあ、ここまでできたら
```shell
$ jest
```
とテストを走らせてみましょう。2つのテストがパスすればOKです。

## テストをGulpで扱う
せっかくビルド作業をGulpで扱っているのだからテストもGulpで扱うようにしてみます。というのもテストする対象がJSのなのでテスト前に都度都度ビルドする必要がある事情もありますので。

先にファイルから載せてしまうと
`gulpfile.ts`
```ts
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import ts from 'gulp-typescript'
import uglify from 'gulp-uglify'
import replace from 'gulp-replace'
import jest from 'gulp-jest'
const tsProject = ts.createProject(`tsconfig.json`)
const srcDir = `src`
const destDir = `dist`
const testDir = `__tests__`

export const build = done => {
  gulp
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
  done()
}
export const test = done => {
  gulp.src(`${testDir}/*.ts`).pipe(jest({}))
  done()
}
export const dev = done => {
  gulp.series(`build`, `test`)(done())
}
export default build
```

とこうなりました。前回から追加したものを順に説明します。

まずGulp内でJestを実行できるように読み込みます。
```ts
import jest from 'gulp-jest'
```


テスト用のディレクトリを定義しておきます。
```ts
const testDir = `__tests__`
```

`test`というタスクにjestのテストを割り合てます。
```ts
export const test = done => {
  gulp.src(`${testDir}/*.ts`).pipe(jest({}))
  done()
}
```

ビルドして続けてテストする一連を1つのタスクにします。
```ts
export const dev = done => {
  gulp.series(`build`, `test`)(done())
}
```

ちょいちょい`done()`と出てきてますが、コールバックで終わりを明示しないと`gulp.series`で上手く扱えないようです。このへんJSらしく`async function`で扱えると良いんですが、v3からのやりかたもあり、最適解が良くわかりません。むむむ。

あとは、一応yarnやNPM経由でも実行しすいようにしておきましょうか。
`package.json`に
`package.json`
```json
{
  "scripts": {
    "build": "gulp build",
    "test": "gulp test",
    "dev": "gulp dev"
  },
}
```
を追記しておきましょう。

## 感想
やはり前回も言いましたが、たかだかブックマークレットでここまでやるのはオーバーキル気味ですね。個人的にはPuppeteer初めて触ってりしていろいろ楽しめた反面、ブックマークレットの動かし方がちょっとスマートじゃないのでモニョモニョしています。

またテスト環境的には本当は実際のページではなく用意したフィクスチャでやりたいところです。ネット環境が必須になってローカルだけで完結できないですし、テストに使ってる先に変更があったらテストが落ちてしまうので。

さらに、ブックマークレット内でCDNのjQueryを使う方法があって、そうするとちょっと楽にブックマークレット書けるんですが、その場合読み込み待ちをテスト内で実現できず上手くテストを書くことができませんでした。それでネイティブJSで実装しなおしたんですが、jQueryの読み込み待ちがなくなったことで高速化したので結果的にや良かったです。

まあ強引なテスト方法であることは否めないですが、やっぱりエンジニアたるものポチポチテストするよりはテストコードで動作を担保したいので、なかなか良いエクササイズでした。

最後にこの作成を環境をGitHubに上げたので気が向いたら参考にしてみてください。

[AquiTCD/ts\-bookmarklet\-workbench: a workbench to build bookmarklets by typescript with jest](https://github.com/AquiTCD/ts-bookmarklet-workbench)
