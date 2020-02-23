<template lang="pug">
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
import { createComponent } from '@vue/composition-api'
export default createComponent({
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
  grid-template-rows: auto auto auto auto
  +mq-medium()
    grid-template-columns: 30% auto
    grid-template-rows: 62% 38%
  +mq-larger()
    grid-template-columns: auto
    grid-template-rows: auto auto auto auto
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
  +mq-larger()
    border-radius: 0
    border-right: 0
    grid-column: 1
    grid-row: 2
    padding: 1px
.post_link--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $pure-white
  font-size: $font-size-small
  font-weight: bold
  grid-column: 1
  grid-row: 1
  line-height: 1.2
  link-fix: true
  margin: 0
  padding: rhythmical-space(0.25)
  +mq-medium()
    border-radius: 0 2px 0 0
    font-size: $font-size-base
    grid-column: 2
    grid-row: 1
  +mq-larger()
    border-radius: 2px 2px 0 0
    font-size: $font-size-small
    grid-column: 1
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
  +mq-larger()
    border-radius: 0 0 2px 2px
    grid-column: 1
    grid-row: 3
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
  border-radius: 0 0 0 2px
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
  +mq-larger()
    grid-column: 1
    grid-row: 2
    margin-top: 1px
.post_link--time
  margin-left: rhythmical-space(0.125)
</style>
