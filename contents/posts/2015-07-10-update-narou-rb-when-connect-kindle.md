---
title: Kindleを接続したら自動でNarou.rbを回すと良い感じ
slug: update-narou-rb-when-connect-kindle
tags:
  - カスタマイズ
  - ガジェット
  - Hack
  - Mac
date: 2015-07-10T00:00:00.000Z
---
以前からKindlePaperwhiteを使ってて、それと共に『小説家になろう』とかのWeb小説もそちらで読んでる。それらを便利にしてくれてるのも『Narou.rb』というスクリプトのお陰なんだけど、それをもうちょっと使いやすくしてみたお話。
<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://whiteleaf.hatenablog.com/entry/2013/03/07/%E3%80%8C%E5%B0%8F%E8%AA%AC%E5%AE%B6%E3%81%AB%E3%81%AA%E3%82%8D%E3%81%86%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%80%EF%BC%86%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%97%E3%83%AA%E3%80%8DNarou.rb" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://whiteleaf.hatenablog.com/entry/2013/03/07/%E3%80%8C%E5%B0%8F%E8%AA%AC%E5%AE%B6%E3%81%AB%E3%81%AA%E3%82%8D%E3%81%86%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%80%EF%BC%86%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%97%E3%83%AA%E3%80%8DNarou.rb"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://whiteleaf.hatenablog.com/entry/2013/03/07/%E3%80%8C%E5%B0%8F%E8%AA%AC%E5%AE%B6%E3%81%AB%E3%81%AA%E3%82%8D%E3%81%86%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%80%EF%BC%86%E5%A4%89%E6%8F%9B%E3%82%A2%E3%83%97%E3%83%AA%E3%80%8DNarou.rb" target="_blank"> 「小説家になろうダウンローダ＆変換アプリ」Narou.rbをリリースしました - WHITELEAF：Kindle応援サイト</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> このアプリは小説家になろうで公開されている小説の管理、及び電子書籍データへの 変換を支援します。 ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>


## 概要
### やりたいこと
narou.rbを動かすのもKindlePaperwhiteをMacに接続した状態のみで十分なため、KindlePaperwhiteを接続したら自動でNarou.rbを動かし、終了するとアンマウントする仕組みがあると便利。

### 必要なもの
- Kindle系デバイス
- Narou.rb（Web小説ダウンローダ変換アプリ）
- ControlPlane（任意の条件をトリガーになにかするMac用アプリ）
- ScriptEditor（純正AppleScriptエディタ）
- iTerm2（Terminal代替アプリ）

### 大まかな手順
1. ScriptEditorで自動化するAppleScriptを書く
2. ControlPlaneでトリガーと動作を設定する
3. Kindleを接続する

#### 前提
- Narou.rbはすでにインストールされてるものとし、その方法については割愛
- Narou.rbによる小説のアップデート時に自動で接続されているKindle内のファイルもアップデートされる設定になってること
- Terminalは純正ではなくiTermを使いたい。そのインストールについても割愛

## 実際の流れ
### ScriptEditorで自動化するAppleScriptを書く
まず自動化する部分のスクリプトを書く。先に僕の使ってるものを紹介すると以下のようになる。

	tell application "iTerm"
		make new terminal
		tell the current terminal
			activate current session
			launch session "Default Session"
			tell the last session
				write text "cd {Narou.rbが動作するディレクトリ} ;narou update"
				write text "diskutil eject Kindle"
				write text "say done"
			end tell
		end tell
	end tell

僕の場合、iTermを使いたいのでこんな感じ。純正のTerminalを使用する場合、ちょっと変わってきて<code>do script</code>とかでやれば良いと思う。<code>{Narou.rbが動作するディレクトリ}</code>は自分のNarou.rbの動作するファイルパスを指定。僕の場合なら<code>/Users/username/Documents/NarouNovels</code>とかになってる。要は

1. Terminal系アプリを呼び出し
1. narou.rbを動作させる
1. 終わったらKindleボリュームをイジェクト
1. 全部終わったり何か音を鳴らす

という流れ。当然、Kindleのボリュームの名前を変更してれば書きかえて。あと、全部終わったときの音は、Macに入ってるKyokoちゃんに「done（だん）」って言わせるようにしたので、ここも気に入らなければ書き換えて。そうして出来たものを任意の場所に保存しておく。

### ControlPlaneでトリガーと動作の設定
ControlPlaneという任意の条件をトリガーとして任意の行動を自動化するアプリを使う。
<div class="shareBlock"><div class="shareLeft"><a href="http://www.controlplaneapp.com/" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.controlplaneapp.com/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.controlplaneapp.com/" rel="nofollow">ControlPlane | Context Sensitive Computing</a></div><div class="shareDetail"><div class="shareInfo1">Context Sensitive Computing ...</a></div><div class="shareInfo2"><br style="clear:both;"></div></div></div></div>
設定がちょっと分かりにくいのが難点なんだけど解説すると

1. 特定の条件をRuleとして判定
1. Ruleに従ってContextに移行
1. Contextに関連したActionを実行

というような感じ。実際の設定は起動するとメニューバーに表示される飛行機のアイコンから<code>Preferences...</code>を選ぶ。

#### Contextsの設定
ややこしいのが設定する順番と、上に書いた動作イメージの順番が異なること。設定としてはまず最初にContextsを設定してしまう。

![ControlPlane Context](https://lh3.googleusercontent.com/UiYR6wcWs7ClVGTPP6tdq3nVSWs1IHdTEtDtJSt5aKw "ControlPlane Context")

ウィンドウのContextsを選んだら左下の+ボタンを押して任意の名前のものを追加。僕の例だとNarouKindleという名前。ここはイメージとしてはモードとかそんな感じ。NarouKindleモード、そんな感じ。

#### Rulesの設定
動作としてはきっかけのトリガーとなる部分の設定。ここで設定の為にKindleを接続しておくこと（接続してないと選択肢に出てこないため）、Evidence SoucesでMounted Volumeにチェックが入っていることをあらかじめ確認しておく。

![ControlPlane Rules](https://lh3.googleusercontent.com/cNwtEJxVzWGyImjxj79MgwMSB7BG9BFpG5rv777DRnU "ControlPlane Rules")

Rulesタブの左下の+ボタンを押して、<code>Add 'Mounted Volume' Rule...</code>を選択。

VolumesをKindleにして、Contextを先程設定したものにする。僕の場合はNarouKindle。これで「Kindleボリュームがマウントしてる時はNarouKindleモードになる」という条件付け、トリガー部分ができた。

#### Actionsの設定
最後に、トリガーに対する動作を設定する。つまり、今設定したトリガー部分と最初に作ったAppleScriptを関連付ける。

![ControlPlane Actions](https://lh3.googleusercontent.com/CPMqDFQAk7SV7uYfjzCHyj_BmnPXRHwxK47ckJyh1Go "ControlPlane Actions")

Actionsタブの+ボタンを押す。<code>System Actions</code>の<code>Run Shell Script</code>を選択すると、ファイルを選択するダイアログが表示されるので最初に作ったAppleScriptを選択する。僕の場合は<code>narouUpdate.scpt</code>というファイル。ShellScriptと書いてあるけどAppleScriptでも動作するらしい。
Descriptionは自分で分かりやすいように説明書き。Contextは先程設定したNarouKindle、そのあとはOn Arrivalで。ここはどうやらControlPlaneが飛行機のイメージなので、NarouKindleという飛行機が着陸（モードに入る）したときに動作させるのか、離陸する（モードから抜ける）時なのか、または両方なのか、というアクションの実行タイミングの設定。今回はKindleというボリュームがマウントしたら、ということなので、OnArrivalで。

これで、Kindleがマウントされたら一連の動作をさせるAppleScriptを実行する、という環境が構築された。

### 動作確認
おそらくKindleを接続したままだと思われるので、一度アンマウントしてから、再度接続。マウントされたのを判定して、iTermの新しいタブでNarou.rbが回ったらOK。何もなければ、Narou.rb終了後に自動でKindleボリュームをイジェクトして、Kyokoちゃんが「だん」と言ってくれるはず。

## 所感
このような動作にしたのは今回もまた完全に自分の使い易いように、といういつものアレだけど理由としては、

1. iTermは日常的に動かしてるのと、Terminalで新しくウィンドウが開くのがイヤだった
1. 自動でイジェクトしておけばそのまま充電だけさせておいて、必要なときに気兼ねなく取り外せる
1. 何をどうアップデートしたのか後から確認できるようにiTermのタブはあえて自動で閉じない

とまあそんな理由から。ControlPlaneは他にもいくつか自動化のアイデアがあるのでそれはまた今度記事にしようと思う。
