<template lang="pug">
  section#header-wrapper
    Navbar(v-if="shouldShowNavbar" @toggle-sidebar="$emit('toggle-sidebar')")
    .sidebar-mask(@click="$emit('toggle-sidebar', false)")
    Sidebar(:items="sidebarItems" @toggle-sidebar="$emit('toggle-sidebar')")
      slot(name="sidebar-top" slot="top")
      slot(name="sidebar-bottom" slot="bottom")
    Hero(:should-show-navbar="shouldShowNavbar")
</template>

<script>
import MobileHeader from './MobileHeader.vue'
// import SearchBox from '@SearchBox'
import Navbar from '~/components/Header/Navbar.vue'
import Sidebar from '~/components/Header/Sidebar.vue'
import Hero from '~/components/Header/Hero.vue'

export default {
  components: {
    MobileHeader,
    // SearchBox,
    Navbar,
    Sidebar,
    Hero,
  },
  props: {
    shouldShowNavbar: { default: true },
    sidebarItems: { default: null },
  },
}
</script>

<style lang="stylus">
// @import '~@app/style/config'
</style>
