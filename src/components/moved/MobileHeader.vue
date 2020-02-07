<template>
  <div id="mobile-header">
    <div class="mobile-header-bar">
      <div class="mobile-header-title">
        <NavLink :link="$site.base" class="mobile-home-link"
          >{{ $site.title }}
        </NavLink>
        <XIcon v-if="isOpen" @click="isOpen = !isOpen" />
        <span v-else @click="isOpen = !isOpen"> menu </span>
      </div>
      <div class="mobile-menu-wrapper" v-bind:class="{ open: isOpen }">
        <hr class="menu-divider" />
        <ul class="mobile-nav" v-if="$themeConfig.nav">
          <li class="mobile-nav-item" v-for="item in $themeConfig.nav">
            <NavLink :link="item.link">{{ item.text }}</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { MenuIcon, XIcon } from 'vue-feather-icons'

export default {
  components: {
    // MenuIcon,
    // XIcon,
  },

  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style lang="stylus">
.mobile-header-bar
  background-color: #fff
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03), 0 6px 6px rgba(0, 0, 0, 0.05)
  box-sizing: border-box
  margin: auto
  position: fixed
  top: 0
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1)
  width: 100vw
  z-index: 12
#mobile-header
  .mobile-header-title
    align-items: center
    display: flex
    justify-content: space-between
    padding: 1.2em
    .mobile-home-link
      color: #222
      font-family: PT Serif, Serif
      font-weight: bold
      text-decoration: none
      text-transform: uppercase
.mobile-nav-item
  list-style: none
  a
    text-decoration: none
.menu-divider
  margin: 0
.mobile-menu-wrapper
  background-color: #fff
  max-height: 0
  overflow: hidden
  transition: 0.3s ease
.mobile-menu-wrapper.open
  max-height: 450px
  transition: 0.3s ease
@media (min-width: $MQMobile)
  #mobile-header
    display: none
</style>
