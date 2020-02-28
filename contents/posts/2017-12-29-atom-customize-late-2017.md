---
title: これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）
date: 2017-12-29T00:00:00.000Z
tags:
  - アプリ
  - カスタマイズ
  - 開発
  - Atom
  - Mac
image: /images/covers/2017-12-29-atom-customize-late-2017.jpg
---
<div class="series"><div class="seriesTitle">最近極まりつつある入力環境カスタマイズシリーズ</div><ul class="seriesList"><li class="seriesItem">[これがないと捗らない、僕が使ってるAtomパッケージ（late 2017）](/atom-packages-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）](/atom-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）](/aqua-skk-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のErgoDoxファームウェア設定（late 2017）](/ergodox-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のKarabiner-elementsカスタマイズ（late 2017）](/karabiner-customize-late-2017)</li></ul></div>

前回の「これがないと捗らない、僕が使ってるAtomパッケージ（late2017）」を受けて、さらに追加でカスタムしてる部分。
つまり前回紹介したパッケージが入ってないと関係ないのもあったり。
あの大量のパッケージ郡とこの必須設定、あと紹介しなくてもいい超個人的設定を足すことで、今の僕の快適環境ができあがる。

ここまでカスタムすると他のエディタで入力しようとは思わないので、最近いろんなMarkdownエディタが増えたりしてもまったく希望に合わないのが残念。というか世間が本当に求めてるのはMarkdownビューア兼ファイラで、エディタは外部エディタがいいんじゃないか、と思う（僕が欲しい、とも言う）。しかもLintも効かないんじゃあねぇ……

そんなこんなで大掃除ついでに設定の棚卸し第二弾。

### Config
基本はPreferencesから設定すればいいと思う。というかそっちから設定してもconfigに反映される。
必須というのは日本語の約物まわりだけ、これだけで日本語入力がかなり快適に。
```coffee config.cson
"*":
  # デフォルトで入ってるbracket-matherに日本語の括弧系も追加
  "bracket-matcher":
    autocompleteCharacters: [
      "()"
      "[]"
      "{}"
      "\"\""
      "''"
      "``"
      "“”"
      "‘’"
      "«»"
      "‹›"
      "「」"
      "『』"
      "【】"
      "（）"
    ]
  # custome-title用設定
  core:
    titleBar: "custom-inset"
  "custom-title":
    template: "<%= projectName %><% if (relativeFilePath) { %> - <%= relativeFilePath %><% } else { %> - <%= fileName %><% } %> <% if (gitHead) { %> [<%= gitHead %>]<% } %> - Atom"
  # editor内の設定
  editor:
    # 文字として扱わないものにデフォルト以外の記号と日本語約物を追加
    nonWordCharacters: "/\\()\"':,.;<>~!@#$%^&*|+=[]{}`?-…_、。！？「」『』【】（）・”’‘～"
  "toggle-quotes":
    # バッククォートを追加
    quoteCharacters: "\"'`"
```

### Keymap
一部抜粋のなのでこれをこのまま使うと他のとコンフリクト起こす可能性があるので、参考程度に。
基本はEmacsのキーバインドをベース。
ただ、修飾キー周りが煩雑として特にルールもないので最近ちょっと困ってる。
なるべく各アプリやOSのデフォルトキーバインドに寄せたいが、
そのあたりのルールも明確に基準があるわけでもなく、
かといって修飾キーベースで操作単位のスコープにしたい、という思いが上手く噛み合わなくて歯痒い。

ここに書いてある以外にも大量に設定してるけどわりと良く忘れてしまうのでなんとかしたい。
```coffee keymap.cson
# for all
# ------------------------------------------------------------
'body':
  # ctrl-tabによるタブ変更順を設定
  'ctrl-tab ^ctrl': 'unset!'
  'ctrl-tab': 'pane:show-next-item'
  'ctrl-shift-tab ^ctrl': 'unset!'
  'ctrl-shift-tab': 'pane:show-previous-item'
  # line-jumperによる複数行移動をEmacs的キーバインドにする
  'alt-v': 'line-jumper:move-up'
  'alt-shift-v': 'line-jumper:select-up'
  'ctrl-v': 'line-jumper:move-down'
  'ctrl-shift-v': 'line-jumper:select-down'
  'ctrl-k': 'editor:delete-line'

# text-editor for editing
# ------------------------------------------------------------
'atom-text-editor':
  # Emacsのsubword mode的なキーバインド、キャメルケース等でも単語づつの移動が可能になる
  'alt-b': 'editor:move-to-previous-subword-boundary'
  'alt-backspace': 'editor:delete-to-beginning-of-subword'
  'alt-d': 'editor:delete-to-end-of-subword'
  'alt-f': 'editor:move-to-next-subword-boundary'
  'alt-shift-b': 'editor:select-to-previous-subword-boundary'
  'alt-shift-f': 'editor:select-to-next-subword-boundary'

# text-editor for editing
# ------------------------------------------------------------
# TODO: github-commitview-editor内でmulti-cursorが動かない問題
'atom-text-editor:not([mini])':
  # multi-cursor-plusのキーバインド操作をemacベースにして設定
  'ctrl-l':               'multi-cursor-plus:mark'
  'ctrl-p':               'multi-cursor-plus:move-up'
  'ctrl-n':               'multi-cursor-plus:move-down'
  'ctrl-b':               'multi-cursor-plus:move-left'
  'ctrl-f':               'multi-cursor-plus:move-right'
  'ctrl-alt-b':           'multi-cursor-plus:move-to-beginning-of-word'
  'ctrl-alt-f':           'multi-cursor-plus:move-to-end-of-word'
  'ctrl-a':               'multi-cursor-plus:move-to-first-character-of-line'
  'ctrl-e':               'multi-cursor-plus:move-to-end-of-line'
  'ctrl-alt-home':        'multi-cursor-plus:move-to-top'
  'ctrl-alt-end':         'multi-cursor-plus:move-to-bottom'
  'ctrl-shift-p':         'multi-cursor-plus:select-up'
  'ctrl-shift-n':         'multi-cursor-plus:select-down'
  'ctrl-shift-b':         'multi-cursor-plus:select-left'
  'ctrl-shift-f':         'multi-cursor-plus:select-right'
  'ctrl-alt-shift-b':     'multi-cursor-plus:select-to-beginning-of-word'
  'ctrl-alt-shift-f':     'multi-cursor-plus:select-to-end-of-word'
  'ctrl-shift-a':         'multi-cursor-plus:select-to-first-character-of-line'
  'ctrl-shift-e':         'multi-cursor-plus:select-to-end-of-line'
  'ctrl-alt-shift-home':  'multi-cursor-plus:select-to-top'
  'ctrl-alt-shift-end':   'multi-cursor-plus:select-to-bottom'
  # Emmet展開（AquaSkk,AutoCompleteの挙動と近づける）
  'ctrl-enter': 'emmet:expand-abbreviation'
  # snipet展開中のカーソル移動（AquaSkk,AutoCompleteの挙動と近づける）
  'tab': 'snippets:next-tab-stop'
  'shift-tab': 'snippets:previous-tab-stop'
  # atom-notes がeditor内からでも呼べるようにデフォルトを上書き
  'cmd-shift-l': 'atom-notes:toggle'

# Stylus記述用
# ------------------------------------------------------------
# Emmet展開
'atom-text-editor[data-grammar~="stylus"]:not([mini])':
  'ctrl-enter': 'emmet:expand-abbreviation-with-tab'

# Markdown記述用
# ------------------------------------------------------------
'atom-text-editor[data-grammar="text md"]':
  'ctrl-backspace': 'markdown:outdent-list-item'

# Autocompleteによる補完がある場合専用
# ------------------------------------------------------------
'atom-text-editor.autocomplete-active':
  # 選択をEmac的上下で可能に
  'ctrl-p': 'core:move-up'
  'ctrl-n': 'core:move-down'
  # Enter:改行, Shift-Enter:補完入力
  'enter': 'editor:newline'
  'shift-enter': 'autocomplete-plus:confirm'
  # Snipet展開中の場合にtabで前後の入力に移動できるように
  'tab': 'snippets:next-tab-stop'
  'shift-tab': 'snippets:previous-tab-stop'

# Tree view
# ------------------------------------------------------------
'.tree-view':
  # toggle-vcs-ignored-filesが気づかずに誤爆するので設定なしにする
  'i': 'unset!'
```

### Stylesheet
おそらくテーマに`atom-material-ui`を使ってないとUI周り、tree-viewとかはほぼやりなおしな気がする。
というか、`atom-material-ui`のそのへんが気にくわないので直してる感じ。

他は気づきたいものはちゃんと目立たせたりとか。
あまり必要なさそうなものは載せてない。
```less styles.less
// 全体的なUI設定
// ------------------------------------------------------------
// 全体のフォント設定
atom-workspace {
  font-family: 'Noto Sans UI', 'Noto Sans CJK JP', -apple-system,
    'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN', sans-serif;
}
// tree-view, bottom-dock, right-drawerの幅制御
atom-panel-container {
  .left {
    max-width: 240px;
  }
  .right {
    max-width: 240px;
  }
  .bottom {
    max-height: 240px;
  }
}
// Tree-viewの文字サイズ、行間などが納得いかないのでカスタム
.tree-view {
  font-size: 0.9rem;
}
.tree-view .full-menu {
  padding-left: 4px;
}
.list-tree .list-nested-item > .list-tree > li,
.list-tree .list-nested-item > .list-group > li {
  padding-left: 16px;
}
.list-tree.has-collapsable-children .list-nested-item > .list-item::before {
  margin-right: 4px;
}
.list-group .icon::before,
.list-tree .icon::before {
  margin-right: 8px;
}
.list-tree.has-collapsable-children li.list-item {
  margin-left: 14px;
}
.list-tree.has-collapsable-children .list-nested-item > .list-tree > li,
.list-tree.has-collapsable-children .list-nested-item > .list-group > li {
  padding-left: 24px;
}
.list-group li:not(.list-nested-item),
.list-tree li:not(.list-nested-item),
.list-group li.list-nested-item > .list-item,
.list-tree li.list-nested-item > .list-item {
  line-height: 1.5rem;
}
.list-group .selected::before,
.list-tree .selected::before {
  height: 1.5rem;
}

// リガチャのあるフォントに対応（Hasklig）
// ------------------------------------------------------------
atom-text-editor {
  text-rendering: optimizeLegibility;
}
atom-text-editor.editor .syntax--string.syntax--quoted,
atom-text-editor.editor .syntax--string.syntax--regexp {
  -webkit-font-feature-settings: 'liga' off, 'calt' off;
}
// ファイルやフォルダ、プロジェクト、コマンド検索で使われるミニエディタをカスタム
// -------------------------------------------------------------
atom-text-editor.editor.mini {
  font-size: 1.2rem;
  color: #fff !important;
  padding-top: 0;
  line-height: 1.75rem;
}
.tree-view-search-bar .editor.mini {
  font-size: 1.2rem;
}
.advanced-open-file .editor.mini {
  font-size: 1.2rem;
}
.advanced-open-file li.list-item {
  line-height: 1.75rem !important;
  font-size: 1rem;
}
// 全角スペースを目立たせる(idegraphic-space)
// ------------------------------------------------------------
atom-text-editor,
atom-text-editor.editor {
  .highlight.ideographic-space {
    .region:after {
      color: #800000;
      content: '×';
      background-color: #cccccc;
    }
  }
  .line-number.ruby-block-highlight {
    background: rgba(215, 0, 0, 0.4);
  }

  .highlights {
    .ruby-block-highlight .region {
      background: rgba(215, 0, 0, 0.4);
    }
  }
}
// 対応する括弧を目立たせる(Bracket-matcher)
// ------------------------------------------------------------
.bracket-matcher .region {
  background: rgba(215, 0, 0, 0.4);
  border: 1px solid #b71c1c !important;
  position: absolute;
}
// コメントが斜体にならないようにする
// ------------------------------------------------------------
atom-text-editor.editor {
  .syntax--comment {
    font-style: normal;
  }
}
// document-outlineがダークテーマでも問題ないように
// ------------------------------------------------------------
.document-outline heading-node.list-nested-item.highlight {
  background: rgba(255, 255, 255, 0.061);
}
```
