<template>
  <section
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
    class="sidebar-group"
  >
    <router-link
      v-if="item.path"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
      class="sidebar-heading clickable"
    >
      <span>{{ item.title }}</span>
      <span v-if="collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </router-link>

    <p
      v-else
      :class="{ open }"
      @click="$emit('toggle')"
      class="sidebar-heading"
    >
      <span>{{ item.title }}</span>
      <span v-if="collapsable" :class="open ? 'down' : 'right'" class="arrow" />
    </p>

    <DropdownTransition>
      <SidebarLinks
        :items="item.children"
        v-if="open || !collapsable"
        :sidebarDepth="item.sidebarDepth"
        :depth="depth + 1"
        class="sidebar-group-items"
      />
    </DropdownTransition>
  </section>
</template>

<script>
import { isActive } from '~/components/util'
import DropdownTransition from '~/components/Header/DropdownTransition.vue'

export default {
  name: `SidebarGroup`,
  components: { DropdownTransition },
  props: [`item`, `open`, `collapsable`, `depth`],
  // ref: https://vuejs.org/v2/guide/components-edge-cases.html#Circular-References-Between-Components
  beforeCreate() {
    this.$options.components.SidebarLinks = require(`./SidebarLinks.vue`).default
  },
  methods: { isActive },
}
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left: 0.5em
  &:not(.collapsable)
    .sidebar-heading:not(.clickable)
      color: inherit
      cursor: auto
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left: 0
    & > .sidebar-heading
      font-size: 0.95em
      font-weight: normal
      line-height: 1.4
      padding-left: 2rem
      &:not(.clickable)
        opacity: 0.5
    & > .sidebar-group-items
      padding-left: 1rem
      & > li > .sidebar-link
        border-left: none
        font-size: 0.95em
  &.depth-2
    & > .sidebar-heading
      border-left: none
.sidebar-heading
  border-left: 0.25rem solid transparent
  box-sizing: border-box
  color: $textColor
  cursor: pointer
  font-size: 1.1em
  font-weight: bold
  margin: 0
  // text-transform uppercase
  padding: 0.35rem 1.5rem 0.35rem 1.25rem
  transition: color 0.15s ease
  width: 100%
  &.open,
  &:hover
    color: inherit
  .arrow
    left: 0.5em
    position: relative
    top: -0.12em
  &.clickable
    &.active
      border-left-color: $accentColor
      color: $accentColor
      font-weight: 600
    &:hover
      color: $accentColor
.sidebar-group-items
  font-size: 0.95em
  overflow: hidden
  transition: height 0.1s ease-out
</style>
