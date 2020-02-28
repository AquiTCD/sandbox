---
title: 僕が日本語 IM「SKK」に憑かれた訳
date: 2014-06-05T00:00:03.000Z
tags:
  - アプリ
  - カスタマイズ
  - Hack
  - Mac
image: /images/covers/2014-06-05-why-i-love-skk-as-japanese-ime.jpg
---
通常の日本語IMとは違い、クセのある日本語IM「SKK」。それに慣れてからというものの、快適すぎて今さら後戻りが出来ません。

## SKKの利点
- 文章解釈をコンピュータに任せない
- リターンキー入力が最小限
- 変換効率が格段に向上

### そもそもSKKってどんなの？
- 変換部分と無変換部分を大文字入力で区切る

ことが特徴です。 これによって
- ひらがなの文字入力であれば変換いらず
- 変換する部分、しない部分をユーザ側で制御

が実現されます。一般的なIMでは漢字変換する部分なのかそうでないのかはIMに任されます。これをユーザ側が制御することで不必要な変換候補が最小限に絞られ、変換効率が向上します。ひらがなの部分はまるでアルファベットの直接入力をしてるかのような感覚でガシガシ入力されていきます。

### 具体例
例えば

> 今日はとても良い天気です

という文章を入力する場合、SKKでは

> <kbd>K</kbd><kbd>you</kbd> <kbd>スペース</kbd> <kbd>hatotemo</kbd><kbd>Y</kbd><kbd>o</kbd><kbd>I</kbd><kbd>T</kbd><kbd>enki</kbd> <kbd>スペース</kbd> <kbd>desu</kbd>

と入力します。これを見てみると以下のようになってます。

- 変換部分の頭文字を大文字
- 変換候補の確定に<kbd>return</kbd>キーは不要
- 送り仮名が必要な場合は送り仮名部分の頭文字を大文字にする

結果として<kbd>return</kbd>キーを入力することなく文章入力が完了しています。

### 変換効率の向上

- 単語ベースで変換していくのでそもそも文節の誤解釈が発生しない
- 送り仮名がある場合、同音の熟語が変換候補にならない

### 文章入力時の頭の使い方が自然に

従来のプロセスを考えると

> 文章入力 → 変換 → 確認 → 確定

となります。この確認フェーズでは入力したもの全体を見なくてはいけないため、文章入力に対する思考が一時停止してしまいます。SKKのように単語ベースで入力していく場合は、変換時に見る範囲が単語のみのため、思考停止を最小限に抑えることができます。

### 詳細

以下のページにより詳しく解説されています。

<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://aquaskk.osdn.jp/aquaskk_pr.html" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://aquaskk.osdn.jp/aquaskk_pr.html"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://aquaskk.osdn.jp/aquaskk_pr.html" target="_blank"> AquaSKK プロジェクト::迷っている人へ</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> AquaSKK を使うのは初めてですか? 「これを使いこなすのは無理かも...」と、早くも諦めムードを漂わせているそんなあなたに、このコラムを捧げます。 ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>

### SKKを使用するデメリット

- 親指shift環境を構築しないと真価を発揮できない
- 一般的な入力方法に慣れていると習得に労力が必要
- 送り仮名に関する知識が必要
- 慣れると一般的な入力方法に戻れなくなる

## 余談
現在主流のIMは高度な文章解釈機能により、文章全体を入力し、変換するほうが誤変換が防げるようです。しかし、はるか昔、Macに標準搭載のことえりの文章解釈は馬鹿だったことで有名でした。そうなると結局IM自体の文章解釈に頼ると逆に不便だったため、単語ベースの変換をせざるをえませんでした。その時のクセがちょうど僕にマッチしたのも良かったかもしれません。

## MacにSKKを導入しよう

フリーなうえ、機能も優れた**Aqua SKK**がオススメです。

<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://aquaskk.osdn.jp/" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://aquaskk.osdn.jp/"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://aquaskk.osdn.jp/" target="_blank"> AquaSKK - 日本語を快適に</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> AquaSKK は Mac OS X 用のかな漢字変換プログラムです ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>


右のAqua SKKパッケージに行き、最新版をDLしてインストールしてください。

<code>システム環境設定 > 言語とテキスト > 入力ソース</code>にある設定でAqua SKKにチェックを入れます。

### 親指でShiftを押す環境を作る

KeyRemap4MacBookで<kbd>スペース</kbd>に<kbd>shift</kbd>を割りあてます。


<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="https://pqrs.org/macosx/keyremap4macbook/index.html.ja" target="_blank"> <img src="http://capture.heartrails.com/128x128?https://pqrs.org/macosx/keyremap4macbook/index.html.ja"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://aquaskk.osdn.jp/" target="_blank">Karabiner</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> 高機能で安定性も極めて高いOS X用のキーボードカスタマイズツール ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>

使用しているMacに対応したものをDLしてインストールします（Macの再起動が必要です）

インストールして起動するとメニューバーに**Karabiner**があるはずなので、設定します。

[![Skk1](http://lh6.ggpht.com/-ifYieaTibJM/T-CTl87-hjI/AAAAAAAAEa8/ThWzbQqMGVM/skk1.png?imgmax=800 "Skk1")](http://lh6.ggpht.com/-ifYieaTibJM/T-CTl87-hjI/AAAAAAAAEa8/ThWzbQqMGVM/skk1.png?imgmax=800 "Skk1")

<code>Change Space Key</code>の中の<code>Space to Shift_L (+ When you type Space only, Send Space)</code>にチェックを入れます。これは<kbd>スペース</kbd>を<kbd>左Shift</kbd>として置き換え<kbd>スペース</kbd>単体で押したときはスペースとして動作させる設定です。

### 補足
#### なぜこの設定が必要なのか
それは通常<kbd>shift</kbd>はキーボードの端に位置し、小指で操作します。この位置では頻繁に押すには押しにくく、さらに文字のタイピングにも小指を使用します。この2つの欠点を解消するのがこの設定です。<kbd>スペース</kbd>に<kbd>shift</kbd>を割り当てれば、親指で操作することが可能になるので、押しやすく、文字タイピングと干渉することもなくなります。

#### 覚悟してください
SKKは一般的な文字入力方法とは大きく異なるため、最初は苦労します。特に一般的な文字入力方法に慣れきった指は、考えるより早く従来どおりの操作をしてしまうことでしょう。僕も慣れる前に習得を諦めたこともあります。しかし、一度慣れてしまえばこの快適さの前に屈服することでしょう。それでは素敵なSKKライフを。

※ この記事は旧Blogからリライトした記事です。
