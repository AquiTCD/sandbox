---
title: 僕のMacBookAir、旅カスタム - ユーティリティ編
date: 2014-07-13T00:00:00.000Z
tags:
  - アプリ
  - カスタマイズ
  - 旅
  - Mac
image: /images/covers/2014-07-13-my-custom-macbookair-for-journey-with-utilities.jpg
---
前回、ブログと日記環境については書いたのだけど、今回はユーティリティ編。ここが僕のMacカスタマイズの真骨頂的な。言うなれば、如何にして僕に使い易くなるようにしてるかの部分

ちょっと長いので先に見出しを書いておこう。

- ランチャとファイラ
	- これがなくちゃ始まらないランチャ「LaunchBar」
	- Finderなんて使ってられない「PathFinder」
	- 自動化するのは当たり前「Hazel」
	- MacBookAirの容量の少なさの救世主「Clusters」
	- これ1つあれば十分な解凍ソフト「The Unarchiver」
- 入力関連
	- SKK以外に考えられん「AquaSKK」と「Karabiner」
	- トラックパッドの可能性を引き出す「BetterTouchTools」
	- なくても良いけど、あると便利「SmartScroll」「FormatMatch」
- ファイルシステム拡張
	- NTFSフォーマットのHDDにも書き込みを「Fuse for OSX」「NTFS-3G」
- その他、こまごまとしたもの達
	- Password管理はこれ一本で済ます「1Password」
	- 通知といえば「Growl」「HardwareGrowler」
	- メニューバーをスッキリ「Bartender」
	- スリープ管理には「Wimoweh」
	- 旅人ドミトリー暮らしには「Tranquility」
	- 一応もう一度紹介しておく「Dropbox」、さらに「Copy」

## ランチャとファイラ
### これがなくちゃ始まらないランチャ「LaunchBar」
<div class="shareBlock"><div class="shareLeft"><a href="http://www.obdev.at/products/launchbar/index.html" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.obdev.at/products/launchbar/index.html" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.obdev.at/products/launchbar/index.html" rel="nofollow">LaunchBar 6</a></div><div class="shareDetail"><div class="shareInfo1">Keep your hands on the keyboard ...</a></div><div class="shareInfo2">超多機能キーボードランチャ<br style="clear:both;"></div></div></div></div>

Macでは「Alfred」と双角をなすほど有名なキーボードランチャ。Alfredのほうが後発で、なおかつ人気だけど。つい最近Verが上がってテーマに対応したり、Extensionに対応したり、と機能を増やしてきた。

でもLaunchBarの真骨頂は、ファイラとしての機能だと思う。ホームポジションからほとんど動くことなく、vimライクなキーボード操作でファイル操作できるのはかなり快適。その他の細かい機能はやっぱりAlfredとどっちもどっちっぽいので、結局は好みなんだろうけども。

### Finderなんて使ってられない「PathFinder」
<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://cocoatech.com/pathfinder/" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://cocoatech.com/pathfinder/"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://cocoatech.com/pathfinder/" target="_blank"> Path Finder 7 by Cocoatech</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> Save your time and work how you want! Say goodbye to the days of weak file management.  ...</div><div class="link-card-detail-memo"> 高機能Finder代替ファイルブラウザ</div></div><div class="link-card-footer"> </div></div></div></div>

言うところの高機能なFinder。上で書いたように、多くの場合LaunchBarでファイル操作してるけど、それでもGUIがあると助かる場面も多い。Finderは使い易いけど必要最小限という感じなので、僕はPathFinderを愛用。

MavericksではFinderでもタブ機能があったりするけど、以前はなかったのでPathFinderのタブ機能は重宝してた。それだけじゃなくカスタマイズ性の高さは素晴らしい。個人的にはウィンドウ右上の検索窓で、フィルタリングができるのがお気に入り。

### 自動化するのは当たり前「Hazel」
<div class="shareBlock"><div class="shareLeft"><a href="http://www.noodlesoft.com/hazel.php" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.noodlesoft.com/hazel.php" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.noodlesoft.com/hazel.php" rel="nofollow">Noodlesoft | Hazel</a></div><div class="shareDetail"><div class="shareInfo1">Automated Organization for your Mac ...</a></div><div class="shareInfo2">多機能ファイル自動整理ユーティリティ<br style="clear:both;"></div></div></div></div>
これは以前さらっと紹介したけれど、設定した条件に応じて自動で整理してくれるユーティリティ。Workflowなんかとも組み合わせれば、できる処理はかなり細かく設定できる。

主にDownloadフォルダに設定することが多いけど、その他、Desktopが散らかるのを自動で整理して、ファイルを振り分けたり、フォルダに放り混んだ画像を自動でリサイズかけるなんてこともできちゃう。

### MacBookAirの容量の少なさの救世主「Clusters」
<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://latenitesoft.com/clusters/" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://latenitesoft.com/clusters/"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://latenitesoft.com/clusters/" target="_blank"> Clusters: Seamless File Compression</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> Clusters takes advantage of the file compression technology built into Mac OS X to help you regain space, ...</div><div class="link-card-detail-memo"> 自動ファイルサイズ縮小ユーティリティ</div></div><div class="link-card-footer"> </div></div></div></div>

Clustersは、指定したフォルダにあるファイルを自動的に圧縮してくれるソフト。しかも通常の圧縮ソフトを使う場合のように、ファイルを使用するときに解凍（展開）は必要ない。つまり使い勝手はそのままで単純にファイルサイズを減らしてくれる。

これはSSDを使用していて容量が厳しくなりやすいMacBookAirにとってはかなり助かる。しかも電源が接続されてるときのみ動作する、などの設定もできるので駆動時間にも優しい。

### これ1つあれば十分な解凍ソフト「The Unarchiver」
<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/the-unarchiver/id425424353?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is1.mzstatic.com/image/thumb/Purple18/v4/0c/dc/06/0cdc06b1-9a99-af01-b5a9-ec55ad798e69/source.icns/512x512bb.png" alt="The Unarchiver" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/the-unarchiver/id425424353?mt=12&amp;uo=4&amp;at=10lHnQ">The Unarchiver</a></div><div class="pochi_price">無料</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/dag-agren/id425424356?mt=12&amp;uo=4&amp;at=10lHnQ">Dag Agren</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>
とりあえず、これ1つ入れておけば大抵なんでも解凍できる。しかも文字化けしそうな時は確認してくれる機能も嬉しい。同じような解凍ソフトの定番はあるけども、これももはや定番の1つに入るんじゃないかな。

## 入力関連
### SKK以外に考えられん「AquaSKK」と「Karabiner」
<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://aquaskk.osdn.jp/index.html" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://aquaskk.osdn.jp/index.html"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://aquaskk.osdn.jp/index.html" target="_blank"> AquaSKK - 日本語を快適に</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> AquaSKK は Mac OS X 用のかな漢字変換プログラムです ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>

<div class="shareBlock"><div class="shareLeft"><a href="https://pqrs.org/osx/karabiner/index.html.ja" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?https://pqrs.org/osx/karabiner/index.html.ja" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="https://pqrs.org/osx/karabiner/index.html.ja" rel="nofollow">Karabiner - OS X用のソフトウェア</a></div><div class="shareDetail"><div class="shareInfo1">高機能で安定性も極めて高いOS X用のキーボードカスタマイズツール ...</a></div><div class="shareInfo2"><br style="clear:both;"></div></div></div></div>

なんかAtokだのかわせみだのいろいろあるらしいけど、そもそもSKKじゃないから僕は興味ない。一度、SKKの快適さを覚えてしまうともう戻れないよ。これについて詳しくは、以下の昔の記事を見てくれるとありがたし。ちなみにKeyboardRemap4MacBookは現在は「Karabiner」という名称になったみたい。
<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://trial-and-spiral.tumblr.com/post/87818543835/im-skk" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://trial-and-spiral.tumblr.com/post/87818543835/im-skk"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://trial-and-spiral.tumblr.com/post/87818543835/im-skk" target="_blank"> 僕が日本語 IM「SKK」に憑かれた訳 - Trial and Spiral</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> 通常の日本語 IM とは違い、クセのある日本語 IM「SKK」。それに慣れてからというものの、快適すぎて今さら後戻りが出来ません。 ...</div><div class="link-card-detail-memo"> </div></div><div class="link-card-footer"> </div></div></div></div>


### トラックパッドの可能性を引き出す「BetterTouchTools」
<div class="shareBlock"><div class="shareLeft"><a href="http://blog.boastr.net/" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://blog.boastr.net/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://blog.boastr.net/" rel="nofollow">Great Tools For Your Mac By Andreas Hegenberg » BetterTouchTool, BetterSnapTool &amp; SecondBar</a></div><div class="shareDetail"><div class="shareInfo1"></a></div><div class="shareInfo2">マルチタッチジェスチャ拡張ユーティリティ<br style="clear:both;"></div></div></div></div>
もともとOSに標準で用意されてるマルチタッチジェスチャだけでもかなり快適だけど、それをさらにカスタムできるユーティリティ。かなりいろいろとカスタムできるのでジェスチャだけでなんでもできてしまう。他人のMacでも無意識に自分で設定したジェスチャをしてしまいそう。

### なくても良いけど、あると便利「SmartScroll」「FormatMatch」
<div class="shareBlock"><div class="shareLeft"><a href="http://www.marcmoini.com/sx_en.html" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.marcmoini.com/sx_en.html" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.marcmoini.com/sx_en.html" rel="nofollow">Smart Scroll - smooth and easy iPhone-like scrolling</a></div><div class="shareDetail"><div class="shareInfo1">Smart Scroll makes scrolling smoother, faster and more comfortable ...</a></div><div class="shareInfo2">スクロール機能拡張ユーティリティ<br style="clear:both;"></div></div></div></div>
スクロール機能に特化して拡張、カスタマイズできるツール。個人的には特に自動スクロールが良い感じ。おやつを食べながら、自動スクロールでWebページを読んだり。あとは一時的にスクロールスピードを加速させたり。

<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/formatmatch/id445211988?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is2.mzstatic.com/image/thumb/Purple62/v4/ef/17/39/ef173979-1370-266b-fc21-dc3b8bfa7799/source.icns/512x512bb.png" alt="FormatMatch" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/formatmatch/id445211988?mt=12&amp;uo=4&amp;at=10lHnQ">FormatMatch</a></div><div class="pochi_price">無料</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/dutch-apps/id434100977?mt=12&amp;uo=4&amp;at=10lHnQ">Dutch:Apps</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>
コピペする時によくある、スタイルごとコピペしてしまって、いやいや本当は文章だけコピーしたかったんだよ、みたいなことを防ぐツール。つまりシステム標準ではスタイルごとコピーするのに対して、プレーンテキストをコピーするのを標準にするツール。それだけなんだけど、けっこうありがたい。

## ファイルシステム拡張
### NTFSフォーマットのHDDにも書き込みを「Fuse for OSX」「NTFS-3G」
<div class="shareBlock"><div class="shareLeft"><a href="http://osxfuse.github.io/" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://osxfuse.github.io/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://osxfuse.github.io/" rel="nofollow">Home - FUSE for OS X</a></div><div class="shareDetail"><div class="shareInfo1">FUSE for OS X allows you to extend OS X's native file handling capabilities via third-party file systems ...</a></div><div class="shareInfo2">ファイルシステム拡張の土台<br style="clear:both;"></div></div></div></div>

<div class="cstmreba"> <div class="link-card-box"> <div class="link-card-image"> <a href="http://macntfs-3g.blogspot.jp/" target="_blank"> <img src="http://capture.heartrails.com/128x128?http://macntfs-3g.blogspot.jp/"> </a> </div><div class="link-card-info"> <div class="link-card-name"> <a href="http://macntfs-3g.blogspot.jp/" target="_blank"> NTFS-3G for Mac OS X</a> </div><div class="link-card-detail"> <div class="link-card-detail-select"> </div><div class="link-card-detail-memo"> NTFS用ドライバ</div></div><div class="link-card-footer"> </div></div></div></div>

本当はちゃんと有料のソフト使ったほうが信頼性もパフォーマンスも高いんだろうけど、ここはとりあえず無料でできる範囲で。導入に困ったらどっかの技術ブログでも探してみたら良いんではないかな。とりあえず僕はこれでできた。

あんまり本音言うと入れたくはないんだけど、旅に出て他の旅人と交流があると、どうしてもNTFSのHDDにぶち当たることが少なくないので。ファイルシステムのことなんて知らないで、あえてNTFSを使ってるわけでもないのに「あ、なに、Macって対応してないの？」みたいなことを言われるとなんだかシャクなので書けるようにしてやった次第。

## その他、こまごまとしたもの達
### Password管理はこれ一本で済ます「1Password」
<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/1password/id443987910?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is1.mzstatic.com/image/thumb/Purple62/v4/37/49/b1/3749b1ef-3fe8-09c7-bb9a-256b1906d05e/source.icns/512x512bb.png" alt="1Password" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/1password/id443987910?mt=12&amp;uo=4&amp;at=10lHnQ">1Password</a></div><div class="pochi_price">7,800円</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/agilebits-inc./id285897621?mt=12&amp;uo=4&amp;at=10lHnQ">AgileBits Inc.</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>
ブラウザで使うあらゆるWebサイトのパスワードから、ソフトウェアのライセンスキー管理も。それからいざと言うときの為にパスポート番号やら、旅行保険の番号なんかも入れてる。ちなみにこれもDropBoxに同期兼バックアップとるようにしてる。

ここまでいろいろ紹介したように、僕はMacAppStoreで売ってないアプリも多々使用してるし、MacHeistのようなバンドルを良く買ったりするのでライセンスキー管理はとても重宝してる。もちろんメインのWebサイトのログインパスワード管理の恩恵は計り知れない。それにしても値上がり続けてる気がする……昔はこんなに値の張るソフトではなかった気が。

### 通知といえば「Growl」「HardwareGrowler」
<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/growl/id467939042?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is5.mzstatic.com/image/thumb/Purple6/v4/24/6a/7a/246a7ad0-2245-a2ad-a699-faa350eef625/source.icns/512x512bb.png" alt="Growl" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/growl/id467939042?mt=12&amp;uo=4&amp;at=10lHnQ">Growl</a></div><div class="pochi_price">480円</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/the-growl-project/id467939045?mt=12&amp;uo=4&amp;at=10lHnQ">The Growl Project</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>

<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/hardwaregrowler/id475260933?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is2.mzstatic.com/image/thumb/Purple3/v4/45/a7/ea/45a7eaf6-e4f1-b8bf-ab94-7bcfbcd83cc5/source.icns/512x512bb.png" alt="HardwareGrowler" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/hardwaregrowler/id475260933?mt=12&amp;uo=4&amp;at=10lHnQ">HardwareGrowler</a></div><div class="pochi_price">480円</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/the-growl-project/id467939045?mt=12&amp;uo=4&amp;at=10lHnQ">The Growl Project</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>
通知センターもないころからのお付き合い。やっぱり僕は通知センターよりもGrowlのほうが使い易いわけで。それにHardwareGrowlerはなんだかんだで便利。WiFiの状況やらバッテリーの状況とか知らせてくれるし。

### メニューバーをスッキリ「Bartender」
<div class="shareBlock"><div class="shareLeft"><a href="http://www.macbartender.com/" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.macbartender.com/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.macbartender.com/" rel="nofollow">Bartender | Mac Menu Bar Item Control</a></div><div class="shareDetail"><div class="shareInfo1">Organize your menu bar apps ...</a></div><div class="shareInfo2">メニューバーアプリ整理<br style="clear:both;"></div></div></div></div>

こうしてみると多数のユーティリティを使ってるわけで、11インチのMacBookAirの画面のメニューバーじゃ足りないよ。ってことでこのBartenderの出番。Bartenderは指定したメニューバーアプリを纏めて隠してくれたりする。メニュバーアプリの中には状況によってアイコンが変わったりするものもあるけど、変わったときだけ表示させるとかも設定できるので隠しても見落しがない。メニューバーアプリ多いのでなんとかスッキリさせたい人には本当にオススメ。

### スリープ管理には「Wimoweh」
<div class="cstmreba"><div class="pochireba"><a href="https://itunes.apple.com/jp/app/wimoweh/id610341008?mt=12&amp;uo=4&amp;at=10lHnQ"><img src="http://is2.mzstatic.com/image/thumb/Purple20/v4/1c/ac/9c/1cac9cc8-5161-a69e-cde8-45d54a077026/source.icns/512x512bb.png" alt="Wimoweh" width="150" height="150" class="pochi_img" ></a><div class="pochi_info"><div class="pochi_name"><a href="https://itunes.apple.com/jp/app/wimoweh/id610341008?mt=12&amp;uo=4&amp;at=10lHnQ">Wimoweh</a></div><div class="pochi_price">120円</div><div class="pochi_seller"><a href="https://itunes.apple.com/jp/developer/paul-oneill/id881049366?mt=12&amp;uo=4&amp;at=10lHnQ">Paul O'Neill</a></div><div class="pochi_time">(2016.09.26時点)</div><div class="pochi_post">posted with <a href="http://pochireba.com" rel="nofollow" target="_blank">ポチレバ</a></div></div><div class="pochireba-footer"></div></div></div>
以前はCaffeineを使ってたんだけど、こちらのほうが少し高機能なので。スリープさせないようにするアプリなんだけど、Caffeineがスリープさせないだけの機能に対して、Wimowehだと加えて、特定のアプリが起動してたら、とかの設定もできる。他にも何分間だけスリープしないように、とか、ディスプレイはスリープしてOKとか細かく設定できるところも嬉しい。

### 旅人ドミトリー暮らしには「Tranquility」
<div class="shareBlock"><div class="shareLeft"><a href="http://www.pixio.com/auto-updating-tranquility/" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?http://www.pixio.com/auto-updating-tranquility/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="http://www.pixio.com/auto-updating-tranquility/" rel="nofollow">Tranquility</a></div><div class="shareDetail"><div class="shareInfo1"></a></div><div class="shareInfo2">夜間読書モード用ディスプレイ変更アプリ<br style="clear:both;"></div></div></div></div>
画面をモノクロ2色などにして、画面の輝きを抑えるアプリ。僕の個人的行動パターンでは、夜、寝る前に電子書籍を読むんだけど、ドミトリー（相部屋）で他の旅行者が寝てる時に煌々とディスプレイを明るくして読むのは流石に気がひける。Tranquilityで明るさを抑えればそれも気にならないし、照度が押さえられてるからか、僕もすんなり眠りにつけることが多い気がする。

### 一応もう一度紹介しておく「Dropbox」、さらに「Copy」
<div class="shareBlock"><div class="shareLeft"><a href="https://db.tt/UwfOKPv" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?https://www.dropbox.com/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="https://db.tt/UwfOKPv" rel="nofollow">Dropbox</a></div><div class="shareDetail"><div class="shareInfo1">Dropbox にアイテムを追加すると、コンピュータ、スマートフォン、タブレットからアクセスすることができます。 ドキュメントの編集、写真の自動追加、 動画の共有もどこからでも可能です。 ...</a></div><div class="shareInfo2">自動同期からバックアップまでどんとこい。こちらから新規登録すると容量アップ<br style="clear:both;"></div></div></div></div>
<div class="shareBlock"><div class="shareLeft"><a href="https://copy.com?r=81AsUg" rel="nofollow"><img src="http://capture.heartrails.com/100x100/shadow?https://www.copy.com/home/" class="shareIcon"/></a></div><div class="shareRight"><div class="shareTitle"><a href="https://copy.com?r=81AsUg" rel="nofollow">Copy</a></div><div class="shareDetail"><div class="shareInfo1">Access to your things everywhere ...</a></div><div class="shareInfo2">こちらも同期にバックアップとお手のもの。こちらから新規登録すると容量アップ<br style="clear:both;"></div></div></div></div>
以前にも紹介したし、もうDropBoxは使ってない人はいないんじゃないかってほどのサービス。もし使ってなかったら上のリンクから登録すると僕も登録した人も使える容量が増えるのでこの際に是非。

CopyはDropBoxほど対応アプリが今はまだ多くないけど、その分、使える容量が多いのが魅力。クラウドストレージにしては十分、こちらもここから登録すると僕も登録者さんも容量アップなので是非。

今の運用としては、自動で同期したいものやアプリが対応してるものはDropBox、同期よりもバックアップメインとして使ってるものはCopyで、というように運用してる。この先また変わっていくんだろうけど、ファイルの保管場所が1箇所じゃないというのは安心できる。
