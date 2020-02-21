<template lang="pug">
ul.post_link_list
  li.post_link_list--item(v-for="post in posts" :key="post.node.id")
    PostLink.post_link(:post="post.node")
</template>
<script>
import { createComponent } from '@vue/composition-api'
import PostLink from '~/components/molecules/PostLink'
export default createComponent({
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
  flex-flow: column nowrap
  list-style-type: none
  margin: 0
  padding: 0
.post_link_list--item
  // border: 1px solid $font-color-base
  display: block
  width: 100%
  &:not(:first-of-type)
    margin-top: rhythmical-space(0.5)
</style>
