import * as fs from 'fs'
import * as path from 'path'
// import { add } from 'date-fns'
// import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz'
import * as matter from 'gray-matter'

module.exports = (fileName: string): string => {
  // file to slug
  const directoryFrom: string = path.join(`contents`, `posts`)
  const fileFrom: string = path.join(directoryFrom, fileName)
  const title: string = fileName.toLowerCase().replace(/\.md$/, ``)
  const slug: string = title.replace(/^\d{4}-\d{2}-\d{2}-/, ``)

  // 移行先のディレクトリ作成 or 指定
  // const directoryName = draftFile
  // const directoryTo: string = path.join(directoryFrom, title)
  // if (!fs.existsSync(directoryTo)) {
  //   fs.mkdirSync(directoryTo)
  // }
  // 移行先のファイルパス指定
  // const fileTo: string = path.join(directoryTo, `index.md`)
  const fileTo: string = fileFrom

  // 今のファイルデータを取得
  const post: string = fs.readFileSync(fileFrom, `utf8`)
  const file = matter(post)
  try {
    const assetDir: string = path.join(`src`, `assets`, `images`)
    if (file.data.image) {
      const imageFrom = path.join(assetDir, `covers`, title + `.jpg`)
      if (!fs.existsSync(path.join(assetDir, `posts`, title))) {
        fs.mkdirSync(path.join(assetDir, `posts`, title))
      }
      const imageTo = path.join(assetDir, `posts`, title, `cover.jpg`)
      fs.copyFile(imageFrom, imageTo, (err: any) => {
        if (err) {
          console.log(err.stack)
        }
      })
    }
    const targetDate: Date = file.data.date || new Date()
    // add(targetDate, { hours: 9 })
    const newFrontmatter = {
      title: file.data.title,
      slug: slug,
      tags: file.data.tags,
      date: targetDate,
      cover: file.data.image ? `posts/${title}/cover.jpg` : ``,
    }
    const text: string = matter.stringify(file.content, newFrontmatter) // replace
    // ファイル作成
    fs.writeFileSync(fileTo, text)
    console.log(`published: ${fileTo}`)

    // ファイル削除
    // fs.unlinkSync(fileFrom)
    // fs.unlinkSync(imageFrom)
    // console.log(`draft removed: ${fileFrom}`)
    return fileTo
  } catch (error) {
    console.log(error)
    return ``
  }
}
