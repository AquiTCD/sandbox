---
title: LadioCast と Soundflower の解説書
slug: ladiocast-soundflower-usersguide
tags:
  - アプリ
  - 配信
  - カスタマイズ
  - Hack
  - Mac
date: 2014-06-05T00:00:02.000Z
---
![Ladiocast soundflower icon](http://lh5.ggpht.com/-ujzUu12Rv4o/TtOMBfBc0fI/AAAAAAAAC3M/qGuwe-CdIvg/ladiocast_soundflower.png?imgmax=800 "ladiocast_soundflower_icon.png")  
LadioCastは以前紹介した[「ねとらじ」を Mac で放送する方法](http://trial-and-spiral.tumblr.com/post/87804252145)のみならず、音声ミキサー（ルーティング）としても優秀なソフトです。このミキシングについて、ねとらじや他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）を例にして、いくつか挙げて解説してみます。

## LadioCastとSoundflowerについて
### LadioCastの音声ミキシングの解説
入力デバイスで設定できる3つのうち「メイン」をオンにしたもの全てが出力メインに流れます（≒ねとらじ放送に乗ります）。ということは、同時に「出力メイン」で設定したデバイスにも流れます。AUX1,2は放送には乗りませんが、設定した出力AUXデバイスに流れます。1と2は1系統x2=2系統をミキシングに使えると考えてください。 基本は

- 「出力メイン」はヘッドフォンなどの音声モニターするデバイス（兼、放送に乗せる音声、と考えると状況が整理しやすいと思います）
- 「出力AUX」はルーティングに使用（使用するとしたらSoundflower）

というのが定石になります。入力のピークメーター下部右側に「+dB」とありますが、これはベースの音量設定だと思ってください。高いほど音量は大きくなります。逆にマスタの音量が小さいと思ったら数値を大きくしてください。

### Soundflowerの解説
Soundflowerは仮想の音声入出力デバイスです。入力にも出力にも使えるのが便利な反面、理解が難しいことがあります。物理的なデバイスであるマイクは入力のみ、スピーカーなどは出力のみ、に対して、Soundflowerはその両方、つまり出力も入力も両方に使用できます。 例えば、

1.  Macの出力デバイスでSoundflowerを選択（この時点でMacから流れる音はSoundflowerに流れます）
2.  LadioCastの入力をSoundflowerに設定し「メイン」をオンにする（これで、Macの音がメインに流れる=放送に乗ります）

また、Soundflowerには、(2ch)、(16ch）の2系統あります。 基本的にはチャンネル数は特に気にせず、A,Bと考え、別個のSoundflower 1つづつがあると思ってOKです。

## ケーススタディ

以下の方法は一例です。他にもいろいろ設定方法があると思いますが、何もわからないほうは参考にしてみてください。理解ができたらきっと自分で応用して、自分の使いやすいように変更できるようになるでしょう。 
（注意：ここでは僕の使用しているマイクデバイスは、UA-4FX、ヘッドフォンデバイスもUA-4FXになっています）

### [A] iTunes等でBGMを使用しつつ、マイクで喋る
[「ねとらじ」を Mac で放送する方法](http://trial-and-spiral.tumblr.com/post/87804252145)でも書いたとおり、一番基本となる設定だと思います。詳しくはそちらを参照してください。

### [B] [A]+Skypeを使用して、Skype相手の声も放送に乗せる
いわゆる凸待ちベーシックスタイルです（Skype相手に自分のMacの音を乗せたい場合は[C]へ）  
条件は、

1. マイクの音を放送に乗せる
2. Macの音を放送に乗せる
3. Skype相手の声を放送に乗せる

の3つになり、[A]の設定にさらにSkypeの設定が加わります。

[![A設定 Skype](http://lh3.ggpht.com/-o0aRYAzxWq0/TtN-1blGYbI/AAAAAAAAC2M/U4kbOld9HV4/s400/soundflower1.png "A設定 Skype")](http://lh3.ggpht.com/-o0aRYAzxWq0/TtN-1blGYbI/AAAAAAAAC2M/U4kbOld9HV4/s800/soundflower1.png)

**Skype＞設定……＞音声** で
<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">出力デバイス：</th>
<td>Soundflower(16ch）</td>
</tr>
<tr>
<th class="right">入力デバイス：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
</tr>
<tr>
<th class="right">呼び出し中：</th>
<td>Soundflower(16ch）</td>
</tr>
</tbody>
</table>

と設定すれば、

- Skypeから出る音は、Soundflower(16ch)に乗る
- Skype相手には自分のマイクから入る音が流れる

となります。 
 またこの時、Skypeには自動音量調節機能が備わっているので、 勝手にSounflowerの音量が上下されてしまいます。 これは無効にするほうが望ましいのですが、方法は [Skypeの音量自動調節機能を無効にする | Macの手書き説明書](http://veadardiary.blog29.fc2.com/blog-entry-1951.html) を参照すると良いと思います。

その上で、LadioCastにて、
<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">入力1：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
</tr>
<tr>
<th class="right">入力2：</th>
<td>Soundflower(2ch)（Macの音）</td>
</tr>
<tr>
<th class="right">入力3：</th>
<td>Soundflower(16ch)（Skype相手の声）</td>
</tr>
<tr>
<th class="right">出力メイン：</th>
<td>使用してるヘッドフォンデバイス</td>
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

とすれば、「メイン」ボタンがオンの時に、放送とヘッドフォンにSkypeの音も流れます。

### [C] BGM+自分の声+Skype相手の声を放送に乗せ、Skype相手にもBGM(SE)が聞こえるようにする
凸待ちアドバンスドスタイルです。  
条件は、

1.  マイクの音を放送に乗せる
2.  Macの音を放送に乗せる
3.  Skype相手の声を放送に乗せる
4.  Skype相手に自分の声とMacの音を流す（トークバックなし）（=Skypeの入力=マイク+ Macの出力）

ここでLadioCastとSoundflowerを組み合わせた音声ミキシング（ルーティング）が必要になります。 
 LadioCastは、

[![C設定 LadioCast](http://lh4.ggpht.com/-aKbGWG4cTpg/TtOBhJsszPI/AAAAAAAAC2U/RhENLpYyOkQ/s400/soundflower2.png "C設定 LadioCast")](http://lh4.ggpht.com/-aKbGWG4cTpg/TtOBhJsszPI/AAAAAAAAC2U/RhENLpYyOkQ/s800/soundflower2.png)

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">入力1：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
<td>AUX1</td>
</tr>
<tr>
<th class="right">入力2：</th>
<td>Soundflower(2ch)（Macの音）</td>
<td>メイン</td>
</tr>
<tr>
<th class="right">入力3：</th>
<td>Soundflower(16ch)（Skype相手の声）</td>
<td>メイン</td>
</tr>
<tr>
<th class="right">出力メイン：</th>
<td colspan="2">使用してるヘッドフォンデバイス</td>
</tr>
<tr>
<th class="right">出力AUX1：</th>
<td colspan="2">Soundflower(2ch)</td>
</tr>
<tr>
<th class="right">出力AUX2：</th>
<td colspan="2">N/A</td>
</tr>
</tbody>
</table>

と設定すると、 自分のマイクで喋った声は、一度Soundflower(2ch) に入り、Macの音とミックスされます。そして、Soundflower(2ch) が「メイン」に入ってるので、最終的に放送に乗ります。 
 Skypeのほうはというと、

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">出力デバイス：</th>
<td>Soundflower(16ch）</td>
</tr>
<tr>
<th class="right">入力デバイス：</th>
<td>Soundflower(2ch)</td>
</tr>
<tr>
<th class="right">呼び出し中：</th>
<td>Soundflower(16ch）</td>
</tr>
</tbody>
</table>

にすれば、**LadioCastでミックスされた自分の声 + Macの音 = Skype相手に流れる音** となります。混乱してしまうような場合、図で描くとわかりやすくなります。

[![C設定図](http://lh6.ggpht.com/-rwWhEbD_mM4/TtOCijbY2dI/AAAAAAAAC2k/WXN3031iuhg/s400/soundflower3.png "C設定図")](http://lh6.ggpht.com/-rwWhEbD_mM4/TtOCijbY2dI/AAAAAAAAC2k/WXN3031iuhg/s800/soundflower3.png)

この図で理解する方法は自分で応用する場合にも使えるテクニックだと思います。

### [D] [A],[B],[C]の状態でねとらじ以外の配信をする

LadioCastの機能により、メインに入った音は自動でねとらじに乗りますが、一般的な他の配信（ex. Ustream.TV、JustinTV.、ニコニコ生放送）はサウンドデバイスを1つだけしか設定できないので、最終的にSoundflowerのどちらかに音声をまとめ、それを他の配信の音声入力で選択しなければなりません。

また以下の例は、ねとらじ放送も同時に行える設定ですが、 ねとらじ放送をせずに他の配信のみを行いたければ、 LadioCastの「接続する」ボタンを押さなければいいだけになります。

#### [D-A] Skypeを使用しない場合

方法はいろいろありますが、[A]に従うかたちにすると

[![D-A 設定図](http://lh5.ggpht.com/-TjnrAgOAqXs/TtOERYaU8lI/AAAAAAAAC2s/Al_UsrwWQPU/s400/soundflower4.png "D-A 設定図")](http://lh5.ggpht.com/-TjnrAgOAqXs/TtOERYaU8lI/AAAAAAAAC2s/Al_UsrwWQPU/s800/soundflower4.png)

という図になり、**システム環境設定＞サウンド＞出力**を **Soundflower(2ch)**にして、LadioCastは、

[![D-A LadioCast 設定](http://lh3.ggpht.com/-4J4ZxL2vQvE/TtOElO9fDFI/AAAAAAAAC20/IA85nudMnUQ/s400/soundflower5.png "D-A LadioCast 設定")](http://lh3.ggpht.com/-4J4ZxL2vQvE/TtOElO9fDFI/AAAAAAAAC20/IA85nudMnUQ/s800/soundflower5.png)

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">入力1：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
<td>メイン+AUX2</td>
</tr>
<tr>
<th class="right">入力2：</th>
<td>Soundflower(2ch)（Macの音）</td>
<td>メイン+AUX2</td>
</tr>
<tr>
<th class="right">入力3：</th>
<td colspan="2">N/A</td>
</tr>
<tr>
<th class="right">出力メイン：</th>
<td colspan="2">使用してるヘッドフォンデバイス</td>
</tr>
<tr>
<th class="right">出力AUX1：</th>
<td colspan="2">N/A</td>
</tr>
<tr>
<th class="right">出力AUX2：</th>
<td colspan="2">Soundflower(16ch)</td>
</tr>
</tbody>
</table>

となります。これで、他配信の音声入力デバイスを **Soundflower(16ch)** にすればOK。  
もしくは、

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">出力メイン：</th>
<td>Soundflower(16ch)</td>
</tr>
<tr>
<th class="right">出力AUX2：</th>
<td>使用してるヘッドフォンデバイス</td>
</tr>
</tbody>
</table>

というふうに入れかえて、

- メインは配信出力
- 出力AUX2をモニタリング

としても良いですね。 入力1(マイクデバイス）の出力AUX2をオフにすれば、「配信には声が乗るけど、自分の声は聞こえない」となるので自分の声をモニタリングしたくない、という人向けですがマイクトラブルの際などにすぐに対応できない（わかることができない）ため、一長一短ですね。 
（自分の声を聞くのは慣れてしまえば案外気にならないものです）

#### [D-B] Skypeを使用するが、Skype相手にBGM(SE) を流さない場合

LadioCastは[D-A]の設定で、Skype相手からの音声を放送のBGM(SE) にミックスすればいいので、Skypeの設定を、

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">出力デバイス：</th>
<td>Soundflower(2ch）</td>
</tr>
<tr>
<th class="right">入力デバイス：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
</tr>
<tr>
<th class="right">呼び出し中：</th>
<td>Soundflower(2ch）</td>
</tr>
</tbody>
</table>

と設定し、Skype相手からの音量調整はSkype側で行ないます。

#### [D-C] Skypeを使用しつつ、相手にBGM(SE) も流す方法

とりあえず、図を描きます。

[![D-C 設定図](http://lh5.ggpht.com/-3IgZ6Ayvuog/TtOG2-diI1I/AAAAAAAAC28/RpqFt_K3e-8/s400/soundflower6.png "D-C 設定図")](http://lh5.ggpht.com/-3IgZ6Ayvuog/TtOG2-diI1I/AAAAAAAAC28/RpqFt_K3e-8/s800/soundflower6.png)

ねとらじ放送だけの時と違い、これもSkype相手からの音量調整はSkype側で行わないといけません。 この図から、Skypeの設定は、

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">出力デバイス：</th>
<td>Soundflower(16ch）</td>
</tr>
<tr>
<th class="right">入力デバイス：</th>
<td>Soundflower(2ch)</td>
</tr>
<tr>
<th class="right">呼び出し中：</th>
<td>Soundflower(16ch）</td>
</tr>
</tbody>
</table>

となるのがわかるでしょうか。 
 そして、マイクとMacの音声をSoundflower(2ch) でまとめ、 それを、Soundflower(16ch) に乗せ、他の配信用にします。 同時にモニタ用（ねとらじ同時放送も可能）にメインにも入れます。 
 つまりLadioCastの設定は

[![D-C LadioCast 設定](http://lh5.ggpht.com/-IyBQ2u-BS3A/TtOHbETBfZI/AAAAAAAAC3E/_bkrRTNGKiE/s400/soundflower7.png "D-C LadioCast 設定")](http://lh5.ggpht.com/-IyBQ2u-BS3A/TtOHbETBfZI/AAAAAAAAC3E/_bkrRTNGKiE/s800/soundflower7.png)

<table class="table table-striped table-bordered table-condensed">
<tbody>
<tr>
<th class="right">入力1：</th>
<td>マイクデバイス（僕の場合はUA-4FX）</td>
<td>AUX1</td>
</tr>
<tr>
<th class="right">入力2：</th>
<td>Soundflower(2ch)（Macの音）</td>
<td>AUX2</td>
</tr>
<tr>
<th class="right">入力3：</th>
<td>Soundflower(16ch)（全ての音）</td>
<td>メイン</td>
</tr>
<tr>
<th class="right">出力メイン：</th>
<td colspan="2">使用してるヘッドフォンデバイス</td>
</tr>
<tr>
<th class="right">出力AUX1：</th>
<td colspan="2">Soundflower(2ch)</td>
</tr>
<tr>
<th class="right">出力AUX2：</th>
<td colspan="2">Soundflower(16ch)</td>
</tr>
</tbody>
</table>

のようになります。

### [E] Skype通話しながらキャプチャしたゲームを実況する

例えば僕の場合、Xbox360などでネットワーク対戦（協力）プレイをしながら、相手とSkype通話し、その音を配信に乗せ、かつ、Skype相手には僕の声のみ流す（ゲーム音声は流さない）、という配信をしたりしています。

この場合、実は簡単で、[D-B]の応ようになります。 
 [D-B]の設定では、LadioCastの入力3が余っているため、**入力3：キャプチャの音声デバイス - メイン+AUX** とすれば、配信とモニタにキャプチャからの音声が乗ります。なお、Skype相手にはマイクだけの設定なのでゲーム音は流れず、声のみ流れます。

## 最後に

Soundflowerを3系統に増やしたり、LadioCastを複数同時起動するとさらにいろんなことができますが、上記の例でほとんどのケースに対応できるのと、多種多様すぎるので、解説は割愛します。 上記を読んでLadioCastとSoundflowerの仕組みを理解すれば、あとは工夫次第でどうにでもなると思います。

※ この記事は旧Blogからリライトした記事です。
