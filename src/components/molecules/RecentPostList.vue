<template lang="pug">
nav.post_list
  h2 RecentPosts
  ul.list
    li.list--item(v-for="post in $static.recentPosts.edges" :key="post.id")
      g-link.post(:to="post.node.path")
        g-image.post--cover(:src="require('!!assets-loader!@images/covers/' + post.node.image)" width="280")
        h2.post--title {{post.node.title}}
        ul.post--tag-list
          g-link.post--tag_item(v-for="tag in post.node.tags" :key="tag.id" :to="tag.path" )
            li {{ tag.title }}
        .post--date
          i.fas.fa-clock
          time.post--time(:datetime="post.node.date") {{post.node.date}}
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
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style lang="stylus" scoped>
.post_list
  border-bottom: $narrow-border-width solid $font-color-base
  padding-bottom: 5px
  padding-top: 5px
.list
  display: flex
  flex-flow: column nowrap
  list-style-type: none
  margin: 0
  padding: 0
.list--item
  border: 1px solid $font-color-base
  display: block
  width: 100%
  &:not(:first-of-type)
    margin-top: rhythmical-space(0.5)
.post
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto auto
.post--cover
  grid-column: 1
  grid-row: 2
.post--title
  background: $font-color-base
  color: $pure-white
  font-size: $font-size-small
  grid-column: 1
  grid-row: 1
  line-height: 1.2
  link-fix: true
  margin: 0
  padding: rhythmical-space(0.25)
.post--tag-list
  background: $pure-white
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 3
  list-style-type: none
  margin: 0
  padding: 0 rhythmical-space(0.25)
.post--tag_item
  background: $font-color-base
  border-radius: 2px
  color: $pure-white
  display: inline-block
  line-height: 1
  padding: 5px 3px
  &:not(:first-of-type)
    margin-left: rhythmical-space(0.25)
.post--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0px 2px
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  padding: rhythmical-space(0.125)
.post--time
  margin-left: rhythmical-space(0.125)
</style>
