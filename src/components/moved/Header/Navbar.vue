<template lang="pug">
  nav.navbar
    SidebarButton(@toggle-sidebar="$emit('toggle-sidebar')")
    g-link.home-link(
      to="/"
    )
      g-image.logo(
        src="~/assets/images/logo_mini.svg"
        :alt="$static.metadata.siteName"
      )
    .links(:style="linksWrapMaxWidth ? { 'max-width': linksWrapMaxWidth + 'px' } : {}")
      NavLinks.can-hide
      //- SearchBox(v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false")
</template>

<static-query>
query {
  metadata {
    siteName
    logo
    navLogo
  }
}
</static-query>

<script>
// import SearchBox from '@SearchBox'
import SidebarButton from '~/components/Header/SidebarButton.vue'
import NavLinks from '~/components/Header/NavLinks.vue'

export default {
  components: {
    SidebarButton,
    NavLinks,
    // SearchBox
  },

  data() {
    return {
      linksWrapMaxWidth: null,
    }
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, `paddingLeft`)) +
      parseInt(css(this.$el, `paddingRight`))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener(`resize`, handleLinksWrapWidth, false)
  },
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
// @import '~@theme/styles/config'
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.navbar
  background-color: $heroBackground
  border-bottom: 1px solid $borderColor
  box-sizing: border-box
  height: $navbarHeight
  left: 0
  line-height: $navbarHeight - 1.4rem
  padding: $navbar-vertical-padding $navbar-horizontal-padding
  position: fixed
  right: 0
  top: 0
  z-depth: 2
  z-index: 20
  a,
  span,
  img
    display: inline-block
  .home-link
    &:link,
    &:hover,
    &:visited,
    &:active
      color: inherit
      text-decoration: none
  .logo
    height: $navbarHeight - 1.4rem
    margin-right: 0.8rem
    min-width: $navbarHeight - 1.4rem
    vertical-align: top
  .site-name
    color: white
    font-size: 1.3rem
    font-weight: 600
    link-fix: true
    position: relative
  .links
    // background-color: white
    box-sizing: border-box
    display: flex
    font-size: 0.9rem
    padding-left: 1.5rem
    position: absolute
    right: $navbar-horizontal-padding
    top: $navbar-vertical-padding
    white-space: nowrap
    .search-box
      flex: 0 0 auto
      vertical-align: top
@media (max-width: $MQMobile)
  .navbar
    padding-left: 4rem
    .can-hide
      display: none
    .links
      padding-left: 1.5rem
</style>
