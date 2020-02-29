---
title: RuboCopのオプションを再入門したら、pre-commitフック経由の問題も解決した
slug: relean-rubocop-options
tags:
  - 開発
  - Ruby
  - Rubocop
  - Git
date: 2019-08-04T14:20:00.000Z
---
RuboCopというRuby用のリントライブラリがあります。コードを静的解析して良くない書き方を検知したり、フォーマットにも対応しています。今回はコーディングのルールの設定の話ではなく、実行するときのオプションまわりの話。

## RuboCopとは
今さら説明する必要もないと思いますが、Ruby用の静的解析ライブラリです。

<LinkCard url="https://github.com/rubocop-hq/rubocop/" site-name="GitHub" title="rubocop-hq/rubocop" description="A Ruby static code analyzer and formatter, based on the community Ruby style guide. - rubocop-hq/rubocop" image-url="https://avatars1.githubusercontent.com/u/39672756?s=400&v=4" />

様々なルールによって推奨されないコードの検出や警告をします。また自動で修正できることも可能です。いわゆるLinterと呼ばれるものです。
（このルールのことをRuboCopではCopと呼称しますが、この記事ではルールと表現しています）

ちなみに読み方は綴りとRubyのまつもとゆきひろ氏がそう発音していたことから「ルボコップ」と僕は判断していますが、たまに「ロボコップ」と呼称されるのを聞くこともあります。

### ドキュメント
公式ドキュメントはこちら。

<LinkCard url="https://rubocop.readthedocs.io/en/latest/" title="Home - RuboCop: The Ruby Linter that Serves and Protects" description="None" />

基本はインストールから設定、各種ルールもここを見れば問題ないでしょう。
ルールはかなり多く全てを網羅するのが大変ですが、有志が日本語に翻訳しているのでこちらも合わせて参照すると捗ります。

<LinkCard url="https://github.com/fortissimo1997/ruby-style-guide/blob/japanese/README.ja.md" site-name="GitHub" title="fortissimo1997/ruby-style-guide" description="A community-driven Ruby coding style guide (Japanese) - fortissimo1997/ruby-style-guide" image-url="https://avatars1.githubusercontent.com/u/1182633?s=400&v=4" />

## RuboCopのオプションに再入門する
### なぜ再入門したか
そもそも今回なんでオプションを再入門しようと思ったかというと、以前[LintとFormatをGitのコミット時に自動でかける方法](/how-to-lint-and-format-by-git-hook/)で紹介したpre-commitにフックしてRuboCopを走らせる方法が完全ではなく、解決方法を探したのが発端。

具体的などんな問題だったかというと、RuboCopの設定ファイル（通常`.rubocop.yml`）内の`Exclude`にRuboCopの解析対象から除外するglobパターンを設定できます。
pre-commit経由でかけるとどうも除外されるべきものが除外されずにRuboCopの実行対象になってしまっていました。

これについてpre-commitをかけてる側（huskyとlint-staged）の設定の問題なのかと悩んでいました。同じ施策をとっている（週イチブログコミュニティや月イチ挑戦コミュニティでお世話になっている）「ざき」さんに相談したりもしましたが明確な答えが出せずにいました。
参考： [【Ruby】コミットする前に husky\+lint\-staged で、Rubocopの自動整形＆チェックを行う \- Qiita](https://qiita.com/zaki_zaki/items/847462d18f0f37e74c8e)

いろいろあってもう一度RuboCopも含めて見直してみよう、となったのが発端です。

### RuboCopのオプション
先程紹介した公式ドキュメントの中の[Basic Usage \- RuboCop: The Ruby Linter that Serves and Protects](https://rubocop.readthedocs.io/en/latest/basic_usage/#command-line-flags)を見るのがいいですね。
できればRuboCopをインストールしてから
```
$ rubocop -h
```

で見るほうが、ショートハンドのオプションも含め最新なようなので良さそうです。
(ドキュメントだといくつかのショートハンドの記載がないようです）

### 有用そうなオプション
全部はいらないと思いますが知らなかったオプションなどもあったのでいくつかピックアップして見てみます。

#### `-D, --[no-]display-cop-names`
違反が発見されたらどのルール（Cop)に違反したのか名前を表示するオプション。
これはデフォルト`true`になってるので指定する必要はなさそうですが念のため。

#### `-E, --extra-details`
違反に関して詳細があれば表示する。
やっておいて損はなさそう。

#### `-S, --display-style-guide`
違反に関するスタイルガイドのURLを表示します。
ちなみに`.rubocop.yml`の中で

```yaml
AllCops:
  StyleGuideBaseURL: https://github.com/fortissimo1997/ruby-style-guide/blob/japanese/README.ja.md
```
と設定すると表示されるURLも日本語翻訳版のリンクになるので便利です（一部未対応がありそうです）

#### `-P, --parallel`
並列実行。マシンパワーに問題がなければ速くなるはずです。
しかし残念ながら後述の自動修正`--auto-correct`との併用は不可能。

#### `-a, --auto-correct`と`--safe-auto-correct`
違反ルールが自動修正に対応してるものの場合、修正する。
後者はそのうちで安全なもの（コードによる処理が変更されてしまう危険性がないもの）のみに自動修正します。

#### `--force-exclusion`
RuboCopは対象を指定して実行すると除外対象であっても除外せずに解析します。
このオプションをつけると除外対象の場合は除外されます。
（結論から言えば、これが以前上手くいかなかった理由と対応策でした）

#### `--fail-level SEVERITY`
実行結果を正常終了にするか以上にするかのレベルを設定します。
`SERVEY`には`A/R/C/W/E/F`のいずれかを入れます。
例えば`E`にするとよくある`Warning`や`Convention`レベルの違反が検出されても`Error`以上のレベルが検出されない限りは正常終了します。
利用例として、検出や警告は出したいもののCIやpre-commitなどでは許容するような使いかたができます（僕はやってますがなかなか良い感じです）。
またこの設定は`auto-correct`の修正対象とは関連しません。

### ルールのチューニング
人によっていろいろな視点がありそうですが、僕の考えとしては極力例外的に無視するのをしない方法が好きです。

#### 例外的にルールを無視する
他のリンター同様にコード中にコメントを埋め込むことで例外的に除外できます。
[#disabling-cops-within-source-code Configuration \- RuboCop: The Ruby Linter that Serves and Protects](https://rubocop.readthedocs.io/en/latest/configuration/#disabling-cops-within-source-code)

一番単純なのは
```ruby
for x in (0..19) # rubocop:disable Style/For
```
のように行の末尾にインラインコメントを入れることでこの行のみ指定したルールを無視します。

複数行にまたがって無視する場合は
```ruby
# rubocop:disable Metrics/LineLength, Style/StringLiterals
[...]
# rubocop:enable Metrics/LineLength, Style/StringLiterals
```
のような感じです。`disable`以下が指定ルールを無視し、その区間が終わったら`enable`で有効化しています。ちなみにルールの指定を
```ruby
# rubocop:disable all
```
として全てのルールを無視することもできますが、個人的になにか理由がない限りはやっちゃダメなやつだと思っています。不必要に無視の範囲を緩めるのは良くないですね。

#### 警告レベルの変更
RuboCopの警告レベルは5種類あって、弱いほうから`refactor`, `convention`, `warning`, `error`, `fatal`となっています。
[#severity Configuration \- RuboCop: The Ruby Linter that Serves and Protects](https://rubocop.readthedocs.io/en/latest/configuration/#severity)

デフォルトでは`Lint/Syntax`が`warning`、それ以外は`error`になっています。`.rubocop.yml`のほうで例えば
```yaml
Lint:
  Severity: error

Metrics/CyclomaticComplexity:
  Severity: warning
```
と書けば、`Lint`は`error`、`Metrics/CyclomaticComplexity`では`warning`として扱われます。

使い方として効果を発揮するのは大きく2つ。
1つは前述した`--fail-level`オプションと組み合わせること。リンターやフォーマッターは万人にとってのルールは存在せず、警告するかしないかの意見が人によってわかれることがあります。そういった場合に、やんわりと警告は出すもののコマンドの結果としてはOKとすることで、修正を強制しないようにしたり逆に警告レベルを上げることで絶対に許容しない意思を示すこともできます。
2つめはRuboCopの解析結果と連動するエディタを使ってる場合、警告レベルによって強調表示のスタイルが変わるものもあるので、どのレベルで気をつける必要があるか判断するのに役立ちます。

#### 個人的な判断考
基本的には`disable`は奥の手感覚です。例外を容易に許容すると割れ窓理論的にコードが悪化する恐れがあります。`Metrics`系のルールのように違反の数量を設定できるものは不必要にキビしすぎないか調整します。
可能なら修正したほうがいいけど、時として警告内容が必ずしも良いとは限らない。いろいろ制限してるけどルールに従わないほうが可読性が高い、みたいなときはSEVERITYレベルを下げます。
基本はルールに絶対従うべきなんだけど局所的にどうにもルールに従うのが難しい場合のみ`disable`を最小限だけ設定しています。

## オプションを考慮してまさしくRuboCopをかける
結論からいえば
```sh
$ rubocop -DES -a --force-exclusion --fail-level E
```
のようにかけることにしました。それぞれ解説すると
1. `-DES`は特に副作用がなさそうなので問答無用でつけておきます。
2. 意識的にRuboCopを走らせる場合を想定して`-a(--auto-correct)`にしていますが、無意識的に自動修正を噛ませると、コードの意図が変わってしまった場合に捕捉しづらいので`--safe`のほうが良さそうですね。
3. 除外ルールはRuboCopの`.rubocop.yml`での設定に寄せたいので`--force-exclusion`
4. `.rubocop.yml`で十分に警告レベルがチューニングされている前提で`--fail-level`で`warning`以下は許容しています。

（プロジェクトにRuboCopが導入されている場合は`bundle exec`を最初に足してください）。

もしいかなる時も一定のオプションを使いたい場合は環境変数`RUBOCOP_OPTS`に指定することでデフォルトオプションとして設定できます。

冒頭できっかけとして挙げたHuskyとLint-Stagedを使ってPre-commit時にかけるところの設定は
```json
{
  #... 中略
  "lint-staged": {
    "(*.rb|Gemfile)": [
      "bundle exec rubocop -DES --safe-auto-correct --force-exclusion --fail-level E",
      "git add"
    ]
  },
}
```
に変更しました（こちらは無意識的にかかるので念のため`--safe-auto-correct`にしています）。

なお余談ですが、`ESlint`などでは除外設定はちゃんと`.eslintignore`を見てくれるようです。
