<template lang="pug">
.the_site_description
  .content
    span.byline {{ $static.metadata.siteName }}
    p.site_description {{ ($static.metadata.siteDescription).replace('。', '。\n') }}
    ul.site_share
      li.share_button
        a.twitter-share-button(:href="'https://twitter.com/share?url=' + $static.metadata.siteUrl + '&text=' + $static.metadata.siteName"
          :data-text="$static.metadata.siteName"
          :data-url="$static.metadata.siteUrl"
          data-lang="ja"
        )
          i.fab.fa-twitter-square
      li.share_button
        a.pocket-btn(:href="'https://getpocket.com/edit?url=' + $static.metadata.siteUrl + '&title=' + $static.metadata.siteName"
          :data-save-url="$static.metadata.siteUrl"
          data-lang="ja"
        )
          i.fab.fa-get-pocket
      li.share_button
        a.pocket-btn(:href="'https://b.hatena.ne.jp/entry/panel/?url=' + $static.metadata.siteUrl + '&btitle=' + $static.metadata.siteName")
          span B!
      li.share_button
        a.rss-button(:href="'/' + $static.metadata.feedPath")
          i.fas.fa-rss-square
    ul.site_tag_list
      li.site_tag_item(v-for="tag in state.mainTags" :key="tag") {{ tag }}
</template>
<static-query>
query {
  metadata {
    siteName
    siteUrl
    feedPath
    siteDescription
  }
}
</static-query>
<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
export default createComponent({
  setup() {
    const state: any = reactive({
      mainTags: [
        `Vue.js`,
        `Ruby`,
        `Mac`,
        `ガジェット`,
        `ゲーム`,
        `革工芸`,
        `旅`,
        `本`,
      ],
    })
    return {
      state,
    }
  },
})
</script>

<style lang="stylus" scoped>
.the_site_description
  align-self: start
  display: flex
  height: 100%
  justify-content: center
  padding: rhythmical-space(0.25) 0
.content
  align-content: start
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto auto
  justify-content: center
  margin: 0
  padding: 0 rhythmical-space(0.25)
  white-space: pre-wrap
  width: 100%
  +mq-larger()
    border-right: $narrow-border-width solid $font-color-base
.byline
  border-bottom: 1px solid $font-color-base
  grid-column: 1
  grid-row: 1
  margin: 0
  font-weight: bold
  text-align: center
  text-transform: uppercase
.site_description
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  line-height: 1.2
  margin: 0
  padding: rhythmical-space(0.25) 0
  text-align: center
  white-space: pre-wrap
.site_share
  font-size: $font-size-large
  grid-column: 1
  grid-row: 3
  line-height: 1.2
  margin: 0
  padding-top: 0
  padding-left: 0
  padding-right: 0
  padding-bottom: rhythmical-space(0.125)
  text-align: center
.share_button
  link-fix: true
  color: $black-base
  display: inline-block
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.site_tag_list
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 4
  line-height: 1.2
  margin: 0
  padding: 0
  text-align: center
.site_tag_item
  display: inline-block
  &:before
    content: '#'
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
</style>
