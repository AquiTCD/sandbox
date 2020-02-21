// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import VueCompositionApi from '@vue/composition-api'
import DefaultLayout from '~/layouts/Default.vue'
import 'cssremedy/css/remedy.css' // css reset
import 'prismjs/themes/prism-okaidia.css' // prism for syntax highlight

export default function(
  Vue: Vue.VueConstructor,
  {
    // router,
    head,
  }: // isClient
  any
) {
  head.link.push({ rel: `icon`, type: `image/png`, href: `/favicon.ico` })
  head.meta.push({ 'http-equiv': `X-UA-Compatible`, content: `IE=edge` })
  head.meta.push({
    name: `google-site-verification`,
    content: `JuGe3ADFt8Gx4WMPpxveUrdsqNxw7FsmpNEnWEKqgjo`,
  })
  head.meta.push({
    name: `viewport`,
    content: `width=device-width,initial-scale=1.0,minimum-scale=1.0`,
  })
  head.meta.push({
    name: `format-detection`,
    content: `telephone=no,address=no,email=no`,
  })
  head.meta.push({ name: `apple-mobile-web-app-capable`, content: `yes` })
  head.meta.push({
    key: `og:url`,
    name: `og:url`,
    // content: process.env.GRIDSOME_BASE_PATH + to.path,
  })
  head.meta.push({ property: `og:locale`, content: `ja_JP` })
  head.script.push({
    src: `https://kit.fontawesome.com/2c0574300d.js`,
    crossorigin: `anonymous`,
  })
  // Set to use libraries
  Vue.use(VueCompositionApi)
  // Set default layout as a global component
  Vue.component(`Layout`, DefaultLayout)
}
