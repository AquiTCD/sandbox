<template lang="pug">
.the_site_author
  p.content {{ $static.metadata.siteDescription }}
</template>
<static-query>
query {
  metadata {
    siteDescription
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
.the_site_author
  display: flex
  justify-content: center
  padding: rhythmical-space(0.25) 0
.content
  margin: 0
  padding: 0 rhythmical-space(0.25)
  text-align: center
  // white-space: pre-wrap
  +mq-larger()
    border-left: $narrow-border-width solid $pure-black
</style>
