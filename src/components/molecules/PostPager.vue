<template lang="pug">
  .post_pager
    g-link.post_pager--newer(v-if="currentPost.previous" :to="currentPost.previous.path")
      i.fas.fa-angle-left.icon
      span.title {{ currentPost.previous.title }}
    g-link.post_pager--older(v-if="currentPost.next" :to="currentPost.next.path")
      span.title {{ currentPost.next.title }}
      i.fas.fa-angle-right.icon
</template>
<static-query>
  query {
    posts: allPost {
      edges {
        previous {
          id
          title
          date(format: "YYYY-MM-DD")
          path
          tags {
            id
            title
            path
          }
        }
        next {
          id
          title
          date(format: "YYYY-MM-DD")
          path
          tags {
            id
            title
            path
          }
        }
        node {
          id
        }
      }
    }
  }
</static-query>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: {},
  props: {
    id: {
      type: String,
      require: true,
      default: ``,
    },
  },
  computed: {
    currentPost() {
      const query: any = this.$static
      if (query) {
        const matched = query.posts.edges.filter((edges: any) => {
          return edges.node.id == this.id
        })
        return matched[0]
      } else {
        return [{ previsous: null, next: null }]
      }
    },
  },
  // setup() {},
})
</script>

<style lang="stylus" scoped>
.post_pager
  align-items: center
  border: 1px solid $font-color-base
  border-radius: 2px
  display: flex
  flex-flow: row nowrap
  font-size: $font-size-small
  justify-content: center
.post_pager--newer,
.post_pager--older
  align-self: stretch
  flex-grow: 1
  justify-content: center
  line-height: 1.32
  max-width: 50%
  padding: rhythmical-space(0.25)
  &:not(:first-child)
    border-left: 1px solid $font-color-base
  &:hover
    background: $bg-color-emphasis
.post_pager--newer
  text-align: left
  .icon
    padding-right: rhythmical-space(0.25)
.post_pager--older
  text-align: right
  .icon
    padding-left: rhythmical-space(0.25)
</style>
