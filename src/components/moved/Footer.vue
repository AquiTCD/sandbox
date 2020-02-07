<template lang="pug">
  footer.footer(:class="{'has-sidebar': shouldShowNavbar }")
    //- .footer-left-wrap
    //-   ul.contact(v-if="contact")
    //-     li.contact-item(v-for="item in contact")
    //-       g-link(:to="item.link")
    //-         i.fab(:class="`fa-${item.type}`")
    //- .footer-right-wrap
    //-   ul.copyright(v-if="copyright")
    //-     li.copyright-item(v-for="item in copyright")
    //-       g-link(:to="item.link") {{ item.text }}
</template>

<script>
import NavLink from '~/components/Header/NavLink.vue'
export default {
  props: {
    shouldShowNavbar: { default: true },
  },
  components: { NavLink },
  data() {
    return {
      contact: [
        {
          type: `github`,
          link: `https://github.com/AquiTCD`,
        },
        {
          type: `twitter`,
          link: `https://twitter.com/aquitcd`,
        },
      ],
    }
  },
  methods: {},
  computed: {
    // contact() {
    //   return [
    //     {
    //       type: `github`,
    //       link: `https://github.com/AquiTCD`,
    //     },
    //     {
    //       type: `twitter`,
    //       link: `https://twitter.com/aquitcd`,
    //     },
    //   ]
    // },
    copyright() {
      return `themeConfig`
      // return (
      //   (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []
      // )
    },
  },
}
</script>

<style lang="stylus" scoped>
// @import '~/assets/styles/config.styl'
ol,
ul
  list-style: none
  margin: 0
  padding: 0
.footer
  background-color: #000
  box-sizing: border-box
  color: #FFF
  display: flex
  height: 60px
  padding: 15px 32px
  .footer-left-wrap
    display: flex
    flex: 1
    line-height: 30px
    .contact
      display: flex
      .contact-item
        flex: 1
        margin-right: 10px
        a
          color: rgba(255, 255, 255, 0.45)
          font-size: 24px
          text-decoration: none
          transition: color 0.3s
          &:hover
            color: #FFF
  .footer-right-wrap
    align-items: center
    display: flex
    flex: 1
    justify-content: center
    @media (min-width: $MQNarrow)
      justify-content: flex-end
    .copyright
      display: flex
      justify-content: flex-end
      .copyright-item
        border-right: 1px solid rgba(255, 255, 255, 0.6)
        flex: 0 0 auto
        line-height: 12px
        padding: 0 10px
        position: relative
        &:last-child
          border-right: none
        a
          color: rgba(255, 255, 255, 0.6)
          font-size: 12px
          text-decoration: none
          transition: color 0.3s
          &:hover
            color: rgba(255, 255, 255, 0.9)
@media (max-width: $MQMobile)
  .footer
    flex-direction: column
    height: 100px
    .footer-left-wrap
      align-items: center
      justify-content: center
</style>
