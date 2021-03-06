---
title: モンスターハンターワールド モンスター弱点早見システムを作った
slug: developed-search-system-for-monster-hunter-world
tags:
  - アプリ
  - 開発
  - ゲーム
  - Vue.js
date: 2018-03-13T20:41:23.000Z
---

狩人のみなさまにおかれましては楽しいハンターライフを送っておりますか？

タイトル通りなんだけど、MHW向けにせっかくなのでスマホから簡単に見れるシステムを作った話。
作ったものはここ。
[MHW 弱点検索](https://mhw-cs.solunita.net/#/ja/)

## 概要
こんな感じ。
![サムネイル](https://lh3.googleusercontent.com/XyZ3Jk9n3p-bkRcLAZAuVOob0qb8mymgu2_huoi8_z95Y8ur4ULbhyUy5XHiImXoQiFFJMXR90kvYeJ116CHMhg4E_fLdgRB0Wk2QdduWDUfmXvDkWNISz5hs6g5ByH2iOLhChnKlJAvs8Vbm26FWbA-_wyBI2nGWVZQVCWcaD5prGhUm6p7UWyz-r_apeygq7HWr783rXb89bSvOEU2E2rusKbVtl0S5gZ1bHGW-Q0mV5j6b2tiz3ob7DAnVLVv8q9ZnyXdjAnzLSk87Iw4sNBSIo9EzFAisJnEZ_-fgEfAPO3y3R6R_OrjFTB-Aac_F3ASn_4RPl1vOT1YINuAlRXdfZH-QUutk2XuaMZaz5fs83dJW_rdjLpzb8b_TwWJDYNZOtOI7C6Ur1qnwkLmOk-iG3RUPItzJ8np4Q8I1I6HW6sUSv2vnPCINOz8I6wtX-epkiIsZFIJtejiA8bUdtap00NLS9zS-GXoKHyIWB1JNdrlpMBAJU44AbFgK55RtyADyH2Z2680auwqU__fMLEe01F2Uvr1AVrQQjpjsSMxKYjV7GuMKN_Dz3A13GoklKT4y7OhqNjWHULXEB8vLQHwuHhcwlqpMC9ZBgdAitR83u0Nk_exE1Ul4iC-KNCUmnk3bj6bWqvfkXxt6se7Dz1JDLRgRFSi=s630-no)

+ 検索というよりフィルタ
+ ロード時間とか、準備時間にササッと確認できると良いなあ
+ 種類や名前を指定してそのモンスターの弱点とかを表示するシンプルなシステム
+ キーワードも対応してる、AND、ORも使える
+ なにげに英語対応した
+ PWA対応なのでスマホのホームに登録すると捗る

### 経緯的な話
以前にGoogle SpreadSheetに作ったやつがあるけど、あれでも十分だったところ、たまたま仕事の技術勉強会での発表の出番が周ってきて何か動くサンプルが欲しかったのでチャチャッとそれらしきものを作ったのがきっかけ。ちなみに発表の内容は、静的なページであってもJavaScriptで何か動いてるとしたらそこにテスト必要だよね、という感じ。

ちなみに勉強会には間に合わず、プロトタイプというかただボタン押すと動くやつ、みたいなので発表した。とはいえそこで原型はできたちゃったので、それをベースにちゃっちゃっと完成させた。勉強会でサンプルで書いたテスト以外は書いてない。本末転倒。

とはいえ実用十分だし、つながりのある人達がフィードバックしてくれるし、自分も使ってみてちょこちょこアップデートを繰り返してようやく一段落。

### 開発的な話
静的ページオンリーで行こうと思ったので、いっそのこと純SPA的に作ろうと思った。そして利用者のスタイルとしてゲームやりながらスマホをいじるのがメインと思われたことからPWAにしてみる。

スマホ特化なのでいろいろフレームワークを検討したけど、OnsenUIがてっとり早そうだったのと僕の好きなVue.js用があったので採用。使ってみての感想はいろいろとちゃちゃっと作るには良くできてるけど、混みいったことをやろうとすると癖とかが足枷になりえたり。まぁそれはどのフレームワーク使ってもそうなんだろうけど。

Vue.jsは以前作ったPentazemin以来しばらく間が開いたので、再入門的な感じになった。ただPentazeminの時にいろいろ頑張ったせいか、だいぶサクサク作れた。あそこで独力で頑張った努力は無駄どころか自分にとって大きな資産になってる感をすごく感じた。それとともに今回もちょっと違ったことやったりで知見が増えた感覚もある。

特にSPAにしつつもURLで言語環境分けたり、ローカライズ周りだったり。あとはキーワードの実装もなかなか頭をひねった。そう思うとこういう自分の好きな題材で好きなフレームワークや開発技術を持ちいて趣味開発するの最高に良い。ちょうどゲームのほうも落ちついてきたので気持ち的にも良かった。

最初はGitHub-Pagesで運用しようと思ったけどなんかファイルが上手く読まれないのでNetlifyで。このブログでも使っるNetlifyだけどあらためて便利さを思い知った。静的なものであればNetlifyに上げさえすれば動くので、内部的に動的な要素を必要としないなら十分だし手軽で最高。SPAがっつり作れば動的っぽいけどフロントエンドでどうにでもできちゃうのでこれで事足りちゃうってのがまたすごい。便利な世の中で幸せ。

### バズらせるというか知らしめる話
せっかく作ったのでいろんな人に使って欲しいのは当然だと思う。そうしていろいろと知らせてみたものの、バズらせるのって難しい。

Twitterでお知らせするも僕のフォロワーはそんな多くない。ハッシュタグつけたら良いんかと思ったけどこれが実は簡単な話じゃなかった。というのも、Twitter公式で見てるとハッシュタグつけても拾われるのは何らかのアルゴリズムが噛んでる。人気があるのが良く表示されるというか、表示される為の人気を取るハードルが高すぎる。特に同じタグでかなりの数のツイートされてる場合。
公式で見てない場合、時系列的に載るとは思うんだけどここも流れが早すぎて流れてしまう。画像がないからかな、と思ってプレビュー画像を作ってみたけど変わらず。これは時間帯とかも関係すると思うのでなかなか一概に言えず。

5chやまとめサイトで情報が載るのが一番良さそうだけど、5chってそういう宣伝的なのを嫌う傾向にありそうだし、まとめサイトってなにをどう拾ってるのかよくわからん。5chに載るのは、宣伝じゃなく上手く貼るような独特の手法が必要そうな気がする。5ch専用ステマというか。よくポジティブに話題になるのは、なんか上手いこと工作してるんだろうなあ、と思う。

一方で英語対応したので海外掲示板のRedditにも載せてみた。こっちは5chみたいな暗黙の了解みたいなのとかないので自分でバシっと。スレ立てて1時間も立たないうちに感謝のコメント付いたのでだいぶ嬉しかった。本当、日本には存在しない感謝や褒めるのを惜しまない文化は素敵。というか日本で感謝と褒めを惜しむ文化ってなんなんだろう。みんな褒めたり感謝しあったりするほうがハッピーに暮らせると思うよ。誇張じゃなくて、その文化の違いだけで移住する価値十分にあるケースも少なくないと思う。

そんなこんなで知らせるところでだいぶ苦戦してる。自分とその周りに役立てばそれで十分なんだけどね。
