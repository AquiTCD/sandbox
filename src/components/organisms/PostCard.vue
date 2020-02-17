<template lang="pug">
.post_card
  h2.post_card--title {{ title }} 
  g-image.post_card--cover(width="200" :src="require('!!assets-loader!@images/covers/' + cover)")
  ul.post_card--tag_list
    g-link.post_card--tag_item(:to="tag.path" v-for="tag in tags" :key="tag.id")
      li {{ tag.title }}
  p.post_card--summary {{ summary }}
  .post_card--date
    i.fas.fa-clock
    time.post_card--time(:datetime="date") {{ date }}
</template>

<script>
export default {
  props: [`title`, `summary`, `cover`, `date`, `tags`],
  components: {},
  methods: {},
  metaInfo: {
    title: `Hello, world!`,
  },
}
</script>

<style lang="stylus" scoped>
.post_card
  display: grid
  grid-template-columns: $side_nav_width auto
  grid-template-rows: auto auto auto auto
.post_card--cover
  border-bottom: rhythmical-space(0.125) solid $font-color-base
  border-left: rhythmical-space(0.125) solid $font-color-base
  border-radius: 0 0 2px 2px
  border-right: rhythmical-space(0.125) solid $font-color-base
  grid-column: 1
  grid-row: 2 / 5
.post_card--tag_list
  display: flex
  flex-flow: row nowrap
  font-size: $font-size-x-small
  grid-column: 2
  grid-row: 2
  list-style-type: none
  margin: 0
  padding: rhythmical-space(0.25) rhythmical-space(0.25) 0
.post_card--tag_item
  background: $font-color-base
  border: 1px solid $font-color-base
  border-radius: 2px
  color: $white-base
  display: inline-block
  line-height: 1
  padding: 5px 3px
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.post_card--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $white-base
  font-size: $font-size-large
  grid-column: 1 / 3
  grid-row: 1
  link-fix: true
  margin-bottom: 0
  margin-top: 0
  padding: rhythmical-space(0.25)
.post_card--summary
  color: $font-color-base
  font-size: $font-size-small
  grid-column: 2
  grid-row: 3 / 5
  link-fix: true
  margin: 0
  padding: rhythmical-space(0.25) rhythmical-space(0.25) 0
.post_card--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0px 2px
  border-right: rhythmical-space(0.125) solid $font-color-base
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  padding: rhythmical-space(0.125)
.post_card--time
  margin-left: rhythmical-space(0.125)
</style>
