const remark = require(`remark`)
const strip = require(`strip-markdown`)

exports.generate = generate
const MAX_LENGTH = 140
function generate(content) {
  if (!content) {
    return ``
  }
  const matched = content.match(/(.*?)(\n\n#|\n\n---)/s)
  let excerpt
  if (matched) {
    excerpt = content.match(/(.*?)(\n\n#|\n\n---)/s)[1]
  } else {
    excerpt = content
  }
  let striped
  remark()
    .use(strip)
    .process(excerpt, (err, file) => {
      if (err) throw err
      striped = file.contents
    })
  if (striped.length > MAX_LENGTH) {
    return striped.substring(0, MAX_LENGTH) + `...`
  } else {
    return striped
  }
}
