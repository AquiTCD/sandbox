---
title: '極端な例: ネスト化された混合リスト'
tags:
  - css
  - コンテンツ
  - マークアップ
  - 一覧
  - 極端な例
keywords:
  - css
  - コンテンツ
  - マークアップ
  - 一覧
  - 極端な例
categories:
  - 極端な例
date: 2070-01-03 00:00:00
---

ネスト化された混合リストでは以下が正しく表示されるようにしてください。

+ リストの中のリストは番号付きリストの順番を壊さないこと
+ <span style="line-height: 1.714285714; font-size: 1rem;">箇条書きのスタイルの深さは十分であること</span>

### 番号付きリスト - 番号なしリスト - 番号付きリスト

1. 番号付きリストアイテム
2. 番号付きリストアイテム
  + **番号なし**
  + **番号なし**
    1. 番号付きリストアイテム
  1. 番号付きリストアイテム
3. 番号付きリストアイテム
4. 番号付きリストアイテム

### 番号付きリスト - 番号なしリスト - 番号なしリスト

1. 番号付きリストアイテム
2. 番号付きリストアイテム
    + **番号なし**
  + **番号なし**
    + 番号なしリストアイテム
  + 番号なしリストアイテム
3. 番号付きリストアイテム
4. 番号付きリストアイテム

### 番号なしリスト - 番号付きリスト - 番号なしリスト

+ 番号なしリストアイテム
+ 番号なしリストアイテム
    1. 番号付き
  2. 番号付き
      + 番号なしリストアイテム
    + 番号なしリストアイテム
+ 番号なしリストアイテム
+ 番号なしリストアイテム

### 番号なしリスト - 番号なしリスト - 番号付きリスト

+ 番号なしリストアイテム
+ 番号なしリストアイテム
    + 番号なし
  + 番号なし
      1. **番号付きリストアイテム**
    2. **番号付きリストアイテム**
+ 番号なしリストアイテム
+ 番号なしリストアイテム