import * as fs from 'fs'
import * as path from 'path'
// image がないもののあるよ
const replace = require(`./modules/replace`)
const postsDir = path.join(`contents`, `posts`)
const fileList = fs
  .readdirSync(postsDir)
  .filter((file: string) => /.*\.md$/i.test(file))
fileList.reverse().forEach((file: any) => {
  replace(file)
})
