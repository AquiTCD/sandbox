---
title: Firestoreを使うためにVuexFireを使ってちょっぴり悩んだ話
tags:
  - 開発
  - Firestore
  - Vue.js
date: 2018-12-25T22:47:03.000Z
image: /images/covers/2018-12-25-how-to-use-vuexfire-with-nuxt.jpg
---

ちょっと業務でFirestore使ってみようかーみたいな話がでたもんで、おっじゃあちょっと使ってみようと思いまして。で実際使ってみたらアイデアが湧いてきたのでFirestoreを使った趣味Webアプリを作ってみてます。

その過程でVuexFireというライブラリを使ってみてちょっと苦戦したけど無事できた顛末

## 入れかた
まずVuexFire。
<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/vuejs/vuefire/tree/master/packages/vuexfire" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/vuejs/vuefire/tree/master/packages/vuexfire" target="_blank" >vuefire/packages/vuexfire at master · vuejs/vuefire</a> </div><div class="link_description"></div></div></div>

ここで注意したいのはVuexFireという名前だけど、場所はGitHubの`vuejs/vuefire`にあること。
もともとはVuexFireだったのがVueファミリーに組みこまれたのかな？

それで、注意すべきは入れかたは
```
npm install vuexfire@next --save
# or yarn add -D vuexfire@next
```
普通に入れるんじゃなくて`@next`が必要なこと。

今の環境に対応するにはalpha版の`@next`で入れないと使えないことに注意。
まずこれをちゃんと読まずに入れたら上手く動かずにウンウン唸ったあげく1時間ぐらい飛ばした。無念
。いつもどおりだなーとわかったふりじゃなくてちゃんとREADME読め案件ですね。

## VuexFireのRootのMutationのみ対応
そもそもVuexFireはどんなライブラリかっていうとVuexのMutationでデータの変更先をFirestoreにて、Firestore経由でVuexのStoreを扱えするやつ。従来Action経由でMutationをコミットしてStoreを変更するのがMutation部分がまるっとVuexFireになるので、Actionから変更するようなイメージに近くなる。

で、Vuexの細かい話は割愛するけども、Vuexがそこそこの大きさになるとnamespaceで分割していくと思う。でもVuexFireではMutation直で読み込むため、Rootで設定しないとちゃんと動かないみたい。
良くみるとちゃんのREADMEにも書いてある。

[VueFire Usage](https://github.com/vuejs/vuefire/tree/master/packages/vuexfire#usage)

良く探してみたらこの件についてちゃんと言及してるQiita記事があったので詳細はそこに譲りたいと思います。言及先でもあるようにちゃんとREADME読め案件ですね、読んだつもりじゃなくてちゃんと読むの重要。

<div class="linkbox"><div class="linkbox_image"><a href="https://qiita.com/TsukasaGR/items/e8a47889f65c53751309" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://qiita.com/TsukasaGR/items/e8a47889f65c53751309" target="_blank" >Nuxt×vuexfireでちょっとハマった - Qiita</a> </div><div class="link_description"></div></div></div>

## ライフサイクルフックはCreatedで
Vue.jsで読み込み時に最初にデータをロードしたい場合、`beforeCreate`とかで読みこんだりするのが定石だと思う。特にaxiosなんかで外部から持ってくる場合はみんなそうやってると思う。

Nuxtなんかだと、`fetch`とか`asyncData`が備わってるからあたりまえのようにやってるんじゃないかと思う。だからこう、いつもの癖で
```ts
export default class extends Vue {
  fetch({params}) {
    const ref = params //雑な例
    this.$store.dispatch('setUsersRef', ref)
  }
}
```
やっちゃってた。

これでウーンおかしいなぁ、データがロードされないぞーウーンウーン、あーでもない、こーでもないってやってたわけで、慣れてないのもあって試行錯誤してみたんだけど、全然そうじゃなくてちゃんとIssueに質問として挙がってた。

<div class="linkbox"><div class="linkbox_image"><a href="https://github.com/vuejs/vuefire/issues/46" target="_blank" ><img src="https://assets-cdn.github.com/images/modules/open_graph/github-logo.png" style="border: none;" width="128" /></a></div><div class="link_info"><div class="link_title"><a href="https://github.com/vuejs/vuefire/issues/46" target="_blank" >Dynamic Ref · Issue #46 · vuejs/vuefire</a> </div><div class="link_description">null</div></div></div>

というわけで
```ts
export default class extends Vue {
  async created() {
    const ref = params //雑な例
    await this.$store.dispatch('setUsersRef', ref)
  }
}
```
と`created`でフックしなきゃいけないっぽいです。これに気づかずに2時間ぐらいは飛ばした。

ただ、最近のIssueを見てみるともっと早いタイミングでbindする方法も模索してるみたいで、ちょっと期待。とにかく今は`created`でやるしかない。

なので、絶対にデータがある前提でもcreatedフックでbindしても実際のデータがロードされるのは表示領域が発生してからということもあると思うのでそこでエラーにならないように実装する必要もある。

これで使えるようになったけど、じゃあ実際にアプリを動かしてみるとVuexFireをメインで使っていくのがいいのかはまだちょっと不明。とくにロードのパフォーマンスというかドキュメントの取得回数的に。そのへんのことはまたそのうち書くと思うけど、firestore面白いけど、反面Productionレベルでの知見がまだまだ出てきてない（そりゃBetaだから当たり前かもだけど）。

使ってみた、はたくさんあるけど、デプロイ以降運用やパフォーマンス、設計のベストプラクティス、金銭的に効率の良い使い方とかプロジェクトの扱うドキュメントの数にもよるけど考えることは無数にある感じ。なので「使ってみた」に留まらずちゃんと人が使えるレベルまで落としこんで知見をどんどん身につけていきたい所存。
