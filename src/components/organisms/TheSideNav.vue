<template lang="pug">
  section.the_side_nav
    TheSiteAuthor.the_site_author
    //- PopularPostList
    RecentPostList
    TagList
</template>

<script>
import TheSiteAuthor from '~/components/molecules/TheSiteAuthor.vue'
// import PopularPostList from '~/components/molecules/PopularPostList.vue'
import RecentPostList from '~/components/molecules/RecentPostList.vue'
import TagList from '~/components/molecules/TagList.vue'
export default {
  components: {
    TheSiteAuthor,
    // PopularPostList,
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
  margin-bottom: rhythmical-space(0.25)
  padding: 0 0 rhythmical-space(0.25)
  +mq-larger()
    border-left: $narrow-border-width solid $pure-black
    padding-left: rhythmical-space(0.25)
.the_site_author
  +mq-larger()
    display: none
</style>
