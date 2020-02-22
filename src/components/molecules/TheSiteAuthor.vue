<template lang="pug">
.the_site_author
  .title
    span.title--strong 書
    span いてる人
  .content
    span.byline written by
    a.author(href="https://aquitcd.github.io")
      g-image.author_logo(
        :src="require(`!!assets-loader!@images/${$static.metadata.authorLogo}`)"
        :alt="$static.metadata.siteName"
        width="128"
      )
      span.author_name {{ $static.metadata.authorName }}
    p.author_description {{ $static.metadata.authorDescription }}
</template>
<static-query>
query {
  metadata {
    siteDescription
    authorLogo
    authorName
    authorDescription
  }
}
</static-query>
<script lang="ts"></script>

<style lang="stylus" scoped>
.the_site_author
  padding: rhythmical-space(0.25) 0
.title
  border-bottom: 4px solid $font-color-base
  border-top: 4px solid $font-color-base
  margin-bottom: rhythmical-space(0.125)
  margin-top: 0
  padding-bottom: rhythmical-space(0.125)
  padding-left: rhythmical-space(0.25)
  padding-top: rhythmical-space(0.25)
  display: block
  +mq-larger()
    display: none
.title--strong
  font-size: $font-size-large
  font-weight: bold
.content
  align-content: start
  display: grid
  justify-content: center
  margin: 0
  padding: 0 rhythmical-space(0.25)
  white-space: pre-wrap
  width: 100%
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  +mq-larger()
    border-left: $narrow-border-width solid $font-color-base
    grid-template-columns: auto
    grid-template-rows: auto auto auto
.byline
  border-bottom: 1px solid $font-color-base
  margin: 0
  font-weight: bold
  text-align: center
  text-transform: uppercase
  grid-column: 1 / 3
  grid-row: 1
  display: none
  +mq-larger()
    display: initial
    grid-column: 1
    grid-row: 1
.author
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto
  grid-column: 1
  grid-row: 2
  +mq-larger()
    grid-column: 1
    grid-row: 2
.author_logo
  grid-column: 1
  grid-row: 1
  justify-self: right
  padding: rhythmical-space(0.25) 0
  width: 64px
.author_name
  align-self: center
  font-size: $font-size-small
  font-weight: bold
  grid-column: 2
  grid-row: 1
.author_description
  font-size: $font-size-x-small
  line-height: 1.2
  margin: 0
  padding: 0
  white-space: pre-wrap
  grid-column: 2
  grid-row: 2
  align-self: center
  padding-left: rhythmical-space(0.25)
  +mq-medium()
    font-size: $font-size-small
  +mq-larger()
    font-size: $font-size-x-small
    grid-column: 1
    grid-row: 3
    align-self: start
    text-align: center
</style>
