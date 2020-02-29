// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const relatedPost = require(`./related-post.js`)
const autoDescription = require(`./auto-description.js`)
const autoCover = require(`./auto-cover.js`)
const Prism = require(`prismjs`)

// highlight page-query and static-query in html
Prism.languages.html.graphql = {
  pattern: /(<(page|static)-query[\s\S]*?>)[\s\S]*?(?=<\/(page|static)-query>)/i,
  inside: Prism.languages.graphql,
  lookbehind: true,
  greedy: true,
}
module.exports = function(api) {
  api.loadSource(({ getCollection, addSchemaResolvers }) => {
    const allPosts = getCollection(`Post`)
    allPosts.addReference(`relatedPosts`, `[Post]`)
    // allPosts.addReference(`newerPost`, `Post`)
    // allPosts.addReference(`olderPost`, `Post`)
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
        description: {
          type: `String`,
          resolve(node) {
            if (node.description) {
              return node.description
            } else {
              return autoDescription.generate(node.content)
            }
          },
        },
        cover: {
          type: `String`,
          resolve(node) {
            return autoCover.generate(node)
          },
        },
      },
    })
  })
}
