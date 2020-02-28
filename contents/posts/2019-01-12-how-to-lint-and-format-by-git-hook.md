---
title: LintとFormatをGitのコミット時に自動でかける方法
tags:
  - 開発
  - Git
date: 2019-01-12T15:13:28.000Z
image: /images/covers/2019-01-12-how-to-lint-and-format-by-git-hook.jpg
---

前回、LintとFormatをかけるのはもちろんなんだけど、なんでGitHookのタイミングにしたかって話を書いた。今回はそれの具体的な方法を書いていこうと思う。

ちなみに前回書いたやつ。
<div class="linkbox"><div class="linkbox_image"><a href="https://blog.solunita.net/why-lint-and-format-on-git-hook/" target="_blank" >NO IMAGE</a></div><div class="link_info"><div class="link_title"><a href="https://blog.solunita.net/why-lint-and-format-on-git-hook/" target="_blank" >LintとFormatをGitHook時にかけてる理由 - Trial and Spiral</a> </div><div class="link_description">LinterとFormatterをかけるとしたらいつがいいのかいろいろ考えて、結論から先に言えばGit commit時にしている。</div></div></div>

## 使うもの
まず使うNPMのライブラリを使うので、Node.jsを用意してください。これmacならbrewでyarnを入れてもいいし、僕はanyenvを経由してndenvを使ってる。いろんなやり方があるし、それぞれ利点が違うので自分にあった入れ方を推奨。

それで使うライブラリなんだけど
+ husky
+ lint-staged

の2つ。以下で簡単に紹介しよう。

### Husky

<div class="linkbox"><div class="linkbox_image"><a href="https://www.npmjs.com/package/husky" target="_blank" ><img src="https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://www.npmjs.com/package/husky" target="_blank" >husky - npm</a> </div><div class="link_description">Husky can prevent bad git commit, git push and more 🐶 woof!</div></div></div>

huskyはGitHookをプロジェクト単位で設定できるようにするツール。
GitHookの設定は通常だと`{project root}/.git/hooks/`配下にある。`.git`以下は通常ではリポジトリに含まれないので共有されない、つまりhookを共有したり強制したりできない。

だから、husky経由で共有できるところで設定できるようにする、というのがhuskyの役割。どうやらhuskyを入れたときにGit hookをhusky経由で動くように入れかえてるっぽい。

### lint-staged

<div class="linkbox"><div class="linkbox_image"><a href="https://www.npmjs.com/package/lint-staged" target="_blank" ><img src="https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://www.npmjs.com/package/lint-staged" target="_blank" >lint-staged - npm</a> </div><div class="link_description">Run linters against staged git files and don't let 💩 slip into your code base!</div></div></div>

lint-stagedは`git add`した対象に対して特定のコマンドを走らせるもの。READMEにもあるとおりhuskyと合わせて使うのがオススメとされている。ちなみに以前はhusky以外にもpre-commitをやり方やいろいろあった。あと、名前はlint-stagedだけどやることはstagingされたコミット前のものに対して何かをするのでlint以外にも使える。

ちなみに昨年前半あたりまでずーっとハンク（`git add -p`)したファイルの対応する方法に関してissueで議論されていたが、昨年中頃にlint-stagedがアルファ版を経て正式に対応した。個人的にハンクはかなり使うのでずっと動向を追っていたし、これが解消されたからプロジェクトに導入したし、紹介するに相なりました。

## インストール
npmに慣れてる人には言うまでもないだろうけど
```shell
$ yarn add -D husky lint-staged
# or npm install -D husky lint-staged
```
でOK。

## 設定
package.jsonに設定を書いていく。ちなみに別ファイルに分けることもできるけど、そう複雑で長い設定でもなく、huskyとlint-staged両方とも連続した設定になるし、package.jsonのscriptともかかわることもあるので個人的にはpackage.jsonだけでやっちゃうのが良いと思ってる。
### まずhuskyの設定
以下を追加
```json package.json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
```
要はhuskyの設定を、hooksのpre-commitに`lint-staged`コマンドをするよ、という設定。
ここではpre-commitだけだけどもちろん他のhookも同様に書くことができる。詳しくはhuskyのREADME参照。

### lint-stagedの設定
同様にlint-stagedの設定もpackage.jsonに書く。ここはどのようなファイルにどのようなlintをするかので一例として
```json package.json
  "lint-staged": {
    "*.{js,ts,vue}": [
      "eslint --fix",
      "git add"
    ]
  },
```
みたいに設定する。
lint-staged直下の設定で対象のファイルのglobパターンを書く。例えば上の例だったらGitのStageにある拡張子が`js`,`ts`,`vue`のものに`eslint --fix`がかかる。これで自動で修正された結果のファイルが再度addされて、問題なければcommitされる。

もちろん、lintの結果エラーが返ったときはcommitされない。意図的にpre-commitフックを避けない、という前提のもとであればコミットされたものは全てプロジェクトで設定されたLintのルールにパスしていることが担保される。

で、もちろんファイル名の条件にしたがってコマンドを走らせるだけなので、
```json package.json
  "lint-staged": {
    "*.{js,vue,ts}": [
      "eslint --fix",
      "git add"
    ],
    "(*.rb|*.rabl|Gemfile)": [
      "bundle exec rubocop --auto-correct --fail-level E",
      "git add"
    ]
  },
```
みたいにやればこの例で言えばJS系だけでなくRubyのファイルにRubocop（Ruby用のLinter兼Formatter）をかけるようにもできる。

ちなみにJS系のformatterとしてprettierがあるけど、eslintのルールとバッティングするところもあるので、eslintにpluginを噛ませてeslintの中でprettierによるformatするのがお勧め。

## おまけとまとめ
あとは以前に紹介したcommitizenもNPMなので一緒に使うのも簡単で、そうするとコミットメッセージも綺麗、コミット内容もキレイ、という素敵なコミットができる。

<div class="linkbox"><div class="linkbox_image"><a href="https://blog.solunita.net/write-easy-neat-git-commit-message/" target="_blank" >NO IMAGE</a></div><div class="link_info"><div class="link_title"><a href="https://blog.solunita.net/write-easy-neat-git-commit-message/" target="_blank" >ちゃんとしたGitコミットメッセージをCommitzenを日本語で使って楽に書く - Trial and Spiral</a> </div><div class="link_description">Commitzenは一言で言えば対話的にコミットメッセージを作るやつ</div></div></div>

と書いてきたけど、やってることはいろんなところで紹介されてるしそんな難しいことじゃない。
でもNPMがフロントエンド特化傾向にあるため、Node.js系をふだん使ってない人には有用であればうれしいなぁ。特にRailsはWebpackerやらYarnを採用したこともあって相性は悪くないと思う。

途中でもちょっと触れたけどこのGitのハンクに対応したこともあって、この仕組みを業務でも使ってみたけど上手くいってますのでけっこうオススメしますよ。
