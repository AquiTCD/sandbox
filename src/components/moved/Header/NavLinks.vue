<template lang="pug">
  nav.nav-links(v-if="userLinks.length || repoLink")
    //- <!-- user links -->
    .nav-item(v-for="item in userLinks" :key="item.link")
      DropdownLink(v-if="item.type === 'links'" :item="item")
      NavLink(v-else :item="item")
    //- <!-- repo link -->
    .nav-item
      a.feed(href="/feed.xml") RSS feed
    //- a.repo-link(
      v-if="repoLink"
      :href="repoLink"
      target="_blank"
      rel="noopener noreferrer"
    //- ) {{ repoLabel }}
      //- OutboundLink
</template>

<script>
import DropdownLink from '~/components/Header/DropdownLink.vue'
import { resolveNavLinkItem } from '~/components/util'
import NavLink from '~/components/Header/NavLink.vue'

export default {
  components: { NavLink, DropdownLink },

  computed: {
    userNav() {
      return [
        { text: `Home`, link: `/` },
        { text: `About`, link: `/about/` },
        { text: `Tags`, link: `/tag/` },
      ]
    },

    nav() {
      // const { locales } = this.$site
      // if (locales && Object.keys(locales).length > 1) {
      //   const currentLink = this.$page.path
      //   const routes = this.$router.options.routes
      //   const themeLocales = this.$site.themeConfig.locales || {}
      //   const languageDropdown = {
      //     text: this.$themeLocaleConfig.selectText || `Languages`,
      //     items: Object.keys(locales).map(path => {
      //       const locale = locales[path]
      //       const text =
      //         (themeLocales[path] && themeLocales[path].label) || locale.lang
      //       let link
      //       // Stay on the current page
      //       if (locale.lang === this.$lang) {
      //         link = currentLink
      //       } else {
      //         // Try to stay on the same page
      //         link = currentLink.replace(this.$localeConfig.path, path)
      //         // fallback to homepage
      //         if (!routes.some(route => route.path === link)) {
      //           link = path
      //         }
      //       }
      //       return { text, link }
      //     }),
      //   }
      //   return [...this.userNav, languageDropdown]
      // }
      return this.userNav
    },

    userLinks() {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        })
      })
    },

    // repoLink() {
    //   const { repo } = this.$site.themeConfig
    //   if (repo) {
    //     return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
    //   } else {
    //     return null
    //   }
    // },

    // repoLabel() {
    //   if (!this.repoLink) return
    //   if (this.$site.themeConfig.repoLabel) {
    //     return this.$site.themeConfig.repoLabel
    //   }

    //   const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
    //   const platforms = [`GitHub`, `GitLab`, `Bitbucket`]
    //   for (let i = 0; i < platforms.length; i++) {
    //     const platform = platforms[i]
    //     if (new RegExp(platform, `i`).test(repoHost)) {
    //       return platform
    //     }
    //   }

    //   return `Source`
    // },
  },
}
</script>

<style lang="stylus">
// @import '~/assets/styles/config.styl'
.nav-links
  display: inline-block
  a
    color: $accentColor
    font-weight: bold
    line-height: 1.4rem
    &:hover,
    &:visited
      color: $accentColor
    &.router-link-active
      color: $textColor
      text-decoration: none
  .nav-item
    display: inline-block
    line-height: 2rem
    margin-left: 1.5rem
    position: relative
    &:first-child
      margin-left: 0
  .repo-link,
  .feed
    margin-left: 1.5rem
@media (max-width: $MQMobile)
  .nav-links
    .nav-item,
    .repo-link,
    .feed
      margin-left: 0
@media (min-width: $MQMobile)
  .nav-links
    margin-right: 1.5rem
  .nav-links a
    &:hover
      color: $accentColor
    &.router-link-active
      color: $white-base
      text-decoration: none
  .nav-item > a:not(.external)
    &:hover,
    &.router-link-active
      // border-bottom: 2px solid lighten($accentColor, 8%)
      margin-bottom: -2px
</style>
