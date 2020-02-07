<template lang="pug">
  .app
    TheHeader.header
    TheHeaderNav.header_nav
    router-view.main // -> layout
    TheSideNav.side_nav
    TheFooter.footer
</template>

<script>
import TheHeader from '~/components/organisms/TheHeader.vue'
import TheHeaderNav from '~/components/organisms/TheHeaderNav.vue'
import TheSideNav from '~/components/organisms/TheSideNav.vue'
import TheFooter from '~/components/organisms/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheHeaderNav,
    TheSideNav,
    TheFooter,
  },
  data() {
    return {
      pageClasses: [`posts`],
    }
  },
  methods: {},
}
</script>

// Styles for Global
<style lang="stylus">
:root
  font-size: $font-size-root
  +mq-larger()
    font-size: $font-size-root-pc
html
  height: 100%
body
  background-color: $bg-color-base
  color: $font-color-base
  font-family: $font-family-base
  font-size: $font-size-base
  letter-spacing: $letter-spacing-base
  link-variation: $primary-color-shade false
  // padding-top: 100px
  vertical-rhythm: true
  word-wrap: break-word
  -moz-osx-font-smoothing: unset
  -webkit-font-smoothing: subpixel-antialiased
@media only screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx)
  body
    -moz-osx-font-smoothing: grayscale
    -webkit-font-smoothing: antialiased
</style>
<style lang="stylus" scoped>
.app
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto auto auto
  +mq-larger()
    grid-template-columns: auto auto
    grid-template-rows: auto auto auto auto
.header
  background: red
  grid-column: 1
  grid-row: 2
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 1
.header_nav
  background: pink
  grid-column: 1
  grid-row: 1
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 2
.main
  background: green
  grid-column: 1
  grid-row: 3
  +mq-larger()
    grid-column: 1
    grid-row: 3
.side_nav
  background: yellow
  grid-column: 1
  grid-row: 4
  +mq-larger()
    grid-column: 2
    grid-row: 3
.footer
  background: red
  grid-column: 1
  grid-row: 5
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 4
</style>
