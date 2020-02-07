<template lang="pug">
  header.hero(:class="{'has-sidebar': shouldShowNavbar }")
    h1.site_title
      g-link.home-link(to="/")
        g-image.site_title--logo(
          src="~/assets/images/logo.svg"
          :alt="$static.metadata.siteName"
        )
    .site_tags
      ul.tag_list
        li.tag_list--item(v-for="tag in tags")
          a.tag_list--link(:href="`/tag/${tag}/`") {{ tag }}
    p.site_description
      | {{ $static.metadata.siteDescription }}
    //- p.action(v-if="data.actionText && data.actionLink")
    //-   NavLink.action-button(:item="actionLink")
</template>

<static-query>
query {
  metadata {
    logo
    siteName
  }
}
</static-query>

<script>
// import NavLink from '~/components/Header/NavLink.vue'

export default {
  // components: { NavLink },
  props: {
    shouldShowNavbar: { default: true },
  },
  computed: {
    data() {
      return this.$page.post
    },
    tags() {
      return [
        // 'Rails',
        `Vue.js`,
        `Mac`,
        `ガジェット`,
        `ゲーム`,
        `革工芸`,
        `旅`,
        `本`,
      ]
    },
    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.hero
  vertical-rhythm: true
  z-depth: 1
.site_title
  background: $black-base
  is-full-width: true
  link-fix: true
  margin-top: $navbarHeight
  rhythmical-padding: 0.5 0 0.5 0
  text-align: center
.site_tags
  background: $black-base
  color: #fff
  is-full-width: true
  text-align: center
.tag_list
  display: inline-block
.tag_list--item
  color: $grey-base
  display: inline-block
  &:not(:last-child)
    margin-right: 1rem
.tag_list--link
  color: $grey-base
  &:before
    content: '#'
.site_title--logo
  background: transparent
  max-height: 192px
.site_description
  background: $primary-color-tint
  font-size: $font-size-small
  is-full-width: true
  line-height: 2rem
  text-align: center
  white-space: pre-wrap
</style>
