---
title: これがないと捗らない、僕のErgoDoxファームウェア（late 2017）
slug: ergodox-customize-late-2017
tags:
  - カスタマイズ
  - 開発
  - Hack
  - Mac
date: 2018-01-23T00:00:00.000Z
---
昨年末から続いてる極まりつつある入力環境シリーズ、今回はソフト的な設定ではなく外付けキーボードのハードウェア的な設定の話。普段家でも職場でもMacBookProを使っていて持ち運ばないときはErgoDoxEZという外付けキーボードを使っている。これがいろいろ柔軟に設定できるのでその話。

<div class="series"><div class="seriesTitle">最近極まりつつある入力環境カスタマイズシリーズ</div><ul class="seriesList"><li class="seriesItem">[これがないと捗らない、僕が使ってるAtomパッケージ（late 2017）](/atom-packages-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕がカスタムしてるAtom設定（late 2017）](/atom-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のAquaSKKカスタマイズ（late 2017）](/aqua-skk-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のErgoDoxファームウェア設定（late 2017）](/ergodox-customize-late-2017)</li><li class="seriesItem">[これがないと捗らない、僕のKarabiner-elementsカスタマイズ（late 2017）](/karabiner-customize-late-2017)</li></ul></div>

![](https://lh3.googleusercontent.com/uHqco8egYCsSxUKXU5HpWAPvqLYxnmSdqePjGSe5UvHRirV32fsjPc4JRSvAgyeDUyaLiI_UmvjqbDD6BA2S9uIQKCzsFqKQefUQGt6Jzv_eqSuVVXq-zf5f_GalkIBaidktsaJA6z7aQNgREHhe_y-Ic_eSRTC6nW7P6Qkl4X1xNgBXL8kMuwp8RbvFP-qYxGtUkURDxKiwPhiCYzRpCKquBJ1h-yUPisNtievZYqPIk27nYhkeA-f4CqnGfCXWzDN7INgJWosFrHauRgRb_gcM9IP6JMdZuu3zC2GQTQ9ms0LJRA50vbJ0T71UjS9EOQ0jDFfo1Z4eZwfhM0NFAbSDQ2pENqwJMCo0kgN0YugxmroJf5ysPjFP_4knZMFcV9o16IohwCrXiOFiMF15IR59hfOzUmtZXw6nqWRs9H1DzgR8CcVXlSw2sgHSL6oUWf2_vFQAB1qmr4DPR_6K7voJE0HLyi62uOK-dKhw351fBjKp0YSF3_7gbht2tyI3BQGB_eEr5sgyoM52CQulWRtPphh_1SGTkC57YHxkcP1zmoN3fK97jGGdbXvbOkKL50uJHTxUNvQAVibQ8XtyptXReWoVm8BsC1uUcV7NMFCKAiKXmjByzBoZOMByg6xCeVpYqvk-xjT62rxIzFWRWZmTdqhJsE0F=s1913-no)

## ErgoDox
ErgoDoxという風変りなキーボードを知っているだろうか？　以前エンジニア界隈で話題になったけど、左右セパレート型かつ親指周りに多めにキーを配置したのが基本形のキーボードがある。昔からある最強にして変態キーボードと名高いKinesisと似てる使用感がありつつ、左右セパレートを実現している。そして、ファームウェア（押したキーに対する挙動の設定）をキーボード側に書き替えれるので自分の好みの配置にできるのが素晴しい。

### ErgoDoxEZ
ErgoDoxとは半自作キーボードであり、通常はキットで自分ではんだ付けして組み立てる。が、組み立て済みのセットとして、ErgoDoxEZというのもある。こちらはフルセットかつ作りもしっかりしていて、保証もある。逆にキットで自作するほうが色とか本当に自分好みにできる。

そんなわけで僕はEZのほうを使ってるけど、一度トラブルがあったもののすぐに、本当にすぐに交換対応してくれたので保証があって良かったなぁ、と思う。そして備え付けの角度調節用の足も良い感じ。EZでもCherry MX軸の中のいくつかから軸は選べる（僕は赤軸使用。欲を言えばピンク軸が欲しかった）。し、キーキャップはEZの販売サイト以外でも手に入る。

もちろんキットで自作するよりは高く付くものの、保証や出来を考えるとEZも値段的バリューは悪くないと思う。特に台湾から発送なので送料はキットよりも安い（キットはヨーロッパから）。ドル立てとユーロ立ての為替も関係してくるけど。

#### Kinesisとの使用感比較
ErgoDox以前はKinesisユーザだったので、簡単に思い出せる範囲内で使用感を比較してみよう。

打鍵感は、今のErgoDoxのほうが良いかな。でもKinesisの時はデフォルトの茶軸、今のErgoDoxは好みに合った赤軸を使ってるからな気がする。正直、Kinesisの赤軸と比較しないとなんとも。あとはキーキャップ替えたりO-ring噛ませたりでタッチは変わってくる。

キーキャップはKinesisは専用で選択の余地がないけど、エルゴノミクスデザインが素晴らしい。手の自然な形状に合うような気がする。ErgoDoxはキーキャップの選択の余地があるものの、1つ1つが専用の傾斜があるわけではない。ただし、足などでキーボード全体の傾斜を整えれば結構肉薄できてると思う。

パームレストはErgoDoxは必須だと思う。専用がもちろん良いけど、下で紹介してるような安価なものでも十分。Kinesisは本体がパームレストも兼ねてるし、固いなら付属のパッドをくっつければ十分だと思う。

<div class="cstmreba"><div class="kaerebalink-box"><div class="kaerebalink-image"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B000JCEP5K/akicks-22/" target="_blank"><img src="https://images-fe.ssl-images-amazon.com/images/I/41-nDBDwqJL._SL160_.jpg" style="border: none;"></a></div><div class="kaerebalink-info"><div class="kaerebalink-name"><a href="http://www.amazon.co.jp/exec/obidos/ASIN/B000JCEP5K/akicks-22/" target="_blank">エレコム リストレスト 疲労軽減 "COMFY" ショート(ブラック) MOH-013BK</a><div class="kaerebalink-powered-date">posted with <a href="http://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail"> エレコム 2006-10-14    </div><div class="kaerebalink-link1"><div class="shoplinkamazon"><a href="http://www.amazon.co.jp/gp/search?keywords=%E3%82%A8%E3%83%AC%E3%82%B3%E3%83%A0%20%E3%83%AA%E3%82%B9%E3%83%88%E3%83%AC%E3%82%B9%E3%83%88&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&tag=akicks-22" target="_blank">Amazonで探す</a></div><div class="shoplinkrakuten"><a href="https://hb.afl.rakuten.co.jp/hgc/12d74c18.2043b39b.12d74c19.fa137382/?pc=http%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25A8%25E3%2583%25AC%25E3%2582%25B3%25E3%2583%25A0%2520%25E3%2583%25AA%25E3%2582%25B9%25E3%2583%2588%25E3%2583%25AC%25E3%2582%25B9%25E3%2583%2588%2F-%2Ff.1-p.1-s.1-sf.0-st.A-v.2%3Fx%3D0%26scid%3Daf_ich_link_urltxt%26m%3Dhttp%3A%2F%2Fm.rakuten.co.jp%2F" target="_blank">楽天市場で探す</a></div></div></div><div class="booklink-footer"></div></div></div>

大きさと置き場所的には断然ErgoDoxのほうが上。セパレート型は慣れると素晴しい。左右の手の間隔を自分で決められるのは思ってる以上にデカい。その証拠に僕の自宅のイスの写真を載せておこう。もはやキーボードは机に置く必要すらない。Kinesisだとこうは行かず机に置かざるを得ない。しかも単体の大きさがそれなりにあるのでいろいろ物理的制約が出てくる。ErgoDoxだとセパレートなので左右の間にMacBookProを挟んで（僕の職場仕様はこのスタイル）も全く問題ない。

キーカスタマイズはErgoDoxのほうがやや上かな。ファームウェアを自分でビルドして書き替えなきゃいけないものの、ビルドはDockerで、書き替えは専用ソフトでやっちゃえば良いので一度やれば変更はそんなに大変じゃない。最初はちょっと戸惑うけど。ただそのぶん、柔軟性は随一。Kinesisのキー設定も必要十分でキーの入れ替えはもちろんマクロ登録もできる。加えてレイヤーにも分けれるのでErgoDoxにもひけを取らない。

#### ErgoDoxのキーカスタム
ここでようやく本題。とりあえずソースを。
```
// Netable differences vs. the default firmware for the ErgoDox EZ:
// 1. The Cmd key is now on the right side, making Cmd+Space easier.
// 2. The media keys work on OSX (But not on Windows).
// make clean && make keyboard=ergodox subproject=ez keymap=my-keymap
#include "ergodox_ez.h"
#include "debug.h"
#include "action_layer.h"

#define BASE 0 // default layer
#define MOVE 1 // Cursol keys and Mouse Keys
#define CALC 2 // Keys like a calculator
/* period of tapping(ms) */
#ifndef TAPPING_TERM
/* #define TAPPING_TERM    200 */
#define TAPPING_TERM    75
#endif

const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
/* Keymap 0: Basic layer
 *
 * ,-----------------------------------------------------.     ,-----------------------------------------------------.
 * | ESC    |   1  |   2  |   3  |    4    |   5  |  `~  |     |  '"  |   6  |    7    |   8  |   9  |   0  |  \|    |
 * |--------+------+------+------+---------+-------------|     |------+------+---------+------+------+------+--------|
 * | TAB    |   Q  |   W  |   E  |    R    |   T  |  [   |     |  ]   |   Y  |    U    |   I  |   O  |   P  |  '"    |
 * |--------+------+------+------+---------+------|  {   |     |  }   |------+---------+------+------+------+--------|
 * | LCtrl  |   A  |   S  |   D  |    F    |   G  |------|     |------|   H  |    J    |   K  |   L  |  ;:  |  -_    |
 * |--------+------+------+------+---------+------|     |------+---------+------+------+------+--------|
 * | LShift |   Z  |   X  |   C  |    V    |   B  |  (   |     |  )   |   N  |    M    |  ,  |  /?  |  +=    |
 * `--------+------+------+------+---------+-------------'     `-------------+---------+------+------+------+--------'
 *   |  ~L2 |  ~L1 | Left | Right|LGui/Eisu|                                 |RGui/Kana|  Up  | Down |  ~L1 | ~L2  |
 *   `-------------------------------------'                                 `-------------------------------------'
 *                                        ,-----------------.    ,-----------------.
 *                                        |LCtrl   | LAlt   |    | RAlt   |  RCtrl |
 *                                 ,------|--------|--------|    |--------+--------+------.
 *                                 |      |        | Tab    |    | Tab    |        |      |
 *                                 | Space| Del    |--------|    |--------| BKspc  |Enter |
 *                                 |LShift| LCtrl  |LAlt/TAB|    |RAlt/ESC|        |      |
 *                                 `------------------------'    `------------------------'
 */
// If it accepts an argument (i.e, is a function), it doesn't need KC_.
// Otherwise, it needs KC_*
[BASE] = KEYMAP(  // layer 0 : default
        // left hand
        KC_ESC,  KC_1,    KC_2,      KC_3,    KC_4,    KC_5,                 KC_GRV,
        KC_TAB,  KC_Q,    KC_W,      KC_E,    KC_R,    KC_T,                KC_LBRC,
        KC_LCTL, KC_A,    KC_S,      KC_D,    KC_F,    KC_G,
        KC_LSFT, KC_Z,    KC_X,      KC_C,    KC_V,    KC_B,                KC_JYEN,
                      // MO(CALC),  MO(MOVE), KC_LEFT, KC_RGHT, MT(MOD_LGUI, KC_LANG2),
                      MO(CALC),  KC_LALT, KC_LEFT, KC_RGHT, KC_LGUI,
                                                      KC_LCTL,              KC_LALT,
                                                                             KC_TAB,
                  //  MT(MOD_LSFT, KC_SPC), MT(MOD_LCTL, KC_DEL), MT(MOD_LALT, KC_TAB),
                                                            KC_SPC, KC_DEL, KC_LALT,
        // right hand
        KC_QUOTE,  KC_6,                   KC_7,    KC_8,    KC_9,     KC_0,  KC_BSLS,
        KC_RBRC,   KC_Y,                   KC_U,    KC_I,    KC_O,     KC_P,  KC_QUOT,
                   KC_H,                   KC_J,    KC_K,    KC_L,  KC_SCLN,  KC_MINS,
        KC_RO,     KC_N,                   KC_M, KC_COMM,  KC_DOT,  KC_SLSH,   KC_EQL,
                        //  MT(MOD_RGUI, KC_LANG1),   KC_UP, KC_DOWN, MO(MOVE), MO(CALC),
                   KC_RGUI,               KC_UP, KC_DOWN, KC_RALT, MO(MOVE),
             KC_RALT, KC_RCTL,
             KC_TAB,
            //  MT(MOD_RALT, KC_ESC), KC_BSPC, KC_ENT
             KC_RALT, KC_BSPC, KC_ENT
    ),
/* Keymap 1: Media and mouse keys
 *
 * ,--------------------------------------------------------.      ,--------------------------------------------------.
 * | TRANS  |  F1  |   F2   |   F3   |   F4   |  F5  |      |      | Power|  F6  |  F7  |  F8  |  F9  |  F10 |   F11  |
 * |--------+------+--------+--------+--------+-------------|      |------+------+------+------+------+------+--------|
 * | TRANS  |      |        |  MsUp  |        |      | WhUp |      | WhUp |      |      | UP   |      |      |   F12  |
 * |--------+------+--------+--------+--------+------|      |      |      |------+------+------+------+------+--------|
 * | TRANS  |WhLeft| MsLeft | MsDown | MsRght |WhRght|------|      |------|      | Left | Down | Right|      |  VolU  |
 * |--------+------+--------+--------+--------+------|WhDown|      |WhDown|------+------+------+------+------+--------|
 * | TRANS  |      |        |        |        |      |      |      |      |      |      |      |      |      |  VolD  |
 * `--------+------+--------+--------+--------+-------------'      `-------------+------+------+------+------+--------'
 *   | TRANS| TRANS| TRANS  | TRANS  | TRANS  |                                  | TRANS| TRANS|TRANS | TRANS| TRANS  |
 *   `----------------------------------------'                                  `------------------------------------'
 *                                        ,-------------.       ,-------------.
 *                                        | TRANS| TRANS|       | TRANS| TRANS|
 *                                 ,------|------|------|       |------+------+------.
 *                                 |      |      | TRANS|       | TRANS|      |      |
 *                                 | Lclk | Rclk |------|       |------|MsAcl2|MsAcl1|
 *                                 |      |      | WhClk|       |MsAcl0|      |      |
 *                                 `--------------------'       `--------------------'
 */
// Cursor Keys and Mouse Keys
[MOVE] = KEYMAP(
       KC_TRNS,  KC_F1,   KC_F2,   KC_F3,   KC_F4,   KC_F5,  KC_MUTE,
       KC_TRNS,  KC_NO,   KC_NO,   KC_MS_U, KC_NO,   KC_NO,  KC_WH_D,
       KC_TRNS,  KC_WH_L, KC_MS_L, KC_MS_D, KC_MS_R, KC_WH_R,
       KC_TRNS,  KC_NO,   KC_NO,   KC_NO,   KC_NO,   KC_NO,  KC_WH_U,
       KC_TRNS,  KC_TRNS, KC_TRNS, KC_TRNS, KC_TRNS,
                                           KC_TRNS, KC_TRNS,
                                                    KC_TRNS,
                                  KC_BTN1, KC_BTN2, KC_BTN3,
    // right hand
       KC_PWR,  KC_F6,    KC_F7,    KC_F8,   KC_F9,   KC_F10, KC_F11,
       KC_WH_D, KC_NO,    KC_NO,    KC_UP,   KC_NO,   KC_NO,  KC_F12,
                KC_NO,    KC_LEFT,  KC_DOWN, KC_RGHT, KC_NO,  KC_VOLU,
       KC_WH_U, KC_NO,    KC_NO,    KC_NO,   KC_NO,   KC_NO,  KC_VOLD,
                          KC_TRNS,  KC_TRNS, KC_TRNS, KC_TRNS,  KC_TRNS,
       KC_TRNS, KC_TRNS,
       KC_TRNS,
       KC_ACL0, KC_ACL2, KC_ACL1
     ),


/* Keymap 2: Keys like a Culculator
 *
 * ,---------------------------------------------------.           ,--------------------------------------------------.
 * | TRANS   |      |      |      |      |      |      |           |      |      |   7  |   8  |   9  |      |        |
 * |---------+------+------+------+------+------+------|           |------+------+------+------+------+------+--------|
 * | TRANS   |      |      |  UP  |      |      |WhDown|           |WhDown|      |   4  |   5  |   6  |   *  |   /    |
 * |---------+------+------+------+------+------|      |           |      |------+------+------+------+------+--------|
 * | TRANS   |WhLEFT| LEFT | DOWN | RIGHT|WhRght|------|           |------|      |   1  |   2  |   3  |   +  |   -    |
 * |---------+------+------+------+------+------|WhUp  |           |WhUp  |------+------+------+------+------+--------|
 * | TRANS   |      |      |      |      |      |      |           |      |      |   0  |   0  |   .  |   +  |   =    |
 * `---------+------+------+------+------+-------------'           `-------------+------+------+------+------+--------'
 *   | TRANS | TRANS| TRANS| TRANS| TRANS|                                       | TRANS| TRANS| TRANS| TRANS| TRANS  |
 *   `-----------------------------------'                                       `------------------------------------'
 *                                        ,-------------.       ,-------------.
 *                                        | TRANS| TRANS|       | TRANS| TRANS|
 *                                 ,------|------|------|       |------+------+------.
 *                                 |      |      | TRANS|       | TRANS|      |      |
 *                                 | TRANS|TRANS |------|       |------| TRANS| TRANS|
 *                                 |      |      | TRANS|       | TRANS|      |      |
 *                                 `--------------------'       `--------------------'
 */
// act like ten keys
[CALC] = KEYMAP(
       // left hand
       KC_TRNS,  KC_NO,   KC_NO,   KC_NO,   KC_NO,   KC_NO,  KC_NO,
       KC_TRNS,  KC_NO,   KC_NO,   KC_UP,   KC_NO,   KC_NO,  KC_WH_D,
       KC_TRNS,  KC_WH_L, KC_LEFT, KC_DOWN, KC_RIGHT,KC_WH_R,
       KC_TRNS,  KC_NO,   KC_NO,   KC_NO,   KC_NO,   KC_NO,  KC_WH_U,
       KC_TRNS,  KC_TRNS, KC_TRNS, KC_TRNS, KC_TRNS,
                                           KC_TRNS, KC_TRNS,
                                                    KC_TRNS,
                                  KC_TRNS, KC_TRNS, KC_TRNS,
       // right hand
       KC_TRNS, KC_NO,   KC_P7,  KC_P8,   KC_P9,   KC_NO,   KC_NO,
       KC_WH_D, KC_NO,   KC_P4,  KC_P5,   KC_P6,   KC_PAST, KC_PSLS,
                KC_NO,   KC_P1,  KC_P2,   KC_P3,   KC_PLUS, KC_PMNS,
       KC_WH_U, KC_NO,   KC_P0,  KC_PDOT, KC_PEQL, KC_PLUS, KC_PEQL,
                         KC_TRNS,KC_P0,   KC_PDOT, KC_TRNS, KC_TRNS,
       KC_TRNS, KC_TRNS,
       KC_TRNS,
       KC_TRNS, KC_TRNS, KC_TRNS
     ),


};
enum function_id {
  LEFT_BRACE, RIGHT_BRACE
};
const uint16_t PROGMEM fn_actions[] = {
    // [13] = ACTION_KEY(KC_LPRN),              // FN13 - ( 
    // [14] = ACTION_KEY(KC_RPRN)              // FN14 - ) >
};
// #define MY_FN13 KC_LPRN
// #define MY_FN14 KC_RPRN
// #define S(MY_FN13) KC_LABK
// #define S(MY_FN14) KC_RABK
const macro_t *action_get_macro(keyrecord_t *record, uint8_t id, uint8_t opt)
{
  // MACRODOWN only works in this function
      switch(id) {
        case 0:
        if (record->event.pressed) {
          register_code(KC_RSFT);
        } else {
          unregister_code(KC_RSFT);
        }
        break;
      }
    return MACRO_NONE;
};

// Runs just one time when the keyboard initializes.
void matrix_init_user(void) {

};
// Runs constantly in the background, in a loop.
void matrix_scan_user(void) {

    uint8_t layer = biton32(layer_state);

    ergodox_board_led_off();
    ergodox_right_led_1_off();
    ergodox_right_led_2_off();
    ergodox_right_led_3_off();
    switch (layer) {
      // TODO: Make this relevant to the ErgoDox EZ.
        case 1:
            ergodox_right_led_1_on();
            break;
        case 2:
            ergodox_right_led_2_on();
            break;
        default:
            // none
            break;
    }

};
```

##### 基本
基本はQWERTY配列。外出時などMacBookPro側のキーを叩くこともあるし、自分のじゃないキーボードを触るときに戸惑うのでQWERTYからなるべく外れないように指の互換性をキープ。

##### 親指まわり
ErgoDoxの特徴的な配置の親指周りのキー。ここはKarabiner設定でも紹介するけど、SandS（単体押しがSpace、他のキーと組み合わせるとShift）が大活躍。一番使うところ左にSandSキー、その隣はDelete(Forwerd) OR Ctrl。右はEnterとBackSpace。あとはOptionやTABやESCなど。

ちなみに単体押しと同時押しで違う挙動をさせるのはファームウェアでも設定できるけど僕の場合はKarabinerでやってる。実は厳密な挙動が少し違う。

例えば、単体だとAキー、他のキーと押すとBキーとして動作させたいとする。
ErgoDox DoubleFunctionだと、キーを押しつづけると一定時間後にBキーになる。これだとほぼ同時押しに近いような場合、Bキーとして動作しない。単体の時も一定時間以上の場合はBキーだけが入力される。要はKey-Downの時間が一定以上でKey-Up時に入力されるキーが変わる仕様。もっとわかりやすく言えば、普通に押すときと長押しで変わる、という感じ。

Karabinerの場合、まずBキーとして認識され、一定時間以内に他のキーの入力なく離した場合だけAキーとして認識される。この挙動の場合、同時押ししてもBキーになるし、キーを押したまま組み合わせるキーを迷っていてもBキーのまま。単体で入力するときのKey-downからKey-upの時間はわりと一定に収束するので、その時にだけAキーとして入力されるほうが都合が良い。

すごく細かい話だけど、やってみるとかなり使い勝手が変わってくるので重要。本来ならErgoDox側で設定できるならそちらでやるほうが設定と動くものの整合性というかレイヤー的に理に叶ってるんだけど、この違いはデカいのでしょうがない感。

##### 周りのキー
外側一列と内側一列にあるキー達。左手外側には普通のUSキーボードと同じような感じで特殊キーを配置。右手外側も同じ感じで記号キーを配置。左手内側にはカッコ郡を配置。

具体的に、左手内側上は<kbd>[</kbd>,<kbd>{</kbd>、右手内側上に<kbd>]</kbd>,<kbd>}</kbd>、左手内側下には独自キー用に<kbd>FN1</kbd>を指定、逆には<kbd>FN2</kbd>。そしてこれをKarabinerで<kbd>(</kbd>,、<kbd>)</kbd>,<kbd>></kbd>に割り当てる。これはErgoDoxのファームウェア側だと単押しがすでに<kbd>Shift</kbd>と組み合わせる入力の場合、さらに<kbd>Shift</kbd>を追加する入力が上手く設定できなかったため。<kbd>FN</kbd>キーに設定していったん逃がしてから、<kbd>FN1</kbd>単押しで<kbd>Shift</kbd>+<kbd>9</kbd>、<kbd>Shift</kbd>+<kbd>FN1</kbd>では<kbd>Shift</kbd>+<kbd>,</kbd>が入力されるように設定して実現させている。

##### レイヤー系
レイヤーはメイン以外に2つ設定していて、1つは上下左右への矢印キーを直感的にしたものと、マウス操作。もうひとつはテンキー操作。これはKinesisにもあったのでなかなか良い。

ちなみに内側の特殊キーにマウスホイールのエミュレート（つまりスクロール）を割り当ててるけどこれもなかなか良い。

必要ないところはぜんぶ割り当てない設定にしてる。

## Karabiner-element Required
シリーズ内別記事でKarabinerカスタマイズを紹介する（してる）けど、上記に書いてあるようにかなり頼ってる部分というか密結合してる。本当はあまりよろしくないとは思いつつも他に手段がないうえ、使い勝手には替えられないのでしかたなし。

小気味良いSandS入力なしにSKKと親指多用のErgoDoxは実現しえない。
