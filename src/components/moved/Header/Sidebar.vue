<template>
  <aside class="sidebar">
    <NavLinks />
    <slot name="top" />
    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '~/components/Header/SidebarLinks.vue'
import NavLinks from '~/components/Header/NavLinks.vue'

export default {
  name: `Sidebar`,

  components: { SidebarLinks, NavLinks },

  props: [`items`],
}
</script>

<style lang="stylus">
// @import '~/assets/styles/config.styl'
.sidebar
  z-depth: 1
  ul
    list-style-type: none
    margin: 0
    padding: 0
  a
    display: inline-block
  .nav-links
    border-bottom: 1px solid $borderColor
    display: none
    padding: 0.5rem 0 0.75rem
    a
      font-weight: 600
    .nav-item,
    .repo-link
      display: block
      font-size: 1.1em
      line-height: 1.25rem
      padding: 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding: 1.5rem 0
    & > li > a.sidebar-link
      font-size: 1.1em
      font-weight: bold
      line-height: 1.7
    & > li:not(:first-child)
      margin-top: 0.75rem
@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display: block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top: calc(1rem - 2px)
    & > .sidebar-links
      padding: 1rem 0
</style>
