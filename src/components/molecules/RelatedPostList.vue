<template lang="pug">
  nav.related_post_list
    .list-title(v-if="posts.length")
      span.list-title--strong 関連
      span する記事
    ul.list
      li.list--item(v-for="post in posts" :key="post.id")
        .post_link
          g-link.post_link--image(:to="post.path")
            PostImage(:src="post.cover" :date="post.date")
          g-link.post_link--title(:to="post.path") {{post.title}}
          TagList.post_link--tag-list(:tags="post.tags")
</template>
<script>
import TagList from '~/components/molecules/TagList'
import PostImage from '~/components/atoms/PostImage'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { PostImage, TagList },
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
  display: flex
  flex-flow: column wrap
  list-style-type: none
  margin: 0
  padding: 0
.list--item
  display: block
  margin-top: rhythmical-space(0.25)
  width: 100%
.post_link
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto
  +mq-medium()
    border-radius: 2px
    border-right: $narrow-border-width solid $font-color-base
    grid-template-columns: 30% auto
    grid-template-rows: 62% 38%
.post_link--image
  grid-column: 1
  grid-row: 1
  +mq-medium()
    grid-column: 1
    grid-row: 1 / 3
.post_link--title
  font-size: $font-size-base
  font-weight: bold
  grid-column: 1
  grid-row: 2
  line-height: 1.2
  link-fix: true
  margin: 0
  padding: rhythmical-space(0.25) rhythmical-space(0.25) rhythmical-space(0.125)
  +mq-medium()
    border-top: $narrow-border-width solid $font-color-base
    grid-column: 2
    grid-row: 1
.post_link--tag-list
  border-bottom: $narrow-border-width solid $font-color-base
  grid-column: 1
  grid-row: 3
  overflow: hidden
  padding: 0 rhythmical-space(0.25) rhythmical-space(0.125)
  +mq-medium()
    grid-column: 2
    grid-row: 2
</style>
