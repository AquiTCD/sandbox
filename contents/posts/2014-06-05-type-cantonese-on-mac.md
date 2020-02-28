---
title: Mac で広東語入力
date: 2014-06-05 00:00:04
tags:
  # - お知らせ
  # - アプリ
  # - 本
  # - 配信
  # - 革工芸
  - カスタマイズ
  # - 開発
  # - 装備
  # - ガジェット
  # - ゲーム
  - Hack
  # - 旅
  # - 生活
  - Mac
  # - 雑記
  # - 音楽
  # - レビュー
---
現在のMac OS Xは非常に多くの言語に対応してるんだけど、繁体字（Traditional Chinese）はあったけど、広東語のIME（InputMethod）はなかった、これは残念。なので、どうにかして広東語を入力できないかと方法を探してみた。

## 広東語とは
中国南部および、香港・マカオで話される方言中国語の一種で、別名粤語、白話とも呼ばれたりしてるのを聞いたことがあるんだよね。香港・マカオでは母語として使われてるんだけど、中国語とは文法こそ中国共通語（漢語・普通話）とかなり近いものの、発音はけっこう違うんだよ。

### イェール式広東語IMEのインストール
ここでは、イェール式IMEのインストールをやってみた。

1.  [Chinese Computing - Dominic’s Abode](http://rescomp.stanford.edu/%7edomingo2/Chinese.html) から**Yele Cantonese for Mac**をダウンロード
2.  ダウンロードした**yale-10.zip**を解凍
3.  **yale-10.inputplugin**を <code>~/Library/Input Methods/</code> に置く。  
LionからLibraryが非表示になって探せない場合は、FinderでCommand+Shift+Gを押すと指定したフォルダに移動するダイアログが出るので <code>~/Library/Input Methods/</code>と入力するとそのフォルダが表示されるはず
4.  Macを再起動、またはユーザーアカウントにログインしなおす
5.  システム環境設定＞言語とテキスト＞入力ソースで、_Yale Cantonese 1.0_ にチェックを入れます
6.  IMEの設定を **Yale Cantonese 1.0** にすれば広東語の入力ができるようになる

注1：同じ方法で「粤拼（JyutPing）」も追加可能。  
注2：<code>/Library/Input Methods/</code>に置いた場合はそのMacの全ユーザで使用可能になるはず。

### Tips
.inputpluginファイルをエディタで開くと変換の設定が見える。イェール式と粤拼のどちらが自分に合うかわからない場合に確認してみたり、入力しにくい場合は自分で編集してしまうことも可能。

これで香港の気になるあの子とチャットするのも、[iKnow](http://iknow.jp/) で広東語学習するもの快適！

## 広東語についてさらに詳しく
### 広東語の音声表記
広東語学習経験者は判ってると思うけどアルファベットを用いた音での広東語表記は統一されておらず、いくつか種類がある。代表的なものに、イェール式、教院式、粤拼（JyutPing）があるけども、 Mac OS Xにはこれらの音を元にアルファベットから変換入力するIMEがないのが困ってるわけで。

### 繁体字と簡体字、中国語と広東語の関係
入力ソースに**Chinese - Traditional**を入れて、はい、解決。とはいかないのがキモ。**Chinese - Traditional**は繁体字を入力するもので、中に含まれる音声から入力する方法は普通話（中国語）に基づいてる。実際に現在使われてる漢字と言葉の組み合わせは、3パターンあって

1.  香港：広東語が話され、漢字は繁体字を使用
2.  台湾：普通話（中国語）が話され、漢字は繁体字を使用
3.  中国南部：方言として広東語が話され、漢字は簡体字を使用

### よくある間違い

[マックを使って広東語の入力をするにはどうしたらいいですか？ - Yahoo!知恵袋](http://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1229488472)   
ベストアンサーとなっている答えは間違い。広東語の音から入力したい。繁体字が入力できりゃいいってもんじゃないんだよね。

### 発音の違い

上記リンク先の例でもある、「我愛你」。これはどうなるかというと、

*   普通話：wo ai ni
*   広東語：ngoh oi neih（イェール式）

どちらも同じ字になるけども、発音は違うんだよ。 
つまり「繁体字入力」ができれば良いという「結果」の問題ではなく、「広東語発音」から変換入力したいという「過程」の問題なのがおわかりいただけたかな。

> **参考リンク**
> 
> *   [広東語 - Wikipedia](http://ja.wikipedia.org/wiki/広東語)
> *   [イェール式 - Wikipedia](http://ja.wikipedia.org/wiki/イェール式#.E5.BA.83.E6.9D.B1.E8.AA.9E)

<div class="cstmreba"><div class="booklink-box"><div class="booklink-image"><a href="http://www.amazon.co.jp/exec/obidos/asin/4497201066/akicks-22/" target="_blank" ><img src="http://ecx.images-amazon.com/images/I/51673AHZYBL._SL160_.jpg" style="border: none;" /></a></div><div class="booklink-info"><div class="booklink-name"><a href="http://www.amazon.co.jp/exec/obidos/asin/4497201066/akicks-22/" target="_blank" >日本語広東語辞典</a><div class="booklink-powered-date">posted with <a href="http://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a></div></div><div class="booklink-detail">孔 碧儀 東方書店 2001-08    </div><div class="booklink-link2"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/exec/obidos/asin/4497201066/akicks-22/" target="_blank" >Amazonで探す</a></div><div class="shoplinkkindle"><a href="http://www.amazon.co.jp/gp/search?keywords=%93%FA%96%7B%8C%EA%8DL%93%8C%8C%EA%8E%AB%93T&amp;__mk_ja_JP=%83J%83%5E%83J%83i&amp;url=node%3D2275256051&amp;tag=akicks-22" target="_blank" >Kindleで探す</a></div><div class="shoplinkrakuten"><a href="http://hb.afl.rakuten.co.jp/hgc/12d74c18.2043b39b.12d74c19.fa137382/?pc=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F1365630%2F%3Fscid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2Fev%2Fbook%2F" target="_blank" >楽天ブックスで探す</a></div>                        	  	  	  	</div></div><div class="booklink-footer"></div></div></div>
※ この記事は 旧 Blog からリライトした記事です。
