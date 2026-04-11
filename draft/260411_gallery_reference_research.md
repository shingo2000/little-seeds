# ギャラリーページ新設 & 複数ページ化 参考サイト調査レポート

調査日: 2026-04-11

## 現状のサイト構成

### ディレクトリ・ファイル構成

```
/web/
├── index.html                  メインページ（1ページ完結型）
├── css/style.css               スタイルシート（1,243行）
├── js/main.js                  JavaScript（97行）
├── assets/images/              画像（36ファイル）
├── contact/
│   ├── index.html              お問い合わせフォーム
│   └── thanks.html             送信完了ページ
├── about/                      （空）
├── gallery/                    （空）
├── faq/                        （空）
├── plan/                       （空）
├── favicon.ico / robots.txt / sitemap.xml / .htaccess
```

### index.html のセクション構成（9セクション）

| # | セクション ID | 内容 |
|---|---|---|
| 1 | hero | サイトタイトル + スライドショー（5枚、3秒切替） |
| 2 | intro | "little seeds"の意味説明 |
| 3 | concept | 撮影哲学と安全性 |
| 4 | safety | 5つの安全対策 |
| 5 | plan | 撮影プラン・料金（ミニ27,000円/ベーシック38,700円） |
| 6 | flow | 予約から納品までの流れ（4ステップ） |
| 7 | profile | フォトグラファーAyako Suzukiの経歴 |
| 8 | area | 出張地域・費用表 |
| 9 | faq | 10項目のアコーディオンFAQ |
| 10 | contact | LINE連携・お問い合わせリンク |

### ナビゲーション

- ハンバーガーメニュー（フルスクリーンオーバーレイ）
- 全8項目、全てページ内アンカーリンク
- 固定ヘッダー（60px）、背景透明

### 技術スタック

- BEM命名法 + CSS変数
- ブレークポイント: 768px / 1024px
- フォント: Quicksand（英）+ 日本語フォント
- WebP画像 + レスポンシブ対応（3サイズ）
- Web3Forms API（お問い合わせフォーム）
- GTM統合、構造化データ（FAQPage, LocalBusiness, WebSite）

---

## 参考サイト調査

### 国内サイト

#### 1. スリーピングニューボーンフォト
- **URL:** https://sleeping-newbornphoto.com/

| トップページ | ギャラリーページ |
|:---:|:---:|
| ![トップ](../screenshots/01_sleeping_newborn_top.png) | ![ギャラリー](../screenshots/02_sleeping_newborn_gallery.png) |

**ページ構成:**
- トップ / ギャラリー / 新生児撮影 / お宮参り / フォトグラファー / 撮影エリア / お客様の声 / ブログ / 採用 / アカデミー

**ギャラリーの特徴:**
- WordPress（archive-gallery.php）でグリッドレイアウト表示
- FancyBox によるライトボックス表示
- フィルタリング機能なし、全作品を一覧表示
- 各写真にタイトルキャプション付き

**TOP→ギャラリー導線:**
- トップ中盤に横スクロールカルーセル（2段）で写真プレビュー
- 「ギャラリーをもっと見る」リンクで専用ページへ誘導
- Instagram公式へのリンクも併設

---

#### 2. ことり写真（kotori photography）
- **URL:** https://www.kotoriphoto.com/

| トップページ | ギャラリーページ |
|:---:|:---:|
| ![トップ](../screenshots/03_kotori_top.png) | ![ギャラリー](../screenshots/04_kotori_gallery.png) |

**ページ構成:**
- トップ / Newborn Plan / Baby・Kids Plan / Print Item / Gallery / About / Company / Access / Contact / Safety / Reviews / Blog

**ギャラリーの特徴:**
- 3列グリッドレイアウト
- Instagram埋め込みによるギャラリー表示（運用コスト低、ただしIG依存）
- Wixで構築

**TOP→ギャラリー導線:**
- グローバルナビゲーションに「Gallery」リンク

---

#### 3. Juno-studio（ジュノスタジオ）
- **URL:** https://akachan.yokohama/

| トップページ | ギャラリーページ |
|:---:|:---:|
| ![トップ](../screenshots/05_juno_studio_top.png) | ![ギャラリー](../screenshots/06_juno_studio_gallery.png) |

**ページ構成:**
- トップ / お知らせ / Juno-studioについて（撮影の流れ・スタジオ紹介・安全性・スタッフ） / 撮影メニュー（スタジオNB・出張NB・マタニティ） / 写真集&お客様の声 / お申し込み / お問い合わせ

**ギャラリーの特徴:**
- 写真集とお客様の声が同一ページに統合（ユニーク）
- 複数レイアウトバリエーション（列数変化）
- ライトボックス実装（前後ナビ・閉じるボタン付き）
- ホバーエフェクト（画像切替）
- ページネーション対応

**TOP→ギャラリー導線:**
- メインナビに「写真集&お客様の声」リンク
- トップにヘッダースライダー（6枚自動ローテーション）

**参考ポイント:** 写真+お客様の声の組み合わせは信頼感の醸成に非常に効果的

---

#### 4. 写真館ピノキオ
- **URL:** https://www.pinokio.co.jp/menu/newborn-photo/

**ページ構成（大規模サイト）:**
- トップ / 撮影メニュー（15種以上） / フォトギャラリー / キャンペーン / 衣装情報 / 店舗一覧（12店舗） / FAQ / お客様の声 / 会社概要 / Web予約

**ギャラリーの特徴:**
- URLパラメータによるカテゴリフィルタリング
- グリッドレイアウト + FancyBoxライトボックス
- 撮影店舗名ラベル付き
- 2ページ構成のページネーション

---

#### 5. フォトスタジオMERRY
- **URL:** https://studio-merry.com/

**ページ構成:**
- トップ / コンセプト / キャンペーン / 料金&商品 / 衣装 / 店舗情報 / フォトギャラリー / FAQ / ブログ / 予約 / ニューボーン専用LP

**ギャラリーの特徴:**
- 10カテゴリに分類されたギャラリー構造
- 各カテゴリに「more」リンクで詳細ページへ遷移する2階層構造

---

### 海外サイト

#### 1. Jenny Cruger Photography（Nashville, USA）
- **URL:** https://jennycrugerphotography.com/

| トップページ |
|:---:|
| ![トップ](../screenshots/07_jenny_cruger_top.png) |

**ページ構成:**
- Home / About / Experience / Portfolio / Blog / Investment Details & FAQ / Contact

**ギャラリーの特徴:**
- 4カテゴリ: Maternity(75枚), Newborn(134枚), Baby & Child(80枚), Family(95枚)
- 5カラムのクロップドグリッドレイアウト（190-350px幅、レスポンシブ対応）
- 3:4ポートレート比率で統一感
- ホバー時フェードエフェクト、カテゴリごとの画像枚数表示

**デザイン:** 「Motherhood meets simple luxury」— 柔らかく上品なトーン、ミニマルデザイン

**参考ポイント:**
- 「Experience」ページで撮影体験の流れを説明→予約の心理的ハードルを低下
- カテゴリごとの画像枚数表示がユーザーの期待値設定に有効

---

#### 2. Anya Maria Photography（Sunshine Coast, Australia）
- **URL:** https://anyamaria.com/

| トップページ | Newbornギャラリー |
|:---:|:---:|
| ![トップ](../screenshots/08_anya_maria_top.png) | ![ギャラリー](../screenshots/09_anya_maria_newborn_gallery.png) |

**ページ構成:**
- Home / About / Sessions / Education / Newborn / Family / Maternity / Blog / Print Your Photos / Book Your Session / Price Guide

**ギャラリーの特徴:**
- トップに「Explore」セクション: 3カテゴリ(Family/Newborn/Maternity)をカード形式配置
- Newbornギャラリーに約60枚をグリッドレイアウトで表示
- 画像クリックでライトボックス表示
- ギャラリー下にプリント案内・テスティモニアル・他カテゴリ導線

**デザイン:** 手書き風ロゴ、クリーム/ベージュ系、セリフ体、余白たっぷり

**参考ポイント:**
- TOPの「Explore」セクション（写真+見出し+説明文）が分かりやすい導線
- ギャラリー→プリント販売への導線設計

---

#### 3. Louise Mallan Photography（Glasgow, UK）
- **URL:** https://www.louisemallanphotography.com/

| トップページ |
|:---:|
| ![トップ](../screenshots/10_louise_mallan_top.png) |

**ページ構成:**
- Home / About / Experience / Portfolio / Blog / Contact
- Services（ドロップダウン）: Newborn, Baby, Maternity, Cake Smash
- Prices（ドロップダウン）: 各サービス料金ページ

**ギャラリーの特徴:**
- 4カテゴリをカード形式で配置（代表写真+カテゴリ名+説明文+CTA）
- カテゴリクリックで専用ギャラリーページへ遷移する2階層構造
- Cloudinaryによる画像最適化（WebP対応、レスポンシブ）

**デザイン:** リーフモチーフのロゴ、グレー/ホワイト、落ち着いた配色

**参考ポイント:** Services（撮影内容）と Prices（料金）を明確に分離した合理的な設計

---

#### 4. Lentille Photography（Houston, USA）
- **URL:** https://www.lentillephotography.com/

**ページ構成:**
- Home / Houston Newborn Photographer（サービスページ） / Contact

**ギャラリーの特徴:**
- サービスページ内にポートフォリオ画像を統合
- マルチカラムグリッド（デスクトップ2カラム、モバイル1カラム）
- テキストと画像を交互配置するストーリーテリング型レイアウト

**参考ポイント:** 「体験」をストーリー形式で伝える構成が信頼感を醸成

---

#### 5. Camille Camacho Photography（San Diego, USA）
- **URL:** https://camillecamacho.com/

**ページ構成:**
- Home / About / Experience / Services(Pricing) / Blog / Contact

**ギャラリーの特徴:**
- TOPにフルスクリーンスライドショー（ページネーション付き）
- ブログ記事をギャラリーとして活用（SEOにも有利）
- ダーク基調で他サイトと差別化

**参考ポイント:** ブログ=ギャラリー戦略はSEOとコンテンツ更新の両面でメリット

---

### 小規模・個人運営サイト（little-seedsと同規模）

#### 1. hahako photography（横浜・湘南・川崎）
- **URL:** https://hahako.info/
- **ページ数:** 約9ページ
- **拠点:** 横浜・湘南・川崎（little-seedsと同じ神奈川エリア）

**ページ構成:**
- Top / Photographer / Plan・Price / Products / Q&A / Safety Management / Notice / Contact / Order Form / Blog / Gallery

**ギャラリーの特徴:**
- Instagram API連携のフィード表示
- 正方形グリッド配置、クリックでInstagram投稿へ遷移
- カテゴリ分けなし（時系列表示）
- 「もっと見る」で追加読み込み

**参考ポイント:** little-seedsに最も近い規模感。同じ神奈川エリアの個人女性フォトグラファー

---

#### 2. nanahoshi photography（横浜）
- **URL:** https://nanahoshiphotography.com/
- **ページ数:** 約8ページ
- **拠点:** 横浜市（神奈川・東京・埼玉・千葉へ出張）

**ページ構成:**
- Home / About（想い・プロフィール・安全への取り組み） / Price（NB料金・キッズ/マタニティ料金・プリント製品） / Contact / Flow（流れ・Q&A・撮影ガイドライン） / Gallery / Blog / Notice（利用規約）

**ギャラリーの特徴:**
- ギャラリーページからInstagramへ誘導する方式
- サイト内の独自ギャラリー機能はなし

**参考ポイント:** About内に「安全への取り組み」を統合する構成がシンプル。ベージュ・ブラウン系の上品な配色

---

#### 3. Photo Boo（大阪・関西）
- **URL:** https://photo-boo.com/
- **ページ数:** 約7ページ（メイン）
- **拠点:** 大阪・神戸・京都・奈良

**ページ構成:**
- Home / About / プラン（NB・マタニティ・家族・お宮参り等） / ギャラリー（4カテゴリ別） / FAQ / ブログ

**ギャラリーの特徴:**
- **撮影ジャンル別に4カテゴリ分類**（NB / マタニティ / 家族 / お祝い）
- サムネイルグリッド表示→クリックで詳細ページへ遷移
- Instagram連携ではなく独自ギャラリー実装

**参考ポイント:** 小規模ながらカテゴリ別の独自ギャラリーを持つ唯一の事例。カテゴリ分けがユーザー体験上優れている

---

#### 4. フフベビーフォト（大阪）
- **URL:** https://newborn-photo.jp/
- **ページ数:** 約9ページ
- **拠点:** 大阪府高槻市

**ページ構成:**
- Home / 料金プラン / オプションアイテム / ポーズセレクト / 予約・問合せ / ギャラリー / コンセプト / ご利用の流れ / Staff / ブログ

**ギャラリーの特徴:**
- Instagram連携フィード、グリッド形式
- ライトボックス機能あり（クリックで拡大表示）
- 「さらに読み込む」ボタンで追加表示

**参考ポイント:** 明朝体ベース、ベージュ・ティールブルーの上品で落ち着いた雰囲気

---

#### 5. KUKKA newborn（逗子・湘南エリア）
- **URL:** https://kukkanewborn.com/
- **拠点:** 逗子・葉山・鎌倉・藤沢・横須賀（little-seedsと同エリア）

**ページ構成:**
- Home / Art Newborn Photo / Plan（多数のサブプラン） / Costume / About / Option / Blog / Contact / Flow / Pose / Q&A / Notice

**ギャラリーの特徴:**
- 独立ギャラリーページなし、Instagram統合フィードで表示
- 各プランページ内に作品写真を掲載する方式

**参考ポイント:** 同じ湘南エリアの競合。白基調のシンプル＆透明感あるデザイン

---

### 小規模サイトの共通パターン

| 項目 | 傾向 |
|------|------|
| ページ数 | 7〜9ページが標準 |
| 必須ページ | Home / About / Plan・Price / Gallery / FAQ / Contact |
| ギャラリー実装 | Instagram連携が主流（5サイト中4サイト）。独自実装はPhoto Booのみ |
| ギャラリー形式 | 正方形グリッド表示が基本 |
| デザイン | ベージュ・白基調、ナチュラル＆上品 |

---

## 全体の傾向まとめ

### ページ構成の標準形（小〜中規模サイト）

| ページ | 対応するlittle seeds現状 |
|--------|------------------------|
| Home（トップ） | index.html（1ページ完結） |
| Gallery（ギャラリー） | なし（新設予定） |
| Plan / Pricing（料金） | index.html#plan セクション |
| Flow / Experience（流れ） | index.html#flow セクション |
| About / Profile | index.html#profile セクション |
| FAQ | index.html#faq セクション |
| Contact | contact/index.html |

### ギャラリーUI/UXの共通パターン

| 要素 | 主流パターン |
|------|-------------|
| レイアウト | 2〜3列グリッド（モバイル）、3〜5列（デスクトップ） |
| ライトボックス | FancyBox が定番（軽量・導入しやすい） |
| フィルタリング | 小規模サイトでは不要。全写真一覧で十分 |
| TOP→ギャラリー導線 | カルーセルまたはグリッドプレビュー→「もっと見る」ボタン |
| 画像最適化 | WebP + レスポンシブ（複数サイズ）+ CDN配信 |

### デザインの共通トーン

- ニュートラル/ウォーム配色（ベージュ、クリーム、ホワイト）
- セリフ体の上品なタイポグラフィ
- 余白重視のミニマルデザイン
- little seedsの既存デザインとの親和性は非常に高い

### little seeds への推奨事項

1. **ページ構成**: Home / Gallery / Plan / Flow / Profile / FAQ / Contact の7ページ構成が最適
2. **ギャラリー**: 2〜3列グリッド + ライトボックス（FancyBox or 自前実装）
3. **TOP→ギャラリー導線**: ヒーロー直下にギャラリープレビュー（4〜6枚）→「もっと見る」で誘導
4. **既存の空ディレクトリ**: about/ gallery/ faq/ plan/ が既に存在しており、マルチページ化の準備は整っている
