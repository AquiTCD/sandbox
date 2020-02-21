// const relatedPost = require(`./related-post.js`)

// function RelatedPostsPlugin(api) {
//   api.loadSource(({ getCollection, addSchemaResolvers }) => {
//     const allPosts = getCollection(`Post`)
//     allPosts.addReference(`relatedPosts`, `[Post]`)
//     addSchemaResolvers({
//       Post: {
//         relatedPosts(obj) {
//           return relatedPost
//             .extractRelatedPosts(
//               allPosts.data(),
//               obj,
//               relatedPost.defaultConfig
//             )
//             .slice(0, 5)
//         },
//       },
//     })
//   })
// }

// module.exports = RelatedPostsPlugin
