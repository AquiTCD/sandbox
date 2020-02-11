<template lang="pug">
header.the_header
  TheSiteDescription.the_site_description
  TheSiteLogo.the_site_logo
  TheSiteAuthor.the_site_author
</template>

<script>
import TheSiteDescription from '~/components/molecules/TheSiteDescription.vue'
import TheSiteLogo from '~/components/molecules/TheSiteLogo.vue'
import TheSiteAuthor from '~/components/molecules/TheSiteAuthor.vue'

export default {
  props: {},
  components: {
    TheSiteDescription,
    TheSiteLogo,
    TheSiteAuthor,
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style lang="stylus" scoped>
.the_header
  border-bottom: $narrow-border-width solid $pure-black
  border-top: $wide-border-width solid $pure-black
  display: grid
  grid-gap: rhythmical-space(0.25) rhythmical-space(0.25)
  grid-template-columns: auto
  grid-template-rows: auto auto
  +mq-larger()
    grid-template-columns: $side_nav_width auto $side_nav_width
    grid-template-rows: auto
.the_site_description
  grid-column: 1
  grid-row: 2
  +mq-larger()
    grid-column: 1
    grid-row: 1
.the_site_logo
  grid-column: 1
  grid-row: 1
  +mq-larger()
    grid-column: 2
    grid-row: 1
.the_site_author
  grid-column: 1
  grid-row: 2
  +mq-larger()
    grid-column: 3
    grid-row: 1
</style>
