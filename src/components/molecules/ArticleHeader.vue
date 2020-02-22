<template lang="pug">
header.article--header
  h1.article--title {{ post.title }}
  g-image.article--cover(:src="require('!!assets-loader!@images/covers/' + post.image)" width="1200")
  .article--date(v-show="post.date")
    i.fas.fa-clock
    time.article--time(:datetime="post.date") {{ post.date }}
  ul.article--tag_list
    i.fas.fa-tags
    g-link.article--tag_item(v-for="tag in post.tags" :key="tag.id" :to="tag.path")
      li.article--tag {{ tag.title }}
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  props: {
    post: {
      type: Object,
      require: true,
      default: () => ({
        title: ``,
        image: ``,
        date: ``,
        tags: [],
      }),
    },
  },
  // setup() {},
})
</script>

<style lang="stylus">
.article--header
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto
.article--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $white-base
  font-size: $font-size-large
  grid-column: 1
  grid-row: 1
  link-fix: true
  margin-bottom: 0
  margin-top: 0
  padding: rhythmical-space(0.25)
.article--cover
  background: $font-color-base
  grid-column: 1
  grid-row: 2
  margin-bottom: 0
  margin-top: 0
  padding-bottom: rhythmical-space(0.25)
  padding-left: rhythmical-space(0.25)
  padding-right: rhythmical-space(0.25)
.article--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0 2px
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  margin-right: rhythmical-space(0.25)
  padding: rhythmical-space(0.125)
.article--time
  margin-left: rhythmical-space(0.125)
.article--tag_list
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
  padding: rhythmical-space(0.25)
.article--tag_item
  background: $font-color-base
  border: 1px solid $font-color-base
  border-radius: 2px
  display: inline-block
  line-height: 1
  margin-left: rhythmical-space(0.25)
  padding: 5px 3px
.article--tag
  color: $white-base
  link-fix: true
</style>
