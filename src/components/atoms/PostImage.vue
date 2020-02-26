<template lang="pug">
  .post-image
    g-image.post-image--image(:src="require('!!assets-loader!@images/' + src)" width="280")
    .post-image--date
      i.fas.fa-clock
      time.post-image--time(:datetime="date") {{date}}
</template>
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    src: {
      type: String,
      require: true,
      default: ``,
    },
    date: {
      type: String,
      require: true,
      default: ``,
    },
  },
})
</script>

<style lang="stylus" scoped>
.post-image
  background: $font-color-base
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto
  padding: $narrow-border-width
.post-image--image
  grid-column: 1
  grid-row: 1
.post-image--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0 2px
  color: $font-color-base
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 1
  justify-self: end
  line-height: 1
  padding: rhythmical-space(0.125)
.post-image--time
  margin-left: rhythmical-space(0.125)
</style>
