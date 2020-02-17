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
  siteName: `Trial and Spiral`,
  siteDescription: `試行錯誤顛末記録。或いは日記的な何か。\nWeb技術寄りな雑記Blog`,
  siteUrl:
    process.env.NODE_ENV === `production`
      ? `https://blog.solunita.net/`
      : `http://localhost:8080/`,
  transformers: {},
  metadata: {
    logo: `logo.svg`,
    navLogo: `logo_mini.svg`,
    authorLogo: `aqui.svg`,
    authorName: `AquiTCD`,
    authorDescription: `アキです。\n以前、世界をフラフラしてました。\nWebエンジニア。主戦場はRailsとVue.js。`,
    feedPath: `feed.xml`,
  },
  templates: {
    Tag: [
      {
        path: `/tags/:id`,
        component: `./src/templates/Tag.vue`,
      },
    ],
  },
  plugins: [
    { use: `gridsome-plugin-typescript` },
    { use: `gridsome-plugin-pug` },
    // { use: `~/plugins/eslint` }, // does not work properly
    // { use: `~/plugins/puglint` },
    // { use: `~/plugin/stylus` },
    {
      use: `@gridsome/vue-remark`,
      options: {
        typeName: `Post`,
        baseDir: `./contents/posts`,
        pathPrefix: `/posts`,
        // route: `/posts/:slug`,
        template: `./src/templates/Post.vue`,
        refs: {
          tags: {
            typeName: `Tag`,
            create: true,
          },
        },
        remark: {
          externalLinksTarget: `_blank`,
          externalLinksRel: [`nofollow`, `noopener`, `noreferrer`],
          anchorClassName: `icon icon-link`,
          plugins: [],
        },
        plugins: [
          `remark-toc`,
          `remark-slug`,
          `remark-breaks`,
          `@gridsome/remark-prismjs`,
        ],
      },
    },
  ],
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = [`vue-modules`, `vue`, `normal-modules`, `normal`]
    types.forEach(type => {
      addStyleResource(config.module.rule(`stylus`).oneOf(type))
    })
    config.resolve.alias.set(`@images`, `@/assets/images`)
  },
  css: {
    loaderOptions: {
      stylus: { preferPathResolver: `webpack` },
      postcss: {
        sourceMap: false,
        plugins: [
          require(`autoprefixer`)({
            // grid: `autoplace`, // to avoid warnings
            flexbox: `no-2009`,
          }),
          require(`css-mqpacker`)(),
        ],
      },
    },
  },
}
