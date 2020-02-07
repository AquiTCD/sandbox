<script>
import { isActive, hashRE, groupHeaders } from '~/components/util'

export default {
  functional: true,

  props: [`item`, `sidebarDepth`],

  render(
    h,
    {
      parent: {
        $page,
        // $site,
        $route,
        $themeConfig,
        $themeLocaleConfig,
      },
      props: { item, sidebarDepth },
    }
  ) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active =
      item.type === `auto`
        ? selfActive ||
          item.children.some(c =>
            isActive($route, item.basePath + `#` + c.slug)
          )
        : selfActive
    const link =
      item.type === `external`
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active)

    const configDepth =
      $page.frontmatter.sidebarDepth ||
      sidebarDepth ||
      $themeLocaleConfig.sidebarDepth ||
      $themeConfig.sidebarDepth

    const maxDepth = configDepth == null ? 1 : configDepth

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders

    if (item.type === `auto`) {
      return [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth),
      ]
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers)
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    } else {
      return link
    }
  },
}

function renderLink(h, to, text, active) {
  return h(
    `router-link`,
    {
      props: {
        to,
        activeClass: ``,
        exactActiveClass: ``,
      },
      class: {
        active,
        'sidebar-link': true,
      },
    },
    text
  )
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h(
    `ul`,
    { class: `sidebar-sub-headers` },
    children.map(c => {
      const active = isActive(route, path + `#` + c.slug)
      return h(`li`, { class: `sidebar-sub-header` }, [
        renderLink(h, path + `#` + c.slug, c.title, active),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1),
      ])
    })
  )
}

function renderExternal(h, to, text) {
  return h(
    `a`,
    {
      attrs: {
        href: to,
        target: `_blank`,
        rel: `noopener noreferrer`,
      },
      class: {
        'sidebar-link': true,
      },
    },
    [text, h(`OutboundLink`)]
  )
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers
  font-size: 0.95em
  padding-left: 1rem
a.sidebar-link
  border-left: 0.25rem solid transparent
  box-sizing: border-box
  color: $textColor
  display: inline-block
  font-size: 1em
  font-weight: 400
  line-height: 1.4
  padding: 0.35rem 1rem 0.35rem 1.25rem
  width: 100%
  &:hover
    color: $accentColor
  &.active
    border-left-color: $accentColor
    color: $accentColor
    font-weight: 600
  .sidebar-group &
    padding-left: 2rem
  .sidebar-sub-headers &
    border-left: none
    padding-bottom: 0.25rem
    padding-top: 0.25rem
    &.active
      font-weight: 500
</style>
