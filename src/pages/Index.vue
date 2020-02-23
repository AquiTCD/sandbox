<template lang="pug">
  .index
    g-link.post(v-for="post in $page.posts.edges" :key="post.id" :to="post.node.path")
      PostCard(:title="post.node.title" :summary="summary(post.node.content)" :cover="post.node.cover" :tags="post.node.tags" :date="post.node.date")
    Pager.pager(
      :info="$page.posts.pageInfo"
      linkClass="pager-item"
      firstLabel="最新"
      prevLabel="新しい記事"
      nextLabel="古い記事"
      lastLabel="最古"
      )
</template>

<page-query>
  query ($page: Int) {
    posts: allPost(perPage: 10, page: $page) @paginate {
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
          cover
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
.pager
  align-items: center
  border: 1px solid $font-color-base
  border-radius: 2px
  display: flex
  flex-flow: row nowrap
  justify-content: center
  list-style: none
  rhythmical-margin: 0 0 0.25 0
  vertical-rhythm: true
.pager-item
  align-self: stretch
  flex-grow: 1
  justify-content: center
  max-width: 50%
  text-align: center
  &:not(:first-child)
    border-left: 1px solid $font-color-base
  &:hover
    background: $primary-color-shade
    border-bottom: 0
    color: $white-base
.active--exact
  background-color: $bg-color-emphasis
  border-bottom: 0
</style>
