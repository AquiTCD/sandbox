<template lang="pug">
.the_site_author
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
  display: flex
  justify-content: center
  padding: rhythmical-space(0.25) 0
.content
  align-content: start
  display: grid
  grid-template-columns: auto
  grid-template-rows: auto auto auto
  justify-content: center
  margin: 0
  padding: 0 rhythmical-space(0.25)
  white-space: pre-wrap
  width: 100%
  +mq-larger()
    border-left: $narrow-border-width solid $font-color-base
.byline
  border-bottom: 1px solid $font-color-base
  grid-column: 1
  grid-row: 1
  margin: 0
  font-weight: bold
  text-align: center
  text-transform: uppercase
.author
  grid-column: 1
  grid-row: 2
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto
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
  grid-column: 1
  grid-row: 3
  line-height: 1.2
  margin: 0
  padding: 0
  text-align: center
  white-space: pre-wrap
</style>
