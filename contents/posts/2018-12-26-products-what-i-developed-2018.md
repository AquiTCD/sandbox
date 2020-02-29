---
title: ここ1年ちょっとで僕が作ったプロダクト
slug: products-what-i-developed-2018
tags:
  - アプリ
  - 開発
  - 雑記
  - Vue.js
date: 2018-12-26T22:03:50.000Z
---

いよいよ2018年も終わりそうで。今日は職場の大掃除があってようやく年末感を味わいはじめた。せっかくなので今年に作ったもの達を振りかえってみたいと思う。ちなみに開発系限定で。というのも開発系にフルコミットしたからなのか、単に気が向かなかったのかレザークラフトとか物体の物作りは全然してない。

## Pentazemin

<div class="linkbox">
  <div class="linkbox_image"><a href="https://aquitcd.github.io/Pentazemin/ja/" target="_blank" ><img src="https://aquitcd.github.io/Pentazemin/_nuxt/img/icon.8c6a2e9.png" style="border: none;" width="128" /></a>
  </div>
  <div class="link_info">
    <div class="link_title"><a href="https://aquitcd.github.io/Pentazemin/ja/" target="_blank" >Pentazemin - Introduction</a>
    </div>
    <div class="link_description">Pentazeminは今やるべきことへフォーカスし集中することを助けるためのタスク消化を支援するアプリです。
    </div>
  </div>
</div>

いわゆるポモドーロテクニックを利用したタスク管理アプリ。どっちかというとタイムマネジメントの側面が強い。気になった人はリンク先を見ていただけると嬉しいです。

時間的には去年、2017年の終わりごろにリリースしたアプリなんだけど、当時はまだVue.jsもそこまで人気じゃなくNuxt.jsのver1でさえベータ版だった。そう思うと2018年のそのあたりの速度って凄かったなぁ。

こういうアプリが欲しいなぁと思いたって、ちょうど今Vue.jsやってみたし、おっElectronも勉強しながらやったら面白いんじゃない？　と思って作った。そしてこの時にガッツリVue.jsに触れて苦戦しながらもちゃんとリリースまで持ってったのが今の僕のVue.jsの基礎力となってその結果素晴しく力がついた。

作ってできたーじゃなくて、使ってもらうために紹介ページを作ったりして、いくつかのブログで紹介されたり、外からお声がかかるきっかけになった。開発力だけじゃなくて作る以外のことも含めて僕の2018年を支えてくれたプロダクトでした。

2018年いろいろ作ってきてレベルアップできた感があるので、今の技術でちゃんと一新したい。

## MHW-cheatsheet

<div class="linkbox"><div class="linkbox_image"><a href="https://mhw-cs.solunita.net/#/ja/" target="_blank" ><img src="https://mhw-cs.solunita.net/static/img/icons/og-image.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://mhw-cs.solunita.net/#/ja/" target="_blank" >MHW 弱点検索</a> </div><div class="link_description">（スマホで見る用に作ってあります）</div></div></div>

年の始めにMonsterHunter Worldというゲームが出て、夫婦ともにガッツリハマって。簡単に説明するとみんなで協力しながら大きなモンスターを狩る、みたいなゲーム。で、モンスターには属性や攻撃部位による弱点があってなかなか複雑。

ネットを見てたら早見表みたいなのが凄くバズってましてね。絶賛されてるんだけど、個人的に「おいおいまだ見やすくできるだろ」という思いが膨らんで、よっしゃいっちょ作ったるか、せっかくだからVue.jsでPWAやってみよって作った（とはいえ、最初に画像でもなんでも形にした先人達には敬意を表したい）

やってて思ったのは、開発自体は楽しいんだけどモンスターの情報入力とかは地道で面倒で辛かった。あとゲームプレイしたい時間を削って開発するのも辛かった。

でも一番辛かったのは、宣伝するのが難しくて火がつかなかったこと。使ってくれた周りの人とかごく一部の僕のTwitterフォロワーの人達にはすごく評判良かったものの、当時ゲームの全盛期でハッシュタグ付けても文字通り秒で流れていくし、目にとまらない。個人レベルでの宣伝って難しいのを思い知らされた。

技術的にはPWAに触れれたし完全に静的にアップするんでもアイデア次第ではいろいろ活用できるなーって感触が得られたのは大きい。

## YANTAN

<div class="linkbox"><div class="linkbox_image"><a href="https://aquitcd.github.io/yantan/ja/" target="_blank" ><img src="https://aquitcd.github.io/yantan/_nuxt/img/main.5588380.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://aquitcd.github.io/yantan/ja/" target="_blank" >YANTAN - 新しいタブをお好みの背景画像とMarkdownノートを「新しいタブ」ページに。</a> </div><div class="link_description">(Google Chrome用拡張)</div></div></div>

新しいタブ用の拡張って前からしっくり来てなくて。と言うのも綺麗だけど自分がとった写真じゃなくてどっかの誰かがとったやつだったりとか。あとは単純なメモが欲しかった。ある日に、あれ、SPAの技術使えばChrome拡張って作れるんじゃね？　とひらめいたから作った。

CSSでかけれるフィルタをフルに搭載して、カスタマイズ性の高いものが作れたのは良かったし、なによりこれも使ってくれた人からけっこう評判良く、自分でも常用している（そりゃあ自分が欲しくて作ったわけですし）

苦戦したのは、Markdownのリスト記法の入力保管とか。入力保管って自分で実装すると以外に泥くさいことしなきゃなんなくて。とはいえなかなか楽しかった。あとこれもマーケティング的に上手くいってない。やっぱり自分のTwitter、GitHub、ブログ以外のところで上手いこと宣伝活動していかないといけないんだなぁと思う。

## cz-conventional-changelog-ja

<div class="linkbox">
  <div class="linkbox_image">
    <a href="https://www.npmjs.com/package/cz-conventional-changelog-ja" target="_blank" >
      <img src="https://static.npmjs.com/3dc95981de4241b35cd55fe126ab6b2c.png" style="border: none;" width="128" />
    </a>
  </div>
  <div class="link_info">
    <div class="link_title">
      <a href="https://www.npmjs.com/package/cz-conventional-changelog-ja" target="_blank" >cz-conventional-changelog-ja - npm</a>
    </div>
    <div class="link_description">これは日本語翻訳されたcommitizen/cz-conventional-changelogのフォークです。
    </div>
  </div>
</div>

いろいろ作ってたなかでCommitizenが凄く良くって、もっとGitのコミットメッセージをちゃんと書く文化が周りにも広まればいいなぁと思ってガっと訳した。

エゴサーチしてみると影響を受けてフォークして別の何かを作ってくれたりもしてくれてるようだし、嬉しいかぎり。また、翻訳フォークとはいえNPMライブラリデビューできたのは良かった。

自分は今はcz-customizeを使ってるので、使ってないけど今もすこーしダウンロードされてるようなので嬉しい。

## その他

世に出したのはこれぐらいで、業務のわりと余裕がある時期にGASを使ってGitHubのプルリクとかをChatworkに通知されるWebHook作った。GASはスプシでデータ持てるし、タダでWebアプリ的なことができるから思ってるよりアイデア次第でいろいろ化けそう。このネタで外部でLTもしたっけ。

<div class="linkbox"><div class="linkbox_image"><a href="https://speakerdeck.com/aquitcd/the-way-to-develop-gas-with-mocking-integration-test-by-jest" target="_blank" ><img src="https://speakerd.s3.amazonaws.com/presentations/e418568e95264ff394512c6cf0ab5b2c/slide_0.jpg?470231" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://speakerdeck.com/aquitcd/the-way-to-develop-gas-with-mocking-integration-test-by-jest" target="_blank" >GAS開発のJestによるモック入り結合テスト仕立て / The way to develop GAS with mocking integration test by Jest - Speaker Deck</a> </div><div class="link_description"></div></div></div>

あとはRailsとVueでイベントのペライチのWebページを作れるWebアプリのプロトタイプも作ったっけ。これはいろんな技術の中で模索して、結局リリースレベルに持っていく前に頓挫してしまった。でもアイデアはアリだと思うのでいつかちゃんと形にしたい。

## 所感とこれから

こうしてみると仕事以外でそこそこ作ったなあ、と思う。実感としては「やってみた」「つくってみた」は凄い大事なんだけど、さらにちゃんと自分以外の人が使えるレベルまで自分なりに仕上げてリリースする、っていうのは本当に力になった気がする。ツライけど。

やってみたレベルだとローカルどまりでデプロイとか運用とかは考えなくていいので、そもそも設計も違ってきたりする。それに「人が使える」というレベルは自分が想像するよりけっこう遠い。自分はアイデアの発案だしUIもロジックも実装して、概念も把握してるから説明無しで使えるけど、いざ始めて人が使うとすると全然配慮が足りなかったりUIが悪かったりする。業務でやってると他の役割の人がカバーしてくれたりするけど独りプロダクトだと全部そういうとこまで見すえてやらなきゃいけない。

そういう苦労した経験が事実として今年後半になって仕事をするうえでもしっかり活きてきたなぁと実感している。

最近ブログコミュニティに入ってちゃんとブログをこうして書くようにしてるけど、作ってみたものはちゃんとリリースすると、文章のアウトプットにも匹敵するか、もしくはそれを遥かに凌駕するリターンがあるので本当にオススメです。ツライけど。

エンジニアになるときの他の会社の同期とか、今の会社の同僚とかを見てもブログとかにアウトプットしてる層もそもそも多くないけど、趣味でもリリースまでちゃんとやりきったアウトプットしてる人って本当にごく少数。それにはエンジニアリング力だけじゃなくてアイデアとか他の力も要求されるので簡単ではないんだけど、それにしても少数。

やっぱりユーザーが居たり使ってくれて「いいね！」ってくれる人がでてくると本当に嬉しいです。今も1つ作りかけてとりあえず実用できないこともないギリギリレベルまで来たので、来年もいろいろリリースまでちゃんとやるのを意識しつつ、さらにそこで得た知見を文章でもアウトプットしていきたい所存。
