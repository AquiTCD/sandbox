---
title: VSCodeのSettingSyncで環境ごとに設定をわける方法
slug: environmental-config-for-vscode
tags:
  - VSCode
  - 開発
  - カスタマイズ
date: 2019-07-15T15:01:46.000Z
---
VSCodeには異なる端末でも設定を同期する[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)という拡張があって例えば職場と自宅で設定を同期したいときなど便利なんですが、環境ごとに異なる設定に対応する方法にずっと困ってました。

ちゃんと調べて設定してみたら上手いことできたので共有しようと思います。

## Setting Syncとは？
VSCode用の拡張で、GitHubのGistを利用して異なる端末にインストールしてあるVSCode間でも設定を同期する拡張。

<LinkCard url="https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync" title="Settings Sync - Visual Studio Marketplace" />

設定の同期にはGitHubアカウント及びGistが扱えるトークンを発行する必要がありますが、VSCodeを使う人は開発に携わる人だと思うので細かくは割愛します。公式にも詳しく説明があるので安心ですね。

なにが良いかと言えば、こういうエディタの設定ってちょっと違うだけでストレスになりませんか？　例えばVimやEmacsのようなエディタだったら設定ファイルをdotfileとしてGit運用したりDropboxなどで同期するのもそれほど大変ではないと思います。

この拡張はVSCodeの各種設定、拡張のインストール状況、キーボードショーカットなどを同期してくれます。家で設定変更をしたものを職場で同期したり、その逆も可。また拡張を追加したら自動でダウンロードしてインストールしてくれますし、拡張アンインストールしてもそれも同期してくれます。素晴しい。

## 困りごと
よくあるケースで、VSCodeの拡張の設定などで例えば端末にインストールしたNPMパッケージやGemなどを別途インストールして使うものがあります。その場合、設定にファイルパスを指定したりしますが、シェルでホームディレクトリを指定するように`~/`のパスが効かないことが多いです。

そうするとホームディレクトリ配下にあるパスを指定する場合、ユーザ名が違うとパスが異ってしまいます。また、そもそもOSが異なる場合は全然違うでしょう。

端末に依存する設定が必要な場合、同期してしまうと別の端末では動作しない設定になってしまいます。

## 設定を変える基本
ここに書いてありました、が、例しか書いてないので補足します。

<LinkCard url="https://github.com/shanalikhan/code-settings-sync/wiki/Sync-Pragmas" site-name="GitHub" title="shanalikhan/code-settings-sync" description="🌴💪 Synchronize your Visual Studio Code Settings Across Multiple Machines using Github GIST 💪🌴 - shanalikhan/code-settings-sync" image-url="https://avatars3.githubusercontent.com/u/8774556?s=400&v=4" />

まず基本的にGUIの設定ではできないので、設定ファイルのJSONを直接開いて編集します。
コマンドパレットを開いたら`Preferences: Open Setting (JSON)`コマンドで設定JSONを開いて編集していきます。

このJSON内では通常できないコメントを書くことができます。SetttingSyncの今回の設定はJSON内に一定の規則に従ったアノテーションコメントを書くことで制御します。

## 特定の設定は同期しない（無視する）
```json
{
  // @sync-ignore
  "window.zoomLevel": "1", /* won't upload to gist */
}
```

サンプルの通りですが、こう書くと`@sync-ignore`がついたすぐ次の設定が同期されません。ここで言えば`window.zoomLevel`の設定に関しは同期対象になりません。

## 環境ごとに設定を変える
### 環境の種類
環境の設定は3つのキーワードによって決まります。3つ全て設定する必要はなく、必要なものだけを設定すればOKです。
+ host
+ os
+ env

#### Hostごと
ホストは`syncLocalSettings.json`に手動で追加して設定します。コマンドパレットから
`> Sync: Advanced Options => Edit Configuration`を打つと編集できます。

```json
{
  "hostName": "<YOUR HOSTNAME>",
}
```

`hostName`キーに対して任意のホスト名を入力します。例えば、自宅は`home`、職場の端末では`work`にするイメージです。この`syncLocalSettings.json`は端末依存のファイルなので端末ごとに設定します。

#### OSごと
OSの設定は使ってる端末で自動で下記の3つのいづれかとして判別されます。
+ Windows
+ linux
+ mac

#### 環境（env)値
Node.jsの環境変数である`process.env`の値による設定ができます。個人的にこれを使う場面がそう思いつきません……

#### 実際の設定と動作例
以下は
+ 自宅の`hostName`を`home`としてLinuxで動いてる
+ 職場は`hostName`を`work`としてWindowsで動いている

としたとき、1つの設定を各環境で使いわけるとしたらまず自宅の端末では以下のように書きます。

```json
{
  // @sync host=home os=linux
  "window.zoomLevel": "1",
  // @sync host=work os=windows
  // "window.zoomLevel": "0",
}
```

すると職場のほうで同期したときはコメントに書かれたアノテーションが作用して以下のように自動で反映されます。
```json
{
  // @sync host=home os=linux
  // "window.zoomLevel": "1",
  // @sync host=work os=windows
  "window.zoomLevel": "0",
}
```

さきほども書いたように`host`,`os`,`env`を全て設定する必要はなく、`host`だけでも当てはまれば問題なく動作します。

## まとめ
このように環境の設定と、それぞれに対応する設定を書くことで困った例として出したように各環境ごとにユーザー名を考慮したファイルパスを指定してあげれば、参照する場所は異なりつつも他の設定は期待どおり同期できるようになります。

SettingSyncはその他にも自動同期ができたり、いろいろと便利なので複数端末で同じ設定のVSCodeを使う場合はオススメです。新しく端末を使い始める時にもSettingSyncだけインストールして、あとは同期するだけで設定を全部もってこれますし、GitHub Gistに保存される安心もありますしGistを公開すれば自分以外の人にも設定内容を共有できますね。
