const { resolve } = require(`path`)
const lint = require(`../../.pug-lintrc`)

function PugLinterPlugin(api) {
  api.chainWebpack(config => {
    config.module
      .rule(`pug-lint`)
      .test(/\.vue$/)
      .pre()
      .use()
      .loader(`vue-pug-lint-loader`)
      .options({
        emitter: true,
        ...lint,
      })
  })
}

module.exports = PugLinterPlugin
