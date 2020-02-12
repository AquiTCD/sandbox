---
title: Git HooksマネージャーのLefthookを試してHusky(+lint-staged)と比較した結果、乗りかえました
tags:
  - 開発
  - Git
  - Node.js
  - Ruby
date: 2019-09-22T04:03:56.110Z
image: /images/covers/2019-09-22-change-lefthook-instead-of-lintstaged-with-husky.jpg
---
Gitにはコミット時やプッシュ後に特定のコマンドを自動実行するGit Hooksという仕組みがありますが、これを設定管理するためにLefthookというライブラリがあることを知りました。
今まではlint-stagedとHuskyを組み合わせて使っていましたが、試しにつかってみたらなかなか良かったので乗りかえてみました、という話。

## Git HooksとかLefthookって何？
Git Hooksについてはまずはここ

<LinkCard url="https://git-scm.com/book/ja/v1/Git-%E3%81%AE%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%9E%E3%82%A4%E3%82%BA-Git-%E3%83%95%E3%83%83%E3%82%AF" title="Git - Git フック" />

本来は`/.git/hooks/`配下に各フック用のスクリプトを置くことで実行されます。しかし、基本的には`/.git/`配下はGit管理対象にいれられないため、リポジトリ単位で管理したり他の開発者と共用するのがやや難しいです。

Lefthookは各フックからLefthookを経由させることで設定したコマンドを実行するように中継するGit Hooksのマネージャーツールです。

<LinkCard url="https://github.com/Arkweid/lefthook" site-name="GitHub" title="Arkweid/lefthook" description="Fast and powerful Git hooks manager for any type of projects. - Arkweid/lefthook" image-url="https://repository-images.githubusercontent.com/169250119/0bf8ef80-96c8-11e9-98c4-5c275172132d" />

同様のアプローチでもっとも有名なもののひとつとしてNPMのHuskyがあり、これはフロントエンド系のライブラリに良く使われていますね。

<LinkCard url="https://github.com/typicode/husky" site-name="GitHub" title="typicode/husky" description="🐶 Git hooks made easy. Contribute to typicode/husky development by creating an account on GitHub." image-url="https://avatars0.githubusercontent.com/u/5502029?s=400&v=4" />

ちなみにこのあたりのことは以前書いたので、深掘りするなら参考までに。
+ [LintとFormatをGitHook時にかけてる理由 \| Trial and Spiral](/why-lint-and-format-on-git-hook/)
+ [LintとFormatをGitのコミット時に自動でかける方法 \| Trial and Spiral](/how-to-lint-and-format-by-git-hook/)

## なぜLefthookを試したか
今までもHuskyで同様のことはできていたし、大きな不満も困りごともありませんでした。ですが、Lefthookのリポジトリで"Fast and powerful Git hooks manager"と謳ってたことやGem版があること、設定を複数できるというのが気になって試してみようとなりました。

その上で現在使ってるHusky(+lint-staged)の構成と比べてもし良くなるんだったら良いなぁ、ぐらいの気持ちです。強いていえば、自分だけに適用できるフックが作るような仕組みがあったらいいなあ、と思っていました。

## 期待してたこと
lefthookを試すにあたって期待したこと
+ MUST: lint-staged + Huskyよりも悪い使い勝手にならないこと
+ GOOD: 共用フックの他に自分だけのフックを公表せずに設定できたら良いなぁ
+ GOOD: コマンド設定だけでなくshell scriptも設定管理できると尚いいな

## 試してみて比較しよう
LefthookはWikiやReadmeがけっこう充実してるのでそちらを参照するのが一番良いんですが、簡単に解説してみます。

### インストール
HuskyはNode.js実装のみですが、LefthookはNode.js,Ruby実装のほかGoやBrew経由でもインストールができます。なのでフロントエンド系の開発以外でも導入しやすいのが良いですね。

インストールはパッケージマネージャーどおりで

```sh
# ruby
$ gem install lefthook

# npm global
$ npm install @arkweid/lefthook
# or npm project-local
$ npm install --save-dev @arkweid/lefthook

# yarn global
$ yarn global add @arkweid/lefthook
# or yarn project-local
$ yarn add --dev @arkweid/lefthook
```

みたいな感じですね。Rubyのプロジェクト単位で入れる場合は`Gemfile`に記載します。
詳細や他の環境についてはLefthookのリポジトリの説明が詳しいのでそちらを参照してください。

余談ですが、Husky(+lint-staged)と比較するとそれが依存しているライブラリもあるため、単一ライブラリのLefthookのほうが良いだろ？　との[主張](https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape)があります。

そしたら`lefthook`コマンドが使えるので、

```sh
$ lefthook install
```

を実行します。この時に設定ファイル`lefthook.yml`と最低限の中継フック`prepare-commit-msg`がそれぞれなかった場合は生成されます。

つまりLefthookを有効化するにはこのひと手間が必要です。Husky(+lint-staged)であればこのインストールの手間は必要なくパッケージインストール時に自動でGitHookがHusky用のものに置き変わります。

また、すでに`lefthook.yml`がある場合は、設定されたフック用のLefthookへの中継スクリプトが生成されます。フックを追加するたびにinstallを叩く必要があるかというと基本的にはありません。もし新規で追加された場合は、既存フックが走るタイミングで追加されたフック用の中継フックも生成されるようです。もし自身で設定したフックがすでに存在する場合は生成しないようです。

このへんの挙動はHuskyと比べてどうかというと好みでしょうね。
フックを絶対強制することはGitに`--no-verify`オプションがある以上不可能です。installのひと手間ぐらいは許容できそうです。逆に、恒常的に用意されたフックを使いたくない場合はinstallを叩かなければいい、という選択もとれるので、自由度はLefthookのほうが良いように思います。

そのあとは手動で`.gitignore`に

```gitignore
lefthook-local.yml
/.lefthook-local/
```

を追加しておきましょう。これは後述する自分用のルール設定に必要です。

### 設定
設定は`lefthook.yml`に書きます。基本的な記法は類似のGemであるOvercommitを踏襲しています。例えばコミット時に自動でリントする設定は

```yml
pre-commit:
  parallel: true
  commands:
    lint-for-ruby:
      glob: "*.{rb}"
      run: bundle exec rubocop -DES --safe-auto-correct --force-exclusion {staged_files}
    lint-for-js:
      glob: "*.{js,ts}"
      run: npx eslint --ignore-path .eslintignore {staged_files}
```

みたいな感じですかね。
ちなみに`{staged_files}`と設定した場合でもhunk(`git add -p`)にも対応しています。parallelで並列実行設定できるのはとても良いですね。

Husky(+lint-staged)でフォーマッターやリンターの自動修正をかけた場合、通常では修正されたものが自動でコミットに含まれます。Lefthookでは含まれません。
ここの挙動は好みですが、個人的には含まれないほうが良いと思います。前者だと自動修正がどのような修正されたかあまり確認せずコミットされてしまいます。後者だとちゃんと確認しますし、もし自動修正の結果だけでコミットを作りたくない場合は、修正結果をammendなどで前コミットに纏めてしまえばいいですね。

他の例も挙げてみましょう。pullしたときにもし新しいパッケージが追加されてたりしたら自動でインストールしたり、RailsのDB設計に変更があったらマイグレーションかけるにはこんな感じでしょうか

```yml
post-merge:
  piped: true
  commands:
    npm:
      files: git diff --name-only HEAD master
      glob: "{package.json,yarn.lock}"
      run: yarn install
      tags: frontend
    gem:
      files: git diff --name-only HEAD master
      glob: "{Gemfile,Gemfile.lock}"
      run: bundle exec bundle check || bundle install
      tags: backend
    migrate:
      files: git diff --name-only HEAD master
      glob: "{db/migrate/*}"
      run: bundle exec rails db:migrate && bundle exec rails db:test:prepare
      tags: backend
```

Lefthookが優れているのは`lefthook-local.yml`に同様の設定を書くことで、`lefhook.yml`の設定をオーバーライドできます。つまり`lefthook.yml`をGit管理して`lefthook-local.yml`をignoreすることで、共用設定を自分だけの設定を分けることが可能です。これは素晴らしい。

### フック時にスクリプトを使う
例えば既存のコマンドではなく、bashスクリプトをフック時に使いたい場合。例として、GitHubなどのリモート側でmasterなどの大事なブランチを保護する仕組みをローカル側でもやってみます。
大事なブランチの場合、プッシュしようとするとエラーを返して防ぐようなスクリプトを実行します。

```yml
pre-push:
  scripts:
    "protect-branch":
      runner: bash
```

みたいにして、`/.lefthook/pre-push/protect-branch`に下記のようなシェルスクリプトを書きます。

```sh
#!/bin/bash

while read local_ref local_sha1 remote_ref remote_sha1
do
  for branch in "master" "production"; do
    if [[ "${remote_ref##refs/heads/}" = "${branch}" ]]; then
      echo "警告: 保護されたブランチのためプッシュをキャンセルしました"
      exit 1;
    fi
  done
done

```

このスクリプトを置く場所も`/.lefthook-local/`ディレクトリにすると設定をオーバーライドできるため、こちらも同様に自分だけルールをGit管理に影響をおよぼすことなく設定できます。

## 比較結果と感想
今回はLefthookを試してHusky(+lint-staged)と比べてみました。

公式の比較は[Comparison with other solutions · Arkweid/lefthook Wiki](https://github.com/Arkweid/lefthook/wiki/Comparison-with-other-solutions)を見ると良さそうです。

すでに述べたように、全体的に見てHusky(+lint-staged)でできてることはLefthookでもできていますし、柔軟性はLefthookのほうが高いように見えます。特にlocalを使ったオーバーライドの仕組みは良いですね。チームには強制したくないけど、自分はこうしたい、という状況はよくあると思います。

注意点としては`lefthook.yml`がなかったり1つも記載がない場合はlefthook自体が走らず結果としてlefthook-local.ymlも評価されないということがありました。例えば既存プロジェクトに自分だけLefthookを使いたい場合なんかに注意ですね。

結果としてはHusky(+lint-staged)を置きかえても良さそうと判断しました。特にNode.js系以外の選択肢もあるので、Node.jsメインじゃないリポジトリに導入しやすくて良いですね。ただし、もしすでにHusky(+lint-staged)が上手く動いてるNode.js系のプロジェクトで困っていなければ、あえて移行する必要もないのかな、とも思います（もちろん僕が普段Railsを主に扱ってる、という背景もあります）

余談として、公式のブログ記事の見出しが「Round one」だったり「Blow by blow（一打づつ）」みたいにパンチを意識しているのが面白かったです。
左フックで開発タスクをガンガンKOしていきましょう！

<LinkCard url="https://evilmartians.com/chronicles/lefthook-knock-your-teams-code-back-into-shape" site-name="Martian Chronicles" title="Lefthook: Knock your team&#39;s code back into shape — Martian Chronicles" description="Meet Lefthook, the fastest polyglot Git hooks manager in our galaxy that requires zero setup from your contributors" image-url="https://cdn.evilmartians.com/front/posts/lefthook-knock-your-teams-code-back-into-shape/cover-3d7a8aa.png" />
