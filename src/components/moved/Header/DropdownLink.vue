<template>
  <div :class="{ open }" class="dropdown-wrapper">
    <a @click="toggle" class="dropdown-title">
      <span class="title">{{ item.text }}</span>
      <span :class="open ? 'down' : 'right'" class="arrow" />
    </a>

    <DropdownTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          :key="subItem.link || index"
          v-for="(subItem, index) in item.items"
          class="dropdown-item"
        >
          <h4 v-if="subItem.type === 'links'">
            {{ subItem.text }}
          </h4>

          <ul v-if="subItem.type === 'links'" class="dropdown-subitem-wrapper">
            <li
              :key="childSubItem.link"
              v-for="childSubItem in subItem.items"
              class="dropdown-subitem"
            >
              <NavLink :item="childSubItem" />
            </li>
          </ul>

          <NavLink v-else :item="subItem" />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import NavLink from '~/components/Header/NavLink.vue'
import DropdownTransition from '~/components/Header/DropdownTransition.vue'

export default {
  components: { NavLink, DropdownTransition },

  props: {
    item: {
      required: true,
    },
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>

<style lang="stylus">
.dropdown-wrapper
  cursor: pointer
  .dropdown-title
    display: block
    &:hover
      border-color: transparent
    .arrow
      margin-left: 0.4rem
      margin-top: -1px
      vertical-align: middle
  .nav-dropdown
    .dropdown-item
      color: inherit
      line-height: 1.7rem
      h4
        border-top: 1px solid #eee
        margin: 0.45rem 0 0
        padding: 0.45rem 1.5rem 0 1.25rem
      .dropdown-subitem-wrapper
        list-style: none
        padding: 0
        .dropdown-subitem
          font-size: 0.9em
      a
        border-bottom: none
        display: block
        font-weight: 400
        line-height: 1.7rem
        margin-bottom: 0
        padding: 0 1.5rem 0 1.25rem
        position: relative
        &:hover
          color: $accentColor
        &.router-link-active
          color: $accentColor
          &::after
            border-bottom: 3px solid transparent
            border-left: 5px solid $accentColor
            border-top: 3px solid transparent
            content: ''
            height: 0
            left: 9px
            position: absolute
            top: calc(50% - 2px)
            width: 0
      &:first-child h4
        border-top: 0
        margin-top: 0
        padding-top: 0
@media (max-width: $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom: 0.5rem
    .nav-dropdown
      overflow: hidden
      transition: height 0.1s ease-out
      .dropdown-item
        h4
          border-top: 0
          margin-top: 0
          padding-top: 0
        h4,
        & > a
          font-size: 15px
          line-height: 2rem
        .dropdown-subitem
          font-size: 14px
          padding-left: 1rem
@media (min-width: $MQMobile)
  .dropdown-wrapper
    height: 1.8rem
    &:hover .nav-dropdown
      // override the inline style.
      display: block !important
    .dropdown-title .arrow
      border-bottom: 0
      // make the arrow always down at desktop
      border-left: 4px solid transparent
      border-right: 4px solid transparent
      border-top: 6px solid $arrowBgColor
    .nav-dropdown
      background-color: #fff
      border: 1px solid #ddd
      border-bottom-color: #ccc
      border-radius: 0.25rem
      box-sizing: border-box
      display: none
      // Avoid height shaked by clicking
      height: auto !important
      margin: 0
      max-height: calc(100vh - 2.7rem)
      overflow-y: auto
      padding: 0.6rem 0
      position: absolute
      right: 0
      text-align: left
      top: 100%
      white-space: nowrap
</style>
