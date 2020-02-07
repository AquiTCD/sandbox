// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require(`path`)

function addStyleResource(rule) {
  rule
    .use([`style-resource`])
    .loader(`style-resources-loader`)
    .options({
      patterns: [
        path.resolve(__dirname, `./src/assets/styles/_basis/_variables.styl`),
        path.resolve(__dirname, `./src/assets/styles/_basis/_mixins.styl`),
      ],
    })
}

module.exports = {
  siteName: `BlogPre`,
  transformers: {},
  metadata: {
    logo: `~/assets/images/logo.svg`,
    navLogo: `~/assets/images/logo_mini.svg`,
  },
  plugins: [
    {
      use: `gridsome-plugin-typescript`,
    },
    { use: `~/plugins/eslint` },
    { use: `~/plugins/puglint` },
    { use: `gridsome-plugin-pug` },
    {
      use: `@gridsome/vue-remark`,
      options: {
        typeName: `Tag`,
        baseDir: `./content/tags`,
        pathPrefix: `/tags`,
        template: `./src/templates/Tag.vue`,
      },
    },
    {
      use: `@gridsome/vue-remark`,
      options: {
        typeName: `Post`,
        baseDir: `./contents/posts`,
        // pathPrefix: `/`,
        route: `/pages/:slug`,
        template: `./src/templates/Post.vue`,
        refs: {
          tags: `Tag`,
        },
        remark: {
          externalLinksTarget: `_blank`,
          externalLinksRel: [`nofollow`, `noopener`, `noreferrer`],
          anchorClassName: `icon icon-link`,
          plugins: [
            // ...global plugins
          ],
        },
        plugins: [`@gridsome/remark-prismjs`],
      },
    },
  ],
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = [`vue-modules`, `vue`, `normal-modules`, `normal`]

    types.forEach(type => {
      addStyleResource(config.module.rule(`stylus`).oneOf(type))
    })
  },
  css: {
    loaderOptions: {
      stylus: { preferPathResolver: `webpack` },
      postcss: {
        sourceMap: false,
        plugins: [
          require(`autoprefixer`)({ grid: `autoplace`, flexbox: `no-2009` }),
          require(`css-mqpacker`)(),
        ],
      },
    },
  },
}
