<template lang="pug">
  nav.tag_list
    .list-title
      span.list-title--strong タグ
      span 一覧
    ul.list
      g-link.list--item(v-for="tag in $static.tags.edges" :key="tag.node.id" :to="tag.node.path")
        li
          span.tag {{ tag.node.title }}
          span.tag-count ({{ tag.node.belongsTo.totalCount}})
</template>
<static-query>
query {
  tags: allTag {
    totalCount
    edges {
      node {
        id
        title
        path
        belongsTo {
          totalCount
        }
      }
    }
  }
}
</static-query>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus" scoped>
.tag_list
  padding-bottom: rhythmical-space(0.25)
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
.list
  display: flex
  flex-flow: row wrap
  list-style-type: none
  margin: 0
  padding: 0
  padding: rhythmical-space(0.25) 0 0
.list--item
  background: $font-color-base
  border: 1px solid $font-color-base
  border-radius: 2px
  color: $white-base
  display: inline-block
  line-height: 1
  margin-bottom: rhythmical-space(0.25)
  padding: 5px 3px
  &:not(:last-of-type)
    margin-right: rhythmical-space(0.25)
.tag
  font-size: $font-size-small
.tag-count
  font-size: $font-size-x-small
</style>
