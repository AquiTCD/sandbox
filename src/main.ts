// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import VueCompositionApi from '@vue/composition-api'
import DefaultLayout from '~/layouts/Default.vue'
import 'cssremedy/css/remedy.css' // css reset
import 'prismjs/themes/prism-okaidia.css' // prism for syntax highlight
// import '~/assets/styles/globals.styl'

export default function(
  Vue: Vue.VueConstructor,
  {
    // router,
    head,
  }: // isClient
  any
) {
  head.script.push({
    src: `https://kit.fontawesome.com/2c0574300d.js`,
    crossorigin: `anonymous`,
  })
  // Set default layout as a global component
  Vue.component(`Layout`, DefaultLayout)
  Vue.use(VueCompositionApi)
}
