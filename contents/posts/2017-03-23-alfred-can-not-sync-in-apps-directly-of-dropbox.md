---
title: Alfredの同期がDropboxのAppsディレクトリだとできなかった件
slug: alfred-can-not-sync-in-apps-directly-of-dropbox
tags:
  - アプリ
  - カスタマイズ
  - Hack
  - Mac
date: 2017-03-23T00:00:00.000Z
---
長らくこれまでLaunchBar使いとして頑張ってきましたが、環境が変わったのをきっかけに僕もついにAlfredの軍門に下りまして。

## Alfredの同期
Alfredは有料のPowerPackを導入することでDropbox経由の同期ができる。一部設定はあえて同期しないようになってるものの、追加したWorkflowとか同期できる。どうせWorkflowを使えないんじゃ意味ないし、LaunchBarもそもそも有料だしで、当然PowerPack入れてみました。

### あれ、同期したいディレクトリが選べない
で、Dropboxを使うアプリの多くは`~/Dropbox/Apps(またはアプリ)`以下で同期設定を持つものがある。アプリ関連のはここでまとめたいところだけど、どうもこのディレクトリが同期設定で選べない。これでは同期できない。Alfredだけ他の場所で同期するのも管理が面倒になるし、美しくないし。

### 公式に説明があった
- [Why can't I use the Dropbox Apps folder?](https://www.alfredapp.com/help/troubleshooting/dropbox-apps-folder/)

簡単に言えば、`Dropbox/Apps/`はなんか不可解な動作をするので、Alfredはこれを採用しないし、ここで同期をさせなくしている。それでもどうしても使いたいなら
- Alfredを終了
- ターミナルで`defaults write com.runningwithcrayons.Alfred-Preferences-3 dropbox.allowappsfolder -bool TRUE`と入力
- Alfredを起動

するとできるようになるよ。
ってことらしい。

とりあえず僕はそれでやってみたけど今のところは問題なく動いてる。でも問題あるようだったら別の方法を考えよう。

### そもそも
そもそもDropboxのAppsディレクトリ自体やっぱりちょっと変で、アプリの環境によって`Dropbox/アプリ`だったり`Dropbox/Apps`だったり日本語だったり英語だったりで統一されない。しかも別モノ扱いなので面倒。僕はこれは、Appsをシンボリックリンクでアプリという名前で作って対応してる。

##  LaunchBarから移行してみての所感
お作法が違くて慣れないところもあるけどそんなに困ってない。省略語の柔軟さとファイル操作はLaunchBarのほうが秀でてる感じだけど、Alfredでも必要十分、という感じ。そもそも僕が移行したのはそれよりもWorkflowの充実さと作りやすさ。LanuchBarも機能拡張いろいろできるんだけど、ちょっと作るのが面倒だし、コミュニティとしてかなり寂れてるので将来性に難アリ、という感じ。

実はMacユーザーが増え始めたころにAlfred賛美の流れができて、なんか不服だったし、今もAlfredに降るのは少しだけシャクなんだけど、そんなこんなでしばらく使ってみます。よろしくAlfred。
