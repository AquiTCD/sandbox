<template lang="pug">
  .index
    .info
      span.info--tag_title {{ $page.tag.title }}
      span に関する記事
      span {{ `（${$page.tag.belongsTo.pageInfo.currentPage}/${$page.tag.belongsTo.pageInfo.totalPages}ページ：${$page.tag.belongsTo.totalCount}件）`}}
    g-link.post(v-for="post in $page.tag.belongsTo.edges" :key="post.id" :to="post.node.path")
      PostCard(:title="post.node.title" :description="post.node.description" :cover="post.node.cover" :tags="post.node.tags" :date="post.node.date")
    Pager(:info="$page.tag.belongsTo.pageInfo")
</template>

<page-query>
query($id: ID!, $page: Int) {
  tag: tag(id: $id) {
    title
    belongsTo(page: $page) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          ... on Post {
            title
            path
            date(format: "YYYY-MM-DD")
            tags {
              id
              title
              path
            }
            description
            content
            cover
          }
        }
      }
    }
  }
}
</page-query>

<script>
import PostCard from '~/components/organisms/PostCard.vue'
import { Pager } from 'gridsome'
export default {
  components: {
    PostCard,
    Pager,
  },
  metaInfo() {
    return {
      title: `Tag:${this.$page.tag.title}`,
    }
  },
}
</script>

<style lang="stylus" scoped>
.post
  display: block
  padding-bottom: 1em
.info
  border-bottom: 4px solid $font-color-base
  border-top: 4px solid $font-color-base
  margin-bottom: rhythmical-space(0.125)
  padding-bottom: rhythmical-space(0.125)
  padding-top: rhythmical-space(0.25)
.info--tag_title
  font-size: $font-size-large
  font-weight: bold
  margin-left: rhythmical-space(0.25)
</style>
