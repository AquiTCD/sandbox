// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
// const relatedPost = require(`./related-post`) // eslint-disable-line @typescript-eslint/no-var-requires
const relatedPost = require(`./related-post.js`)

module.exports = function(api) {
  // api.loadSource(({ addCollection }) => {
  //   // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  // })
  api.loadSource(({ getCollection, addSchemaTypes, addSchemaResolvers }) => {
    const allPosts = getCollection(`Post`)
    allPosts.addReference(`relatedPosts`, `[Post]`)
    // allPosts.addReference(`description`, String)
    addSchemaResolvers({
      Post: {
        relatedPosts(obj) {
          return relatedPost
            .extractRelatedPosts(
              allPosts.data(),
              obj,
              relatedPost.defaultConfig
            )
            .slice(0, 5)
        },
        // description(obj) {
        //   return obj.content.slice(0, 20)
        // },
      },
    })
  })
}
