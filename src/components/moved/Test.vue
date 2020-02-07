<template lang="pug">
  .link_card
    .link_card--info
      .link_card--detail
        .link_card--title
          a(:href="url" rel="nofollow" target="_blank") {{title}}
        .link_card--description {{ description }}
      .link_card--image
        a(:href="url" rel="nofollow" target="_blank")
          img(:src="imageUrl" style="border: none;")
    .link_card--link
      a.link_card--site_name(:href="siteUrl" rel="nofollow" target="_blank") {{siteName}}
      a.link_card--domain(:href="siteUrl" rel="nofollow" target="_blank") {{siteUrl}}
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false,
      default: ``,
    },
    siteName: {
      type: String,
      required: false,
      default: ``,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: ``,
    },
    imageUrl: {
      type: String,
      required: false,
      default: ``,
    },
  },

  computed: {
    siteUrl() {
      return this.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[0]
    },
    siteDomain() {
      return this.url.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)[1]
    },
  },

  methods: {},
}
</script>

<style lang="stylus" scoped>
.link_card
  border-radius: 5px
.link_card--info
  display: flex
  flex-flow: row
  justify-content: flex-end
.link_card--image
  align-self: center
  max-width: 22%
  min-width: 22%
.link_card--detail
  margin-right: auto
.link_card--title
  font-weight: bold
.link_card--description
  font-size: 0.8em
  font-weight: normal
  line-height: 1.25
  text-align: left
.link_card--link
  font-size: 0.9em
  link-fix()
.link_card--site_name,
.link_card--domain
  &:not(:last-child)
    padding-right: 1rem
</style>
