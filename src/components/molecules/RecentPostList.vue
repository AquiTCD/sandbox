<template lang="pug">
nav.post_list
  .list-title
    span.list-title--strong 最近
    span の記事
  PostLinkList(:posts="$static.recentPosts.edges")
</template>
<static-query>
  query {
    recentPosts: allPost(limit: 5) {
      edges {
        node {
          id
          title
          date(format: "YYYY-MM-DD")
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
</static-query>
<script>
import { createComponent } from '@vue/composition-api'
import PostLinkList from '~/components/molecules/PostLinkList'
export default createComponent({
  components: { PostLinkList },
  props: {},
})
</script>

<style lang="stylus" scoped>
.post_list
  margin-bottom: rhythmical-space(0.5)
.list-title
  border-bottom: 4px solid $font-color-base
  border-top: 4px solid $font-color-base
  margin-top: 0
  padding-bottom: rhythmical-space(0.125)
  padding-left: rhythmical-space(0.25)
  padding-top: rhythmical-space(0.25)
.list-title--strong
  font-size: $font-size-large
  font-weight: bold
</style>
