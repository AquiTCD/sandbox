<template lang="pug">
  ul.tag-list
    Tag(v-for="tag in tags" :key="tag.id" :tag="tag")
</template>
<script lang="ts">
import Tag from '~/components/atoms/Tag'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { Tag },
  props: {
    tags: {
      type: Array,
      require: true,
      default: () => [
        {
          id: ``,
          title: ``,
          path: ``,
        },
      ],
    },
  },
})
</script>

<style lang="stylus" scoped>
.tag-list
  display: block
  font-size: $font-size-x-small
  list-style-type: none
  margin: 0
  overflow: hidden
</style>
