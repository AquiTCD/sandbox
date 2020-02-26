<template lang="pug">
  li.tag_item
    g-link.tag_link(:to="tag.path") {{ tag.title }}
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    tag: {
      type: Object,
      require: true,
      default: () => ({
        id: ``,
        title: ``,
        path: ``,
      }),
    },
  },
})
</script>

<style lang="stylus" scoped>
.tag_item
  background: $font-color-base
  border-radius: 2px
  display: inline-block
  line-height: 1
  padding: 5px 3px
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.tag_link
  color: $pure-white
  link-fix: true
</style>
