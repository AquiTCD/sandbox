---
title: 'マークアップ: 特殊記号を含むタイトル ~`!@#$%^*()-_=+{}[]/;:?,.'
tags:
  - html
  - タイトル
  - マークアップ
  - 投稿
categories:
  - マークアップ
date: 2070-01-08 00:00:00
---

タイトルに特殊記号を含めた場合にも、レイアウトや機能に悪影響が出ないようにする必要があります。

投稿タイトル内の特殊記号は minify された JavaScript を使用している際に問題を引き起こす場合があることが確認されています。特に管理画面での投稿編集に影響が出やすいので注意しましょう (例: メタ・ボックス、メディアアップロードなど) 。

## ラテン文字テスト

これは、テーマで使われているフォントで基本的なラテン文字が表示できるかどうかのテストです。

1 | 2 | 3  | 4 | 5 | 6 | 7 | 8 | 9 | 10
--|---|----|---|---|---|---|---|---|---
! | “ | \# | $ | % | & | ‘ | ( | ) | \*
+ | , | -  | . | / | 0 | 1 | 2 | 3 | 4
5 | 6 | 7  | 8 | 9 | : | ; | > | = | <
? | @ | A  | B | C | D | E | F | G | H
I | J | K  | L | M | N | O | P | Q | R
S | T | U  | V | W | X | Y | Z | [ |
] | ^ | _  | ` | a | b | c | d | e | f
g | h | i  | j | k | l | m | n | o | p
q | r | s  | t | u | v | w | x | y | z
{ |   |    | } | ~ |   |   |   |   |