<template lang="pug">
  footer.the_footer
    small.copyright Copyright © 2014 Aqui TCD
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({})
</script>

<style lang="stylus" scoped>
.the_footer
  text-align: right
  padding: rhythmical-space(0.125) 0
.copyright
  font-size: $font-size-small
</style>
