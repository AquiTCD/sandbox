<template lang="pug">
nav.the_header_nav
  ul.list
    li.list--item.is-logo
      g-link.list--link(to="/")
        g-image.logo_mini(:src="require('!!assets-loader!@images/logo_mini.svg')" width="36")
    li.list--item.is-about
      g-link.list--link(to="/about") ABOUT
    li.list--item.is-hot
      g-link.list--link(to="/pick-ups") PICK UPs
    li.list--item.is-search
      .search_box
        input(type="text" placeholder="search")
        i.fas.fa-search
</template>

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
.the_header_nav
  background: $bg-color-base
  padding-bottom: 5px
  padding-top: 5px
  position: sticky
  top: 0
.list
  width: 100%
  border-bottom: $narrow-border-width solid $pure-black
  border-top: $narrow-border-width solid $pure-black
  display: grid
  grid-template-columns: 38% 62%
  grid-template-rows: auto
  list-style-type: none
  margin: 0
  padding: 0
  +mq-larger()
    grid-template-columns: $side_nav_width auto auto $side_nav_width
.list--item
  text-align: center
  height: 100%
  &:first-of-type, &:nth-of-type(2)
    +mq-larger()
      border-right: $narrow-border-width solid $pure-black
  &:last-of-type
    +mq-larger()
      border-left: $narrow-border-width solid $pure-black
  &.is-logo
    padding: rhythmical-space(0.125)
    display: flex
    justify-content: flex-start
    height: 100%
    grid-column: 1
    grid-row: 1
    +mq-larger()
      justify-content: center
  &:not(.is-search)
    padding-top: rhythmical-space(0.25)
    font-weight: bold
  &.is-about
    display: none
    +mq-larger()
      display: initial
      grid-column: 2
      grid-row: 1
  &.is-hot
    display: none
    +mq-larger()
      display: initial
      grid-column: 3
      grid-row: 1
  &.is-search
    grid-column: 2
    grid-row: 1
    +mq-larger()
      grid-column: 4
      grid-row: 1
.list--link
  align-self: end
.logo_mini
  width: 100px
.search_box
  position: relative
  display: block
  margin: rhythmical-space(0.125) 0 rhythmical-space(0.125) rhythmical-space(0.25)
  border: 2px solid $grey-base
  border-radius: 20px
  overflow: hidden
  background: $bg-color-light
  input[type="text"]
    border: none
    width: calc(100% - 3em)
    font-size: $font-size-small
    background: $bg-color-light
    &:focus
      outline: 0
  ::-webkit-input-placeholder
    color: $bg-color-light
</style>
