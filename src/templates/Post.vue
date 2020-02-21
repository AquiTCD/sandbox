<template lang="pug">
.post
  article.article
    ArticleHeader.article-header(:post="$page.post")
    VueRemarkContent.article--body
    RelatedPostList(:posts="$page.post.relatedPosts")
    //- footer.page-edit
    //-   .edit-link(v-if="editLink")
    //-     a(:href="editLink"
    //-       target="_blank"
    //-       rel="noopener noreferrer"
    //-     ) {{ editLinkText }}
    //-     OutboundLink
    //-   .last-updated(v-if="lastUpdated")
    //-     span.prefix {{ lastUpdatedText }}:
    //-     span.time {{ lastUpdated }}
    //- slot(name="bottom")
  //- ul.page_nav.is-permalink(v-if="prev || next")
    li.page_nav--item(v-if="prev")
      router-link.is-link.prev(:to="prev.path")
        i.fa.fa-angle-double-left &nbsp;
        | {{ prev.title || prev.path }}
    li.page_nav--item(v-if="next")
      router-link.is-link.next(:to="next.path")
        | {{ next.title || next.path }}
        | &nbsp;
        i.fa.fa-angle-double-right
</template>
<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "YYYY-MM-DD")
    tags {
      id
      title
      path
    }
    content
    image
    relatedPosts {
      id
      title
      path
      date (format: "YYYY-MM-DD")
      image
      tags {
        id
        title
        path
      }
    }
  }
}
</page-query>
<script>
import RelatedPostList from '~/components/molecules/RelatedPostList'
import ArticleHeader from '~/components/molecules/ArticleHeader'
export default {
  components: { RelatedPostList, ArticleHeader },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: `description`,
          content: this.$page.post.description,
        },
      ],
    }
  },
}
</script>

<style lang="stylus">
.article--header
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto
.article--title
  background: $font-color-base
  border-radius: 2px 2px 0 0
  color: $white-base
  font-size: $font-size-large
  grid-column: 1
  grid-row: 1
  link-fix: true
  margin-bottom: 0
  margin-top: 0
  padding: rhythmical-space(0.25)
.article--cover
  background: $font-color-base
  grid-column: 1
  grid-row: 2
  margin-bottom: 0
  margin-top: 0
  padding-bottom: rhythmical-space(0.25)
  padding-left: rhythmical-space(0.25)
  padding-right: rhythmical-space(0.25)
.article--date
  align-self: start
  background: $white-base
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 0 2px
  color: $font-color-base
  display: flex
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 2
  justify-self: end
  line-height: 1
  margin-right: rhythmical-space(0.25)
  padding: rhythmical-space(0.125)
.article--time
  margin-left: rhythmical-space(0.125)
.article--tag_list
  background: $pure-white
  border-bottom: 1px solid $font-color-base
  border-left: 1px solid $font-color-base
  border-radius: 0 0 2px 2px
  border-right: 1px solid $font-color-base
  font-size: $font-size-x-small
  grid-column: 1
  grid-row: 3
  list-style-type: none
  margin: 0
  padding: rhythmical-space(0.25)
.article--tag_item
  background: $font-color-base
  border: 1px solid $font-color-base
  border-radius: 2px
  display: inline-block
  line-height: 1
  margin-left: rhythmical-space(0.25)
  padding: 5px 3px
.article--tag
  color: $white-base
  link-fix: true
.article--body
  /*
  ---
  name: Headings
  tag:
    - atom
    - latest
  category:
    - post_body
    - post_body/Headings
  compile: true
  ---
  ```jade
  article
    h1 H1-Big Heading 大見出し(disable to use, just for fallback)
    h2 H2-Big Heading 大見出し
    h3 H3-Medimum Heading 中見出し
    h4 H4-Small Heading 小見出し
    h5 H5-Emphasis Heading 強調見出し
    h6 H6-Minimum Heading 最小見出し
  ```
    */
  $h1h2
    background-color: $bg-color-emphasis
    border-left: rhythmical-space(0.25) solid $black-base
    font-feature-settings: 'palt' 1
    font-size: $font-size-large
    font-weight: bold
    padding-left: rhythmical-space(0.25)
    padding-right: rhythmical-space(0.25)
    rhythmical-margin: 0 0 1 0
    vertical-rhythm: true
    +mq-medium()
      border-left: rhythmical-space(0.5) solid $black-base
      padding-left: rhythmical-space(0.5)
      padding-right: rhythmical-space(0.5)
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
    .header-anchor
      visibility: hidden
    &:hover
      .header-anchor
        visibility: visible
  h1:not([class])
    @extend .article--body $h1h2
  h2:not([class])
    @extend .article--body $h1h2
  h3:not([class])
    border-bottom: 2px solid $black-base
    border-left: rhythmical-space(0.125) solid $black-base
    font-feature-settings: 'palt' 1
    font-size: $font-size-large
    font-weight: bold
    padding-left: rhythmical-space(0.25)
    padding-right: rhythmical-space(0.25)
    rhythmical-margin: 0 0.125 1 0.125
    vertical-rhythm: true
    +mq-medium()
      border-left: rhythmical-space(0.25) solid $black-base
      padding-left: rhythmical-space(0.5)
      padding-right: rhythmical-space(0.5)
      rhythmical-margin: 0 0.25 1 0.25
  h4:not([class])
    border-left: rhythmical-space(0.125) solid $black-base
    font-feature-settings: 'palt' 1
    font-size: $font-size-large
    font-weight: bold
    padding-left: rhythmical-space(0.25)
    padding-right: rhythmical-space(0.25)
    rhythmical-margin: 0 0.125 1 0.125
    vertical-rhythm: true
    +mq-medium()
      border-left: rhythmical-space(0.25) solid $black-base
      padding-left: rhythmical-space(0.5)
      padding-right: rhythmical-space(0.5)
      rhythmical-margin: 0 0.25 1 0.25
  h5:not([class])
    border-left: rhythmical-space(0.125) solid $black-base
    font-feature-settings: 'palt' 1
    font-size: $font-size-base
    font-weight: bold
    padding-left: rhythmical-space(0.25)
    padding-right: rhythmical-space(0.25)
    rhythmical-margin: 0 0.125 1 0.125
    vertical-rhythm: true
    +mq-medium()
      border-left: rhythmical-space(0.25) solid $black-base
      padding-left: rhythmical-space(0.5)
      padding-right: rhythmical-space(0.5)
      rhythmical-margin: 0 0.25 1 0.25
  h6:not([class])
    font-feature-settings: 'palt' 1
    font-size: $font-size-base
    font-weight: bold
    padding-left: rhythmical-space(0.375)
    padding-right: rhythmical-space(0.375)
    rhythmical-margin: 0 0.125 1 0.125
    vertical-rhythm: true
    +mq-medium()
      padding-left: rhythmical-space(0.75)
      padding-right: rhythmical-space(0.75)
      rhythmical-margin: 0 0.25 1 0.25
  /*
  ---
  name: list
  tag:
    - atom
    - latest
  category:
    - post_body
    - post_body/list
  compile: true
  ---
  ```jade
  article
    dl
      dt 定義型リスト 用語
      dd 定義型リスト 定義
    p テストテストテスト
    h3 順序付きリスト(ol)
    ol
      li リストアイテム 1
      li
        | リストアイテム 2
        ol
          li 二重
          li
            | 二重
            ol
              li 三重
      li リストアイテム
    p テウトテストテスト
    h3 並列列挙リスト(ul)
    ul
      li リストアイテム 1
      li リストアイテム 2
      li
        | リストアイテム 2
        ul
          li 二重
          li
            | 二重
            ul
              li 三重
  ```
    */
  ol:not([class]),
  ul:not([class])
    font-feature-settings: 'palt' 1
    padding-left: 0
    rhythmical-margin: 0 0.5 1 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
    li
      rhythmical-margin: 0 0 0 0.75
      & > ol,
      & > ul
        margin-bottom: 0
        margin-left: 0
  ol:not([class])
    list-style-type: decimal
  ul:not([class])
    list-style-type: disc
    ul:not([class])
      list-style-type: circle
      ul:not([class])
        list-style-type: square
  dl:not([class])
    font-feature-settings: 'palt' 1
    rhythmical-margin: 0 0.5 1 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
    dd:not([class])
      rhythmical-margin: 0 0 0 0.75
  /*
  ---
  name: Image
  tag:
    - atom
    - latest
  category:
    - post
    - post_body/image
  compile: true
  ---
  ```jade
  article
    img(src="http://lorempixel.com/400/300/nature/dummy")
  ```
    */
  img:not([class]),
  img.medium-zoom-image
    border: solid 5px $black-base
    border-radius: 3px
    display: block
    max-width: 100%
  /*
  ---
  name: Quote
  tag:
    - atom
    - latest
  category:
    - post
    - post_body/blockquote
  compile: true
  ---
  ```jade
  article
    blockquote
  ```
    */
  blockquote:not([class])
    background: $bg-color-light
    border-left: rhythmical-space(0.25) solid $bg-color-emphasis
    // color: $secondary-text
    rhythmical-margin: 0 0.5 1 0.5
    rhythmical-padding: 0.5 0.5 0.5 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
    p
      margin-left: 0
      margin-right: 0
    p:first-of-type
      margin-top: 0
    p:last-of-type
      margin-bottom: 0
  // ------------------------------------------------------------
  // TOC
  // ------------------------------------------------------------
  h2#toc,
  h2#table-of-contents
    display: none
    & + ul:before
      content: '目次'
      display: block
      font-weight: bold
    & + ul
      background: $bg-color-light
      border: 1px solid $font-color-base
      border-radius: 2px
      rhythmical-margin: 0 0.5 1 0.5
      rhythmical-padding: 0.5 0.5 0.5 0.5
      vertical-rhythm: true
      +mq-medium()
        rhythmical-margin: 0 1 1 1
      li
        font-size: $font-size-small
      p
        margin: 0
        padding: 0
  // ------------------------------------------------------------
  // exblock
  // ------------------------------------------------------------
  .exblock
    background: $pure-white
    border: 1px solid $bg-color-emphasis
    border-radius: 5px
    rhythmical-margin: 0 0.5 1 0.5
    rhythmical-padding: 0.5 0.5 0.5 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
  // ------------------------------------------------------------
  // series(like a specific series box)
  // ------------------------------------------------------------
  .series
    background: $pure-white
    border: 1px solid $bg-color-emphasis
    border-radius: 5px
    // rhythmical-padding: 0.5 0.5 0.5 0.5
    rhythmical-margin: 0 0.5 1 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
  .seriesTitle
    background-color: $bg-color-emphasis
    border-bottom: 1px solid $bg-color-emphasis
    font-weight: bold
    rhythmical-padding: 0.125 0.5 0.125 0.5
  .seriesList
    margin: 0
  .seriesItem
    border-bottom: 1px solid $bg-color-emphasis
    margin: 0
    rhythmical-padding: 0.05 1 0 1
    &:last-of-type
      border-bottom: none
      rhythmical-padding: 0.05 1 0.05 1
    a
      display: block
    a:hover
      background: $bg-color-emphasis
      border-bottom: none
  /*
  ---
  name: Paragraph
  tag:
    - atom
    - latest
  category:
    - post
    - post_body/Paragraph
  compile: true
  ---
  ```jade
  article
    p
      | これはテストです
      em これは強勢(em)のテストです
      string これは強調(strong)のテストです
      code ここはコードです
  ```
    */
  p:not([class])
    rhythmical-margin: 0 0.5 1 0.5
    text-align: justify
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
  em:not([class])
    border-bottom: 1px dotted @color
  strong:not([class])
    font-weight: bold
    line-marker: true
  code:not([class])
    font-family: $font-family-monospace
  /*
  ---
  name: Table
  tag:
  - atom
  - latest
  category:
  - post_body
  - post_body/table
  compile: true
  ---
  */
  table:not([class])
    border-collapse: collapse
    border-spacing: 0
    display: block
    font-feature-settings: 'palt' 1
    overflow: auto
    rhythmical-margin: 0 0.5 1 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
    th:not([class])
      background: tint($bg-color-emphasis, 20%)
      font-weight: bold
      padding: 5px 10px
      &:first-child
        border-radius: 5px 0 0 0
      &:last-child
        border-radius: 0 5px 0 0
    td:not([class])
      padding: 5px 10px
    tr:not([class])
      background: tint($bg-color-emphasis, 60%)
      border-bottom: 1px solid shade($bg-color-emphasis, 5%)
      &:last-child
        border-bottom: none
      &:nth-child(odd)
        background: tint($bg-color-emphasis, 75%)
  // ------------------------------------------------------------
  // Blocks
  // ------------------------------------------------------------
  figure.highlight
    font-family: $font-family-monospace
    figcaption
      background: $grey-tint
      border: 1px solid $black-base
      border-bottom: none
      border-top-left-radius: 3px
      border-top-right-radius: 3px
      padding-left: rhythmical-space(0.25)
      padding-right: rhythmical-space(0.25)
      rhythmical-margin: 0 0.25 0 0.25
      +mq-medium()
        padding-left: rhythmical-space(0.5)
        padding-right: rhythmical-space(0.5)
        rhythmical-margin: 0 0.5 0 0.5
    table
      background: $black-base
      rhythmical-margin: 0 0.25 1 0.25
      vertical-rhythm: true
      +mq-medium()
        rhythmical-margin: 0 0.5 1 0.5
      border-bottom-left-radius: 3px
      border-bottom-right-radius: 3px
      &:first-child
        border-top-left-radius: 3px
        border-top-right-radius: 3px
    tr:not([class])
      background: none
      border-bottom: none
      &:last-child
        border-bottom: none
      &:nth-child(odd)
        background: none
    pre
      background: $black-base
      border-radius: 0
      line-height: 1.5
      margin: 0
      min-width: 100%
    .line
      color: $mdc-grey.b200
    .gutter
      padding: 0 10px 0 5px
    .gutter .line
      opacity: 0.3
    .comment,
    .quote
      color: $mdc-blue-grey.b600
      font-style: italic
    .doctag,
    .keyword,
    .formula
      color: $mdc-purple.b200
    .section,
    .name,
    .selector-tag,
    .deletion,
    .subst
      color: $mdc-red.b200
    .literal
      color: $mdc-blue.b200
    .string,
    .regexp,
    .addition,
    .attribute,
    .meta-string
      color: $mdc-green.b200
    .built_in,
    .class .title
      color: $mdc-orange.b200
    .attr,
    .variable,
    .template-variable,
    .type,
    .selector-class,
    .selector-attr,
    .selector-pseudo,
    .number
      color: $mdc-deep-orange.b200
    .symbol,
    .bullet,
    .link,
    .meta,
    .selector-id,
    .title
      color: $mdc-light-blue.b200
    .emphasis
      font-style: italic
    .strong
      font-weight: bold
    .link
      text-decoration: underline
  /*
  ---
  name: Blocks
  tag:
  - atom
  - latest
  category:
  - post_body
  - post_body/blocks
  compile: true
  ---
  */
  pre[class*="language-"]
    max-width: 900px
    overflow-x: scroll
  code:not([class]),
  var:not([class]),
  samp:not([class]),
  dfn:not([class])
    background: $black-base
    border-radius: 3px
    color: $white-base
    font-family: $font-family-monospace
    font-size: $font-size-small
    rhythmical-margin: 0 0.125 0 0.125
    rhythmical-padding: 0.0625 0.25 0.0625 0.25
  kbd:not([class])
    background-color: $pure-white
    border: solid 1px $grey-base
    border-bottom-color: $grey-base
    border-radius: 3px
    box-shadow: inset 0 -1px 0 $grey-base
    color: $pure-black
    display: inline-block
    font-size: $font-size-small
    line-height: 10px
    margin: auto 5px 2px
    padding: 3px 5px
    vertical-align: middle
  abbr
    position: relative
    &::after
      background: $primary-color-shade
      border-radius: 4px
      bottom: 100%
      color: $white-base
      content: attr(title)
      display: inline-block
      font-size: $font-size-small
      left: 50%
      line-height: 1.25
      min-width: 200px
      opacity: 0
      padding: 0.6em 0.8em
      position: absolute
      text-align: left
      transform: translateX(-50%)
      transition: 0.2s
      visibility: hidden
      z-index: 2
    &:hover::after
      bottom: 120%
      opacity: 1
      visibility: visible
  .footnotes-sep
    background: #999
    border: none
    border-bottom: 1px dashed #ccc
    rhythmical-margin: 0 0.5 0 0.5
  .footnotes
    rhythmical-margin: 0.5 1 0 1.5
  .footnote-item
    p
      margin: 0
      padding: 0
  .linkbox
    background: $pure-white
    border: 1px solid $bg-color-emphasis
    border-radius: 5px
    border-right: rhythmical-space(0.25) solid $bg-color-emphasis
    display: flex
    font-feature-settings: 'palt' 1
    rhythmical-margin: 0 0.5 1 0.5
    rhythmical-padding: 0.5 0.5 0.5 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
  .linkbox_image
    width: 23%
  .linkbox_info
    rhythmical-padding: 0 0 0 0.5
    width: 77%
  .linkbox_title
    font-weight: bold
  .linkbox_description
    font-size: 0.8em
    font-weight: normal
    line-height: 1
    text-align: right
  .linkbox_shoplinks
    display: flex
    flex-wrap: wrap
  .linkbox_shopBtn
    link-variation: $black-base true
    rhythmical-padding: 0.25 0.25 0 0
  .shopBtn_link
    border-radius: 7px
    font-weight: bold
    rhythmical-padding: 0.25 0.25 0.25 0.25
    &.is-amazon
      &:visited,
      &:active
        background: tint($ssc.Amazon, $amount-base-greater)
        border: 2px solid $ssc.Amazon
      &:hover
        background: $ssc.Amazon
        border: 2px solid $ssc.Amazon
        color: $white-base
      &:before
        content: url('https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/amazon.svg') // cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/amazon.svg)
    &.is-rakuten
      :visited,
      :active
        background: tint($sc.Rakuten, $amount-base-greater)
        border: 2px solid $sc.Rakuten
      &:hover
        background: $sc.Rakuten
        border: 2px solid $sc.Rakuten
        color: $white-base
      &:before
        background: $black-base
        border-radius: 50%
        color: $white-base
        content: 'R'
  .kaerebalink-box
    background: $pure-white
    border: 1px solid $bg-color-emphasis
    border-radius: 5px
    border-right: rhythmical-space(0.25) solid $bg-color-emphasis
    display: flex
    rhythmical-margin: 0 0.5 1 0.5
    rhythmical-padding: 0.5 0.5 0.5 0.5
    vertical-rhythm: true
    +mq-medium()
      rhythmical-margin: 0 1 1 1
  .kaerebalink-image
    width: 23%
  .kaerebalink-info
    rhythmical-padding: 0 0 0 0.5
    width: 77%
    .kaerebalink-name
      font-weight: bold
      .kaerebalink-powered-date
        font-size: 0.8em
        font-weight: normal
        line-height: 1
        text-align: right
    .kaerebalink-detail
      font-size: 0.8em
      font-weight: normal
      line-height: 1
      text-align: right
    .kaerebalink-link1
      display: flex
      flex-wrap: wrap
      .shoplinkamazon
        link-variation: $black-base true
        rhythmical-padding: 0.25 0.25 0 0
        a,
        a:visited,
        a:active
          background: tint($ssc.Amazon, $amount-base-greater)
          border: 2px solid $ssc.Amazon
          border-radius: 7px
          font-weight: bold
          rhythmical-padding: 0.25 0.25 0.25 0.25
        a:hover
          background: $ssc.Amazon
          border: 2px solid $ssc.Amazon
          color: $white-base
      .shoplinkrakuten
        link-variation: $black-base true
        rhythmical-padding: 0.25 0 0 0
        a,
        a:visited,
        a:active
          background: tint($sc.Rakuten, $amount-base-greater)
          border: 2px solid $sc.Rakuten
          border-radius: 7px
          font-weight: bold
          rhythmical-padding: 0.25 0.25 0.25 0.25
        a:hover
          background: $sc.Rakuten
          border: 2px solid $sc.Rakuten
          color: $white-base
</style>
