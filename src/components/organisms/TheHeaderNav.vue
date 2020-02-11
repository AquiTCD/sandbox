<template lang="pug">
nav.the_header_nav
  ul.list
    li.list--item home
    li.list--item about me
    li.list--item about this
    li.list--item search
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
.the_header_nav
  background: $bg-color-base
  padding-bottom: 5px
  padding-top: 5px
  position: sticky
  top: 0
.list
  border-bottom: $narrow-border-width solid $pure-black
  border-top: $narrow-border-width solid $pure-black
  display: flex
  flex-flow: row nowrap
  justify-content: center
  list-style-type: none
  margin: 0
  padding: 0
.list--item
  text-align: center
  // display: block
  width: 100%
  &:not(:last-of-type)
    border-right: $narrow-border-width solid $pure-black
</style>
