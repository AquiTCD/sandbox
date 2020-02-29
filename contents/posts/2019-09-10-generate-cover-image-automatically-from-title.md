---
title: アイキャッチ画像をタイトルから自動生成するようにしてやった
slug: generate-cover-image-automatically-from-title
tags:
  - 開発
  - Hack
  - ブログ
date: 2019-09-10T13:38:02.672Z
---
ブログを書いていて、アイキャッチと呼ばれる記事の見出しタイトル画像があったほうがいいとは常々思っていました。画像系のツールを使ってもいいんですが、面倒なので自動で生成するようにしました。これで良い感じに記事を書くのがかなり楽になりました。

## 動機
ブログのアイキャッチ、手で作るの面倒じゃありませんか？　以前からアイキャッチに対して素晴しい画像でなければいけない意味ってそこまでないと疑っていました。もちろん企業のオフィシャルなものならともかく、個人のブログで使うアイキャッチ画像なんてタイトルを目立たせるためだけに存在すると言いきっても過言ではないと思っています。

よく目にするブログだって、冷静にアイキャッチ画像を見れてみるとそこまで内容と合ってなかったりしませんか？　もう、そこそこキレイでマイナスイメージのない画像であればなんでも良いとすら思っています。

つまりアイキャッチに対する僕の持論
+ 「アイキャッチ有り」「アイキャッチ無し」の差は大きい
+ アイキャッチの画像が「記事と関連している」「記事と全く関係ない」の差は小さい
+ つまり画像を選んで使うのは労力対効果として割に合わない

を全力で証明しに行きます。

目につきゃいいんです。画像ならいいんですよ。なんでも。幸い僕には何千枚もの旅でとった人に見せたいステキな写真があるのでそれをランダムで使えば良さそうですね。僕はエンジニアなので人の手でやらなくていいことは自動化すべきという信念があります。

## 使うもの
+ Node.js
+ 背景となる画像
+ frontmatter対応のMarkdown記事

別にNode.jsじゃなくてもできると思いますが、ブログシステムにNode.js系を使ってるのとちょうど良さげなライブラリがNode.jsだったので今回はそれでやります。
また、背景画像はなんでも良いんですが、さきほど述べたように自分で撮った画像を使います。
そして画像に入れるタイトル情報は記事のタイトルからとります。最近のブログシステムはだいたいfrontmatterというMarkdown拡張書式が使えるので、そのタイトルを取得します。このへんは自分でブログシステム構築してる強みですね。

### 使うライブラリ
+ shape: 画像合成
+ text-to-svg: 文字列からSVG生成
+ mikan.js: 簡易形態素解析
+ gray-matter: frontmatterパーサ

<LinkCard url="https://github.com/lovell/sharp" site-name="GitHub" title="lovell/sharp" description="High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images. Uses the libvips library. - lovell/sharp" image-url="https://avatars1.githubusercontent.com/u/210965?s=400&v=4" />

<LinkCard url="https://github.com/shrhdk/text-to-svg" site-name="GitHub" title="shrhdk/text-to-svg" description="Convert text to SVG path without native dependence. - shrhdk/text-to-svg" image-url="https://avatars1.githubusercontent.com/u/1025020?s=400&v=4" />

<LinkCard url="https://github.com/trkbt10/mikan.js" site-name="GitHub" title="trkbt10/mikan.js" description="機械学習を用いていない日本語改行問題へのソリューション. Contribute to trkbt10/mikan.js development by creating an account on GitHub." image-url="https://avatars2.githubusercontent.com/u/689986?s=400&v=4" />

<LinkCard url="https://github.com/jonschlinkert/gray-matter" site-name="GitHub" title="jonschlinkert/gray-matter" description="Smarter YAML front matter parser, used by metalsmith, Gatsby, Netlify, Assemble, mapbox-gl, phenomic, and many others. Simple to use, and battle tested. Parses YAML by default but can also parse JS..." image-url="https://avatars1.githubusercontent.com/u/383994?s=400&v=4" />


## 参考にしたもの
<LinkCard url="https://backport.net/blog/2018/06/11/eyecatch_generator/" title="Node.jsを使ってアイキャッチ画像を自動生成する試み" description="Node.jsのお勉強を兼ねてブログのアイキャッチ画像を自動生成するツールを作ってみました。 完全に自分向けに作ったので公開はできないのですが" image-url="https://backport.net/blog/eyecatch/2018_6_11_eyecatch_generator.jpg" />

やはり同じようなことを考えてる人がいるようで。コードこそないもののエッセンスはこのブログのそのまま参考にさせていただきました、ありがたいかぎりです。

当初はnode-canvasというライブラリを使おうと思ってましたが、この参考にもあるように依存ライブラリがいろいろと面倒なようです。

あとは簡易形態素解析で改行位置を決めるというアイデアも~~丸パクリ~~大いに参考にさせていただきました。言及されているamanatsu自体は開発が止まってるようなのでフォーク元であるmikan.jsを使いました。

## コードと解説
ファイルの置きかたはこんな感じです。
```
tasks
├── assets
│   ├── fonts # タイトル文字用のフォントを格納
│   ├── images # 背景画像をたくさん格納
│   └── logos # 小さく入れるロゴを格納
├── modules
│   ├── generateImage.js
│   └── updateFrontmatter.js
├── all_covers.js
└── config.js
```

tasksというところにまとめてます。
`generateImage.js`モジュールで画像を生成して生成したパスを返します。`updateFrontmatter.js`は既存の記事の`image`というfrontmatterに指定したパスを追加します。
それを`all_covers.js`で連結してすべての記事に対してぶん回す作戦です。
`config.js`は雑に共通設定を持たせています。

書きなぐりの汚いソースですがもし参考になれば。
`config.js`
```js
module.exports = {
  post: {
    draftDir: 'drafts',
    publishDir: 'docs/_posts',
  },
  coverImage: {
    imageDir: 'tasks/assets/images',
    logoDir: 'tasks/assets/logos',
    outputDir: 'docs/.vuepress/public/images/covers',
    maxLetterCount: 16,
  },
}
```

`generateImage.js`
```js
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const sharp = require('sharp')
const TextToSVG = require('text-to-svg')
const mikan = require('mikanjs')
const config = require('../config')
const textToSVG = TextToSVG.loadSync('tasks/assets/fonts/NotoSansCJKjp-Black.otf')

const options = {
  fontSize: 56,
  letterSpacing: -0.05,
  anchor: 'top',
  attributes: {
    fill: '#fff', //文字色
    stroke: '#000', //縁取り
    'stroke-width': '1px',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  }
}

module.exports = async (postPath) => { //引数に記事のパスを取る
  try {
    const slug = path.basename(postPath, path.extname(postPath))
    const outputPath = `${config.coverImage.outputDir}/${slug}.jpg`
    const post = fs.readFileSync(postPath, 'utf8')
    const fileList = fs.readdirSync(config.coverImage.imageDir).filter(file =>
      /.*\.(jpe?g|png|gif)$/i.test(file)
    )
    // 画像ディレクトリからランダムで画像ファイルを取得
    const imageFile = fileList[Math.floor(Math.random() * fileList.length)]

    // タイトルに適度な長さで改行を入れて、まずはタイトルだけで画像化
    const text = matter(post).data.title

    let lineLetterCount = 0
    let lineIdx = 0
    let lines = [[]]
    // 簡易解析して文字の切れめが最大文字数を越えたら次の配列にする
    mikan.split(text).forEach((words) => {
      lineLetterCount += words.length
      if (lineLetterCount > config.coverImage.maxLetterCount) {
        lines.push([])
        lineIdx += 1
        lineLetterCount = 0
      }
      lines[lineIdx].push(words)
    })
    const lineBg = { // 1行づつ画像化
      create: {
        width: 1200,
        height: 100, // とりあえず1行の高さを100pxとする
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        channels: 4,
      }
    }
    const titleLines = await Promise.all(lines.map(async line => {
      const svg = textToSVG.getSVG(line.join(''), options)
      const svgTitle = Buffer.from(svg)
      return await sharp(lineBg)
        .composite([{ input: svgTitle }])
        .png()
        .toBuffer()
    }))
    const title = titleLines.map((line, i) => {
      return { input: line, top: 0 + i * 64, left: 0 }
    })

    const alphaBg = { // 透明度のある黒で背景を合成
      create: {
        width: 1200,
        height: 80 * title.length, // 1行の高さを80pxとして行数分
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0.6 }
      }
    }

    // 左上部に小さくロゴを合成
    const logoSvg = await sharp(`${config.coverImage.logoDir}/slim_logo.svg`)
      .resize(null, 64)
      .png()
      .toBuffer()
    const logoBg = {
      create: {
        width: 248,
        height: 80,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      }
    }

    // ランダムで取得した画像にタイトルとロゴを合成
    const titleWithBg = await sharp(alphaBg)
      .composite(title)
      .png()
      .toBuffer()
    await sharp(`${config.coverImage.imageDir}/${imageFile}`)
      .resize(1200, 630)
      .modulate({ // 背景画像を明るめ彩度高めに修正
        brightness: 1.25,
        saturation: 2,
      })
      .composite([
        { input: logoBg, top: 0, left: 0 },
        { input: logoSvg, top: 8, left: 8 },
        { input: titleWithBg },
      ])
      .jpeg({ quality: 80 }) // 圧縮
      .toFile(outputPath)
    console.log(`cover image: ${outputPath}`)
    return outputPath // 生成した画像のパスを返す
  } catch (error) {
    console.log(error)
  }
}
```

付け足してすこし補足すると、複数行になった場合の文字のセンタリングが指定できなかったので1行ずつセンタリングしたものを合成しています。調整の数値は論理的なものではなく全て試した結果からの感覚値です。
本当は縁取りは文字の外側にできれば良かったんですができないみたいでした。

そして既存の記事のfrontmatter更新用の`updateFrontmatter.js`
```js
const fs = require('fs')
const matter = require('gray-matter')

module.exports = async (filePath, newFrontMatter) => { //対象のファイル、frontmatterのオブジェクトを引数にとる
  try {
    const post = matter(fs.readFileSync(filePath, 'utf8'))
    let frontmatter = Object.assign({}, post.data)
    Object.keys(newFrontMatter).forEach(key => {
      frontmatter[key] = newFrontMatter[key]
    })
    const text = matter.stringify(post.content, frontmatter, { lineWidth: 240 })
    await fs.writeFileSync(filePath, text)
    return filePath
  } catch (error) {
    console.log(error)
  }
}
```

で、それらをくっつけて一気に全部処理する`all_covers.js`
```js
const fs = require('fs')
const path = require('path')
const generateImage = require('./modules/generateImage')
const updateFrontMatter = require('./modules/updateFrontMatter')

const postsDir = 'docs/_posts'
const fileList = fs.readdirSync(postsDir).filter(file =>
  /.*\.md$/i.test(file)
)
fileList.forEach((file, i) => {
  const postPath = path.join(postsDir, file)
  generateImage(postPath)
    .then(imagePath => {
      const image = imagePath.replace(/^docs\/\.vuepress\/public/, '') // vuepressの画像場所用にパスを変換
      updateFrontMatter(postPath, { image: image }) // imageに生成した画像パスを指定してupdate
    })
    .then(res => {
      console.log(`done: ${res}`)
    })
})
```

であとは
```sh
node tasks/all_covers.js
```

を実行すればOK。

途中いくつかエラーがでましたがほぼ全てに対応できたので暫定対応としてはこれで十分です。
all_coverじゃなくて1つづつ処理できるようにモジュールに分けているので、新規記事ができたときもそれ用のスクリプトにしてあげればいいだけですね。

## 終わりに
以前からずーっとやろうと思ってたことができたので良かったです。sharpに癖がすこしあるものの、学習コストも低く、画像処理用のライブラリもいらないので助かりました。

この応用でHexoの時のように、draftコマンドやpublishコマンドも作り、publishコマンド時に画像生成するととても良い感じに記事を公開する流れができました。

結果として一覧でみたときにそれなりに見栄えが良くなったので、やはりアイキャッチの画像が内容とリンクしてるなんて必要なんてない、と思いました。旅の素敵写真が強かった説もありますが。
自分で撮った旅の写真が今まで人目につくこともなく残念な思いだったので、それらも有効活用できて一石二鳥です！
