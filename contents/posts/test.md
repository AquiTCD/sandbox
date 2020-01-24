---
title: コンテナのテスト
tags:
  - 投稿
date: 2070-01-14 00:00:00
---
タイトルに特殊記号を含めた場合にも、レイアウトや機能に悪影響が出ないようにする必要があります。

投稿タイトル内の特殊記号は minify された JavaScript を使用している際に問題を引き起こす場合があることが確認されています。特に管理画面での投稿編集に影響が出やすいので注意しましょう (例: メタ・ボックス、メディアアップロードなど) 。

<AdCard asin='B01NCXFWIZ' title='Nintendo Switch 本体 (ニンテンドースイッチ) 【Joy-Con (L) ネオンブルー/ (R) ネオンレッド】' imageUrl='https://images-na.ssl-images-amazon.com/images/I/61LB0JRyb9L._SX522_.jpg'  date='2019-06-09' publisher="任天堂" searchWords='Nintendo Switch' />

<LinkCard url='https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString' siteName="MDN Web Docs" title='Date.prototype.toISOString()' description="toISOString() メソッドは、簡潔な拡張表記の ISO 形式 (ISO 8601) の文字列を返します。これは、常に 24 文字または 27 文字の長さになります (それぞれ、YYYY-MM-DDTHH:mm:ss.sssZ または ±YYYYYY-MM-DDTHH:mm:ss.sssZ)。タイムゾーンは常に 0 UTC オフセットになり、接尾辞 &quot;Z&quot; で表記されます。" imageUrl="https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png" />

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium

The HTML specification is maintained by the W3C.

<LinkCard url='https://blog.solunita.net/' siteName="Trial and Spiral" title='Trial and Spiral' description="空想工房SOLUNITA名義で何か作ってます。"  />

あのイーハトーヴォ[^1]のすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市[^2]、郊外のぎらぎらひかる草の波。
[^1]: これは1つ目の脚注です。
[^2]: これは2つ目の脚注です。

aaa

文章内の一部を==このようにハイライト表示==させることができます。
できますよ
できますったら


::: tip bar
This is a tip
:::


```Ruby{3}
# varargsは可変長引数、keywordsはoptionalなキーワード引数
def m(*varargs, **keywords)
  puts "varargs:  #{varargs}"
  puts "keywords: #{keywords}"
end

# 次のようなシンボル以外のキーが含まれるハッシュを渡すと、
# ハッシュの要素が可変長引数とキーワード引数に分割される
m("a" => 1, b: 1)
#=> varargs:  [{"a"=>1}]
#   keywords: {:b=>1}
```

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification is maintained by the W3C.

aaa

あのイーハトーヴォ[^1]のすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市[^2]、郊外のぎらぎらひかる草の波。
[^1]: これは1つ目の脚注です。
[^2]: これは2つ目の脚注です。

aaa

文章内の一部を==このようにハイライト表示==させることができます。
できますよ
できますったら
