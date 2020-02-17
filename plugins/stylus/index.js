const path = require(`path`)

function addStyleResource(api) {
  const types = [`vue-modules`, `vue`, `normal-modules`, `normal`]
  types.forEach(type => {
    api.chainWebpack(config => {
      config.module
        .rule(`stylus`)
        // .test(/\.vue$/) // typeと同じやりかたできる？
        .oneOf(type)
        .use([`style-resource`])
        .loader(`style-resources-loader`)
        .options({
          patterns: [
            path.resolve(
              __dirname,
              `./src/assets/styles/_basis/_variables.styl`
            ),
            path.resolve(__dirname, `./src/assets/styles/_basis/_mixins.styl`),
          ],
        })
    })
  })
}
module.exports = addStyleResource

// const { resolve } = require(`path`)
// const lint = require(`../../.pug-lintrc`)

// function PugLinterPlugin(api) {
//   api.chainWebpack(config => {
//     config.module
//       .rule(`pug-lint`)
//       .test(/\.vue$/)
//       .pre()
//       .use()
//       .loader(`vue-pug-lint-loader`)
//       .options({
//         emitter: true,
//         ...lint,
//       })
//   })
// }
