---
title: Google App ScriptをTypeScriptとClass構文で書く - 環境導入
tags:
  - 開発
  - GAS
  - TypeScript
date: 2019-02-16T23:37:17.000Z
image: /images/covers/2019-02-16-lean-to-develop-google-app-script-with-typescript-class-setup.jpg
---

GASは本当に手軽で便利。ほんのちょっと自動化したい、でもDB立てて、サーバー立ててまでやるのもなぁ、ってときにその溝を埋めてくれる良いところに収まってる感じがしますね。特にGoogleスプレッドシートとの連携もしやすいからスプシを簡易DBとして見たててやるとけっこういろいろできちゃう。

そんな感じで職場の社内ツール的なものをGASで作ってたりするんですが、昨年後半にClasp経由でTypeScriptがサポートされたのでちゃんと書きなおしてみました（以前はWebpackでやっていました）。それが一段落したのでせっかくなのでその知見をご紹介しようと思います。

書いてたら長くなってしまったので、いくつかに分けます。まずは環境構築から。

## TL;DR
+ GoogleAppScriptはClasp経由でローカルで開発できるぜ
+ ローカルで開発できるってことはGitが使えたり、静的解析も使えるぜ
+ TypeScriptにも対応してるのでいろんな恩恵があって最高だぜ
+ そんなことを実現するための設定を今回は紹介するぜ

## なんでやるの？
まずなんでこの路線で開発するか、というポイントは
+ TypeScriptはES6な書き方ができる
  + ESLint(TSLint)、Prettierなども使える！
  + Class構文便利！
    + ちゃんと継承もできるんだぜ
+ TypeScriptの型サポートがあると書きやすい
+ TypeScriptがサポートされたから面倒なWebpackが要らなくなった

ES6による恩恵が一番大きいので、以前からWebpackでやっていた場合は大きな変化ではないですが、Clasp側でサポートされたことによって自前でビルドする手間もなくなったのが大きいですね。
特にWebpackは時に設定がややこしく、そこでつまる人も多いと聞くので脱WebpackしつつもES6の恩恵を受けれる環境ができあがったのが嬉しい限りです。

## 開発環境
まずなにはともあれClaspを入れます。これは通常Web上のスクリプトエディタでGASのコードを書いていくのではなく、ローカルのファイルとしてスクリプトを書けるようにしてくれるものです。
ローカルで扱えるというだけで様々な利点があります。
+ Gitが使える
  + バージョン管理が楽になる
  + つまりもちろんGitHubによる共同開発環境が持てる
+ ESLint(TSLint)、Prettierなどの静的解析によるフォーマット、リントが効く
  + 間違いが減ったり、自動修正したり
+ 好きなエディタが使える
  + 捗る！

<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/google/clasp" target="_blank" ><img src="https://github.githubassets.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/google/clasp" target="_blank" >google/clasp: 🔗 Develop Apps Script projects locally.</a> </div><div class="link_description"></div></div></div>

ここでは詳細なClaspの導入、GASとの反映方法は割愛します。公式のREADMEやちょっとググればいろいろな導入記事が出てくると思いますのでそちらをご参照いただればすぐできると思います。

あ、ちなみにNode.jsも必須です。その導入もここでは触れません。

今回の開発で特殊な事情を加味して言及するとこんなディレクト構成になります
```
.
├── __tests__
│   └── 各種テスト用ファイル
└── node_modules # ライブラリ格納ディレクトリ
└── src
│   ├── *.ts # これから作っていくTypeScriptファイル
│   └── appscript.json # GASの設定ファイル
├── .clasp.json # claspの設定ファイル
├── .claspignore # clasp用のignoreファイル
├── .eslintrc.js # 後述するESLint用の設定ファイル
├── .gitignore
├── index.d.ts # 型定義ファイル
└── package.json # プロジェクトの設定ファイル
```
とこんな感じですかね。テストは書かないんだったらないですが、せっかくローカルで開発するならテストも書きたいところです。
なので環境を整えた後は`src/`以下にガリガリ実装していく感じです。注意すべき点としてはGASの設定用の`appscript.json`はこの`src`ディレクトリ内に置くことになるところです。

### Linterとフォーマッターを導入する
いくつか選択肢はあると思いますが、今回は
+ ESLint経由でTypeScriptのLintをする
  + 理由： TypeScript側が「LintはESLintを使ってくれよな」って言っている
+ ESLint内でPrettierによるフォーマットをかける
  + 理由： Lint側とバッティングするルールがあるので上手く避ける

という方法で行きたいと思います。

一応TypeScriptでTSLintではなくESLintを推奨している経緯は
<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/Microsoft/TypeScript/issues/29288" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/Microsoft/TypeScript/issues/29288" target="_blank" >TypeScript Roadmap: January - June 2019 · Issue #29288 · Microsoft/TypeScript</a> </div><div class="link_description"></div></div></div>

のLintの項目、もしくは[The future of TypeScript on ESLint \- ESLint \- Pluggable JavaScript linter](https://eslint.org/blog/2019/01/future-typescript-eslint)を参照していただければと思います。

#### ESLintでTypeScriptにLintをかける
```zsh
yarn add --dev eslint
yarn add --dev @typescript-eslint/eslint-plugin
yarn add --dev @typescript-eslint/parser
```
で、ESLintとESLint経由でTypeScript対応するプラグインとパーサーを入れます。
そしたら`.eslintrc.js`というルール設定のファイルを作って、
```js .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
}
```
と入れます。これが最小限の設定ですね。

これで`.eslintr.js`内にTypeScript用のLint設定も書いて設定ができます。

#### ESLintにPrettierも組み込む
ESLintの設定のいくつかはJS系の最有力フォーマッタであるPrettierと一部バッティングするルールがあります。
これが整合性が取れてないと、自動でPrettierのフォーマットと`esLint --fix`を連続してかけたりエディタの設定でFixOnSaveとかやってると矛盾ルールでハマります。

ということで個人的なオススメとして、`eslint --fix`内でPrettierをかける設定にするのが良いと思っています。またVSCodeなどでESLintの`fixOnSave`設定だけでキッチリPrettierもかかります。

具体的には
```zsh
yarn add --dev prettier
yarn add --dev eslint-plugin-prettier
yarn add --dev eslint-config-prettier
```
`eslint-plugin-prettier`は`.eslintrc.js`内でPrettierの設定もできるようにするもの、`eslint-config-prettier`はESLint側のPrettierのフォーマットルールとバッティングするルールをオフにするものです。

となると、設定は
```js .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': ['error', {
      useTabs: false, // example
    }],
    'no-var': 'error', // example
    '@typescript-eslint/camelcase': 'error' // example
  },
}
```

みたいな感じが最小になりますかね（Ruleに関してはサンプルで入れています。適宜カスタムしてください）。

このあたりのことは[Integrating with ESLint · Prettier](https://prettier.io/docs/en/eslint.html)を参照していただければわかりやすいかと思います。

#### もっと細かい設定
ここはオプショナルな設定ですが、用意されているルールなどを適用したい場合は、もうちょっと込み入ってきます。僕はStandard([JavaScript Standard Style](https://standardjs.com/))派なんですが、例えばそれを適用しようとするなら、[standard/eslint\-config\-standard](https://github.com/standard/eslint-config-standard)を使いますので、
```
yarn add --dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node

```
として`.eslintrc.js`のextendsに`'standard'`を加えます。Standardには`no-undef`ルール（定義されていないものに警告するルール）が入ってますので、GAS特有の関数（e.g. `SpreadsheetApp`）が警告されます。

`.eslintrc.js`の`globals`に設定してあげればいいんですが、それなりの数があるのと思うので、[selectnull/eslint\-plugin\-googleappsscript](https://github.com/selectnull/eslint-plugin-googleappsscript)を使ってガっと回避します。

ちなみにオブジェクト操作のライブラリ`Underscore.js`や日付を扱うライブラリ`Moment.js`がGASでも用意されてますが、使う場合は同じようにグローバルな関数になるので、それは`.eslintrc.js`の`globals`で設定していきます。

そうなるとこんな感じになります
```js .eslintrc.js
module.exports = {
  root: true,
  env: {
    'googleappsscript/googleappsscript': true,
  },
  globals: { // example
    Underscore: true,
    Moment: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'googleappsscript',
    '@typescript-eslint',
    'prettier',
  ],
  extends: [
    'standard',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {  // example
    'prettier/prettier': ['error', {
      useTabs: false,
    }],
    'no-var': 'error',
    '@typescript-eslint/camelcase': 'error'
  }
}
```

ちなみに僕の場合、PrettierとESLintともにもっと細かくルール設定しています。
そして、Husky経由でGitのcommit時に自動で`eslint --fix`がかかるようになっています。
その辺のことは以前書いた記事をご参照ください。

[LintとFormatをGitのコミット時に自動でかける方法 \- Trial and Spiral](https://blog.solunita.net/how-to-lint-and-format-by-git-hook/)

### 型定義の導入
これでようやく環境が整った！　と思いきやまだあるんです。そうです型定義です。
ありがたいことに公式でGAS関数の型定義が用意されているのでサクっと入れます。
```zsh
yarn add --dev @types/google-apps-script
```

これでGASの関数に関してはばっちり型サポートが有効になります。

#### GAS用ライブラリの型定義
GAS用ライブラリを導入した場合、多くはグローバル関数として使えるようになります。しかしローカルで開発するときはそんなことはわからないので、そんな関数の型は定義されてないぜ、っていう警告が出ます。
それを回避するために`index.d.ts`ファイルを作って、例えばこんな感じに書きます。
```typescript index.d.ts
declare const Moment: {
  moment(arg?: any): any
}
declare const Underscore: {
  load(): any
}
```

これは僕の中でまだ上手くいってない部分で苦肉の策です。MomentもUnderscoreも同名のJSライブラリが元になっていてすでに型定義ファイルが用意されています。使い方がちょっとだけ違うのでそこを上手く吸収しつつ、型定義をうまく流用できたらいいなあと思っています。

どなたか解決方法があったら教えていただけると嬉しいです。

そんな感じで長くなりましたが環境構築ひとまず完了です。
次回は実装編を書けたらいいなぁ。
