<template lang="pug">
section.the_side_nav
  AuthorInfo
  PopularPostList
  RecentPostList
  TagList
</template>

<script>
import AuthorInfo from '~/components/molecules/AuthorInfo.vue'
import PopularPostList from '~/components/molecules/PopularPostList.vue'
import RecentPostList from '~/components/molecules/RecentPostList.vue'
import TagList from '~/components/molecules/TagList.vue'
export default {
  props: {},
  components: {
    AuthorInfo,
    PopularPostList,
    RecentPostList,
    TagList,
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style lang="stylus" scoped>
.the_side_nav
  display: flex
  flex-flow: column nowrap
  padding: 0 rhythmical-space(0.25)
  +mq-larger()
    border-left: $narrow-border-width solid $pure-black
</style>
