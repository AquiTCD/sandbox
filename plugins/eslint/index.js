const { resolve } = require(`path`)

function EsLinterPlugin(api) {
  api.chainWebpack(config => {
    config.module
      .rule(`es-lint`)
      .test(/\.([tj]s|vue)$/)
      .pre()
      .use()
      .loader(`eslint-loader`)
      .options({ failOnError: true })
  })
}

module.exports = EsLinterPlugin
