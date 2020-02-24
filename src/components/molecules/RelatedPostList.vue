<template lang="pug">
nav.related_post_list
  .list-title(v-if="posts.length")
    span.list-title--strong 関連
    span する記事
  ul.list
    li.post(v-for="post in posts" :key="post.id")
      g-link.post_link(:to="post.path")
        g-image.post_link--cover(:src="require('!!assets-loader!@images/' + post.cover)" width="280")
        div.post_link--title {{post.title}}
        ul.post_link--tag-list
          g-link.post_link--tag_item(v-for="tag in post.tags" :key="tag.id" :to="tag.path" )
            li {{ tag.title }}
        .post_link--date
          i.fas.fa-clock
          time.post_link--time(:datetime="post.date") {{post.date}}
</template>
<script>
import { defineComponent } from '@vue/composition-api'
// import PostLink from '~/components/molecules/PostLink'
export default defineComponent({
  // components: { PostLink },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="stylus" scoped>
.related_post_list
  margin-top: rhythmical-space(0.25)
.list-title
  border-bottom: 4px solid $font-color-base
  border-top: 4px solid $font-color-base
  margin-bottom: rhythmical-space(0.125)
  margin-top: 0
  padding-bottom: rhythmical-space(0.125)
  padding-left: rhythmical-space(0.25)
  padding-top: rhythmical-space(0.25)
.list-title--strong
  font-size: $font-size-large
  font-weight: bold
.list
  margin: 0
  padding: 0
.post
  display: block
  margin-top: rhythmical-space(0.25)
.post_link
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto auto
  +mq-medium()
    grid-template-columns: 30% auto
    grid-template-rows: 62% 38%
.post_link--cover
  background: $font-color-base
  border-radius: 0
  grid-column: 1
  grid-row: 2
  padding: 1px
  +mq-medium()
    border-radius: 2px 0 0 2px
    border-right: 1px solid $font-color-base
    grid-column: 1
    grid-row: 1 / 3
    padding: $narrow-border-width 0 $narrow-border-width $narrow-border-width
.post_link--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $pure-white
  font-size: $font-size-small
  font-weight: bold
  grid-column: 2
  grid-column: 1
  grid-row: 1
  grid-row: 1
  line-height: 1.2
  link-fix: true
  margin: 0
  overflow: hidden
  padding: rhythmical-space(0.25)
  +mq-medium()
    border-radius: 0 2px 0 0
    grid-column: 2
    grid-row: 1
.post_link--tag-list
  background: $pure-white
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 2px 2px
  border-right: 1px solid $font-color-base
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 3
  list-style-type: none
  margin: 0
  overflow: hidden
  padding: 0 rhythmical-space(0.25)
  +mq-medium()
    border-radius: 0 0 2px 0
    grid-column: 2
    grid-row: 2
.post_link--tag_item
  background: $font-color-base
  border-radius: 2px
  color: $pure-white
  display: inline-block
  line-height: 1
  padding: 5px 3px
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.post_link--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0px 2px
  border-right: 1px solid $font-color-base
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  margin-top: 1px
  padding: rhythmical-space(0.125)
  +mq-medium()
    grid-column: 1
    grid-row: 1
    margin-top: $narrow-border-width
.post_link--time
  margin-left: rhythmical-space(0.125)
</style>
