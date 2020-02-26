<template lang="pug">
  .post_link
    g-link.post_link--image(:to="post.path")
      PostImage(:src="post.cover" :date="post.date")
    g-link.post_link--title(:to="post.path") {{post.title}}
    TagList.post_link--tag-list(:tags="post.tags")
</template>
<script lang="ts">
import TagList from '~/components/molecules/TagList'
import PostImage from '~/components/atoms/PostImage'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { PostImage, TagList },
  props: {
    post: {
      type: Object,
      require: true,
      default: () => ({
        title: ``,
        cover: ``,
        date: ``,
        tags: [],
      }),
    },
  },
})
</script>

<style lang="stylus" scoped>
.post_link
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto
  +mq-medium()
    border-radius: 2px
    border-right: $narrow-border-width solid $font-color-base
    grid-template-columns: 30% auto
    grid-template-rows: 62% 38%
  +mq-larger()
    border-right: 0
    grid-template-columns: auto
    grid-template-rows: auto auto
.post_link--image
  grid-column: 1
  grid-row: 1
  +mq-medium()
    grid-column: 1
    grid-row: 1 / 3
  +mq-larger()
    grid-column: 1
    grid-row: 1
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
  +mq-larger()
    border-top: 0
    font-size: $font-size-small
    grid-column: 1
    grid-row: 2
.post_link--tag-list
  border-bottom: $narrow-border-width solid $font-color-base
  grid-column: 1
  grid-row: 3
  overflow: hidden
  padding: 0 rhythmical-space(0.25) rhythmical-space(0.125)
  +mq-medium()
    grid-column: 2
    grid-row: 2
  +mq-larger()
    grid-column: 1
    grid-row: 3
</style>
