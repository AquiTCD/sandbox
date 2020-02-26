<template lang="pug">
  .the_site_description
    .content
      span.byline {{ metadata.siteName }}
      p.site_description {{ (metadata.siteDescription).replace('。', '。\n') }}
      ul.site_share
        li.share_button
          a.twitter-share-button(:href="'https://twitter.com/share?url=' + metadata.siteUrl + '&text=' + metadata.siteName"
            :data-text="metadata.siteName"
            :data-url="metadata.siteUrl"
            data-lang="ja"
          )
            i.fab.fa-twitter-square
        li.share_button
          a.pocket-btn(:href="'https://getpocket.com/edit?url=' + metadata.siteUrl + '&title=' + metadata.siteName"
            :data-save-url="metadata.siteUrl"
            data-lang="ja"
          )
            i.fab.fa-get-pocket
        li.share_button.is-image
          a.pocket-btn(:href="'https://b.hatena.ne.jp/entry/panel/?url=' + metadata.siteUrl + '&btitle=' + metadata.siteName")
            //- span B!
            img.hateb(:src="require('!!assets-loader!@images/hateb.svg').src" width="21")
        li.share_button
          a.rss-button(:href="'/' + metadata.feedPath")
            i.fas.fa-rss-square
      ul.site_tag_list
        li.site_tag_item(v-for="tag in metadata.popularTags" :key="tag") {{ tag }}
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    metadata: {
      type: Object,
      require: true,
      default: () => ({}),
    },
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
  grid-template-columns: 100%
  grid-template-rows: auto auto auto
  justify-content: center
  margin: 0
  padding: 0 rhythmical-space(0.25)
  white-space: pre-wrap
  width: 100%
  +mq-larger()
    border-right: $narrow-border-width solid $font-color-base
    grid-template-columns: auto
    grid-template-rows: auto auto auto auto
.byline
  display: none
  +mq-larger()
    border-bottom: 1px solid $font-color-base
    display: initial
    font-weight: bold
    grid-column: 1
    grid-row: 1
    margin: 0
    text-align: center
    text-transform: uppercase
.site_description
  border-top: 3px solid $font-color-base
  font-size: $font-size-small
  grid-column: 1
  grid-row: 3
  line-height: 1.2
  margin: 0
  padding: rhythmical-space(0.25) 0
  text-align: center
  white-space: no-wrap
  +mq-larger()
    border-top: 0
    font-size: $font-size-x-small
    grid-column: 1
    grid-row: 2
.site_share
  font-size: $font-size-large
  grid-column: 1
  grid-row: 2
  line-height: 1.2
  margin: 0
  padding-bottom: rhythmical-space(0.125)
  padding-left: 0
  padding-right: 0
  padding-top: 0
  text-align: center
  +mq-larger()
    grid-column: 1
    grid-row: 3
.share_button
  color: $black-base
  display: inline-block
  link-fix: true
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.hateb
  color: $font-color-base
  vertical-align: bottom
  width: 0.9em
.site_tag_list
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 1
  line-height: 1.2
  margin: 0
  padding: 0
  text-align: center
  +mq-larger()
    grid-column: 1
    grid-row: 4
.site_tag_item
  display: inline-block
  &:before
    content: '#'
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
</style>
