---
title: 「ねとらじ」をMacで放送する方法
slug: how-to-broadcast-netladi-on-mac
tags:
  - アプリ
  - 配信
  - カスタマイズ
  - Mac
date: 2014-06-05T00:00:01.000Z
---
![LadioCast+ねとらじ](https://lh3.googleusercontent.com/-ECaQXaQxmW8/TtN0xgaB86I/AAAAAAAAC2E/l85bDhMW7GA/s400/LadioCast_netladi.png "LadioCast+ねとらじ") 
Macを使用して[ねとらじ](http://www.ladio.net/)（インターネットラジオ）を配信するノウハウ。ここではLadioCastを使用した方法を紹介します。

## インストールが必須なもの

### LadioCast

配布元：[かわうそのブログ：MacLadioCast アーカイブ](http://blog.kawauso.com/kawauso/macladiocast/) 
配信+ミキサー 
ダウンロードしたDMGファイルを開いてマウントし、**LadioCast.app**をアプリケーションフォルダにコピーしてインストールします。もしくは現在はAppStoreでも配布されてるようです。
        LadioCast   無料   Yosirou Sawayanagi   (2016.09.26時点） posted with  ポチレバ

### LAME Audio Encorder
インストーラ配布元：[Thalictrum](http://www.thalictrum.com/) 
ソースコード配布元：[LAME MP3 Encoder](http://lame.sourceforge.net/)（基本的には不要）
フリーのMP3エンコーダ 
ねとらじでは音声をMP3に変換して配信するのが基本なので、LadioCastとセットで必要だと考えていただければOKです。ソースコードからインストールするまでの手順を自分で行なうと面倒なので、Thalictrumで配布されているインストーラ形式のものを使用することをオススメします。

### Soundflower
配布元：[Soundflower - Project Hosting on Google Code](http://code.google.com/p/soundflower/) 
注：付属のSoundflower bedはインストールしなくてもOKです。 
実は入力音声だけの放送なら必須ではないですが、BGMやSE（効果音）を使用するためにMacから出力される音声を放送に乗せるなら必要です。 声だけでの放送をしない限り、事実上必須と考えても良いかと思います。

## 放送設定

上記3点セットがあれば、ねとらじ放送をすることは可能です。 LadioCastとSoundflowerでの音のミキシングはひとまず置いておいて、LadioCastの設定をします。

### Streamerウィンドウ
#### タブ：接続
[![Ladiocast Streamer 接続タブ設定](https://lh4.googleusercontent.com/-YahH2h9rx3E/TtE9xeUBokI/AAAAAAAAC1o/RxnjMTBfLtI/s400/ladiocast1.png "ladiocast1.png")](https://lh4.googleusercontent.com/-YahH2h9rx3E/TtE9xeUBokI/AAAAAAAAC1o/RxnjMTBfLtI/s800/ladiocast1.png)

 
 
 
 サーバアドレス： 
 std1.ladio.jp
 
 
 ポート： 
 80X0（Xには1〜9の数値が入ります）
 
 
 マウント： 
 任意の英数字
 
 
 ユーザ： 
 source
 
 
 パスワード： 
 ladio
 
 
 文字セット： 
 Japanese(Shift_JIS)
 
 
 番組名： 
 任意の番組名
 
 
 ジャンル： 
 番組のジャンル、概要
 
 
 説明： 
 番組の説明
 
 
 ウェブURL： 
 掲示板やサイトなどの関連したURL
 
 
 

ここで設定した内容が放送URLやヘッドラインに載る情報になります。放送URLは**http://std1.ladio.net:"ポート"/"マウント".m3u**になります。

#### タブ：エンコーディング
一般的な設定では

 
 
 
 フォーマット： 
 MP3
 
 
 サンプルレート（Hz)： 
 自動
 
 
 ビットレートモード： 
 一定
 
 
 ビットレート（kb/s)： 
 48
 
 
 クオリティレベル： 
 ビットレートモードが一定の場合は設定する必要なし
 
 
 チャンネル： 
 モノ
 
 
 

となります。

上記の設定はラジオのような配信をするときのもので、音楽などの配信するときは適切に設定しなおすことをお勧めします。

- **フォーマット：**LAME Audio Encorderをインストールしていれば、MP3が使用できます。音質を気にするならば他の選択もありますが、聴取側も再生できる環境が限られてくるので、あまりオススメしません
- **サンプルレート：**44100だとCDレベルらしいです。 CPU負荷とも関係してくるので、基本は自動で問題ないはずです
- **ビットレートモード：**ビットレートが高いと音質が良くなりますが、 逆にデータ転送量が多くなってしまうので、固定してしまうことをオススメします
- **ビットレート（kb/s)：**声での配信をメインとするならば、32kbpsもあれば十分なはずです。 どの程度の音質なのかは、[ビット毎秒 - Wikipedia](http://ja.wikipedia.org/wiki/ビット毎秒#.E9.9F.B3.E5.A3.B0) をご参照ください。 なお、数値が高いとデータ転送量が上がるため、バッファが発生しやすくなり、帯域も圧迫します
- **チャンネル：**ステレオ放送は上手くつかわない限り聞きづらくなり、データ転送量が多いので非推奨です。 音声パン技術をアクセントとして使ったり、音楽のみの放送ならばその限りではありません

#### タブ：メタデータ

- **文字セット：Japanese(Shift JIS)** 
聴き手の再生ソフトによって文字化けするか、しないかが決まりますが、 一般的にShift JISが用いられているようです
- **曲情報：任意の文字** 
iTunesから自動的に曲情報を取得し、曲情報にセットするアプリケーションを作成しましたので、お気に召すようなら使ってみてください。
         ねとらじ用曲名送信ソフトOnAirSongHelper - Trial and Spiral - 試行錯誤顛末記録    LadioCast（0.7以降）用自動曲名取得+送信アプリケーション ...        



### LadioCastウィンドウ（ミキサー)
「メイン」ボタンが押されてるものが放送に乗ります。ここではもっとも基本的だと思われる、iTunes等でBGMを流しつつ、マイクで喋る設定のみ紹介します。

まず、BGMについて、Macの音をスピーカー（ヘッドフォン）ではなく、一度Soundflowerに入れる必要があります。 
**システム環境設定＞サウンド＞出力**で**Soundflower(2ch)** を選択してください。


[![サウンド設定](http://lh5.ggpht.com/-NoBwzh83vbg/TtNyInknrEI/AAAAAAAAC1s/Z259-AJSE-E/s400/ladiocast2.png "サウンド設定")](http://lh5.ggpht.com/-NoBwzh83vbg/TtNyInknrEI/AAAAAAAAC1s/Z259-AJSE-E/s800/ladiocast2.png)


マイクからの入力音声についてはLadioCast側の設定のみでOKです。LadioCastの設定を以下のようにします。


[![LadioCast ミキサー設定](http://lh4.ggpht.com/-q_YwXXAH0AA/TtNy3corjsI/AAAAAAAAC10/08Tr21J3H1o/s400/ladiocast3.png "LadioCast ミキサー設定")](http://lh4.ggpht.com/-q_YwXXAH0AA/TtNy3corjsI/AAAAAAAAC10/08Tr21J3H1o/s800/ladiocast3.png)

 
 
 
 入力1： 
 使用するマイクデバイス
 
 
 入力2： 
 Soundflower(2ch)（通常Macから出力される音）
 
 
 入力3： 
 N/A
 
 
 出力メイン： 
 使用するヘッドフォンデバイス
 
 
 出力AUX1： 
 N/A
 
 
 出力AUX2： 
 N/A
 
 
 

（僕の場合は、Macに直でマイク付きヘッドフォンを接続してるので、入力1に内蔵入力、出力メインに内蔵出力を選択しています。USBヘッドセットなどを使用している場合はその機器をそれぞれ選択してください）。 
 これで、入力1,2の「メイン」ボタンがオンになっているとき、それぞれが、放送+ヘッドフォンに流れる、という状態になります。

## 補足事項

### あると便利なもの

- [Skype](http://www.skype.com/intl/ja/) 音声通話ソフト。俗にいう「凸待ち」に使われますね
- [SoundSource](http://rogueamoeba.com/freebies/) メニューバーからサウンドデバイスを切り替えることが可能になる、メニューバー常駐ソフト。いちいちシステム環境設定を開かなくて良くなります
- [OnAirSongHelper](http://overdrive-syndrome.blogspot.com/2011/11/onairsonghelper.html) iTunesで流してる曲名とアーティスト名をLadioCastのメタデータに反映するソフト
- [Play Sound](http://microcosmsoftware.com/playsound/) 単体音声再生ソフト。下記Sparkと組み合わせて効果音をならすため
- [Spark](http://www.shadowlab.org/) 任意のホットキー（ショートカット）設定ソフト。効果音をホットキーで操作するため
- [Audio Hijack Pro](http://rogueamoeba.com/audiohijackpro/) レコーディング用ソフト。音声をリアルタイムで加工する機能があり、短時間であればレジストしなくてもOK

### LadioCast + Soundflowerの高度な音声ミキシングについて
放送をするとなると、より複雑な設定が必要になってくる場合があります。その場合は、以下の記事を参考にしてください。

           LadioCast と Soundflower の解説書 - Trial and Spiral     LadioCast は以前紹介した「ねとらじ」を Mac で放送する方法のみならず、音声ミキサー（ルーティング）としても優秀なソフトです。このミキシングについて、ねとらじや他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）を例にして、いくつか挙げて解説し ...          


また、この方法は、ねとらじ以外でも他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）をする場合も例に挙げています。

※ この記事は旧Blogからリライトした記事です。</string>
	<key>custom_fields</key>
	<array/>
	<key>dateCreated</key>
	<date>2014-06-04T16:21:08Z</date>
	<key>description</key>
	<string>![LadioCast+ねとらじ](https://lh3.googleusercontent.com/-ECaQXaQxmW8/TtN0xgaB86I/AAAAAAAAC2E/l85bDhMW7GA/s400/LadioCast_netladi.png "LadioCast+ねとらじ")  
Macを使用して[ねとらじ](http://www.ladio.net/)（インターネットラジオ）を配信するノウハウ。ここではLadioCastを使用した方法を紹介します。

## インストールが必須なもの

### LadioCast

配布元：[かわうそのブログ：MacLadioCast アーカイブ](http://blog.kawauso.com/kawauso/macladiocast/)  
配信+ミキサー  
ダウンロードしたDMGファイルを開いてマウントし、**LadioCast.app**をアプリケーションフォルダにコピーしてインストールします。もしくは現在はAppStoreでも配布されてるようです。
<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/ladiocast/id411213048?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is5.mzstatic.com/image/thumb/Purple49/v4/50/e4/06/50e40614-bab4-6fe3-569d-40b4a2904953/source.icns/512x512bb.png" alt="LadioCast" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/ladiocast/id411213048?mt=12&amp;uo=4&amp;at=10lHnQ">LadioCast</a></div><div class="pochi_price">無料</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/yosirou-sawayanagi/id288055488?mt=12&amp;uo=4&amp;at=10lHnQ">Yosirou Sawayanagi</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>

### LAME Audio Encorder
インストーラ配布元：[Thalictrum](http://www.thalictrum.com/)  
ソースコード配布元：[LAME MP3 Encoder](http://lame.sourceforge.net/)（基本的には不要）  
フリーのMP3エンコーダ  
ねとらじでは音声をMP3に変換して配信するのが基本なので、LadioCastとセットで必要だと考えていただければOKです。ソースコードからインストールするまでの手順を自分で行なうと面倒なので、Thalictrumで配布されているインストーラ形式のものを使用することをオススメします。

### Soundflower
配布元：[Soundflower - Project Hosting on Google Code](http://code.google.com/p/soundflower/)  
注：付属のSoundflower bedはインストールしなくてもOKです。  
実は入力音声だけの放送なら必須ではないですが、BGMやSE（効果音）を使用するためにMacから出力される音声を放送に乗せるなら必要です。 声だけでの放送をしない限り、事実上必須と考えても良いかと思います。

## 放送設定

上記3点セットがあれば、ねとらじ放送をすることは可能です。 LadioCastとSoundflowerでの音のミキシングはひとまず置いておいて、LadioCastの設定をします。

### Streamerウィンドウ
#### タブ：接続
[![Ladiocast Streamer 接続タブ設定](https://lh4.googleusercontent.com/-YahH2h9rx3E/TtE9xeUBokI/AAAAAAAAC1o/RxnjMTBfLtI/s400/ladiocast1.png "ladiocast1.png")](https://lh4.googleusercontent.com/-YahH2h9rx3E/TtE9xeUBokI/AAAAAAAAC1o/RxnjMTBfLtI/s800/ladiocast1.png)

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">サーバアドレス：</th>
<td>std1.ladio.jp</td>
</tr>
<tr>
<th class="right">ポート：</th>
<td>80X0（Xには1~9の数値が入ります）</td>
</tr>
<tr>
<th class="right">マウント：</th>
<td>任意の英数字</td>
</tr>
<tr>
<th class="right">ユーザ：</th>
<td>source</td>
</tr>
<tr>
<th class="right">パスワード：</th>
<td>ladio</td>
</tr>
<tr>
<th class="right">文字セット：</th>
<td>Japanese(Shift_JIS)</td>
</tr>
<tr>
<th class="right">番組名：</th>
<td>任意の番組名</td>
</tr>
<tr>
<th class="right">ジャンル：</th>
<td>番組のジャンル、概要</td>
</tr>
<tr>
<th class="right">説明：</th>
<td>番組の説明</td>
</tr>
<tr>
<th class="right">ウェブ URL：</th>
<td>掲示板やサイトなどの関連した URL</td>
</tr>
</tbody>
</table>

ここで設定した内容が放送URLやヘッドラインに載る情報になります。放送URLは**http://std1.ladio.net:"ポート"/"マウント".m3u**になります。

#### タブ：エンコーディング
一般的な設定では

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">フォーマット：</th>
<td>MP3</td>
</tr>
<tr>
<th class="right">サンプルレート(Hz)：</th>
<td>自動</td>
</tr>
<tr>
<th class="right">ビットレートモード：</th>
<td>一定</td>
</tr>
<tr>
<th class="right">ビットレート(kb/s)：</th>
<td>48</td>
</tr>
<tr>
<th class="right">クオリティレベル：</th>
<td>ビットレートモードが一定の場合は設定する必要なし</td>
</tr>
<tr>
<th class="right">チャンネル：</th>
<td>モノ</td>
</tr>
</tbody>
</table>

となります。

上記の設定はラジオのような配信をするときのもので、音楽などの配信するときは適切に設定しなおすことをお勧めします。

- **フォーマット：**LAME Audio Encorderをインストールしていれば、MP3が使用できます。音質を気にするならば他の選択もありますが、聴取側も再生できる環境が限られてくるので、あまりオススメしません
- **サンプルレート：**44100だとCDレベルらしいです。 CPU負荷とも関係してくるので、基本は自動で問題ないはずです
- **ビットレートモード：**ビットレートが高いと音質が良くなりますが、 逆にデータ転送量が多くなってしまうので、固定してしまうことをオススメします
- **ビットレート（kb/s)：**声での配信をメインとするならば、32kbpsもあれば十分なはずです。 どの程度の音質なのかは、[ビット毎秒 - Wikipedia](http://ja.wikipedia.org/wiki/ビット毎秒#.E9.9F.B3.E5.A3.B0) をご参照ください。 なお、数値が高いとデータ転送量が上がるため、バッファが発生しやすくなり、帯域も圧迫します
- **チャンネル：**ステレオ放送は上手くつかわない限り聞きづらくなり、データ転送量が多いので非推奨です。 音声パン技術をアクセントとして使ったり、音楽のみの放送ならばその限りではありません

#### タブ：メタデータ

- **文字セット：Japanese(Shift JIS)**  
聴き手の再生ソフトによって文字化けするか、しないかが決まりますが、 一般的にShift JISが用いられているようです
- **曲情報：任意の文字**  
iTunesから自動的に曲情報を取得し、曲情報にセットするアプリケーションを作成しましたので、お気に召すようなら使ってみてください
<div class="shareBlock"><div class="shareLeft"><a href="http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" rel="nofollow">ねとらじ用曲名送信ソフト OnAirSongHelper - Trial and Spiral - 試行錯誤顛末記録</a></div><div class="shareDetail"><div class="shareInfo1">LadioCast（0.7 以降）用自動曲名取得+送信アプリケーション ...</a></div><div class="shareInfo2"><br style="clear:both;"></div></div></div></div>



### LadioCastウィンドウ（ミキサー)
「メイン」ボタンが押されてるものが放送に乗ります。ここではもっとも基本的だと思われる、iTunes等でBGMを流しつつ、マイクで喋る設定のみ紹介します。

まず、BGMについて、Macの音をスピーカー（ヘッドフォン）ではなく、一度Soundflowerに入れる必要があります。  
**システム環境設定＞サウンド＞出力**で**Soundflower(2ch)** を選択してください。


[![サウンド設定](http://lh5.ggpht.com/-NoBwzh83vbg/TtNyInknrEI/AAAAAAAAC1s/Z259-AJSE-E/s400/ladiocast2.png "サウンド設定")](http://lh5.ggpht.com/-NoBwzh83vbg/TtNyInknrEI/AAAAAAAAC1s/Z259-AJSE-E/s800/ladiocast2.png)


マイクからの入力音声についてはLadioCast側の設定のみでOKです。LadioCastの設定を以下のようにします。


[![LadioCast ミキサー設定](http://lh4.ggpht.com/-q_YwXXAH0AA/TtNy3corjsI/AAAAAAAAC10/08Tr21J3H1o/s400/ladiocast3.png "LadioCast ミキサー設定")](http://lh4.ggpht.com/-q_YwXXAH0AA/TtNy3corjsI/AAAAAAAAC10/08Tr21J3H1o/s800/ladiocast3.png)

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">入力1：</th>
<td>使用するマイクデバイス</td>
</tr>
<tr>
<th class="right">入力2：</th>
<td>Soundflower(2ch)（通常 Mac から出力される音）</td>
</tr>
<tr>
<th class="right">入力3：</th>
<td>N/A</td>
</tr>
<tr>
<th class="right">出力メイン：</th>
<td>使用するヘッドフォンデバイス</td>
</tr>
<tr>
<th class="right">出力AUX1：</th>
<td>N/A</td>
</tr>
<tr>
<th class="right">出力AUX2：</th>
<td>N/A</td>
</tr>
</tbody>
</table>

（僕の場合は、Macに直でマイク付きヘッドフォンを接続してるので、入力1に内蔵入力、出力メインに内蔵出力を選択しています。USBヘッドセットなどを使用している場合はその機器をそれぞれ選択してください）。 
 これで、入力1,2の「メイン」ボタンがオンになっているとき、それぞれが、放送+ヘッドフォンに流れる、という状態になります。

## 補足事項

### あると便利なもの

- [Skype](http://www.skype.com/intl/ja/) 音声通話ソフト。俗にいう「凸待ち」に使われますね
- [SoundSource](http://rogueamoeba.com/freebies/) メニューバーからサウンドデバイスを切り替えることが可能になる、メニューバー常駐ソフト。いちいちシステム環境設定を開かなくて良くなります
- [OnAirSongHelper](http://overdrive-syndrome.blogspot.com/2011/11/onairsonghelper.html) iTunesで流してる曲名とアーティスト名をLadioCastのメタデータに反映するソフト
- [Play Sound](http://microcosmsoftware.com/playsound/) 単体音声再生ソフト。下記Sparkと組み合わせて効果音をならすため
- [Spark](http://www.shadowlab.org/) 任意のホットキー（ショートカット）設定ソフト。効果音をホットキーで操作するため
- [Audio Hijack Pro](http://rogueamoeba.com/audiohijackpro/) レコーディング用ソフト。音声をリアルタイムで加工する機能があり、短時間であればレジストしなくてもOK

### LadioCast + Soundflowerの高度な音声ミキシングについて
放送をするとなると、より複雑な設定が必要になってくる場合があります。その場合は、以下の記事を参考にしてください。

<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://trial-and-spiral.tumblr.com/post/87804892860/ladiocast-soundflower" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://trial-and-spiral.tumblr.com/post/87804892860/ladiocast-soundflower"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://trial-and-spiral.tumblr.com/post/87804892860/ladiocast-soundflower" target="_blank"> LadioCast と Soundflower の解説書 - Trial and Spiral</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> LadioCast は以前紹介した「ねとらじ」を Mac で放送する方法のみならず、音声ミキサー（ルーティング）としても優秀なソフトです。このミキシングについて、ねとらじや他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）を例にして、いくつか挙げて解説し ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>


また、この方法は、ねとらじ以外でも他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）をする場合も例に挙げています。

※ この記事は旧Blogからリライトした記事です。
