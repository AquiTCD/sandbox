<template lang="pug">
  .app
    TheHeader.header
    TheHeaderNav.header_nav
    main.main(role='main')
      router-view // -> layout
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
  // background-image: url('https://www.transparenttextures.com/patterns/rice-paper-3.png')
  color: $font-color-base
  font-family: $font-family-base
  font-size: $font-size-base
  letter-spacing: $letter-spacing-base
  link-variation: $primary-color-shade false
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
  grid-template-columns: 100%
  grid-template-rows: auto auto auto auto auto
  margin-left: rhythmical-space(0.25)
  margin-right: rhythmical-space(0.25)
  +mq-medium()
    margin-left: rhythmical-space(0.5)
    margin-right: rhythmical-space(0.5)
  +mq-larger()
    grid-template-columns: 'calc(100% - %s)' % $side_nav_width $side_nav_width
    grid-template-rows: auto auto auto auto
    margin-left: auto
    margin-right: auto
    max-width: 1280px
    padding-left: rhythmical-space(1)
    padding-right: rhythmical-space(1)
.header
  grid-column: 1
  grid-row: 2
  margin-bottom: 3px
  margin-top: 3px
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 1
.header_nav
  grid-column: 1
  grid-row: 1
  margin-bottom: 3px
  margin-top: 3px
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 2
.main
  grid-column: 1
  grid-row: 3
  margin-bottom: rhythmical-space(0.25)
  +mq-larger()
    grid-column: 1
    grid-row: 3
    padding-right: rhythmical-space(0.25)
.side_nav
  grid-column: 1
  grid-row: 4
  +mq-larger()
    grid-column: 2
    grid-row: 3
.footer
  border-top: 1px solid $pure-black
  grid-column: 1
  grid-row: 5
  +mq-larger()
    grid-column: 1 / 3
    grid-row: 4
</style>
