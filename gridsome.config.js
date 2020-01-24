// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: `Gridsome`,
  plugins: [
    {
      use: `gridsome-plugin-typescript`,
    },
    { use: `~/plugins/eslint` },
    { use: `~/plugins/puglint` },
    { use: `gridsome-plugin-pug` },
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
