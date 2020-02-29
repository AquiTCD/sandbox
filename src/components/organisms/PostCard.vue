<template lang="pug">
  .post_card
    h2.post_card--title {{ title }}
    g-image.post_card--cover(width="200" :src="require('!!assets-loader!@images/' + cover)")
    TagList.post_card--tag_list(:tags="tags")
    p.post_card--description {{ description }}
    .post_card--date
      i.fas.fa-clock
      time.post_card--time(:datetime="date") {{ date }}
</template>

<script>
import TagList from '~/components/molecules/TagList'
export default {
  components: { TagList },
  props: [`title`, `description`, `cover`, `date`, `tags`],
  methods: {},
}
</script>

<style lang="stylus" scoped>
.post_card
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto auto auto
  +mq-medium()
    grid-template-columns: $side_nav_width auto
    grid-template-rows: auto auto auto auto
.post_card--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $white-base
  font-size: $font-size-base
  grid-column: 1
  grid-row: 1
  link-fix: true
  margin-bottom: 0
  margin-top: 0
  padding: rhythmical-space(0.25)
  +mq-medium()
    font-size: $font-size-large
    grid-column: 1 / 3
    grid-row: 1
.post_card--cover
  background: $font-color-base
  border-radius: 0 0 2px 2px
  grid-column: 1
  grid-row: 2
  padding-bottom: rhythmical-space(0.125)
  padding-left: rhythmical-space(0.125)
  padding-right: rhythmical-space(0.125)
  +mq-medium()
    grid-column: 1
    grid-row: 2 / 5
.post_card--tag_list
  grid-column: 1
  grid-row: 3
  list-style-type: none
  margin: 0
  padding: rhythmical-space(0.125) rhythmical-space(0.25) 0
  +mq-medium()
    grid-column: 2
    grid-row: 2
.post_card--description
  color: $font-color-base
  font-size: $font-size-small
  grid-column: 1
  grid-row: 4
  link-fix: true
  margin: 0
  padding: rhythmical-space(0.25) rhythmical-space(0.25) 0
  +mq-medium()
    grid-column: 2
    grid-row: 3 / 5
.post_card--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0px 2px
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  margin-right: rhythmical-space(0.125)
  padding: rhythmical-space(0.125)
  +mq-medium()
    grid-column: 1
    grid-row: 2
.post_card--time
  margin-left: rhythmical-space(0.125)
</style>
