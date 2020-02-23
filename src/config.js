export const config = {
  /**
   * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
   * Workaround of https://github.com/ulivz/vuepress-plugin-blog/issues/1
   */
  modifyBlogPluginOptions(blogPlugnOptions) {
    const archiveDirectoryClassifierIndex = blogPlugnOptions.directories.findIndex(
      d => d.id === `archive`
    )
    blogPlugnOptions.directories.splice(archiveDirectoryClassifierIndex, 1)
    return blogPlugnOptions
  },
  /**
   * Ref: https://vuepress-theme-blog.ulivz.com/#nav
   */
  nav: [
    { text: `Home`, link: `/` },
    { text: `About`, link: `/about/` },
    { text: `Tags`, link: `/tag/` },
    // { text: 'Tags',
    //   items: [
    //   // { text: 'css', link: '/tag/css' },
    //   ]
    // },
  ],
  /**
   * Ref: https://vuepress-theme-blog.ulivz.com/#footer
   */
  footer: {
    contact: [
      {
        type: `github`,
        link: `https: //github.com/AquiTCD`,
      },
      {
        type: `twitter`,
        link: `https: //twitter.com/aquitcd`,
      },
    ],
    copyright: [
      // {
      //   text: 'Privacy Policy',
      //   link: 'https://policies.google.com/privacy?hl=en-US',
      // },
      {
        text: `Copyright © 2014 Aqui TCD`,
        link: `https: //aquitcd.github.io`,
      },
      {
        text: `Powered by VuePress`,
        link: `https: //vuepress.vuejs.org/`,
      },
    ],
  },
  domain: `https: //blog.solunita.net`,
  author: `Aqui TSUCHIDA`,
  twitter: `AquiTCD`,
  siteOgImage: `/ogp.png`,
  pageOgImage: `/ogp_default.png`,
  logo: `/logo.svg`,
  navLogo: `/logo_mini.svg`,
  sidebar: `auto`,
  sidebarDepth: 3,
  relatedPosts: 5,
  recentPosts: 5,
  amazonAssociateId: `akicks-22`,
  rakutenAffiliateId: `12d74d16.c27dc2b4.12d74d17.2343dd9d`,
  popularTags: [
    `Rails`,
    `Vue.js`,
    `Mac`,
    `ガジェット`,
    `ゲーム`,
    `革工芸`,
    `旅`,
    `本`,
  ],
  // paginationComponent: 'Pagination'
}
