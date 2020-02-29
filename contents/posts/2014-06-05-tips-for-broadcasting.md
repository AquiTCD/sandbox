---
title: ねとらじや Ustream 配信を工夫する Tips
slug: tips-for-broadcasting
tags:
  - アプリ
  - 配信
  - Hack
  - Mac
date: 2014-06-05T00:00:01.000Z
---
普通に配信放送をしても楽しいものですが、SE（音響効果）などを使うことでいろんな演出ができるようになります。

## iTunesのホットキー（ショートカットキー）操作
曲スキップや音量調節、また、放送配信中はiTunesを表示しておく余裕もあまりないので、現在の曲情報が小さく確認できるのも便利です。

**使用アプリ：**[SizzlingKeys](http://www.yellowmug.com/sk4it/) や [GimmeSomeTune](http://eternalstorms.at/gimmesometune/GimmeSomeTune/GimmeSomeTune.html) など 
（ちなみに僕は、[CoverSutra](http://sophiestication.com/coversutra/) を愛用していました）。
（再生/停止のみならMac OS Xの機能のみでも可能です）

[![SizzlingKeys](http://lh5.ggpht.com/-T07qAWyqeeA/TtPRjq1LqdI/AAAAAAAAC30/MihAxBaILO8/broadcasting_helpers1.jpg?imgmax=800 "SizzlingKeys")](http://lh5.ggpht.com/-T07qAWyqeeA/TtPRjq1LqdI/AAAAAAAAC30/MihAxBaILO8/broadcasting_helpers1.jpg?imgmax=800 "SizzlingKeys")

（SizzlingKeysの例）  
インストールしたら、システム環境設定にパネルが1つ増えます。そこで、任意のキーコンビネーションに再生や停止、音量や曲の操作等を組み合わせてやれば、いちいちiTunesをマウスで操作しなくても楽にiTunesを操作してやることが出来ます。

特にSkypeを使った放送では、通話中はBGMを切ることが多く再生/停止だけでも割り当てとくと、ぐっと便利になります（AlmostMuteの設定幅がもっと広がってくれれば、 声を乗せるときと曲だけの時ですぐ切り替えれてもっと便利なんですけどね）

## SE（効果音）の再生（ショートカットキー）
Windowsには「もりあげたろう」というソフトがあるらしく、これを使って素早くSEを鳴らす配信者も多いのですが、Macでそれと同じことをやってのけてしまおうという試み。

**使用アプリ：**[Play Sound](http://microcosmsoftware.com/playsound/) &amp;amp; [Spark](http://www.shadowlab.org/softwares/)

[![Spark](http://lh3.ggpht.com/-SIhx9P1Oyn8/TtPP_-8oGBI/AAAAAAAAC3s/Si2m9uL1a8c/broadcasting_helpers2.jpg?imgmax=800 "Spark")](http://lh3.ggpht.com/-SIhx9P1Oyn8/TtPP_-8oGBI/AAAAAAAAC3s/Si2m9uL1a8c/broadcasting_helpers2.jpg?imgmax=800 "Spark")

仕組みとしては、Play Soundで開く音声ファイルをSparkで任意のショートカットキーに対して割り当てるという方法。

Sparkで <span class="path">File＞NewHotKey＞Document</span>

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">Shortcut：</th>
<td>任意のショートカットキー
（僕は<kbd>⌘command</kbd>+<kbd>⌃control</kbd>+<kbd>テンキー</kbd>などを使用してます）</td>
</tr>
<tr>
<th class="right">Categorie：</th>
<td>Document</td>
</tr>
<tr>
<th class="right">Neme：</th>
<td>任意の名前</td>
</tr>
<tr>
<th class="right">Action：</th>
<td>Open With…</td>
</tr>
<tr>
<th class="right">Open Document…：</th>
<td>任意の音声ファイル</td>
</tr>
<tr>
<th class="right">With Application：</th>
<td>Play Sound</td>
</tr>
</tbody>
</table>

と設定して、Enableボタンをオンにし、設定したショートカットを押してみてください。

### 声に効果（エコーなど）をかける方法

何か強調したいときなど、ポイントでかけると効果的です。  
**使用ソフト：**[Audio Hijack Pro](http://rogueamoeba.com/audiohijackpro/)

[![Audio Hijack Pro](http://lh5.ggpht.com/-UsiqmS1GCbc/TtPOjbYQbiI/AAAAAAAAC3c/ACqeKr-hrZ8/broadcasting_helpers3.jpg?imgmax=800 "broadcasting_helpers3.jpg")](http://lh5.ggpht.com/-UsiqmS1GCbc/TtPOjbYQbiI/AAAAAAAAC3c/ACqeKr-hrZ8/broadcasting_helpers3.jpg?imgmax=800 "Audio Hijack Pro")

本来Audio Hijack Proはシェアウェアですが、録音機能を使わなければ試用版で出来ますので、実質フリーでこの機能が実現できます。 ここでは例としてエコー（リバーブ）の掛け方の設定

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th colspan="2">Input タブ</th>
</tr>
<tr>
<th class="right">Source Type：</th>
<td>Audio Device</td>
</tr>
<tr>
<th class="right">Input Device：</th>
<td>USB マイク or 内蔵マイク など</td>
</tr>
<tr>
<th class="right">Output Device：</th>
<td>Soundflower(2ch)</td>
</tr>
<tr>
<th colspan="2">Effects タブ</th>
</tr>
<tr>
<th class="right">4FX Effects：</th>
<td>Reverb（お好みで色々調整してみて下さい）</td>
</tr>
</tbody>
</table>

で、Hijackボタンを押します。 
（注意：Hijack中はLadioCastのマイクのAUXをOffにしてください）。

LadioCastのマイクに割り当てているAUXをAudio Hijack Proで代用すれば、BYPASSボタンのON/OFFで瞬時にエコーの切り替えを実現することが可能です。 
（BYPASSをONにするとEffectがかかりません）

### 簡単にシステムサウンド設定を切り替える方法
放送をする方は入れといて損はないと思います。  
**使用ソフト：**[SoundSource](http://rogueamoeba.com/freebies/)

[![SoundSource](http://lh4.ggpht.com/-qqBCckQf1dc/TtPMEsbqa2I/AAAAAAAAC3U/W0bAlEPIvm0/s400/broadcasting_helpers4.jpg "broadcasting_helpers4.jpg")](http://lh4.ggpht.com/-qqBCckQf1dc/TtPMEsbqa2I/AAAAAAAAC3U/W0bAlEPIvm0/s800/broadcasting_helpers4.jpg "SoundSource")

メニューバーに表示されるヘッドホンアイコンからサウンドの入出力デバイスを切り替えられるようになります。 放送配信のたびにいちいちシステム環境設定を呼び出す手間が省けます。

## iTunesで再生中曲情報をメタデータに流す方法

手前味噌ですが、無かったので作成しました。
<div class="shareBlock"><div class="shareLeft"><a href="http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://trial-and-spiral.tumblr.com/post/87801732885/onairsonghelper" rel="nofollow">ねとらじ用曲名送信ソフト OnAirSongHelper - Trial and Spiral - 試行錯誤顛末記録</a></div><div class="shareDetail"><div class="shareInfo1">LadioCast（0.7 以降）用自動曲名取得+送信アプリケーション ...</a></div><div class="shareInfo2"><br style="clear:both;"></div></div></div></div>

指定した秒ごとにiTunesから曲情報を取得し、LadioCastのメタデータを更新します。対応のプレイヤーで聞いているリスナーに対して現在の曲情報を知らせることができます。自由に設定できるテキストボックスもあるので、応用してSkypeIDや任意のコメントを乗せたりもできます。

### Special Thanks
[Macの手書き説明書](http://veadardiary.blog29.fc2.com/)のVeadarさん

※ この記事は旧Blogからリライトした記事です。
