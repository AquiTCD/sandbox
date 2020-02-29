---
title: これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）
slug: aqua-skk-customize-late-2017
tags:
  - アプリ
  - カスタマイズ
  - 開発
  - Hack
  - Mac
date: 2018-01-14T00:00:00.000Z
---
昨年（2017年末）僕がメインで使ってるテキストエディタAtomのカスタマイズ記事を書いたんだけど、付随してAquaSKKの設定も書いておこうと思ってたら年が明けちゃった。
表題は（early 2018）とすべきかもしれないけど、変わってないので関連製を持たせるために（late 2017)で。

<div class="series"><div class="seriesTitle">最近極まりつつある入力環境カスタマイズシリーズ</div><ul class="seriesList"><li class="seriesItem">[これがないと捗らない、僕が使ってるAtomパッケージ（late 2017）](/atom-packages-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）](/atom-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）](/aqua-skk-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のErgoDoxファームウェア設定（late 2017）](/ergodox-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のKarabiner-elementsカスタマイズ（late 2017）](/karabiner-customize-late-2017)</li></ul></div>

## AquaSKK
### そもそもAquaSKKって？
mac OS用のSKKIME。
これについてはだいぶ前に書いた記事「[僕が日本語 IM「SKK」に憑かれた訳](http://blog.solunita.net/post/87818543835/im-skk)」を参照していただければ。

### AquaSKKの設定について
AquaSKKはただ単にSKK入力を実現するだけじゃなくて、キーバインドや入力ルールもカスタマイズできる。そのへんを弄くる話。

### keymap.conf
キー割り当てのセッティング。これをAtomでのキーバインドと相互に寄せてることで入力に関して割と近い統一性を保つようにしてる。

設定の方法については[keymap.confの文法](https://ja.osdn.net/projects/aquaskk/wiki/keymap.conf%E3%81%AE%E6%96%87%E6%B3%95)を参照のこと。

今の設定はこんな感じ
```
###
### keymap.conf
### https://ja.osdn.net/projects/aquaskk/wiki/keymap.conf%E3%81%AE%E6%96%87%E6%B3%95

# ======================================================================
# event section
# ======================================================================

SKK_JMODE		ctrl::j||keycode::0x68
SKK_ENTER		group::hex::0x03,0x0a,0x0d||ctrl::m
SKK_CANCEL		ctrl::g||hex::0x1b
SKK_BACKSPACE		hex::0x08||ctrl::h
SKK_DELETE		hex::0x7f||ctrl::d
SKK_TAB			ctrl::n
# SKK_PASTE		ctrl::v
SKK_PING		ctrl::l
SKK_UNDO		ctrl::/

# ======================================================================
# attribute section(for SKK_CHAR)
# ======================================================================

ToggleKana		q
# ToggleJisx0201Kana	ctrl::q
SwitchToAscii		l||hex::0x1b
# SwitchToJisx0208Latin	L

EnterAbbrev		/
EnterJapanese		Q
NextCompletion		hex::0x09
PrevCompletion		ctrl::p
NextCandidate		hex::0x20||ctrl::f
PrevCandidate		x||ctrl::b
RemoveTrigger		X

UpperCases		group::A-K,M-P,R-Z
Direct			group::keycode::0x41,0x43,0x45,0x4b,0x4e,0x51-0x59,0x5b,0x5c,0x5f
InputChars              group::hex::0x20-0x7e

CompConversion		shift::hex::0x0D||shift::hex::0x20

# ======================================================================
# handle option
# ======================================================================

AlwaysHandled           group::keycode::0x66,0x68
PseudoHandled           ctrl::0||hex::0x1b
```
ちょっと解説すると、ベースはAquaSKKのデフォルトを踏襲しつつ、自動補完に関してはEmacsの<key>Ctrl</key>+<key>p</key>,<key>n</key>による上下で送り、戻りをできるようにしつつ、<key>Shift<key>+<key>Enter</key>で補完して変換決定をしてる。これはAtomでやってるAutocompleteとほぼ同様になるように寄せている。

変換候補の送り、戻りも<key>Ctrl</key>+<key>b</key>,<key>f</key>で対応するようにしてるけど大概の場合は<key>Space</key>を何度か叩くことで問題ないのであまり使ってない。

余談だけどSKKになれると日本語/直接入力の切り変えはSKK側のショートカットで行えるので、USキーボードのようにかなキー、英数キーが無くても全く問題ない（一応僕はKarabiner-elementsで設定してるけどほとんど使ってない）

### カスタムルール
AquaSKKでは日本語入力時の入力に対する出力をカスタムできる設定がある。
設定方法については[かな変換のカスタマイズ](http://aquaskk.osdn.jp/kana_rule.html)をご参照あれ。

簡単に言えば、`入力`,`ひらがな時の出力`,`カタカナ入力時の出力`,`半角カナ時の出力`を書けば、それぞれ適宜出力されるようになる。これによって、使わない全角入力文字の排除と日本語入力時にも半角英数（記号）の直接入力の両方が実現できる。さらに慣例的に<key>z</key>+<key>何か</key>でよく使われる記号を入力することもできる。これもなかなかありがたい。

ファイルで分割すればチェックボックスでオン/オフが設定できるけど、そもそもオン/オフしたいときがないので1つのファイルに自分用は全部書いて適用してる。注意すべきは文字コードをEUC-JPで保存しなければいけない点。

```
###
### custom-symbols.rule -- 日本語入力時の記号入力
###

### 日本語で良く使うもの
!,！,！,!
?,？,？,?
~,〜,〜,~
(,（,（,(
),）,）,)

### FEPベース全角記号
z1,○,○,z1
z!,●,●,z!
z2,▽,▽,z2
z@,▼,▼,z@
z3,△,△,z3
z#,▲,▲,z#
z4,□,□,z4
z$,■,■,z$
z5,◇,◇,z5
z%,◆,◆,z%
z6,☆,☆,z6
z^,★,★,z^
z7,◎,◎,z7
z8,∞,∞,z8
z*,×,×,z*
z+,±,±,z+
z~,≠,≠,z~
z=,≒,≒,z=
z`,※,※,z`
z|,｜,｜,z|
z\,￥,￥,z\
z{,【,【,z{
z},】,】,z}

### HTML escapes
z&,&,&,z&
zc,©,©,zc
z",",",z"
z',',',z'
z,>,>,z>

### PNBF emacs arrows
zp,↑,↑,zp
zn,↓,↓,zn
zb,←,←,zb
zf,→,→,zf

### コロン/セミコロン
;,;,;,;
:,:,:,:
z;,；,；,z;
z:,：,：,z:
```

簡単に解説すると、
+ ！　,？　,〜,（）についてはちゃんと全角で入力できるようにしてる
+ Windows用SKK「FEP」で設定されている記号入力をベースにしつつ自分用にカスタマイズしたもの
+ HTMLで使われる記号用エスケープの入力ショートカット
+ Emacsの操作に基づく矢印キー入力（ちなみにHJKLはデフォルトで対応してる）
+ コロン/セミコロンは半角を入力するようにし、zをつけたときだけ全角で入力できるようにする

## ついでに
ほとんど関係ない余談だけど、僕はキーボードは変態用として名高いKinesisを経て、今はErgoDox EZを使ってる。US配列なので英数キー、かなキーがないけどAquaSKK使いなので困ったことがない。
 </key></key>
