<template lang="pug">
nav.popular_post_list
  ol.list
    li.list--item
      a test
</template>

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
.popular_post_list
  border-bottom: $narrow-border-width solid $pure-black
  padding-bottom: 5px
  padding-top: 5px
.list
  display: flex
  flex-flow: column nowrap
  list-style-type: none
  margin: 0
  padding: 0
.list--item
  width: 100%
</style>
