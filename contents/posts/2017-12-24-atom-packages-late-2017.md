---
title: これがないと捗らない、僕が使ってるAtomパッケージ（late2017）
date: 2017-12-24T00:00:00.000Z
tags:
  - アプリ
  - カスタマイズ
  - 開発
  - Atom
  - Mac
image: /images/covers/2017-12-24-atom-packages-late-2017.jpg
---
Atomのカスタマイズはパッケージだけじゃないんだけど、とりあえずパッケージ入れないことには始まらないってことで、2017年の棚卸し的に列挙しておこうと思う。

僕の場合、Ruby(Rails)とJavaScript,HTML,CSSを書くことが多いのでそのへんに特化してるカスタマイズになってるはず。使用パッケージが結構多くてそれぞれのパッケージ間でキーマップがバッティングしてたり、スタイルの競合がおこってたりするのでstylesheetとkeymapで弄ってたり、configで特別な設定してたりするけど、それはそれで別の記事に書く。

<div class="series"><div class="seriesTitle">最近極まりつつある入力環境カスタマイズシリーズ</div><ul class="seriesList"><li class="seriesItem">[これがないと捗らない、僕が使ってるAtomパッケージ（late 2017）](/atom-packages-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）](/atom-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）](/aqua-skk-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のErgoDoxファームウェア設定（late 2017）](/ergodox-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のKarabiner-elementsカスタマイズ（late 2017）](/karabiner-customize-late-2017)</li></ul></div>

テーマ
------------------------------------------------------------

### UIテーマ
#### [atom-material-ui](https://atom.io/packages/atom-material-ui)
いろいろ設定できるし見やすいので。
ちなみに設定だけだと各種パッケージと上手く行かなかったりするので
ゴリゴリにStylesheet弄ってる。そこについては後日書きます。

### シンタックステーマ
#### [gruvbox-plus-syntax](https://atom.io/packages/gruvbox-plus-syntax)
ビビッドな発色も少なく丁度いい感じ。
すごい好きなんだけど、ややメジャーではないらしくエディタのテーマとか選べるツールとかにgruvboxテーマがないのが残念。

共通
------------------------------------------------------------
### 選択系、変換、入力補助
#### [Sublime-Style-Column-Selection](https://atom.io/packages/sublime-style-column-selection)
SublimeText的な矩形選択（見たままの四角の範囲を選択可能）。
#### [change-case](https://atom.io/packages/change-case)
選択した単語のキャメルケース、スネークケースとかを相互に変換。ケバブケースもドット記法なども幅広く対応しててうれしい。
#### [editorconfig](https://atom.io/packages/editorconfig)
コーディングフォーマット統一のためのeditorconfigをAtomで対応するためのパッケージ。
#### [expand-region](https://atom.io/packages/expand-region)
選択範囲を文字、単語、クォートや括弧で囲んだ要素、と順々に大きくできる。
#### [highlight-column](https://atom.io/packages/highlight-column)
キャレットのある列をハイライト。
#### [highlight-line](https://atom.io/packages/highlight-line)
キャレットのある行をハイライト。
#### [highlight-selected](https://atom.io/packages/highlight-selected)
選択してるものと同じものをハイライト。
#### [line-jumper](https://atom.io/packages/line-jumper)
設定した行数文だけキャレットを一気に移動する。僕はEmacsのページ送り的な送り用途として使用している。
#### [lines](https://atom.io/packages/lines)
選択した複数行をA-Z順にソート
#### [toggle-quotes](https://atom.io/packages/toggle-quotes)
シングルクォートとダブルクォートのトグル変換。configで設定すれば例えばバッククォートも対応できたりする。
#### [toggler](https://atom.io/packages/toggler)
Booleanのような二元的要素をトグル変換。専用のconfigを設定すれば、自分で対応を文字列を増やせる。
#### [trailing-semicolon](https://atom.io/packages/trailing-semicolon)
行末にセミコロンとカンマをつける。キーバインドで設定すると捗る。
#### [trailing-spaces](https://atom.io/packages/trailing-spaces)
行末のスペースを目立たせる。
#### [sequential-number](https://atom.io/packages/sequential-number)
複数行にわたって連番生成連番の文字列を生成。
#### [show-ideographic-space](https://atom.io/packages/show-ideographic-space)
全角スペースを目立たせる。わかりやすくStylesheetでカスタムした設定すると良い感じ。
#### [symbols-tree-view](https://atom.io/packages/symbols-tree-view)
メソッド定義などの一覧をドロワーにツリー型で表示。
#### [tabs-to-spaces](https://atom.io/packages/tabs-to-spaces)
インデントのタブorスペースをトグル変換。ファイル保存時にファイル全体に対して自動実行も可能。
#### [todo-show](https://atom.io/packages/todo-show)
プロジェクト内に存在するTODOやNOTEなどのコメントを抽出して表示。
#### [multi-cursor-plus](https://atom.io/packages/multi-cursor-plus)
デフォルトより高機能なマルチカーソル。キーバインドがバッティングしやすいので僕はゴリゴリにkeymapを編集してる。
#### [pigments](https://atom.io/packages/pigments)
カラーコードになってる部分をその色で表示。CSSとか書くなら。StylusやSassの変数も対応してるので重宝する。
#### [regex-railroad-diagram](https://atom.io/packages/regex-railroad-diagram)
正規表現をビジュアルで表示してくれる。
#### [autocomplete-paths](https://atom.io/packages/autocomplete-paths)
path入力のAutocompleteアドオン、でもたまに邪魔なときがある気がする。

### ファイル、タブ、ペイン操作系
#### [atom-fuzzy-grep](https://atom.io/packages/atom-fuzzy-grep)
プロジェクト内をag的なfuzzyGrepしてファイル表示。
#### [split-diff](https://atom.io/packages/split-diff)
Paneで分割してDiff表示、見やすい。しかも保存してない状態でもDiffとれるので、長大な文字列とか大きめなオブジェクトを一時的に比較するときも重宝する。
#### [advanced-open-file](https://atom.io/packages/advanced-open-file)
ディレクトリ毎に絞り込みでファイルを開ける、フルキーボードで階層ごとに掘っていく場合に便利。
#### [douglas](https://atom.io/packages/douglas)
CLI用リポジトリ管理ツール[ghq](https://github.com/motemen/ghq)のローカル管理下にあるプロジェクトのショートカット、全てのプロジェクトがGit管理されていればプロジェクトマネージャーはこれだけで十分だと思う。
#### [expose](https://atom.io/packages/expose)
開いてるタブをmacのexpose的に表示、切り替えできるやつ。
#### [hey-pane](https://atom.io/packages/hey-pane)
複数paneで分割してる時にアクティブなペインを自動的にほぼ最大化する。フォーカスしたペインに自動的に適用したりもできる。
#### [tree-view-filter](https://atom.io/packages/tree-view-filter)
tree-viewで表示しているファイルをインクリメンタルに絞り込む。
#### [tree-view-git-status](https://atom.io/packages/tree-view-git-status)
tree-view上でGit-statusによる色分け表示する。追加ファイルや変更したファイルとかが視覚的にわかりやすいし、未コミットのファイルもみつけやすい。
#### [zentabs](https://atom.io/packages/zentabs)
最大タブ数の設定制御。設定数を越えると古いタブから自動的に閉じていれ変わる挙動になる。設定でピン止めしたファイルや、未コミットファイル除外したりもできる。たくさんファイル開きすぎてわかんなくなっちゃうので。
#### [auto-encoding](https://atom.io/packages/auto-encoding)
エンコーディングの自動判別。
#### [convert-to-utf8](https://atom.io/packages/convert-to-utf8)
マルチバイトのファイルをutf-8に変換。

### Linter系
#### [linter](https://atom.io/packages/linter)
Linter機能。各言語用は後述。ないと死ぬ。
各言語用のLintは後述。
#### [linter-ui-default](https://atom.io/packages/linter-ui-default)
Linter表示用。たぶんLinter入れると入ってくるはず。

### MiniMap系
#### [minimap](https://atom.io/packages/minimap)
  画面端にコード全体をざっと単純化して見わたせるようなやつを表示。他のパッケージで拡張可能。
#### [minimap-autohider](https://atom.io/packages/minimap-autohider)
  ミニマップをスクロールしてないとき以外は自動的に非表示。
#### [minimap-find-and-replace](https://atom.io/packages/minimap-find-and-replace)
  ミニマップ内で検索文字列を全てハイライト。
#### [minimap-highlight-selected](https://atom.io/packages/minimap-highlight-selected)
  ミニマップ内で選択した文字を全てハイライト。
#### [minimap-pigments](https://atom.io/packages/minimap-pigments)
  ミニマップ内でカラーコード部分をカラー表示。

### HyperClick系
#### [hyperclick](https://atom.io/packages/hyperclick)
  コード中のいろんな要素がクリッカブルになる、キーバインドにも対応してるので対象の文字列にキャレットがあるときにキー操作でも動作できる。`**-hyperclick`系のアドオンとかで拡張可能。言語特化のアドオンは、後述の言語別のところで。
#### [hyperlink-hyperclick](https://atom.io/packages/hyperlink-hyperclick)
  URLをクリッカブルにしてデフォルトブラウザで開けるようになる。

### 汎用フォーマッタ
#### [aligner](https://atom.io/packages/aligner)
  オブジェクトの定義とか、連続して変数に値を入れるとき、`=`や`:`をセパレータとして左右のインデントが揃うようにしてくれるフォーマッタ。言語別のものもある。
#### [atom-beautify](https://atom.io/packages/atom-beautify)
  ネストした要素のインデントをうまいこと整形してくれるフォーマッタ。JSONとかも良い感じにやってくれたり。けっこういろいろ対応してる。

### その他
#### [sync-settings](https://atom.io/packages/sync-settings)
  GitHubGist経由でAtomの設定を複数端末で同期する、アンインストールしたパッケージも同期できるようになって凄く便利になった、ないと死ぬ。
#### [atom-notes](https://atom.io/packages/atom-notes)
  notational-velocityライクなノートシステムをAtomに組み込み、メモ系の集積ができてそれがカスタマイズした強力な補完機能のAtomで編集できるのは強み。ないと死ぬ。
#### [atomic-chrome](https://atom.io/packages/atomic-chrome)
  同名のchrome-extensionをGoogle Chrome系のブラウザに入れることで、ブラウザで開いてるページのtextareaを同期的にAtomで編集できるようになる。例えばPull RequestなどMarkdown対応のテキストエリアをAtomで編集できるのはかなり便利。ないと死ぬ。
#### [platformio-ide-terminal](https://atom.io/packages/platformio-ide-terminal)
  Atom内でターミナルを動作させる。
#### [tablr](https://atom.io/packages/tablr)
  CSVエディタ。
#### [preview](https://atom.io/packages/preview)
  プリプロセッサ言語から元言語へコンパイル後の表示。
#### [auto-update-packages](https://atom.io/packages/auto-update-packages)
  パッケージにアップデートがあったら自動でアップデートする。ちょいちょい自分で確認しなくていいので楽。
#### [busy-signal](https://atom.io/packages/busy-signal)
  ステータスバーに状況表示アイコンをプラス。確かLinterと一緒に入ってくるはず。
#### [custom-title](https://atom.io/packages/custom-title)
  Atomのウィンドウに表示されるタイトルのルールを変更できるようになる。上手く好きなようにファイル名の表示とかにカスタマイズすると地味に便利。
#### [file-icons](https://atom.io/packages/file-icons)
  ツリービューやタブにファイルのアイコンを表示して視認性を上げる。わりとないと死ぬ。現在もアップデートが盛んでちょいちょい対応アイコン増えてるのがうれしい。
#### [file-types](https://atom.io/packages/file-types)
  自動で判別されるファイルタイプのルールをカスタマイズを楽にする。
#### [goto-definition](https://atom.io/packages/goto-definition)
  メソッドの定義元にジャンプできるようになる。

各言語とか用途とか別
------------------------------------------------------------

### Git
#### [gist](https://atom.io/packages/gist)
  GitHubのGistを編集したりアップロードしたり、挿入したり。Gist系はいくつかあったけどこれが一番使いやすかった。
#### [git-blame](https://atom.io/packages/git-blame)
  行ごとにGitで変更した人を表示する。
#### [git-plus](https://atom.io/packages/git-plus)
  よく使うGit操作をAtomから直でできる、Atomのコマンド補完が効くので便利、基本的なgit操作はこれだけでいける。わりとないと死ぬ。
#### [merge-conflicts](https://atom.io/packages/merge-conflicts)
  Gitでmergeしようとしてコンフリクトしたときの編集サポート。コンフリクトの解消はGitKrakenでやってるけど、一応入れてる。

### Markdown
#### [markdown-preview-enhanced](https://atom.io/packages/markdown-preview-enhanced)
  デフォルトのMarkdownプレビューより高機能なプレビュー、TOCやプレゼンモードもあったりする。目次機能もあったり、いろいろと便利。
#### [document-outline](https://atom.io/packages/document-outline)
  右ドロワーに編集中のMarkdownの目次をページ内リンク付きで表示。
#### [markdown-table-editor](https://atom.io/packages/markdown-table-editor)
  Markdownのテーブル記法編集補助、うまいこと縦のカラム表示を整えてくれる。
#### [markdown-writer](https://atom.io/packages/markdown-writer)
  Markdownの全般的な入力補助。とりあえず入れてる。
#### [toggle-markdown-task](https://atom.io/packages/toggle-markdown-task)
  Markdownのチェックボックス記法のチェック状態のトグル変換。そんなに使わないけどいちいちキャレットを移動するのが面倒なので。
#### [tidy-markdown](https://atom.io/packages/tidy-markdown)
  Markdownのテーブル記法の整形や番号付きリスト記法の番号振りなおしなど、フォーマッタ。
#### [language-markdown](https://atom.io/packages/language-markdown)
  デフォルトのものより高機能なハイライタ。
#### [linter-textlint](https://atom.io/packages/linter-textlint)
  特に日本語に強い自然言語用のLinter、textlintをAtomで使えるように。Markdown以外でも効く。

### JSON
#### [atom-json-color](https://atom.io/packages/atom-json-color)
  JSONファイルを階層によってカラーリングを変えて視認性を上げる。
#### [pretty-json](https://atom.io/packages/pretty-json)
  JSONファイルの整形フォーマッタ。
#### [linter-jsonlint](https://atom.io/packages/linter-jsonlint)
  JSON用のLinterアドオン。

### Ruby
#### [language-haml](https://atom.io/packages/language-haml)
  haml用の言語ファイル。
#### [language-slim](https://atom.io/packages/language-slim)
  Slim用の言語ファイル。
#### [language-rspec](https://atom.io/packages/language-rspec)
  Rspec（Rubyのテストフレームワーク）用の言語ファイル。
#### [language-rabl](https://atom.io/packages/language-rabl)
  Rabl（Ruby用のJSONやxmlに特化したテンプレートサポートGem）用の言語ファイル。
#### [linter-rubocop](https://atom.io/packages/linter-rubocop)
  Rubocop用のLinterアドオン。
#### [linter-erb](https://atom.io/packages/linter-erb)
  erb用のLinterアドオン。
#### [linter-haml](https://atom.io/packages/linter-haml)
  haml用のLinterアドオン。
#### [linter-slim](https://atom.io/packages/linter-slim)
  slim用のLinterアドオン。
#### [autocomplete-ruby](https://atom.io/packages/autocomplete-ruby)
  Ruby用のAutocompleteアドオン。
#### [rubocop-auto-correct](https://atom.io/packages/rubocop-auto-correct)
  Rubocopルールに従って自動修正。
#### [rufo-atom](https://atom.io/packages/rufo-atom)
  Ruby用フォーマッタのrufoをAtomから実行、まだsave時に自動でやってくれたりはしないもよう。JSのprettierな感じになってくれるとうれしいな。

### Rails用
#### [autocomplete-rails-partial](https://atom.io/packages/autocomplete-rails-partial)
  Railsのパーシャビュー名のための用Autocompleteアドオン。
#### [rails-db-scheme](https://atom.io/packages/rails-db-scheme)
  schema.rbを参照して自動補完や定義元にジャンプ。
#### [rails-open-rspec](https://atom.io/packages/rails-open-rspec)
  現在開いてるファイルに対応したRspecのファイルを開く。
#### [rspec](https://atom.io/packages/rspec)
  Atom上でRspecをrun。
#### [ruby-block](https://atom.io/packages/ruby-block)
  `do``if``begen`と`end`などの対になるブロック要素をハイライト。
#### [rails-i18n-plus](https://atom.io/packages/rails-i18n-plus)
  Railsのi18n用のAutocompleteとHyperClickアドオンのセット。
#### [rails-snippets](https://atom.io/packages/rails-snippets)
  Rails用のスニペット集。
#### [rails-transporter](https://atom.io/packages/rails-transporter)
  Model,View,Controllerなど対応するファイル同士を素早く開けるようにする。

### JavaScript系（Node.jsやメタ言語、フレームワーク含む）
#### [atom-typescript](https://atom.io/packages/atom-typescript)
  TypeScriptの言語ファイルか補完や便利機能まで、IDE的サポート。
#### [language-vue](https://atom.io/packages/language-vue)
  Vue.js用の言語ファイル。
#### [linter-eslint](https://atom.io/packages/linter-eslint)
  JavaScript用のLintパッケージであるEslintのAtom-lintアドオン、prettierと連携もできる、ないと死ぬ。
#### [linter-coffeelint](https://atom.io/packages/linter-coffeelint)
  CoffeeScript用のLinterアドオン。
#### [prettier-atom](https://atom.io/packages/prettier-atom)
  JSのフォーマッタprettierをAtomから実行、save時に自動実行できる、ないと死ぬ。
#### [aligner-javascript](https://atom.io/packages/aligner-javascript)
  JavaScript用のalignerアドオン。
#### [js-hyperclick](https://atom.io/packages/js-hyperclick)
  JavaScript用のHyperClickアドオン。
#### [vue-hyperclick](https://atom.io/packages/vue-hyperclick)
  vue.js用HyperClickアドオン。
#### [vue2-autocomplete](https://atom.io/packages/vue2-autocomplete)
  Vue.js用Autocompleteアドオン。
#### [gulp-snippets](https://atom.io/packages/gulp-snippets)
  gulp用のスニペット集。
#### [jquery-snippets](https://atom.io/packages/jquery-snippets)
  jQuery用のスニペット集。

### HTML系（メタ言語含む）
個人的にはPug(Jade)しか書きたくないけど、どうしても使わざるを得ないので他も少々。
#### [language-jade](https://atom.io/packages/language-jade)
  HTMLプリプロセッサJade用の言語ファイル。
#### [language-pug](https://atom.io/packages/language-pug)
  JadeはPugになりました。
#### [linter-htmlhint](https://atom.io/packages/linter-htmlhint)
  HTML用Linterアドオン。
#### [linter-pug](https://atom.io/packages/linter-pug)
  Pug用Linterアドオン。
#### [tag](https://atom.io/packages/tag)
  HTMLの閉じタグのショートカットと補完。Pugで書けばいらないんだけどね。
#### [emmet](https://atom.io/packages/emmet)
  html,css（プリプロセッサ含む）の強力なスニペット集。
#### [indent-tooltip](https://atom.io/packages/indent-tooltip)
  Jade(pug)やStylus,Sassのインデントベース記法の環境で現在のキャレットの位置がどの要素のネスト中なのかツールチップで表示。

### CSS系（メタ言語含む）
個人的にはStylusしか書きたくないけど、どうしても使わざるを得ないので他も少々。
#### [Stylus](https://atom.io/packages/stylus)
  Stylus用の言語ファイルとスニペット集。
#### [linter-stylelint](https://atom.io/packages/linter-stylelint)
  CSS用のLinterアドオン。
#### [linter-scss-lint](https://atom.io/packages/linter-scss-lint)
  SCSS(SASS含む）のLinterアドオン。
#### [linter-stylint](https://atom.io/packages/linter-stylint)
  Stylus用のLinterアドオン。
#### [autocomplete-css-with-stylus-support](https://atom.io/packages/autocomplete-css-with-stylus-support)
  Stylus用のAutocompleteアドオン。

### PUML
UMLをテキストから表現したもの。細かいレイアウトは難しいもののテキストならGit管理もできるし素早くかけるので覚えてよかった。
#### [language-plantuml](https://atom.io/packages/language-plantuml)
  PlantUMLの言語ファイル
#### [plantuml-viewer](https://atom.io/packages/plantuml-viewer)
  PlantUML用のUML図ビューア

### その他の言語系
#### [language-apache](https://atom.io/packages/language-apache)
#### [language-nginx](https://atom.io/packages/language-nginx)
#### [language-lisp](https://atom.io/packages/language-lisp)

<div class="cstmreba"><div class="kaerebalink-box"><div class="kaerebalink-image"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4774182702/akicks-22/" target="_blank"><img src="https://images-fe.ssl-images-amazon.com/images/I/51JFnTUxCJL._SL160_.jpg" style="border: none;"></a></div><div class="kaerebalink-info"><div class="kaerebalink-name"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/4774182702/akicks-22/" target="_blank">Atom実践入門──進化し続けるハッカブルなエディタ (WEB+DB PRESS plus)</a><div class="kaerebalink-powered-date">posted with <a href="http://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail">大竹 智也 技術評論社 2016-07-14    </div><div class="kaerebalink-link1"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/gp/search?keywords=Atom%E5%AE%9F%E8%B7%B5%E5%85%A5%E9%96%80&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&tag=akicks-22" target="_blank">Amazonで探す</a></div><div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/12d74c18.2043b39b.12d74c19.fa137382/?pc=http%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FAtom%25E5%25AE%259F%25E8%25B7%25B5%25E5%2585%25A5%25E9%2596%2580%2F-%2Ff.1-p.1-s.1-sf.0-st.A-v.2%3Fx%3D0%26scid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2F" target="_blank">楽天市場で探す</a></div></div></div><div class="booklink-footer"></div></div></div>
