<template lang="pug">
  .the_site_logo
    g-link(to="/")
      img.main_logo(
        v-if="metadata.siteLogo"
        :src="require(`!!assets-loader!@images/${metadata.siteLogo}`).src"
        :alt="metadata.siteName"
        width="1200"
      )
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    metadata: {
      type: Object,
      require: true,
      default: () => ({}),
    },
  },
})
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
