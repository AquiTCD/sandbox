// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
import 'cssremedy/css/remedy.css' // css reset
import 'prismjs/themes/prism-okaidia.css' // prism for syntax highlight
// import '~/assets/styles/globals.styl'

export default function(Vue, { head }) {
  // head.link.push({
  //   rel: `stylesheet`,
  //   href: `https://use.fontawesome.com/releases/v5.12.1/css/all.css`,
  //   integrity: `sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay`,
  //   crossorigin: `anonymous`,
  // })
  head.script.push({
    src: `https://kit.fontawesome.com/2c0574300d.js`,
    crossorigin: `anonymous`,
  })
  // export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component(`Layout`, DefaultLayout)
}
