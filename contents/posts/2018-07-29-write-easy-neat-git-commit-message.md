---
title: ちゃんとしたGitコミットメッセージをCommitzenを日本語で使って楽に書く
slug: write-easy-neat-git-commit-message
tags:
  - 開発
  - Git
date: 2018-07-29T12:03:01.000Z
---

Gitを使うようになって以来、使えば使うほどこれは良いバージョン管理だなぁと関心する。その反面、コミットに対しての悩みはつきない。コミットメッセージ、粒度。そのへんをどうしたら良いのか決定打が無いまま、ちゃんとしてるっぽいようにできてはいるけど今イチ自信がないままだった。

そう思いつつもいろいろと思考錯誤してようやく最近ではこれで行こう！　と自信もって上手くできてる感がでてきたのでそのへんのことを共有していこう。

## 決定打は'Commitzen'
`Commitzen`は一言で言えば**対話的にコミットメッセージを作るやつ**。NPMで配布されていて、Angularで使われているコミットメッセージのルールが元になってるそうな。

<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/commitizen/cz-cli" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/commitizen/cz-cli" target="_blank" >commitizen/cz-cli: The commitizen command line utility.</a> </div><div class="link_description">When you commit with Commitizen, you'll be prompted to fill out any required commit fields at commit time. </div></div></div>

簡単に言えば

```
Type(Scope): Title

Body
```
というメッセージルールで書く。`Scope`と`Body`に関してはオプショナルでなくても可。
タイプは例えば、`feat`, `fix`, `style` とか。大項目みたいな。
スコープは言わずもがな。変更範囲。タイトルは普通のコミットメッセージみたいなコミットの要約で、Bodyはさらに細かい説明、これはよくある1行空けて詳細を説明、みたいなのと一緒。
これを対話的に

1. このコミットのタイプは？（選択式）
2. スコープは？（enterでスキップ）
3. コミットの要約
4. さらに細かい説明（オプショナル）
5. 破壊的変更について
6. 関連するissueについて

![](https://raw.githubusercontent.com/commitizen/cz-cli/master/meta/screenshots/add-commit.png)

みたいな感じで質問に答えるように入力する。こうすることによって「うーん、コミットメッセージ、どう書こう」みたいなのをちょっと楽にしてくれる。さらには、タイプを選択式にすることによってメッセージの統一性を強制し、スコープをちゃんと考える契機にもなる。

## タイプ、スコープの効能
実はメッセージを入力するのが楽になるだけじゃなくて「メッセージと内容の整合性」をちゃんと意識してる場合、変更内容の粒度や区切りもある程度しっかりしてくる。

バグ修正のコミットに機能追加を含めてはいけない。後からアレコレしたい場合に無理が生じてくる。Gitの良いところは履歴であり戻れることなので、戻りやすく、選択できるレベルにしておくのが良い。だけど例えばバグ修正と機能追加が1つのコミットにある場合、バグ修正は取り込みたいけど、機能追加は問題があって取りこみたくない、という場合に死ぬ。

さらに`conventional-changelog`というのが`commitzen`プロジェクトの一環にある。これはこのタイプを自動で判別して`CHANGELOG.md`を自動生成したり、セマンティックバージョニングをコントロールする方法。簡単に言えば`fix`が含まれていれば`0.0.1(patch)`上がって`feat`が含まれていれば`0.1.0(minor)`上がる。

## 日本語でどうしましょ？
僕は個人的に言えばプライベートなものかつ、日本人のみのチームで作業されるものは日本語コミットメッセージで良いと思ってる。**コミットメッセージを書くためにうんうん悩んで時間を浪費したりするのは本質じゃない**し、読むときもいちいち機械翻訳にかけて理解するのももったいない。

ただし、被検索性は高くもっていたいのでそれなりなルールは必要で、コミットメッセージに日本語か嫌われるのはこのへんが大きいとにらんでる。問題は文法と表記のあいまいさ。

英語だとSVC文法で、さらに本質から先に出てくる。日本語は逆でSCVというか、大切なことほど後にでてくる（ごめんなさい、このへんの言語的な細かいことは正確に解説できる知識がないです）

```
fix SomeClass work properly
```
というメッセージと
```
SomeClassが正しく動作するように修正
```
というメッセージ、どっちが見やすい？　英語のほうが理解しやすいように思う。後からコミットメッセージをもとに探す場合、もう何でさがしたらいいかわからない。バグフィクスって書く？　修正って書く？　っていう表記揺れだったり、「修正」が最後に来るので目で追う場合もズレる。文字数が多くなって自動でBodyに送られた場合はさらにキツい。

で、じゃあ表記揺れをルールで縛ってある程度書き方も一文じゃなくて配慮したルールにしてみたとしよう（これは以前僕が日本語コミットを書くなら、と独自に考えてみたもの）
```
修正: SomeClassが正しく動作するように
```
もしくは「修正」を外に出したので説明を追加すると
```
修正: SomeClassが正しく動作するようにsome-functionを追加
```
とか。これならまず本質が「修正」であることがわかるし、メッセージの最初が主語なのでSomeClassに対する修正だな、とわかりやすいと思う。そしてこれをAngularルールで書いてさらに日本語を混ぜると
```
fix(SomeClass): add some-function for working properly
```
```
fix(SomeClass): 正しく動作するようにsome-functionを追加
```

日本語話者にとってもタイプとスコープ程度は英語でも誰も困らないし、ちゃんと明記されてるし、その後の説明は日本語でも何をしたのかわかるし。まずタイプとスコープを最初に固定することでそのあとメッセージがもうちょっと変更内容をちゃんと説明しやすく書ける。

これだと日本語コミットでもわかりやすいし、バランスも良いと思う。もちろんパブリックなリポジトリや日本語話者のみで構成されていなければ英語で書くべきなのは言うまでもないけど。

## Commitzenを少しだけ日本人に優しくしました

![](https://lh3.googleusercontent.com/YmOSC5F-Q1pM1shvFkrnNlF5QZXjqdcAipUgssizwjmPvg-yKF_1RylMQLgY5fErWRBivZjvPIzgL5U10GTGVvExV7EkX2tWI2nwEoO6PFtYBjf5VX6Du04-dAlkln_jA2J8668IYUSp6bETtG_AWC96eGy_gDivgGPVwjSZakF1Pz0nbeTkqAfcXiSovzgeGsu1dNZ-ojOXKmXmelGkUNni948k4Rfz19VQS3WRF6Qs15UsCUrO7ZI_40GfjFxeL-Zba2dw7t4_W5NYtzCPOidpALT3Qm5zbFzErzb3RMbCffpoqjQp8sAM6C8tm3lWfleQP5aHMKoRaXRLLsAJD0QDdyrueZBYyL_q7GFYzl99KIIEJ7jn8nICBe5CUc8HYaffTWS2P0nvnHr4Yhe6NbOR3A_O726ALVcKMwuAIrkMec7DT8s0Y-bk66K_Tx_RzpbguCgwflK1BEVllot3PTkxrtZAQLMkP-Xw9kawDhV3oeaNc5NFY3MO9vgibWcxyFHRBqIPh8hWy_hrShb4gs1ACIV-YQtDdC-OC3mn2Mny8d2w8zhkV3umopvEygbQPbr16-HggYdHRPbMNAPMAwWYrQxatrNyWDoC5xx_4NtcLvz9v9MRFwCSRZszN4EPSsjqLK0fz3TwM4hicYZRL_UAE8GtIYHE=w1812-h1302-no)

そんなわけで、日本語で書こうが英語で書こうが`Commitzen`が役に立つのはわかってもらえたはず。で、日本語で書くような場合、対話型で設定できたとしてもまだちょっとやりづらい。英語にそこまで不自由を感じないようになった僕でも日本語を読むほうが圧倒的に速い（漢字は文字あたりの情報量が圧縮されているということ抜きにしても）。

で、`commitzen(cz-cli)`は何もしないと対話的CLIのところに`cz-conventional-changelog`が使われている。ここを`~/.czrc`とかで別のものに指定ができるような作りなので`cz-conventional-changelog-ja`というもの作った。作ったと言ってもオリジナルをフォークして日本語訳しただけなのですがね。

<div class="linkbox"><div class="linkbox_image"><a href="https://www.npmjs.com/package/cz-conventional-changelog-ja" target="_blank" ><img src="https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://www.npmjs.com/package/cz-conventional-changelog-ja" target="_blank" >cz-conventional-changelog-ja - npm</a> </div><div class="link_description">これは日本語翻訳されたcommitizen/cz-conventional-changelogのフォークです。</div></div></div>

これを適用すると対話の質問やタイプ選択の説明が日本語になる。自分でも使ってみたけど、英語でコミットするにしてもこっちのほうが使いやすい。

### 使い方
グローバルに設定してプロジェクト問わず使うとしたら
```shell
$ yarn global add cz-cli cz-conventional-changelog-ja
# or npm i -g cz-cli cz-conventional-changelog-ja
```

とインストールしたら、ユーザー直下に

```json ~/.czrc
{
  "パス": "cz-conventional-changelog-ja"
}
```

としてやる。そうすると

```shell
$ git cz
```
とやったときにデフォルトの`cz-conventional-changelog`ではなく`cz-conventional-changelog-ja`を参照するので、日本語で表示されるようになるはず。


## もうちょっと拡張するには
それで使ってたんだけどどうも僕がメッセージ書いててタイプの種類が少なかったり合わなかったり感じてた。コミットメッセージを書きやすくするためのツールなのにこの場合のタイプはうーんどうしよう、みたいに詰まるのは本末転倒だなぁ、と。

もちろんこの`Types`を制御する方法ああるんだけど、これってプロジェクトやチームによっても変わるのでもっと柔軟なほうが良さそう。その都度別バージョンの`cz-conventional-changelog`をフォークしたりするのも違うよなぁって思いもあって`cz-customizable`経由でやることにした。

<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/leonardoanalista/cz-customizable" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/leonardoanalista/cz-customizable" target="_blank" >leonardoanalista/cz-customizable: A customizable commitizen adapter for https://github.com/ajoslin/conventional-changelog/tree/master/conventions</a> </div><div class="link_description"> The customizable Commitizen plugin to help achieve consistent commit messages like the AngularJS team.</div></div></div>

`cz-customizable`は、質問やタイプ情報の設定を外部から読み込めるようにして、カスタムできるようにしたもの。なので日本語で使う場合も`.cz-config.js`を書いて参照するようにしたらいい。

参考までに僕の設定を載せておきます。

### 使い方

運用としては、上の`-ja`のようにグローバルに設定してプロジェクト問わず使うとしたら
```shell
$ yarn global add cz-cli cz-customizable
# or npm i -g cz-cli cz-customizable
```
とインストールしたら、ユーザー直下に
```json ~/.czrc
{
  "パス": "cz-customizable"
}
```
と`cz-cli`が参照するのを`cz-customizable`にする。で、`cz-customizable`はデフォルトでは`.cz-config.js`を参照するので、下記のようにファイルを作って置く、と。

```js ~/.cz-config.js
'use strict';
module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     新機能',
      title: 'Features'
    },
    {
      value: 'fix',
      name: 'fix:      バグ修正',
      title: 'Bug Fixes'
    },
    {
      value: 'HOTFIX',
      name: 'HOTFIX:   致命的で緊急なバグ修正',
      title: 'Critical hotfix'
    },
    {
      value: 'UI',
      name: 'UI:       UIやスタイルの更新',
      title: 'UI'
    },
    {
      value: 'docs',
      name: 'docs:     ドキュメントのみの変更',
      title: 'Documentation'
    },
    {
      value: 'style',
      name: 'style:    フォーマットの変更\n            （コードの動作に影響しないスペース、フォーマット、セミコロンなどの変更）',
      title: 'Styles'
    },
    {
      value: 'texts',
      name: 'texts:    文字や文章の更新',
      title: 'Text and literals'
    },
    {
      value: 'i18n',
      name: 'i18n:     国際化',
      title: 'Internationalization'
    },
    {
      value: 'typo',
      name: 'typo:     タイプミスの修正',
      title: 'Typos'
    },
    {
      value: 'refactor',
      name: 'refactor: リファクタリングのための変更\n            （機能追加やバグ修正を含まない変更）',
      title: 'Code Refactoring'
    },
    {
      value: 'perf',
      name: 'perf:     パフォーマンスの改善のための変更',
      title: 'Performance Improvements'
    },
    {
      value: 'ux',
      name: 'ux:       ユーザーエクスペリエンス/ユーザビリティの改善',
      title: 'UX'
    },
    {
      value: 'test',
      name: 'test:     不足テストの追加や既存テストの修正',
      title: 'Tests'
    },
    {
      value: 'config',
      name: 'config:   設定の追加や変更',
      title: 'Configuration'
    },
    {
      value: 'build',
      name: 'build:    ビルドシステムや外部依存に関する変更\n           （スコープ例: gulp, broccoli, npm）',
      title: 'Builds'
    },
    {
      value: 'ci',
      name: 'ci:       CI用の設定やスクリプトに関する変更\n           （スコープ例:Travis, Circle, BrowserStack, SauceLabs)',
      title: 'CI'
    },
    {
      value: 'chore',
      name: 'chore:    その他の変更\n           （補助ツール、ドキュメント生成などのソースやテストの変更を含まない変更）',
      title: 'Chores'
    },
    {
      value: 'WIP',
      name: 'WIP:      作業中',
      title: 'WIP'
    }
  ],
  scopes: [
    // { name: '*' },
    // { name: 'admin' },
    // { name: 'exampleScope' },
    // { name: 'changeMe' }
  ],
  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  // override the messages, defaults are as follows
  messages: {
    type: 'コミットする変更タイプを選択:\n',
    scope: '変更内容のスコープ(例:コンポーネントやファイル名)(optional):\n',
    // used if allowCustomScopes is true
    customScope: '変更内容のスコープ(例:コンポーネントやファイル名)(optional):\n',
    subject: '変更内容を要約した本質的説明:\n',
    body: '変更内容の詳細（"|"で改行）(optional):\n',
    breaking: '破壊的変更についての記述(optional):\n',
    footer: '関連issueを追記 (例:"fix #123", "re #123")(optional):\n',
    confirmCommit: 'このコミット内容でよろしいですか?'
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
};
```

もし参考にしていただけたら幸いです。
