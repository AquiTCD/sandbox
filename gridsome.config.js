// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: `Gridsome`,
  transformers: {
    remark: {
      externalLinksTarget: `_blank`,
      externalLinksRel: [`nofollow`, `noopener`, `noreferrer`],
      anchorClassName: `icon icon-link`,
      plugins: [
        // ...global plugins
      ],
    },
  },
  plugins: [
    {
      use: `gridsome-plugin-typescript`,
    },
    { use: `~/plugins/eslint` },
    { use: `~/plugins/puglint` },
    { use: `gridsome-plugin-pug` },
    {
      use: `@gridsome/source-filesystem`,
      options: {
        path: `blog/contents/posts/*.md`,
        typeName: `Post`,
        route: `/:slug`,
        remark: {
          plugins: [
            // ...local plugins
          ],
        },
      },
    },
  ],
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
