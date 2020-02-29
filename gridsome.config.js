// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require(`path`)
const remark = require(`remark`)
const html = require(`remark-html`)
function markdownToHtml(text) {
  let result
  remark()
    .use(html)
    .process(text, (err, file) => {
      if (err) throw err
      result = file.contents
    })
  return result
}
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
  titleTemplate: `%s | Trial and Spiral`,
  siteDescription: `試行錯誤顛末記録。或いは日記的な何か。\nWeb技術寄りな雑記Blog`,
  siteUrl:
    process.env.NODE_ENV === `production`
      ? `https://blog.solunita.net`
      : `http://localhost:8080`,
  transformers: {},
  metadata: {
    author: `Aqui TSUCHIDA`,
    twitter: `AquiTCD`,
    siteOgImage: `ogp.png`,
    pageOgImage: `ogp_default.png`,
    siteLogo: `logo.svg`,
    navLogo: `logo_mini.svg`,
    authorLogo: `aqui.svg`,
    authorName: `AquiTCD`,
    authorDescription: `アキです。\n以前、世界をフラフラしてました。\nWebエンジニア。主戦場はRailsとVue.js。`,
    amazonAssociateId: `akicks-22`,
    rakutenAffiliateId: `12d74d16.c27dc2b4.12d74d17.2343dd9d`,
    feedPath: `feed.xml`,
    popularTags: [
      `Vue.js`,
      `Ruby`,
      `Mac`,
      `ガジェット`,
      `ゲーム`,
      `革工芸`,
      `旅`,
      `本`,
    ],
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
    {
      use: `@gridsome/plugin-google-analytics`,
      options: {
        id: `UA-26650812-1`,
      },
    },
    {
      use: `gridsome-plugin-feed`,
      options: {
        contentTypes: [`Post`],
        feedOptions: {
          title: `Trial and Spiral`,
          description: `試行錯誤顛末記録。或いは日記的な何か。\nWeb技術寄りな雑記Blog`,
        },
        rss: {
          enabled: true,
          output: `/feed.xml`,
        },
        htmlFields: [`content`],
        // maxItems: 25,
        // filterNodes: node => true,
        nodeToFeedItem: node => ({
          title: node.title,
          date: node.date || node.fields.date,
          content:
            process.env.NODE_ENV === `production`
              ? markdownToHtml(node.content)
              : node.content,
        }),
      },
    },
    {
      use: `@gridsome/plugin-sitemap`,
      options: {
        cacheTime: 600000, // default
        exclude: [``],
        config: {
          '/posts/*': {
            changefreq: `weekly`,
            priority: 0.5,
          },
          '/tags/*': {
            changefreq: `weekly`,
            priority: 0.5,
          },
          '/about': {
            changefreq: `monthly`,
            priority: 0.7,
          },
        },
      },
    },
    // { use: `~/plugins/related-posts` },
    // { use: `~/plugins/eslint` }, // does not work properly
    // { use: `~/plugins/puglint` },
    // { use: `~/plugin/stylus` },
    {
      use: `@gridsome/vue-remark`,
      options: {
        typeName: `Post`,
        baseDir:
          process.env.NODE_ENV === `production` || process.env.NODE_PREVIEW
            ? `./contents/posts`
            : `./contents/drafts`,
        route: `/posts/:slug`,
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
          autolinkHeadings: {
            behavior: `append`,
            content: {
              type: `element`,
              tagName: `i`,
              properties: { className: [`heading-anchor`, `fas`, `fa-link`] },
            },
          },
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
    {
      use: `@gridsome/vue-remark`,
      options: {
        typeName: `Specific`,
        baseDir: `./contents/specifics`,
        route: `/:slug`,
        template: `./src/templates/Specific.vue`,
        remark: {
          externalLinksTarget: `_blank`,
          externalLinksRel: [`nofollow`, `noopener`, `noreferrer`],
          anchorClassName: `icon icon-link`,
          autolinkHeadings: {
            behavior: `append`,
            content: {
              type: `element`,
              tagName: `i`,
              properties: { className: [`heading-anchor`, `fas`, `fa-link`] },
            },
          },
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
