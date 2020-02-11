<template lang="pug">
  .index
    g-link.post(v-for="post in $page.posts.edges" :key="post.id" :to="post.node.path")
      PostCard(:title="post.node.title" :summary="summary(post.node.content)" :cover="post.node.image" :tags="post.node.tags" :date="post.node.date")
    Pager(:info="$page.posts.pageInfo")
</template>

<page-query>
  query ($page: Int) {
    posts: allPost(perPage: 10, page: $page) {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          date (format: "YYYY-MM-DD")
          # description
          content
          image
          path
          tags {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query>

<script>
import PostCard from '~/components/organisms/PostCard.vue'
import { Pager } from 'gridsome'
const SUMMARY_LENGTH = 140
export default {
  components: {
    PostCard,
    Pager,
  },
  methods: {
    summary(content) {
      return content.substring(0, SUMMARY_LENGTH) + `...`
    },
  },
  metaInfo: {
    title: `Hello, world!`,
  },
}
</script>

<style lang="stylus" scoped>
.post
  display: block
  padding-bottom: 1em
</style>
