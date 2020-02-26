<template lang="pug">
  section.the_side_nav
    TheSiteAuthor.the_site_author(:metadata="metadata")
    RecentPostList
    AllTagList
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TheSiteAuthor from '~/components/molecules/TheSiteAuthor.vue'
import RecentPostList from '~/components/molecules/RecentPostList.vue'
import AllTagList from '~/components/molecules/AllTagList.vue'
export default defineComponent({
  components: {
    TheSiteAuthor,
    RecentPostList,
    AllTagList,
  },
  props: {
    metadata: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
})
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
