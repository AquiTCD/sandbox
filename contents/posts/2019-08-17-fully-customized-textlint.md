---
title: textlintをてんこ盛りカスタマイズした
slug: fully-customized-textlint
tags:
  - 開発
  - Hack
  - カスタマイズ
date: 2019-08-17T11:39:00.000Z
---
日本語を静的解析して校正するツールとしてtextlintというものがあります。プログラミング言語の推奨されない記法などを静的解析して警告、修正するLinterという仕組みをMarkdownやTextファイルの日本語にも利用して校正するツールです。今回はこれをゴリゴリにカスタムした話。

## 経緯
<LinkCard url="https://github.com/textlint/textlint" site-name="GitHub" title="textlint/textlint" description="The pluggable natural language linter for text and markdown. - textlint/textlint" image-url="https://avatars2.githubusercontent.com/u/15377024?s=400&v=4" />

以前からtextlintは使っていてある程度カスタムもしていたんですが、どうも上手くできてない部分もあったため本腰を入れて全部ルールを見直してみた、という話です。

textlintはそれ自体にはルールを持っておらずエンジンのみです。ルールは好みに応じて追加でインストールする必要があります。今回の方針としてはとりあえずかたっぱしから有用そうなルールをつっこんで、必要ないものや問題のあるものをオフにしていく、てんこもりカスタムをしました。

## あえてのGlobalインストール
textlintのインストール方法というか、NPMのライブラリのインストール方法としてはグローバル（端末全体で使うよう）にインストールする方法と、プロジェクトローカルにインストールする方法があります。

公式では後者を推奨していますが、僕はあえてのグローバルインストールです。理由として
+ プロジェクト単位でtextlintを使うような場面があまりない
+ わざわざプロジェクトにインストールしなくてもLintが効いてほしい
+ 執筆系でもない限りはルールは個人の好みによるところも大きい
+ ちょっとメモ的に書くMarkdownや、そもそもプロジェクトとして管理されてないものにも効かせたい
+ 個人の中では一貫してルールは変わることはない

ということもあってプロジェクトをまたぐようGlobalにインストールしたほうが都合が良いためです。
なので

```sh
$ yarn global add textlint
```
でインストールします。

## かたっぱしからルールをインストール
てんこもりカスタムのためにとりあえずいろんなルールをつっこみます。
ルールに関しては[textlintのWiki](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule)を見るのが早いでしょう。

大まかな方向性としてはプリセット系をぜんぶ入れて、なお足りないものは個別で入れていきます。
ちなみに和文特化で英文に関しては今回は考えません。
戦略としては

1. プリセット系全部ぶち込む
2. カバーされてない日本語ルールを個別に追加する
3. 有用そうなグローバル（言語問わない）ルールをさらに追加
4. 自動修正対象、主には表記揺れから外すものをホワイトリストへ
5. コンフリクトしたルールや、複数のルールがバッティングするルールをオフ
6. 不必要に強いルールをオフ
7. エラーレベルを調整

という感じ。

textlintをグローバルに入れてるので、ルールも同様にグローバルに入れます。

最終的には今回やったのはこんな感じ
```sh
$ yarn global add textlint-rule-preset-ja-technical-writing textlint-rule-preset-jtf-style textlint-rule-preset-ja-spacing textlint-filter-rule-comments textlint-filter-rule-whitelist textlint-rule-spellcheck-tech-word textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet textlint-rule-ja-hiragana-keishikimeishi textlint-rule-ja-hiragana-fukushi textlint-rule-ja-hiragana-hojodoushi textlint-rule-ja-unnatural-alphabet @textlint-ja/textlint-rule-no-insert-dropping-sa textlint-rule-prefer-tari-tari textlint-rule-general-novel-style-ja textlint-rule-period-in-list-item textlint-rule-footnote-order textlint-rule-ng-word textlint-rule-prh textlint-rule-abbr-within-parentheses
```
## 設定
textlintは`.textlintrc`ファイルで他のリンターと同様に設定ができます。デフォルトが設定されているものがほとんどですが、今回はデフォルト値を参考にしつつ全部のルールに対して指定します。
### ホワイトリスト
`textlint-filter-rule-whitelist`はルールではなくホワイトリスト機能を提供します。これは表記揺れ系を扱うなら入れておいたほうが良いです。
というのもルールは個別にオン/オフが切りかえられますが、`textlint-rule-prh`経由での表記揺れ対応は個別にオフにできません。しかも自動修正（`textlint --fix`)対象なので、ある特定のものだけオフにしようとするならホワイトリストで対応するのが良いです。

具体的には、`textlint-rule-spellcheck-tech-word`で提供されている、JSer.info用の辞書の「使うべきではない言葉」が落とし穴なのでこれを塞ぎます。
これをやっておかないと対象の言葉を使った場合に自動修正をかけるとその文字が「使うべきではない言葉なので修正してください」になってしまいます。

例えば「知らない」という単語が対象なので
```
あの日見た花の名前を僕達はまだ知らない
```
という文章だったら
```
あの日見た花の名前を僕達はまだ使うべきではない言葉なので修正してください
```
になってしまいます。

これは表記揺れのルールの定義があまり良くなく、`expected`に`使うべきではない言葉なので修正してください`が指定されています。自動修正でない場合はこれが警告文に表示されるのでわかりやすいのですが、自動修正だと自動でexpectedに指定された文字列に変更されてしまいます。

該当する表記揺れルール：
<LinkCard url="https://github.com/azu/prh.yml/blob/master/ja/jser-info.yml#L33-L41" site-name="GitHub" title="azu/prh.yml" description="A collection of prh.yml. Contribute to azu/prh.yml development by creating an account on GitHub." image-url="https://avatars2.githubusercontent.com/u/19714?s=400&v=4" />

なので、このルールが含む言葉を全部ホワイトリストに入れます。
さらに漢字の閉じ、開きを調節する`textlint-rule-ja-hiragana-keishikimeishi`の

```
〜する方(が) => 〜するほう(が)
```

のルールが個人的によく意図しない動作をしていたので防ぎます。「するほうがいい」みたいな場合はOKなんですが、「する方（かた）はいませんか？」と人の敬称としての「方（かた）」を使った場合も「ほう」に自動修正されてしまうことがあったので潰します。

## ルール調整
あとはとりあえず全部のルールを見ていってルールの取捨選択をしていきます。
方針としては
1. 数値や閾値など細かく設定できるものは必要があれば最適な値を入れる
2. 基本は全てのルールを使い、不必要なルールだけをオフ
3. ルールがバッティングするようであればより有用なほうを選び、それ以外をオフにする
4. 誤検出されるようなものはエラーレベルをWarningに落とす

のように設定していきます。

こうして出きた僕の設定はこんな感じになりました。
(.textlintrc.yml)
```yml
filters:
  comments: true
  whitelist:
    allow:
      - 最強
      - 常識的
      - 最も優れた
      - 知らない
      - 知らなさそう
      - 酷い
      - 方
rules:
  preset-ja-technical-writing:
    sentence-length:
      max: 120
      severity: warning
    max-comma:
      max: 3
    max-ten:
      max: 3
    max-kanji-continuous-len:
      max: 6
    arabic-kanji-numbers: true
    no-mix-dearu-desumasu:
      preferInHeader: ''
      preferInBody: ですます
      preferInList: である
      strict: false
    ja-no-mixed-period:
      periodMark: "。"
      severity: warning
    no-double-negative-ja: true
    no-dropping-the-ra: true
    no-doubled-conjunctive-particle-ga:
      severity: warning
    no-doubled-conjunction: true
    no-doubled-joshi:
      min_interval: 1
      severity: warning
    no-nfd: true
    no-invalid-control-character: false
    no-exclamation-question-mark: false
    no-hankaku-kana: true
    ja-no-weak-phrase:
      severity: warning
    ja-no-successive-word: true
    ja-no-abusage: true
    ja-no-redundant-expression:
      severity: warning
    ja-unnatural-alphabet:
      allow:
        - "/[A-Z]/"
      allowCommonCase: true
    no-unmatched-pair: true
  preset-jtf-style:
    1.1.1.本文: true
    1.1.2.見出し: true
    1.1.3.箇条書き: true
    1.1.5.図表のキャプション: true
    1.2.1.句点(。)と読点(、): true
    1.2.2.ピリオド(.)とカンマ(,): true
    2.1.2.漢字: false
    2.1.5.カタカナ: false
    2.1.6.カタカナの長音: false
    2.1.8.算用数字: true
    2.1.9.アルファベット: true
    2.1.10.算用数字の位取りの表記: true
    2.2.1.ひらがなと漢字の使い分け: false
    2.2.2.算用数字と漢数字の使い分け: true
    2.2.3.一部の助数詞の表記: true
    3.1.1.全角文字と半角文字の間: true
    3.1.2.全角文字どうし: true
    3.2.カタカナ語間のスペースの有無: true
    3.3.かっこ類と隣接する文字の間のスペースの有無: true
    4.1.1.句点(。): true
    4.1.3.ピリオド(.)、カンマ(,): true
    4.2.1.感嘆符(！): true
    4.2.2.疑問符(？): true
    4.2.4.中黒(・): true
    4.2.5.波線(〜): true
    4.2.6.ハイフン(-): true
    4.2.7.コロン(:): true
    4.2.8.セミコロン(;): true
    4.2.9.ダッシュ(-): true
    4.3.1.丸かっこ（）: true
    4.3.2.大かっこ[]: true
    4.3.3.かぎかっこ「」: true
    4.3.4.二重かぎかっこ『』: true
    4.3.5.二重引用符: true
    4.3.6.中かっこ{ }: true
    4.3.7.山かっこ<>: true
    4.3.8.一重引用符: true
  preset-ja-spacing:
    ja-space-between-half-and-full-width:
      space: never
    ja-space-around-code: false
    ja-no-space-between-full-width: true
    ja-nakaguro-or-halfwidth-space-between-katakana: true
    ja-no-space-around-parentheses: true
    ja-space-after-exclamation: false
    ja-space-after-question: false
  general-novel-style-ja:
    chars_leading_paragraph: false
    no_punctuation_at_closing_quote: false
    space_after_marks: false
    even_number_ellipsises: true
    even_number_dashes: true
    appropriate_use_of_punctuation: true
    appropriate_use_of_interpunct: true
    appropriate_use_of_choonpu: true
    appropriate_use_of_minus_sign: true
    max_arabic_numeral_digits: false
  spellcheck-tech-word: true
  period-in-list-item:
    periodMark: ''
    periodMarks:
    - "."
    - "。"
    - "．"
    ignoreLinkEnd: true
    allowPeriodMarks: []
    allowEmoji: false
    forceAppendPeriod: false
  ja-hiragana-keishikimeishi: true
  ja-hiragana-fukushi: true
  ja-hiragana-hojodoushi: true
  "@textlint-ja/textlint-rule-no-insert-dropping-sa": true
  prefer-tari-tari: false
  abbr-within-parentheses: true
  no-mixed-zenkaku-and-hankaku-alphabet: true
  footnote-order: true
```

デフォルト値そのままのものも多いので、本来ならこんなに書く必要はないんですがデフォルトがなんなのか気にしなくて良くするためにも全部に入れました。今後も継続的にチューニングが必要なので、項目を書くことですぐに切りかえられるために。

## CLI（コマンドライン）から使う
以上までやったらあとはtextlintのドキュメントにしたがうだけです。具体的には
```sh
$ textlint オプション 対象ファイル
```
という感じ。

今回、すでに書いた自分のブログ記事全てを校正しなおしたかったので
```sh
$ textlint --fix docs/_posts/*.md
```
という感じでかけました。`--fix`で自動修正を`docs/_posts/`以下にある全てのMarkdownファイルにかけています。globが使えるのでとても楽ですね。
こういうこともあるのでつくづくファイル管理型のブログシステムを使ってて良かったなぁと思います。

## VSCodeから使う
vscode-textlintという拡張を使えば同じようにVSCode上でtextlintによる検出ももちろん、ファイル保存時に自動修正もできます。

<LinkCard url="https://marketplace.visualstudio.com/items?itemName=taichi.vscode-textlint" title="vscode-textlint - Visual Studio Marketplace" />

似たような拡張に「テキスト校正くん」がありますが中でtextlintを使っていてプリセットルールを内包し使いやすくしたものなので、すでに自分好みに設定されたtextlintがあれば必要なくなります。

## おわりに
以前もある程度設定はしていたのですが、意図しない自動修正があったりしたので今回あらためて全てのルールを洗い出してみました。キモはホワイトリストで、これによって意図しないものがなくなりました。今後使っていくうちにバッティングするルールを発見したり、強めたり弱めたりの細かいチューニングは必要ですが今回デフォルトを気にせず書き出したことによりチューニングしやすい土台もできました。
