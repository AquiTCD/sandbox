---
title: 複数ブラウザを便利に使うためのChoosy
tags:
  - Mac
  - アプリ
  - 開発
  - カスタマイズ
date: 2019-07-22T21:55:00.000Z
image: /images/covers/2019-07-22-use-choosy-for-multiple-browsers.jpg
---
Web開発をしていると複数ブラウザを使う人も珍しくないと思います。そこで複数ブラウザを便利に使うためのMac用ユーティリティ「Choosy」を紹介します。最近上手く動かなかったことがあったのでその解決方法とともに

## 複数ブラウザ、僕の場合
僕のメインブラウザはVivaldiです。

<LinkCard url="https://vivaldi.com/ja/" site-name="Vivaldi" title="未来の自分に届けたいブラウザー | Vivaldi" description="ブラウザーは自分で選ぶもの。Vivaldiは、他に類を見ないカスタマイズ性と管理性を持った新しいブラウザーです。高速で安全、そして柔軟 – あなたのために作られたブラウザーです。" image-url="https://vivaldi.com/wp-content/uploads/yt-frame.png" />

VivaldiはGoogle Chromeと同じChromiumベースなのでほぼ全てのChrome拡張が動くのが強みで、サイドパネルなど独自のいろんな機能が盛り込まれています。僕はこれを普通の閲覧用ブラウザとして使っています。閲覧用なので広告ブロックや表示に関するカスタマイズもいろいろしています。

一方で開発用にはGoogleChromeを使っています。表示関するものはあえてデフォルトに保ちつつ、開発するために便利な拡張だけを積んでいます。

## Choosyとは
<LinkCard url="https://www.choosyosx.com/" title="Choosy: A smarter default browser for macOS" />

Choosyはブラウザを切り変えるのを手助けするユーティリティです。同名の拡張機能からワンクリックで今開いてるURLを別ブラウザで開くことはもちろん、URLだけでなく様々な条件を元に自動で開くブラウザのルールを設定できます。

またブラウザはブラウザだけに留まらず、iTermやVLCなども設定可能です。URLベースでAPIを提供しているのでアイデア次第で応用も可能。

ちなみに$10の有料アプリです。類似にMac App StoreではBrowser Fairyというものもあるようです。

### 僕の使いかた
個人的に一番便利なのは前述の条件に応じて自動で開くブラウザを指定できる機能です。前述のとおり基本はVivaldiで開きたい。でも開発に関するURLはChromeで開きたい。なので一例ですがこんなルールを適用しています。

![](https://lh3.googleusercontent.com/VhwO3ogfU92Bo4zO_hRhfgohkwmgHdBWpFja23y_84ebd_-dLXRg597ISYBnzuKZ1E6oqZ_4kmY-glArFW0x4wLWpZmPqGBjkCvWGyFbch0x4-IpfdeMMvhmIaWpvKD2sNbBX93gxJslkc04n6JqD0S_1ZrY30bZFz4QXYjKccX4jt01k_5AvwhEot7Z2QbfL1ofdeMp7KPeOt5fphM-Aa_lHKlmWpY3cg-fFliajAO2EKTesP6S4g01Z6FV-yxvpzv8QwkKJ7i08tUuvLoYS13BSJvl8daQ5--n0-OjsJWGxfTyP-UwY19zvMUZsVanLOodYWk-kcbGX3YIft7F4_LmWkp-jJ476QyHJav38Qkxh79Vi_G78bP1JSBvNC3A5NoG04j7dey7-OLQvLFAN_CMMJFJ3jAPgUz0J-CBqrAX1fVl0CCL0i8yZFIIuY8Swdv8pFSpctkTA3poh1lwMLdi1pO-LW2BI2oucDNou1dPcJWOa848EOjr9lJZFwVqe1vPc3PlWnm_Wqi4KxOBDuBb-W9Sc2AVfuxgpCqxO7ESaqzPq3wdjFreaexluycYSU6rT3BKyNgE0a35y24paH91i4bwHAFMGXX8HqAnHPbIjG26ak1ly9AZ9oxZuvitqxYVCaUwRa-kik41n9gxSiVW5ZDpT0-BKiAr8VdkaXS7bPFfSoSzgCc585J-PmESyFkMZMimueBJR8JkfOXzqTFX=w1560-h1482-no)

ドメインが`localhost`か`github.com`のURLならChromeで開いてくれます。例えばローカル開発中にiTermでサーバーを起動したとして、`http://localhost:3000`みたいに表示したところをコマンド+クリックで開くと、Chromeで開いてくれるようになります。

他にはAlfredから開くなら閲覧用Vivaldiで開く、とか。あとはやってないですが開発用のローカルのファイルパスを開くならエディタで開く、とかも良いかもしれません。

### Choosyがクラッシュするときのその解決方法
こう便利に使ってたChoosyですが、あるときから拡張経由でブラウザを切り替えようとするとブラウザがクラッシュしてしまう事態にみまわれてました（Vivaldi、Google Chromeともに発生）。

調べてみるとフォーラムにも同様に報告がありました。

<LinkCard url="http://feedback.choosyosx.com/forums/6165-general/suggestions/35061085-choosy-crashes-chrome" site-name="Customer Feedback for Choosy" title="Choosy crashes Chrome" description="Did Choosy stop supporting Chrome? Every time I tried it in the past week it crashed my Chrome browser. I tried reinstalling it and it doesn&#39;t even show up in the list of extensions (but it does for Safari and FF). My version of Chrome is 68.0.3440.84 (Official Build) (64-bit)." image-url="https://s3.amazonaws.com/uploads.uservoice.com/logo/design_setting/32117/original/paypal_header.png?1453568360" />

で、このフォーラムがちょっと見にくいのですが解決方法として

<LinkCard url="http://feedback.choosyosx.com/users/869188216-js" title="JS – Customer Feedback for Choosy" />

要はそのブラウザのURL欄に
```
x-choosy://prompt.all/
```
と入れて実行すれば良いとのこと。実際にやってみると画像のようなダイアログが出ます。ここで「常に関連付けされたブラウザで開く」にチェックを入れて開きます。そのあとにChoosyのブラウザ選択が出ますが、適当なブラウザを選択します。

![](https://lh3.googleusercontent.com/_sA51Sdx2zTJIZmTWK3_g8dmFch6hEIpaCAvodUfJJ0f4CjmDKAKojAhs5Idvf2dIfqrlkCzbptj31Uajlnu9RGQHzA2ZwrvH0fkcfK6uaQDzt2IyFQI8V85KLaoJgFgBR3h2XES60-sJaPgHKBOAYbVWQZzCyDNjphcu8ktePKFprvxUIEqeDV9y_PUjR6UynHG0YtiUsNyO-vkgr7K-HQz4kqHwKQit2oijTeGD5TYaGgyvZ6ENSzA_aVZTyspOgXjWYRmn2R2HPYmmbS4O63_lVCFYRPLZVgDfaB93xcqPEhKqb_eg4tskXGT1OXbAhouSDMGA_lU8u-pfAWcFdfnxMw98jqcirNH42PCI5Gnj4jcgcUybUHyYlBOUGtQo9XKFQe5C6kbNpC9taumr4GrsuuV_aaJAqfHvweYf6gzhLkX_QHMyXIguqbzVWYHDgNx-EJ6z_vgnq90yt50C6lSBV6IBh0Qj2dXq8oaux_geq_QapNfmnZH7GDpyFknxx380tTh5yGmZiTsUQnQahCaEMbxHWtw19PnJfyTJ4QkPrN73IG-fHjAo1XxVN8HqxDZwwTPM9cWez6TShVgCk4xXFViS4TUfGiS_Tvwe8vwMW8P_ZUTMk91zGRMBpIA004sTh8iAtoFWtfvALa-QvYMQpSzCDYUMIdIwIrTqIOed9j5cwHIyr9LuGVHkNS0pJJHcfJnstprv5Ppb5H3CX9p=w1658-h1260-no)

やることはこれだけでOKです。状況としては`x-choosy`スキーマに対するブラウザが設定されてないのに拡張から開こうとして何かがクラッシュしてそうな雰囲気でした。

この問題にしばらく悩まされていたので解決して一安心しました。フォーラムで言ってる人がいるように使えないのをサポートしないのはいかがなものか、と思っていましたが直ってよかったです。とはいえ公式でアナウンスせずにユーザーフォーラムにしか情報がないのはいかがなものかと思っていますが……

## まとめ
+ 複数ブラウザ使うならChoosy（or類似ツール）便利です
+ 拡張経由も条件指定もめっちゃ便利
+ クラッシュ問題は`x-choosy://prompt.all/`でOK
