---
title: これがないと捗らない、僕のKarabiner設定（late 2017）
tags:
  - アプリ
  - カスタマイズ
  - 開発
  - Hack
  - Mac
date: 2018-02-24T09:04:11.000Z
image: /images/covers/2018-02-24-karabiner-customize-late-2017.jpg
---

昨年末から続いてる極まりつつある入力環境シリーズ、Karabiner編。
macOSユーザの大半が使ってるであろう、Karabiner(-elements)というキーボードセッティングユーティリティの設定のお話。ここの設定はもはや無いと使えないレベル。

<div class="series"><div class="seriesTitle">最近極まりつつある入力環境カスタマイズシリーズ</div><ul class="seriesList"><li class="seriesItem">[これがないと捗らない、僕が使ってるAtomパッケージ（late 2017）](/atom-packages-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）](/atom-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）](/aqua-skk-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のErgoDoxファームウェア設定（late 2017）](/ergodox-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のKarabiner-elementsカスタマイズ（late 2017）](/karabiner-customize-late-2017)</li></ul></div>

## Karabiner-elements
macOS Sierra以前にKarabinerというツールがあって（それ以前はKeyRemap4macbookという名称だった）。Sierraで内部的に大きく変更があって、簡易的な代替としてKarabiner-elementsが生まれた背景がある。その後アップデートを繰り返し今では以前のKarabinerにひけを取らない、もしくは以前よりも柔軟な設定ができるユーティリティとして生まれ変わっている。

で、もちろんGUIから設定もある程度できるんだけど、内部的にはJSONで設定ファイルが書かれている。さらに柔軟な設定となるとJSONを直接編集する方法になる。なので今回はGUI部分はさっと紹介に留めてJSONをメインで。というより、設定JSONさえ入れればすぐにその設定を使えるので良い（Karabiner時代は独自のxmlだったので以前よりやりやすくなったと思う）

僕の場合、外付けキーボードを使っていて、そちらでファームウェアレベルでキーリマップはできるものの、外してノートのキーを直接叩く機会もあるので、共通する設定はKa  rabiner-elements側で行なっている。また、僕の設定はかなりErgoDox特化の設定でもあるのでご注意を。

### GUI設定Overview
#### Simple Modifications
<kbd>Caps Lock</kbd>を<kbd>Ctrl</kbd>にしているだけ。<kbd>Caps Lock</kbd>が無いと大変な人って多数派なんだろうか疑問である。システム環境設定側でもできるけど、いろいろ絡めるとこちらで設定するのが良い。

#### Function Keys
基本的に叩かないのでわりとどうでもいい。デフォルト。すごい偏見だけどWindows使ってた人ってFunctionキー好きだよね。

#### Complex Modification
##### Change Space to R-Shift (if alone)
SandS用。SandSとは<kbd>Space</kbd>と<kbd>Shift</kbd>キーを両立させるキーで、単体で押したら<kbd>Space</kbd>、他と組み合わせると<kbd>Shift</kbd>になるようなキーのこと。ちなみに僕の使うErgodoxではDoubleFunctionとして設定できるけど、挙動はKarabinerでやるほうが好みの感じになるのでこちらでやってる。

##### Change Delete to R-Ctrl (if alone)
これは完全に僕の好み。しかもErgoDox特化。黄金の小指を捨てて鋼鉄の親指にするためのもの。要は親指位置に<kbd>Ctrl</kbd>キーを持ってきていて、それが単体押しだと<kbd>Delete</kbd>として動作したらいいよね、って感じ。ちなみにノートのキーボードを直で叩くときは小指が黄金化せざるを得ない。

##### Change L-Cmd + R-Opt to L-Cmd + Space
Cmd+SpaceでAlfred呼び出しにしてるものをErgoDox使用時とキーボード直の時の差を吸収する設定。直の場合、左親指で<kbd>Cmd</kbd>、右親指で<kbd>Shift</kbd>を叩いてAlfredを呼び出している。が、ErgoDoxのときは左側にSpaceキーがないのでOptキーと組み合わせることで同じ動作をするように。

##### Change L-Opt + R-Opt to L-Opt + Space
これも上と同様で、<kbd>Opt</kbd>+<kbd>Space</kbd>でOmniFocusのクイックエントリに設定しているから。

##### Change L-Opt to TAB (if alone)
左の<kbd>Opt</kbd>を単体で押したら<kbd>TAB</kbd>として動作。僕の小指はそんなに長くないし。そしてErgoDox系が素晴しいのは親指の有効活用を目指しているからである。

##### Change R-Opt to ESC (if alone)
上記同様。

##### コマンドキーを単体で押したときに、英数・かなキーを送信する
これは最初からプリセットされているものを読み込んで設定できる。US配列好きの日本ユーザーに割と常識になってる英数、かなキーのエミュレーション。僕の場合、AquaSKKでの設定を使うのであまり出番がないけど一応。

##### Change FN1 to (, Shift + FN1 to <
ErgoDoxには<kbd>b</kbd>,<kbd>g</kbd>キーの右側に特殊キーがある。そこを括弧系の入力に割り当ててる。ErgoDox側で<kbd>FN1</kbd>を割り合てて、Karabiner側で実際に入力されるキーを指定。これは本来ならErgoDox側のハードウェア的にやるほうが望ましいけど、ErgoDox側での<kbd>Shift</kbd>を絡めたキー指定が難しいため。

##### Change FN2 to ), Shift + FN2 to >
上記の逆。<kbd>h</kbd>,<kbd>n</kbd>の左にも同様のキーがあるので逆の閉じる側の括弧を。余談だけど、その上に配置されたキーは、<kbd>[</kbd><kbd>]</kbd>と<kbd>{</kbd><kbd>}</kbd>を割り当てている。

余談だけどUSキーボード好きのJISキーボード使いずらい派は、括弧のキー配列が横並びじゃなくて縦並びになってるが嫌って人が多いと思ってる。あれはとても直感的じゃない。

### JSON設定ファイル
上記までの設定が全部かかれたJSONファイル。ちなみに生成されるのファイルのインデントは4スペースだけど、個人的に見辛いので2スペースにしている。で、つまるところJSONなので、これをGitとかGitHub Gistで管理したりDropboxとSymlinkで同期させたりすると複数端末でも使い勝手が良いよね。

```JSON karabiner.json
{
  "global": {
    "check_for_updates_on_startup": true,
    "show_in_menu_bar": true,
    "show_profile_name_in_menu_bar": false
  },
  "profiles": [{
    "complex_modifications": {
      "parameters": {
        "basic.to_delayed_action_delay_milliseconds": 500,
        "basic.to_if_alone_timeout_milliseconds": 1000,
        "basic.to_if_held_down_threshold_milliseconds": 500
      },
      "rules": [{
          "description": "Change ␣ to R⇧ (if alone)",
          "manipulators": [{
            "from": {
              "key_code": "spacebar",
              "modifiers": {
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "right_shift"
            }],
            "to_if_alone": [{
              "key_code": "spacebar"
            }],
            "type": "basic"
          }]
        },
        {
          "description": "Change ⌦ to R⌃(if alone)",
          "manipulators": [{
            "from": {
              "key_code": "delete_forward",
              "modifiers": {
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "right_control"
            }],
            "to_if_alone": [{
              "key_code": "delete_forward"
            }],
            "type": "basic"
          }]
        },
        {
          "description": "Change L⌘ + R⌥ to L⌘ + ␣",
          "manipulators": [{
            "from": {
              "key_code": "right_option",
              "modifiers": {
                "mandatory": [
                  "left_command"
                ],
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "spacebar",
              "modifiers": [
                "left_command"
              ]
            }],
            "type": "basic"
          }]
        },
        {
          "description": "Change L⌥ + R⌥ to L⌥ + ␣",
          "manipulators": [{
            "from": {
              "key_code": "right_option",
              "modifiers": {
                "mandatory": [
                  "left_option"
                ],
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "spacebar",
              "modifiers": [
                "left_option"
              ]
            }],
            "type": "basic"
          }]
        },
        {
          "description": "Change L⌥ to ⇥(if alone)",
          "manipulators": [{
            "from": {
              "key_code": "left_option",
              "modifiers": {
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "left_option"
            }],
            "to_if_alone": [{
              "key_code": "tab"
            }],
            "type": "basic"
          }]
        },
        {
          "description": "Change R⌥ to ⎋(if alone)",
          "manipulators": [{
            "from": {
              "key_code": "right_option",
              "modifiers": {
                "optional": [
                  "any"
                ]
              }
            },
            "to": [{
              "key_code": "right_option"
            }],
            "to_if_alone": [{
              "key_code": "escape"
            }],
            "type": "basic"
          }]
        },
        {
          "description": "コマンドキーを単体で押したときに、英数・かなキーを送信する。（左コマンドキーは英数、右コマンドキーはかな）",
          "manipulators": [{
              "from": {
                "key_code": "left_command",
                "modifiers": {
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "left_command"
              }],
              "to_if_alone": [{
                "key_code": "japanese_eisuu"
              }],
              "type": "basic"
            },
            {
              "from": {
                "key_code": "right_command",
                "modifiers": {
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "right_command"
              }],
              "to_if_alone": [{
                "key_code": "japanese_kana"
              }],
              "type": "basic"
            }
          ]
        },
        {
          "description": "Change FN1 to (, ⇧ + FN1 to <",
          "manipulators": [{
              "from": {
                "key_code": "international3",
                "modifiers": {
                  "mandatory": [
                    "left_shift"
                  ],
                  "optional": [
                    "shift"
                  ]
                }
              },
              "to": [{
                "key_code": "comma",
                "modifiers": [
                  "left_shift"
                ]
              }],
              "type": "basic"
            },
            {
              "from": {
                "key_code": "international3",
                "modifiers": {
                  "mandatory": [
                    "right_shift"
                  ],
                  "optional": [
                    "shift"
                  ]
                }
              },
              "to": [{
                "key_code": "comma",
                "modifiers": [
                  "right_shift"
                ]
              }],
              "type": "basic"
            },
            {
              "from": {
                "key_code": "international3",
                "modifiers": {
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "9",
                "modifiers": [
                  "right_shift"
                ]
              }],
              "type": "basic"
            }
          ]
        },
        {
          "description": "Change FN2 to ), ⇧ + FN2 to >",
          "manipulators": [{
              "from": {
                "key_code": "international1",
                "modifiers": {
                  "mandatory": [
                    "left_shift"
                  ],
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "period",
                "modifiers": [
                  "left_shift"
                ]
              }],
              "type": "basic"
            },
            {
              "from": {
                "key_code": "international1",
                "modifiers": {
                  "mandatory": [
                    "right_shift"
                  ],
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "period",
                "modifiers": [
                  "right_shift"
                ]
              }],
              "type": "basic"
            },
            {
              "from": {
                "key_code": "international1",
                "modifiers": {
                  "optional": [
                    "any"
                  ]
                }
              },
              "to": [{
                "key_code": "0",
                "modifiers": [
                  "right_shift"
                ]
              }],
              "type": "basic"
            }
          ]
        }
      ]
    },
    "devices": [{
        "disable_built_in_keyboard_if_exists": true,
        "fn_function_keys": [],
        "identifiers": {
          "is_keyboard": true,
          "is_pointing_device": false,
          "product_id": 4871,
          "vendor_id": 65261
        },
        "ignore": false,
        "manipulate_caps_lock_led": false,
        "simple_modifications": []
      },
      {
        "disable_built_in_keyboard_if_exists": false,
        "fn_function_keys": [],
        "identifiers": {
          "is_keyboard": true,
          "is_pointing_device": false,
          "product_id": 630,
          "vendor_id": 1452
        },
        "ignore": false,
        "manipulate_caps_lock_led": true,
        "simple_modifications": []
      },
      {
        "disable_built_in_keyboard_if_exists": false,
        "fn_function_keys": [],
        "identifiers": {
          "is_keyboard": true,
          "is_pointing_device": false,
          "product_id": 628,
          "vendor_id": 1452
        },
        "ignore": false,
        "manipulate_caps_lock_led": true,
        "simple_modifications": []
      }
    ],
    "fn_function_keys": [{
        "from": {
          "key_code": "f1"
        },
        "to": {
          "key_code": "display_brightness_decrement"
        }
      },
      {
        "from": {
          "key_code": "f2"
        },
        "to": {
          "key_code": "display_brightness_increment"
        }
      },
      {
        "from": {
          "key_code": "f3"
        },
        "to": {
          "key_code": "mission_control"
        }
      },
      {
        "from": {
          "key_code": "f4"
        },
        "to": {
          "key_code": "launchpad"
        }
      },
      {
        "from": {
          "key_code": "f5"
        },
        "to": {
          "key_code": "illumination_decrement"
        }
      },
      {
        "from": {
          "key_code": "f6"
        },
        "to": {
          "key_code": "illumination_increment"
        }
      },
      {
        "from": {
          "key_code": "f7"
        },
        "to": {
          "key_code": "rewind"
        }
      },
      {
        "from": {
          "key_code": "f8"
        },
        "to": {
          "key_code": "play_or_pause"
        }
      },
      {
        "from": {
          "key_code": "f9"
        },
        "to": {
          "key_code": "fastforward"
        }
      },
      {
        "from": {
          "key_code": "f10"
        },
        "to": {
          "key_code": "mute"
        }
      },
      {
        "from": {
          "key_code": "f11"
        },
        "to": {
          "key_code": "volume_decrement"
        }
      },
      {
        "from": {
          "key_code": "f12"
        },
        "to": {
          "key_code": "volume_increment"
        }
      }
    ],
    "name": "Default profile",
    "selected": true,
    "simple_modifications": [{
      "from": {
        "key_code": "caps_lock"
      },
      "to": {
        "key_code": "left_control"
      }
    }],
    "virtual_hid_keyboard": {
      "caps_lock_delay_milliseconds": 0,
      "keyboard_type": "ansi"
    }
  }]
}
```

そんなこんなで年も明けてだいぶたつけど、去年末にもあとめた一連の入力環境カスタマイズシリーズはおしまい。
整理するにあたって確認しなおしたのでこれからはあんまり変わることはなさそう。

とはいえ、キーバインドあたりはまだまだ何とかしたい感ある。
装飾キーの押し分けによってスコープを変えたい、例えば<kbd>Cmd</kbd>単体ならアクティブなウィンドウの操作、<kbd>Cmd</kbd>+<kbd>Ctlr</kbd>ならアクティブなアプリの操作、<kbd>Cmd</kbd>+<kbd>Ctlr</kbd>+<kbd>Alt</kbd>でグローバルな操作、とか。

そうやりたいのはやまやまなんだけど、デフォルトで設定されてるキーバインドも大事にしたくて、その両方の落としどころが上手く見つからない感じ。
