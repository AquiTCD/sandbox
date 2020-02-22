<template lang="pug">
  .ad_card
    .ad_card--info
      .ad_card--image
        a(:href="amazonUrl" rel="nofollow" target="_blank")
          img(:src="imageUrl" style="border: none;")
      .ad_card--detail
        .ad_card--title
          a(:href="amazonUrl" rel="nofollow" target="_blank") {{title}}
        .ad_card--price(v-if="price") {{ price }}
          span.ad_card--date （{{ date }} 時点）
        .ad_card--publisher {{ publisher }}
        .ad_card--links
          .ad_card--amazon
            a.ad_card--amazon--link(:href="amazonUrl" rel="nofollow" target="_blank")
              i.fab.fa-amazon.fa-lg.brand-icon
              | Amazonで見る
          .ad_card--rakuten
            a.ad_card--rakuten--link(:href="rakutenSearchLink" rel="nofollow" target="_blank")
              span.rakuten.fa-lg.brand-icon R
              | 楽天市場で探す
</template>
<static-query>
query {
  metadata {
    amazonAssociateId
    rakutenAffiliateId
  }
}
</static-query>
<script>
export default {
  props: {
    asin: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: false,
      default: ``,
    },
    price: {
      type: String,
      required: false,
      default: ``,
    },
    date: {
      type: String,
      required: false,
      default: ``,
    },
    searchWords: {
      type: String,
      required: false,
      default: ``,
    },
  },

  computed: {
    amazonUrl() {
      const asin = this.asin
      const associateTag = this.$static.metadata.amazonAssociateId
      return `http://www.amazon.co.jp/gp/product/${asin}?tag=${associateTag}`
    },
    rakutenSearchLink() {
      const affiId = this.$static.metadata.rakutenAffiliateId
      const baseUrl = `https://hb.afl.rakuten.co.jp/hgc/${affiId}/?pc=`
      const insideStart = `https://search.rakuten.co.jp/search/mall/`
      const encodedSearchWords = encodeURIComponent(this.searchWords)
      const insideEnd = `/-/f.1-p.1-s.1-sf.0-st.A-v.2?x=0&m=http%3A%2F%2Fm.rakuten.co.jp%2F&scid=af_pc_ich_link_urltxt&sc2id=af_101_0_0`
      const inside = encodeURIComponent(
        insideStart + encodedSearchWords + insideEnd
      )
      return `${baseUrl}${inside}`
    },
  },
  methods: {},
}
</script>
<style lang="stylus" scoped>
.ad_card
  background: $white-base
  border: 1px solid $bg-color-emphasis
  border-radius: 5px
  border-right: rhythmical-space(0.25) solid $bg-color-emphasis
  rhythmical-margin: 0 0.5 1 0.5
  rhythmical-padding: 0.5 0.5 0.5 0.5
  vertical-rhythm: true
  +mq-medium()
    rhythmical-margin: 0 1 1 1
.ad_card--info
  display: flex
.ad_card--image
  align-self: center
  width: 23%
.ad_card--detail
  rhythmical-padding: 0 0 0 0.5
  width: 77%
.ad_card--title
  font-weight: bold
.ad_card--price,
.ad_card--publisher
  font-size: 0.8em
  font-weight: normal
  line-height: 1
  text-align: right
.ad_card--links
  display: flex
  flex-wrap: wrap
  justify-content: flex-end
  rhythmical-padding: 0.5 0 0 0.5
  .ad_card--amazon
    link-variation: $black-base true
    rhythmical-padding: 0.25 0.25 0 0
    a,
    a:visited,
    a:active
      background: tint($ssc.Amazon, $amount-base-greater)
      border: 2px solid $ssc.Amazon
      border-radius: 7px
      font-weight: bold
      rhythmical-padding: 0.25 0.25 0.25 0.25
    a:hover
      background: $ssc.Amazon
      border: 2px solid $ssc.Amazon
      color: $white-base
  .ad_card--rakuten
    link-variation: $black-base true
    rhythmical-padding: 0.25 0 0 0
    a,
    a:visited,
    a:active
      background: tint($sc.Rakuten, $amount-base-greater)
      border: 2px solid $sc.Rakuten
      border-radius: 7px
      font-weight: bold
      rhythmical-padding: 0.25 0.25 0.25 0.25
    a:hover
      background: $sc.Rakuten
      border: 2px solid $sc.Rakuten
      color: $white-base
      .rakuten
        color: $white-base
.brand-icon
  margin-right: 0.25em
.rakuten
  color: $sc.Rakuten
</style>
