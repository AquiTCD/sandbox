const fs = require(`fs`)
const path = require(`path`)
const ASSET_DIR = path.join(`src`, `assets`, `images`)
const FALLBACK = `ogp_default.png`
const COVER_IMAGE = `cover.jpg`
const POST_DIR = `posts`
exports.generate = generate
function generate(node) {
  if (node.cover) {
    return node.cover
  } else if (
    fs.existsSync(
      path.join(ASSET_DIR, POST_DIR, node.fileInfo.name, COVER_IMAGE)
    )
  ) {
    return path.join(POST_DIR, node.fileInfo.name, COVER_IMAGE)
  } else {
    return FALLBACK
  }
}
