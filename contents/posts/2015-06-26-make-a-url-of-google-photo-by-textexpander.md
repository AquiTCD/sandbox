---
title: GoogleフォトからMarkdownの画像リンクをTextExpanderで楽に作る
date: 2015-06-26T00:00:00.000Z
tags:
  - アプリ
  - カスタマイズ
  - Hack
  - Mac
image: /images/covers/2015-06-26-make-a-url-of-google-photo-by-textexpander.jpg
---
僕はGoogleのサービスにブログ用の画像を置いてるのだけど、先日のレザークラフトの記事を書くにあたって久々に画像リンクをあれこれしてたら、Google+からGoogleフォトに代わってたので以前の方法だと上手く行かなくなってた。今回、TextExpanderを使って楽にリンクを貼る方法を模索した。

## 実際の設定と運用
### 状況
- Googleフォトになって以前と同じ方法で画像URLが取得できなくなった
- ブログを書くときにできるだけ楽に書きたい
	- Markdownで書く
	- 何らかの方法で自動で文字列を操作したい
		- TextExpanderでシェルスクリプトを用いた文字列操作

### 順序
1. TextExpanderにシェルスクリプトを設定する
1. Googleフォトから写真のURLをクリップボードにコピー
1. 任意の場所でスニペットを呼び出し
1. 説明文を入力

一度設定してしまえば2〜3を繰り返すだけでOK。結構楽になった。

####  1.TextExpanderにシェルスクリプトを設定
TextExpanderを開いて新しくスニペットを作成する。  
![TextExpander入力](https://lh3.googleusercontent.com/SEzcrMNCXOxQN3QQS_CmujUCejpe2K6sTdnY7U_30Cw "TextExpander入力")  
上部分のContentをShell Scriptに設定して、内容を以下のコードにする。

	#!/bin/sh
	photo_description="%fill:description%"
	photo_url="%clipboard"
	text="![$photo_description]($photo_url \"$photo_description\")"
	echo $text | sed "s/=w.*-no//g" 

変数を利用する必要はなさそうだけど、デバッグもしやすいので。  
任意の名前を決め、Abbreviationで省略語を設定する。

#### 2.Googleフォトから写真のURLをコピー ####
Googleフォトの個別写真のページで、画像のURLをコピーする。  
![GoogleフォトURLコピー](https://lh3.googleusercontent.com/YYZ_sIPaR0Rz1ml5u_rcQETCJVxExV6y2bW4a216d_w "GoogleフォトURLコピー")  
どうやら<code>https://{なんらかのID}.googleusercontent.com/{写真の固有ID}=w{横幅}-h{縦幅}-no</code>というURLになってるらしくて、写真の固有ID以下は削除しても表示される。もちろん数値を変更すれば任意のサイズに変更できる。今回はブログに載せる画像用でイメージが掴むことが目的の画像なので数値をいじらず単純に削除する方向でいく。

#### 3。任意の場所でスニペット呼び出し4。説明文の入力 ####
任意の場所で1。で設定した省略語を入力する。  
![TextExpander省略語入力](https://lh3.googleusercontent.com/KKlvPwmFOLO12F-bxppSO61fxQcfxj0dIfhAT2aCu5s "TextExpander省略語入力")  
descriptionというフィールドに画像の説明文を入力。これは実際には画像の代替テキストと画像タイトルに入るようになってる。面倒なので同じにしてしまった。

## 所感 ##
TextExpanderじゃなくてAppleScriptにしてMarsEditで動かすのもアリかなと思ったけど、とりあえず事足りたのでこれで。あとは前に改行とか後ろにスペース2つで改行（Markdownでの改行）を入れても良い気がしたけど良い方法が思い浮かばなかった。あとは工夫すれば画像サイズ指定もできるけど、今は必要ないのでやらない。改変すれば難しくないので必要になったら作ってみようと思ってる。

GoogleさんがPicasaからGoogle+、そしてGoogleフォトといろいろ変遷してしまってるのについていくのが大変。今も旧2つは使える点と無料で使えるサイズが大きくなってるのは凄いと思うけど。

このブログは技術系のブログだと思ってたけど、最近はケツ毛剃ったり、筋トレしたり、レザークラフトしたりとかだったのでなんだか久々に技術系らしい記事になった。いや、技術系に限らず試したことの顛末を書くところなので間違ってないんだけどね。
