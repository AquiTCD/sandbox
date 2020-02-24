<template lang="pug">
  .search_box
    input.search_query(type="text" v-model="searchTerm")
    i.fas.fa-times-circle(v-if="searchTerm" @click="deleteInput")
    i.fas.fa-search(v-else)
    ul.search_result(v-if="searchResults.length")
      g-link.result-link(v-for="result in searchResults" :key="result.id")
        li.result--item
          .item--title {{ result.title }}
          .item--content {{ summary(result.content) }}
</template>
<static-query>
query Posts {
  posts: allPost {
    edges {
      node {
        id
        path
        title
        # description
        content
      }
    }
  }
}
</static-query>
<script>
import Flexsearch from 'flexsearch'
// import Kuromoji from 'kuromoji'
const SUMMARY_LENGTH = 70
export default {
  data() {
    return {
      index: null,
      // 検索フォームにバインドする変数
      searchTerm: ``,
    }
  },
  computed: {
    // 検索結果を返す算出プロパティ
    searchResults() {
      if (this.index === null) return []
      return this.index.search({
        query: this.searchTerm,
        limit: 5,
      })
    },
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: str => [
        ...new Set(
          str
            // 処理前にアルファベットを小文字に変換
            .toLowerCase()
            // 漢字、カナ、半角英数の連続する塊を切り出し
            // かなと全角英数は対象外
            .match(/[一-龠]+|[ァ-ヴー]+|[a-z0-9]+/g)
            // 1文字の要素を削除する
            .filter(word => word.length > 1)
            // 半角英数の場合、前方一致検索ができるように処理
            .map(word => {
              if (word.match(/[a-z0-9]+/g)) {
                let token = ``
                return Array.from(word)
                  .map(char => (token += char))
                  .filter(token => token.length > 1)
              } else {
                return word
              }
            })
            .flat()
        ),
      ],
      // Kuromoji.builder({ dicPath: `/dict` }).build((err, tokenizer) => {
      //   // tokenizer is ready
      //   const tokens = tokenizer.tokenize(str)
      //   const words = tokens
      //     .filter(word => word.pos === `名詞`)
      //     .flatMap(word => word.surface_form)
      //   console.log(words)
      //   return words
      // })
      //   return str.replace(/[\x00-\x7F]/g, ``).split(``)
      // },
      // tokenize: `forward`,
      // },
      doc: {
        id: `id`,
        field: [`title`, `content`],
      },
    })
    this.index.add(this.$static.posts.edges.map(e => e.node))
  },
  methods: {
    summary(content) {
      return content.substring(0, SUMMARY_LENGTH) + `...`
    },
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
.search_result
  left: 0
  list-style: none
  max-height: 62%
  padding: 0
  position: absolute
  top: 2em
.result-link
  background: $bg-color-light
  border-left: 2px solid $grey-base
  border-right: 2px solid $grey-base
  display: block
  text-align: left
  &:first-of-type
    border-radius: 10px 10px 0 0
    border-top: 2px solid $grey-base
  &:last-of-type
    border-bottom: 2px solid $grey-base
    border-radius: 0 0 10px 10px
  &:not(:first-of-type)
    border-top: 1px solid $grey-base
  &:hover
    background: $white-base
    overflow: hidden
.result--item
  display: block
  padding: rhythmical-space(0.125) rhythmical-space(0.25)
.item--title
  font-size: $font-size-small
  font-weight: bold
  line-height: 1.25
.item--content
  font-size: $font-size-x-small
  line-height: 1.25
</style>
