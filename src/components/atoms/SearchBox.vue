<template lang="pug">
  .search_box
    input.search_query(type="text" v-model="searchTerm")
    i.fas.fa-times-circle(v-if="searchTerm" @click="deleteInput")
    i.fas.fa-search(v-else)
    SearchResult(v-if="searchTerm.length" :searchTerm="searchTerm")
</template>
<script>
import SearchResult from '~/components/atoms/functions/SearchResult'
export default {
  components: { SearchResult },
  data() {
    return {
      // 検索フォームにバインドする変数
      searchTerm: ``,
    }
  },
  methods: {
    deleteInput() {
      return (this.searchTerm = ``)
    },
  },
}
</script>

<style lang="stylus">
.search_box
  background: $bg-color-light
  border: 2px solid $grey-base
  border-radius: 20px
  display: block
  margin: rhythmical-space(0.125) 0 rhythmical-space(0.125) rhythmical-space(0.25)
  overflow: visibile
  position: relative
  position: relative
.search_query
  background: $bg-color-light
  border: none
  font-size: $font-size-small
  width: calc(100% - 3em)
  &:focus
    outline: none
</style>
