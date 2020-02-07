<template>
  <component
    v-if="comp"
    :is="comp"
    v-model="page"
    :page-count="$pagination.length"
    :click-handler="clickCallback"
    :prev-text="'新しい記事'"
    :next-text="'古い記事'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </component>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
      comp: null,
    }
  },

  created() {
    this.page = this.$pagination.paginationIndex + 1
  },

  mounted() {
    import(/* webpackChunkName: "vuejs-paginate" */ 'vuejs-paginate').then(
      comp => {
        this.comp = comp.default
      }
    )
  },

  methods: {
    clickCallback(pageNum) {
      const link = this.$pagination.getSpecificPageLink(pageNum - 1)
      this.$router.push(link)
    },
  },
}
</script>

<style lang="stylus">
.pagination
  border-radius: 4px
  display: inline-block
  margin: 20px 0
  padding-left: 0
.pagination > li
  display: inline
  outline: none
.pagination > li > a,
.pagination > li > span
  background-color: #fff
  border: 1px solid #ddd
  color: $accentColor
  float: left
  line-height: 1.42857143
  margin-left: -1px
  outline: none
  padding: 6px 12px
  position: relative
  text-decoration: none
  transition: color 0.2s, background-color 0.2s
.pagination > li:first-child > a,
.pagination > li:first-child > span
  border-bottom-left-radius: 4px
  border-top-left-radius: 4px
  margin-left: 0
.pagination > li:last-child > a,
.pagination > li:last-child > span
  border-bottom-right-radius: 4px
  border-top-right-radius: 4px
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus
  background-color: #eee
  border-color: #ddd
  color: $accentColor
  z-index: 3
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus
  background-color: $accentColor
  border-color: $accentColor
  color: #fff
  cursor: default
  z-index: 2
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus
  background-color: #fff
  border-color: #ddd
  color: #ddd
  cursor: not-allowed
.pagination-lg > li > a,
.pagination-lg > li > span
  font-size: 18px
  line-height: 1.3333333
  padding: 10px 16px
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span
  border-bottom-left-radius: 6px
  border-top-left-radius: 6px
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span
  border-bottom-right-radius: 6px
  border-top-right-radius: 6px
.pagination-sm > li > a,
.pagination-sm > li > span
  font-size: 12px
  line-height: 1.5
  padding: 5px 10px
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span
  border-bottom-left-radius: 3px
  border-top-left-radius: 3px
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span
  border-bottom-right-radius: 3px
  border-top-right-radius: 3px
</style>
