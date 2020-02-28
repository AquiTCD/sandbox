---
title: Google App ScriptをTypeScriptとClass構文で書く - 実装
tags:
  - 開発
  - GAS
  - TypeScript
date: 2019-02-26T15:42:51.000Z
image: /images/covers/2019-02-26-lean-to-develop-google-app-script-with-typescript-class-implement.jpg
---
前回は「[Google App ScriptをTypeScriptとClass構文で書く \- 環境導入](https://blog.solunita.net/lean-to-develop-google-app-script-with-typescript-class-setup/)」ということでClaspでローカル開発した場合の恩恵と、どう環境を設定したらいいかという話を書きました。

今回はES6から使えるようになったClass構文をつかって、TypeScriptでうまいことGASを書いていきます。本題です。
ちなみにこのClass構文はJSがそもそも持つ`prototype`の実装を簡単に書ける糖衣構文という位置付けです。

また、今回はTypeScriptに不慣れな人でもわかりやすくするためあえて型に関しての記述は少なくしました。慣れているほうは型をどんどん利用するともっと書きやすくなるのでオススメです。

Claspが正式にTypeScript対応してくれて事前ビルドなくtsをそのままpushできるようになって非常に楽になりました。その事情から逆に発生してしまっている特有の落し穴についても最後のほうで触れています。

## TL;DR
+ GitHubのイベント（PRなど）をWebhookで受けてChatworkに通知するサンプル
+ ES6のClassと継承使うと責務の分離と共通動作の取り回しがしやすくなる
+ GAS(Clasp)+TypeScript特有の落とし穴があるから気をつけろ

## 想定
サンプルの題材としてGoogleSpreadSheetをDB的に扱って、その情報を参照して自動化する想定をします。例として、GitHubのプルリクエストの状態に応じてChatworkに通知をしてみます。具体的にはプルリクエストの状態の変化時にWebhookが飛ぶのでそれをGAS側で受けて、Chatworkの通知にしています。

SpreadSheetとしてはこんなかんじでシート2つあります。

1. members: メンバーの名前、ChatworkのID、GitHubのIDを持っている名簿的なシート  
  ![](https://lh3.googleusercontent.com/SjJ1fJiuoRHYkcEmZUIWjy4Ul2z0bZuFKeQGaHdrrZX05NfbzeaBbLX9JTjvLuB1Ev2nDhaNUIbAi0yPHlV09ghtJk4e4K5PnSBpQS9V6rbFBNb3PZiE1bWuMAfeg5I7hglmLtH4h5xq6bVaI1JMKOg_V3fd6Hd7zcjK-4YT9w4wEWz5ovc98WIbOHhOs-0FyYtTtSqxLoXQx-1gNgAh2rtbObGG2_-leLcMofg1dHuz9r7BX0chYWR7cn9y54DlxXSU52wc4LKkwLW-MKqncLGdQEms_U3W4CH4WIa1lanCccOHW9Vuf2VAMt6DaJ0UL4AQ22xfoDQ2gHwlLGGiAzf5TA907_JDcuH82iCcW7dUGiE6a1gOb0jf_QqjUqirXfGCKIbeTBwRtQ1OJqcNloIQ-3RPzAkBnbab8RaZf9j8RIdC5T8SwPk8Q1MoKzYGmidydZgnE7Icp8wpf-WfjxsIAlE8xaX9ffd3YvLfOqewSP2uWozAzMHZwzt1Mh-n5VU9B0aIRKcA-4iy71rLLdhAtcqjkv7Bbl1OQks5s9pnuBRePwx6ktyHtmYomEHAMxQUgNgtaAxVNG8Zp40NR3Y79Fa8v-taZSEMJw7RhLmaAL8Lg2RfnWORWfClIt2_P89yflbXGB6qstL1aVX1hP3pbo5KgRKu0Ic4xn4Em4dyYO12dpiNS4UzTjhitIfhPcCWmha8LNq3RJdDkoVSEmhc=w1500-h860-no)
2. repositories: リポジトリ名、リポジトリのURL、対応する通知先のChatworkルームID  
  ![](https://lh3.googleusercontent.com/i7qvgMyVqE87YzvNrMDJJt5hdgYdUeaR2zeH9qdgi-x7ivGgqk7RpH0arQuqJ2XADa5PMSZaOW_V5boZHS1kHIMtG7-Zd6nSWOcvHv_svmQKknwDkDztX8wsG-ZaiDWygauCfaGqaTX5UxgXSa8M2YGuuhGiwh9xKqNNaYEo1lKZhgv1iq-FsImzs8c1BFpXJPVX-Gt2kUUZBsd6YOOG3Lvdk1XaayHqMEq54kYACRsNggGdRoK94tehqNGE80ALetqb_-qIAaatJWxsUTZSGhhphyrlHO0xsFjpD4nNxZ3vUaKG-Ko1XYWIfvPh5xFKp4uNi-mb3X9lckcNU7c3D8o9kgYtiA5Ihwx8996kyhO13Kjuua3d5gfiZyLNo3lS4F8HP-P9C4dr7U3hZpKUXw42TqkxsfggWkfvjkyCbfZ7nIlBKtKBFMTKtuWcjT42eGoDYbR-3fDJSlQ0ib_IaSGgpDUSLrf2mT_uef9AptnilwyHMoNAxNi5IpxPdW8Cny5-H91DxyY_AZl6CTsa0lnz2_Llux2dFbi5dXUHJSEs4w05O1MA7vutmHKoJRynuNQri6K9cCstMwgVLoSseqBRnEGIsGScqyfJ-aXybe3OE6gHbiJYT8T9lf73jU8YvzJLTVwE01NZNwrm3XOQTWKatXYPpHiLlPqkwmAVWi8rG9dWy8yTTDRRb1i3yotYU2W7AiWlaTolFMOJcdX303Vd=w1500-h860-no)

ちなみに各SpreadSheetの1行目は各カラムのタイトル行とします。

最終的にやりたいことは、登録したリポジトリでプルリクエストに変化があったらChatworkの指定したルームに関係者にToをつけて通知する、という流れです。これを細かくすると、

1. GitHubでPRのイベントをトリガーとしてGASにWebhookを飛ばす（GitHub側で設定）
2. GASで受けてWebhookの内容をパースする
3. パースした内容にしたがって通知メッセージや通知先をGoogleSperedSheetから取得する
4. Chatworkに通知する

という流れになります。

## 開発

### 基底クラスのconstructor
まず基底クラスとして`GasSheet`というクラスを作ってみます。
こいつの役割は、各シートを扱うための情報の読み込みと検索、書き替えの機能を提供します。

GASのAPIでSpreadSheetのデータを範囲でとってきた場合、2次元配列になります。
したがって、例えば上の画像の名簿データは
```js
[
  ['cwID', 'name', 'githubID'],
  ['1111111111111', '雨宮 蓮', 'joker'],
  ['2222222222222', '坂本 竜司', 'skull'],
  ['3333333333333', '高巻 杏', 'panther'],
  // 中略...
]
```
という配列の中に各行が列ごとに値を区切られた配列として取得できます。

今回はこれだと扱いづらかったので、まずはGasSheetクラスを`new`して生成したときに、
シートのデータをカラム名をキーに持つオブジェクトに変換して格納することにしました。

とりあえず`new GasSheet(sheet)`な感じでシートを受けとって処理できるようにしてみます。

```ts 01_GasSheet.ts
export default class GasSheet {
  sheet: any // SheetClass from GAS
  columns: { columnNum: number; name: string }[]
  data: {}[]
  constructor(sheet) {
    this.sheet = sheet
    const rawColumns: any[] = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0]
    const columns: { columnNum: number; name: string }[] = []
    rawColumns.forEach((dataOfColumn, idx) => {
      columns.push({ columnNum: idx + 1, name: dataOfColumn })
    })
    const rawData: any[][] = sheet
      .getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn())
      .getValues()
    const data: {}[] = []
    rawData.forEach((dataOfRow, idx) => {
      const obj = { rowNum: idx + 1 + 1 } // 行番号は1スタート + HEADERの行
      columns.forEach((column, i) => {
        obj[column.name] = dataOfRow[i]
      })
      data.push(obj)
    })
    this.columns = columns
    this.data = data
  }
}
```

使うときはたとえば

```ts
const SHEETS = SpreadsheetApp.openById(ここにスプレッドシートのID)
const MEMBERS_SHEET = SHEETS.getSheetByName(`members`)
const gasSheet = new GasSheet(MEMBERS_SHEET)
console.log(gasSheet.data[0])
// => { rowNum: 2, cwID:'111111111', name:'雨宮 蓮', githubID:'joker'}
```

みたいな感じですね。

### 基底クラスのメソッド
これだとまだ機能的にはオブジェクトの形になるようにラップしただけなので、メソッドから各データを取れるように実装してみましょう。

ちなみに配列、オブジェクト、コレクションを扱いやすくするためGASのライブラリとしても用意されている`Underscore`を使います。`Underscore`にならって、今回は

+ `where`: 引数で指定したキーの値が合致する複数のオブジェクトを配列に入れて返すメソッド
+ `findWhere`: 引数で指定したキーの値が合致した最初のオブジェクトを返すメソッド

の2つを実装してみます。なお、本来なら見つからなかった場合など中でエラーハンドリングすべきですが、今回は省略します。

```ts 00_GasSheet.ts
const _ = Underscore.load() // Underscoreライブラリのロード
export default class GasSheet {
  sheet: any // SheetClass from GAS
  columns: { columnNum: number; name: string }[]
  data: {}[]
  constructor(sheet) {
    // 中略（上で紹介した通り）
  }
  where(keyValue): {}[] {
    return _.where(this.data, keyValue)
  }
  findWhere(keyValue): {} {
    return _.findWhere(this.data, keyValue)
  }
}
```

そして使うときは

```ts
const SHEETS = SpreadsheetApp.openById(ここにスプレッドシートのID)
const MEMBERS_SHEET = SHEETS.getSheetByName(`members`)
const gasSheet = new GasSheet(MEMBERS_SHEET)
console.log(gasSheet.findWhere({name: '坂本 竜司'}))
// => { rowNum: 3, cwID:'222222222', name:'坂本 竜司', githubID:'skull'}
```

みたいな感じです。

### 継承したクラスを作る
GasSheetクラスができたので、これを利用した別のクラスを作っていきます。すでにオブジェクト指向的な言語に触れてる方にはいまさら説明の必要がないかもしれませんが、GASはいろいろな人が触っているようなので簡単に説明します。

例えばAというクラスを継承したA-1、A-2というクラスを作ったとします。AクラスがもつメソッドはA-1,A-2ともなにもせずとも使えます。ですがA-1だけのメソッドはA-2では使えません、逆もそうです。すごいざっくり言えば共通したいところは共通化すること、共通化しないところは個別でしか使えないという責務の分離の両方を実現できます。

じゃあ実際にやっていきます。

方針として、GasSheetクラスを継承させてMembersSheetクラスとRepositoriesSheetクラスを作っていきます。MembersSheetクラスは単純に任意の値から該当するデータを取得すればいいのでシンプルに継承したもの、Repositoriesクラスにはnotifyというメソッドを作って通知できるように実装します。

```ts 01_MembersSheet.ts
import GasSheet from './00_GasSheet'
const SHEETS = SpreadsheetApp.openById(ここにスプレッドシートのID)
const MEMBERS_SHEET = SHEETS.getSheetByName(`名簿`)

export default class MembersSheet extends GasSheet {
  constructor() {
    super(MEMBERS_SHEET)
  }
}
```
MembersSheetはこれだけでOKです。注目すべきは、`extends GasSheet`と継承しているところ、そして`constructor()`は引数を使ってないところです。
`super`は継承元（GasSheetクラス）の同名メソッドを呼びますので、`super()`に引数をわたすことで先程の例でやっています。
```ts
const MEMBERS_SHEET = SHEETS.getSheetByName(`members`)
const gasSheet = new GasSheet(MEMBERS_SHEET)
```
と同じことをしています。

こうすると使うときは先程よりもシンプルになって
```ts
const membersSheet = new MembersSheet()
console.log(gasSheet.findWhere({name: '坂本 竜司'}))
// => { rowNum: 3, cwID:'222222222', name:'坂本 竜司', githubID:'skull'}
```
とするだけでOKになります。

次にRepositoriseSheetクラスを作ります。前半はMemberslSheetと同様です。
```ts 02_RepositoriesSheet.ts
import GasSheet from './00_GasSheet'
const SHEETS = SpreadsheetApp.openById(ここにスプレッドシートのID)
const REPOSITORIES_SHEET = SHEETS.getSheetByName(`repositories`)
const gasSheet = new GasSheet(REPOSITORIES_SHEET)

export default class RepositoriesSheet extends GasSheet {
  constructor() {
    super(REPOSITORIES_SHEET)
  }
  notify(notification) { // notification = {repo: url, to: id, message: msg }
    // 最初にrepositoriesのシートからURLによりどのプロジェクトか特定する
    const repo = this.findBy({repositoryURL: notification.repo})
    // メッセージを引数で来たオブジェクトを使って整形する
    const message =`[To:${notification.to}][info][title]${repo.name}[/title]${notification.message}[/info]`
    // ライブラリ経由でAPIを叩いて通知する
    const client = ChatWorkClient.factory({ token: ここにCWトークン })
    return client.sendMessage({
     room_id: repo.room_id,
     body: message,
   })
  }
}
```
ChatWorkClientは非公式ですが、Chatwork通知用のライブラリがあるのでそれを使っています。
[cw\-shibuya/chatwork\-client\-gas: Chatwork Client for Google Apps Script](https://github.com/cw-shibuya/chatwork-client-gas)

`notify`メソッドでやっていることは、`notification`という仮引数の名前でオブジェクトとして引数で、リポジトリのURL、 通知するメンバーのID、通知内容を取ります。


それにしたがって、メソッド内で適切な形にメッセージ内容や通知を飛ばす先のルームを設定しています。Chatworkでは`[To: ID]`や`[title]`などの独自タグで通知先や強調表示できます。普段Chatworkを使っていないほうは適宜そんな感じか、となんとなく見てください。

ここでのポイント`this.findBy()`です。`findBy`は継承元のGasSheetクラスに実装してあるので、使うことができます。つまりリポジトリシート情報からURLが合致するリポジトリの情報を取得しています。

CWトークンはコード内にベタで書くよりはPropertiesServiceなどを環境変数的に利用するのが良いと思いますが、ここでその説明は割愛します。

### Webhookをトリガーにしてクラスとそのメソッドを使う
あともう一息ですね。ここまでで必要なクラスができたので、実際にWebhookを受けてメッセージを飛ばす実装をしていきます。

今回はサンプルとしてあるプルリクエストがマージされたときに通知するとしてみましょう。

GASの仕様でWebhookとしてリクエストが飛んできたものは`doPost()`関数で受けることができて、その時のbodyに入ってくる内容は引数に渡せます（今回は`e`として扱う）それをいったんパースして、そのあとで使いやすくしています。
```ts doPost.ts
import MembersSheet from './01_MembersSheet'
import RepositoriesSheet from './02_RepositoriesSheet'
export function doPost(e) {
  const contents = JSON.parse(e.postData.contents)
  // membersシートを扱う準備
  const membersSheet = new MembersSheet()
  // membersシートからgithubIDの該当する人を探す
  const membrer = memberSheet.findBy({githubID: contents.sender})
  // repositoriesシートを扱う準備
  const repositoriesSheet = new RepositoriesSheet()
  // 通知内容をオブジェクトとしてまとめる
  const notification = {
    repo: contents.repositoryUrl,
    to: member.cw_id,
    message: `${contents.title}がマージされました！`
  }
  // repositoriesシートを使って通知を実行する
  repositoriesSheet.notify(notification)
}
```

実装的にはMemberSheetクラスをインスタンスでwebhookに載ってきた情報からGitHubのIDから通知先をメンバーを特定します。

RepositoriesSheetクラスのインスタンスを作って、先程実装した`notify`メソッドに必要な情報を引数として渡しています。

ここでマージの場合はこう、レビューの場合はこう、みたいなハンドリングを省略しましたが、もしやりたい場合は書く必要があります。文章の出しわけも同様ですね。
今実際動いているものはシートのクラスとは別に例えば`GitHubEvent`というクラスを作ってうまいことやるようにしています。

## デプロイと注意点
### 注意点
あとは上記のスクリプト郡をデプロイすればいいだけですが、ここでGAS+TypeScript特有の落とし穴があります。

#### GASでES6の`import/export`は使えない
まさかと思いますよね、マジなんです。
じゃあ上のコードで`import/export`してるのはなんでだ、って話なんですがこれはエディタの補完を効かせたりLintのためだったりです。実際`$clasp push`するとコメントアウトされます。

さらにその特殊な事情として
```ts
import {
  functionA,
  functionB
} from `fileA`
```
みたいに書くとそのコメントアウトもまさしく働かくなってしまうのでやっちゃだめです。かなり罠です、お気をつけください。**importを書くときは1行に書く**のはGASでやるときは守っておいてください。

で、じゃあどうやって別ファイルに定義したものを使えるかというとGASは別ファイルに定義したものも他ファイルで使える全てがグローバルな仕様です。なので動かすだけなら`import`や`export`はいりません。
つまり`import/export`は使えないが結果的に同じことは実現できている、という状況です。

またimportがすべてコメントアウトされるためimportによる定義もできてません。なので、通常は自由な名前で定義できるところをClass名と厳密同じ名前でimportするようにします。
```ts GasSheet.ts(export側)
export class GasSheet {
  // 略...
}
```

```ts import側
// ◯ 良い
import GasSheet from './GasSheet'

// × ダメな例（export時の名前と違う
import MySheet from 'GasSheet`
```

さらにこの仕様につながって、どうやらファイルはファイル名順に読み込まれ、読み込み前のものは使えない、という仕様があるっぽいです（要出展）。
なのでこのご時世としてはやりたくないですが、`01_`とか読み込まれて欲しい順でファイル名をつけます。

もう1つあります。直接使われる関数（e.g. `doPost()`）は`export default`しちゃうと上手く動きません。`export`がある分には大丈夫ですが`export default`として宣言してはだめです。そういうこともあって先程の`doPost`は
```ts
export function doPost(e) {
  // 中略
}
```
として定義しています。

#### デプロイと本番化
ClaspとGASの連携の話になりますが、通常Clasp経由でGASのコードを更新するには
```
$ clasp push
```
とします。これでGASのスクリプトエディタで開くコードが更新されます。もし開いたままだったらリロードしてください。

ちなみにClaspがTypeScript対応したことによる事前に`tsc`などは必要ありません。`push`すると`.ts`ファイルは`.gs`にトランスパイルされてアップロードされます。

ここでの注意点はなんか上手く反映されないときがあるので、リロードしたあと一度スクリプトエディタ上で保存すると上手くいくことがあるようです。このへんの挙動は謎です。

単純にGASにコードを追いて手動実行したりする場合はこれだけでいいんですが、Webhookを受けとるような場合ではWebアプリケーションとして公開する必要があります。また、公開するには版（バージョン）としてデプロイされていることが必要です。このため
```
$ clasp deploy
```
を実行します。この時引数をつけないで実行すると新しい版としてデプロイされます。

あとはGASのスクリプトエディタのほうで、公開 > Webアプリケーションとして導入とします。
この時に表示されるURLがWebhookを受けるURLなのでコピーしておいてGitHub側に設定します。
プロジェクトバージョンは先程デプロイしたときに発行されたバージョンを指定します。
他の権限の設定はやることによって最適なものが変わるので、設定します。

## 最後に
今実際に僕が動かしてるものはもうすこし多様性を持たせた結果、サンプルで扱うにはデカすぎるようになってしまったので公開して紹介が難しく残念です（もし改変して公開できる余裕ができたらぜひやりたい）

あと次回、もし続けばテストについて書けたらいいなあと思っています。

GASってVBA的に捉えてる層もいれば、JS系で書けるWebアプリとか自動化できるおもちゃみたいに考えてる層もいます。
この記事はそんな隔絶した層のちょうど溝を埋めるような記事として読まれたらいいなあ、と思っています。
