---
title: Atomで新規ファイルのデフォルトのSyntaxをなんとかする
date: 2017-06-12T00:00:00.000Z
tags:
  - アプリ
  - カスタマイズ
  - 開発
  - Atom
  - Mac
image: /images/covers/2017-06-12-custom-default-syntax-of-atom.jpg
---
どうも。通常の文書はなんでもMarkdown、そして気にいったテキストエディタで書ければいいのに、と思ってる僕です。
Markdownエディタがそれなりにあるけど、やっぱり慣れ親しんだというか、Packageいろいろ積んで自分好みに最高になったAtom君で何でも書きたいわけですよ、僕は。

新規ファイルの設定をする
------------------------------------------------------------
AtomはPreference以外でもいろいろ弄くれるので、今回はそれを弄る。New File... とかで新しくファイルを作ったとき、もしくはファイルを開いたけど、拡張子などから特に設定が見つからなかったときのデフォルトのファイルのSyntaxを変える方法。

### Init Scriptを弄る
Macならメニューバーから`Atom`>`Init Script...`と選択すると、`init.coffee`ファイルが開ける。ここでinit、つまり初期化設定をしてるので、これを上手く編集してやればSyntaxの初期値が設定できる。

デフォルトでは説明と例がコメントアウトで書いてあるので、実質何も動いてない。これに以下のように付け足す。

	atom.workspace.observeTextEditors (editor) ->
		original = editor.getGrammar()
		if original? and original is 	atom.grammars.grammarForScopeName('text.plain.null-grammar')
			editor.setGrammar(atom.grammars.grammarForScopeName('text.md'))

この設定の最後の部分の`text.md`が実際に設定されるScopeNameとなる。使いたいSyntaxのパッケージ、つまり`Language-markdown`をPreferenceで見て、Grammerのところに`Scope:text.md`とかあるのでそれを書く。
たとえばHTMLなら`text.html.basic`になる。

これで設定したら保存してAtomを再起動すれば適用されている。
