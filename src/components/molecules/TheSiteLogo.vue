<template lang="pug">
.the_site_logo
  g-link(to="/")
    g-image.main_logo(
      :src="require(`!!assets-loader!@images/${$static.metadata.logo}`)"
      :alt="$static.metadata.siteName"
      width="1200"
    )
</template>
<static-query>
query {
  metadata {
    siteName
    logo
  }
}
</static-query>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>

<style lang="stylus" scoped>
.the_site_logo
  display: flex
  justify-content: center
.main_logo
  height: 100%
  padding: 5px
  width: 600px
</style>
