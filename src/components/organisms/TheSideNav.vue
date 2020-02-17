<template lang="pug">
section.the_side_nav
  AuthorInfo.auther-info
  //- PopularPostList
  RecentPostList
  TagList
</template>

<script>
import AuthorInfo from '~/components/molecules/AuthorInfo.vue'
import PopularPostList from '~/components/molecules/PopularPostList.vue'
import RecentPostList from '~/components/molecules/RecentPostList.vue'
import TagList from '~/components/molecules/TagList.vue'
export default {
  components: {
    AuthorInfo,
    PopularPostList,
    RecentPostList,
    TagList,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="stylus" scoped>
.the_side_nav
  display: flex
  flex-flow: column nowrap
  padding: 0 0 rhythmical-space(0.25) rhythmical-space(0.25)
  margin-bottom: rhythmical-space(0.25)
  +mq-larger()
    border-left: $narrow-border-width solid $pure-black
.auther-info
  +mq-larger()
    display: none
</style>
