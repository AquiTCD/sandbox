<template lang="pug">
  ul.post_link_list
    li.post_link_list--item(v-for="post in posts" :key="post.node.id")
      PostLink.post_link(:post="post.node")
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PostLink from '~/components/molecules/PostLink'
export default defineComponent({
  components: { PostLink },
  props: {
    posts: {
      type: Array,
      default: () => [
        {
          node: {
            id: ``,
          },
        },
      ],
    },
  },
})
</script>

<style lang="stylus" scoped>
.post_link_list
  display: flex
  flex-flow: column wrap
  list-style-type: none
  margin: 0
  padding: 0
.post_link_list--item
  display: block
  margin-top: rhythmical-space(0.25)
  width: 100%
</style>
