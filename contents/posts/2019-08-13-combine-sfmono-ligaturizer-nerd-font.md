---
title: SFMono + FiraCode記号リガチャ + NerdFont化 したらイイ感じのプログラミングフォントが爆誕した
tags:
  - 開発
  - カスタマイズ
  - Hack
  - フォント
date: 2019-08-13T23:20:00.000Z
image: /images/covers/2019-08-13-combine-sfmono-ligaturizer-nerd-font.jpg
---
MacにはSFMonoというシュっとした等幅フォントがあります。
FiraCodeというフリーフォントは特定の文字の組み合わせで文字が変化するリガチャを利用したプログラミング特化の記号があります。
Shellのプロンプトを見やすくするPowerLineに対応したアイコンフォントに対応したNerdFontsというプロジェクトがあります。
この3つを組み合わせたら「これぞまさしく僕の求めていたもの！」と思えるプログラミングフォントが出来ました。
メガテンで言うと強いヤツを掛け合わせた三身合体したら最高の仲魔ができました、みたいな。

## できたもの
まず最初にできたもののお披露目。
どんな感じかというと
![](https://lh3.googleusercontent.com/szlLnoEn24-Q0auSfzB5MY4bnmENbq5HOO7Mo3oF2xfU-rs-TsB3tl568r17Z_GW1YsUoW2kj15D8adyExTnQcYPvco4Zy_MUPLXsiqTCJ6sjnCJCXVY7HPK7FVcWhBGM6EztFVfcfecZ37gkYvqYxnHWGjA2PDgSgFoDqHmuRRlRgTgryWMTxRlqIwcjUTOmkrwlHpGCoBCgkcLePgDn0ZkV02pnSeqNs6JWL0xI7yh-y0Oz_PIgErEmrS4oGT4EB48KDiGsisBueEHb4t2wnp1yNZZwJ7vqQ6yRRJp23helQazPtgfBDXjf9W676K7buKb_FxpVUbqR4oGwIaE8SAcM6Z_F2pitQRdW7IzhlM2-4QVAqT_2mBqlnjNAHlSqtLOIK0qli47SQLvpA1MPObvwuSSMLhrbzRk8lk9ZBL-RlRYqBu-S_p_LfNaa2rVk3qsxRS4cch2ipP0bDQyyn7kvcfetEs60_7BTDrGnmTBJNoDUjFkhF-jlCNBHP3bgsl0qMryVtIKbZtpZg14Ec9v9_xkR_vswJQpm_Yz9CAohRCECSlw2y7kJ1dlHyKGy55VVlm9kGGlMGJJM9cWNGE2hfFuCk985HyXiYdMtVRuw9qixe5D1oSBQTyz8_FJG8gKQcKqz-lmUs0O7PHkmwKgX7EQvp0w5lxjvd9JXQvZ8o-jdCnGTA2v6MVLUyQyx6uO48CUeW1H-NcBaqVCHO1K=w1128-h396-no)

![](https://lh3.googleusercontent.com/CD6HSubSAi_H2DyhYivoApykH087en5NlE-fA9TrC3KZZZYWHOYX1ORKjhHgev50w1FSb1pa_kSJ5s-T3T2q8QkgN3H_mkiRfoeFr8KKaw7yH5LEi53ZQ3IwC0Yqd2bKywN2MS_Ucxk3k08I-e0vV_yVZrwB98XDs3XJx9oKAprnriLxalDstgRhm3-jQ2b8O75IK-XSH9KL1jSYgxTwnfmrJTIXuIZPJuPLwmxCROWW2pj5mV1TQoV6q5IU0srbIZ7sV0rMjeXHY47_YZO-5DTOMesm0nz2aq428rZZOEfx0UIZa5Dl2DrVhYqdaH5cXK_WLHzDd5Cu9fXxnqZicuRAQFagJ5wOiTQc8QaOakiIDiBLfE1ZWnCov8DQNIRBYY_LGnU7Mn-HoBkTFaY64kMVuhX6T4l9RtFKduEvn_KzrVIgFGich4iKjVYZAb3jpA4LWTFJ3CQeYIwSSaUVic_afhUnJPqCZFSg6g5ExwFylTHst9fgMtVSxx1L_0R8j26RWXx2EdnIT445QoVMiqyEV3a-rfUSBvw3VsH1lRlthkAfMbq6DwD57TPzE1ddgPqh0wpw3yJCZ2BeW32NjayyvshL5MwKCh6P8MJS00u2dq2hHlOff2KiPR3fKKfAznht_VwW31Mgxd_8VRcPAru9v1UXxF44lNZ1ZCWAfqgr7le1eVkTAlSzMpdJMkX6yhiSo6aVjCjAeRzbAG1THiHS=w1272-h672-no)

こんな感じです。良いでしょ？　最高でしょ？

## SFMono
SFMonoは通常では選択できませんが、macOS Sierra以降のTerminalの中にあります。Terminal以外で使うにはこれをいったんTerminalから取り出す必要があります。
Finderから`MacintoshHD/Applications/Utilities/`に`Terminal.app`があるので、Ctrl+クリック（or右クリック）して`パッケージの中身を表示`とすると中が見れます。
中の`Contents/Resources/Fonts/`の中に`SFMono-*`という各ウェイトに対応したフォントがあります。
よく場所がわからなければFinderで<key>Cmd</key>+<key>shift</key>+<key>g</key>を押して移動先を指定するところで`/Applications/Utilities/Terminal.app/Contents/Resources/Fonts/`と入力してください。

今回はこれを合成したいのでいったん、デスクトップなどのわかりやすい場所にコピーしてください。普通に使うだけならダブルクリックするかFontBook.appで開くかしてインストールすればSFMonoが使えます。

## リガチャ合成
リガチャによる記号の変化はFiraCodeを参照するとわかりやすいと思います。

<LinkCard url="https://github.com/tonsky/FiraCode" site-name="GitHub" title="tonsky/FiraCode" description="Monospaced font with programming ligatures. Contribute to tonsky/FiraCode development by creating an account on GitHub." image-url="https://avatars2.githubusercontent.com/u/285292?s=400&v=4" />

この素敵なリガチャ対応記号を他のフォントに合成してしまおうというプロジェクトとして[Ligaturizer](https://github.com/ToxicFrog/Ligaturizer)というのがあります。
これを動作させるには`fontforge`というライブラリが必要なので
```
$ brew install fontforge
```
で入れます。
が、ここに少し落とし穴があって現在入る最新のfontforgeはpython3系のものらしく、LigaturizerはPython2系なので動作しないみたいです。
そこでPython3系で動作するForkのほうを使います。

<LinkCard url="https://github.com/rojiani/Ligaturizer-2.0" site-name="GitHub" title="rojiani/Ligaturizer-2.0" description="Add ligatures to any coding font! Contribute to rojiani/Ligaturizer-2.0 development by creating an account on GitHub." image-url="https://avatars0.githubusercontent.com/u/2679686?s=400&v=4" />

なお、もしかしたら
```
$ brew link fontforge
```
が必要かもしれません。
Ligaturizerの使い方は適宜READMEを参照してください。

これで、リガチャ記号入りのSFMonoができると思います。

## NerdFont化
さらにTerminal上でも快適に使うために、PowerLine対応のフォントにしたいと思います。
これにはNerdFontsプロジェクトを使います。ちなみにこのNerdFontsリポジトリは多数のNerdFont化されたフォントを含むためかなりcloneに時間がかかりますのでご注意ください。

<LinkCard url="https://github.com/ryanoasis/nerd-fonts" site-name="GitHub" title="ryanoasis/nerd-fonts" description=":abcd: Iconic font aggregator, collection, and patcher. 40+ patched fonts, over 3,600 glyph/icons, includes popular collections such as Font Awesome &amp; fonts such as Hack - ryanoasis/nerd-fonts" image-url="https://avatars0.githubusercontent.com/u/8083459?s=400&v=4" />

の中にある[FontPather](https://github.com/ryanoasis/nerd-fonts#font-patcher)というのスクリプトがあるので、それを使って先程作ったリガチャ入りSFMonoにアイコンフォントを合成していきます。
こちらでもfontforgeを使いますが、Ligaturizerが動いたなら問題なく動くと思います。
ちなみに、ちょっと面倒ですが1フォントづつ処理する必要があるので、ウェイトそれぞれにあてていく必要があります。

具体的には
```
$ fontforge -script ./font-patcher -c fonts/LigaSFMono-Regular.otf
```
みたいな感じです。fontforgeにスクリプトとしてfontpacherを指定します。`-c`オプションはとにかく全部のアイコンフォントをぶっこみます。

無事に処理されたら、rootディレクトリに`Liga SFMono Regular Nerd Font Complete.otf`みたいに合成されたフォントが出来ます。全部にあてたらダブルクリックや`FontBook.app`で開いてインストールすれば完了です。

## 使いかた
ここまでやって特に設定の変更などをしていなければ`LigaSFMono Nerd Font`という名前のフォントファミリーで作られたはずなので、使いたいアプリケーションでそのフォントを指定すればOKです。ヤッタネ！

## 余談
ちなみにここに至る経緯として

<LinkCard url="https://qiita.com/delphinus/items/f472eb04ff91daf44274" site-name="Qiita" title="SF Mono を使って最高のプログラミング用フォントを作った話 - Qiita" description="みなさんターミナルは使ってますか？ Terminal.app？ iTerm2？ Hyper？ それとも他の何か？ それではフォントは何を使っていますか？ Menlo？ Consolas？ Ricty？ 今日はそんなお話です。 * ..." image-url="https://cdn.qiita.com/assets/qiita-fb-2887e7b4aad86fd8c25cea84846f2236.png" />

を見てみて凄く良かったんですが、VSCode上でなんだか文字間が良い感じに表示できなかったのと、和文フォントがMigu 1Mだったので使いませんでした。
どうも僕はMigu 1Mの独特のまるっこい感じが好きになれません（もちろん素晴しいフォントだと思いますが、僕個人の好みの問題です）。

そして僕はNoto Sans JP系のコンセプトと字体が好きです。見やすさを調整されたNasuは是非オススメしたい。

<LinkCard url="http://itouhiro.hatenablog.com/entry/20140917/font" site-name="itouhiroはてなブログ" title="Nasuフォント ： 見た目が似ている文字を判別しやすくするフリーフォント - itouhiroはてなブログ" description="Nasu（ナス）フォントを作成しました。" image-url="http://cdn-ak.f.st-hatena.com/images/fotolife/i/itouhiro/20140916/20140916224949.png" />

FiraCodeのリガチャは素晴しいんですが、フォント自体はあまり好きになれませんでした（もちろんこれも好みの話です）。
ちなみに今まで使ってたのはSource Code Proの流れをくむHasklig。

<LinkCard url="https://github.com/i-tu/Hasklig" site-name="GitHub" title="i-tu/Hasklig" description="Hasklig - a code font with monospaced ligatures. Contribute to i-tu/Hasklig development by creating an account on GitHub." image-url="https://avatars2.githubusercontent.com/u/2201932?s=400&v=4" />
です。

自分の好みのフォントで作業をすると気分がご機嫌になるので、皆さんもぜひ俺の考えた最高の合成フォントを作ってみてください。
