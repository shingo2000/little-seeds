# little seeds photography SEO改善計画（2026-05-16）

- 元レポート: `draft/260512_seo_review.html`
- 対象期間: 2026-05-16 〜 2026-08-15（3ヶ月）
- 方針: 「広げる」から「深める」へ — 藤沢で2-3位、茅ヶ崎・鎌倉で10位以内を獲りに行く

---

## 1. 対応状況サマリー

元レポート（2026-05-12版）の施策のうち、すでに実装済み／部分実装の状況を確認した。
本計画では **未対応の項目に絞って優先度順に並び替える**。

### 1-1. 完了済み（本計画では除外）

| 元施策 | 内容 | 状態 |
|---|---|---|
| 施策3 | 全下層ページ末尾にContact CTAセクション（LINE申し込みボタン＋お問い合わせリンク） | 実装済み |
| 施策8 | トップページの LocalBusiness JSON-LD（areaServed・sameAs含む） | 実装済み |
| 施策8 | Galleryページ全画像のalt属性（スタイル＋シーン語の自然文） | 実装済み |
| 施策8 | og:image の個別化（about=concept.webp、plan=plan_basic.webp） | 部分実装 |
| 施策6 | トップページのtitle「little seeds photography \| 神奈川県藤沢市のニューボーンフォトの出張撮影」 | 実装済み |
| 施策6 | 下層ページのmeta description（藤沢・湘南エリア明記） | 実装済み |

### 1-2. 残課題（本計画の対象）

以下の項目を本計画で扱う。括弧内は元レポートでの施策番号。

- ✅ 下層ページのtitle/h1のキーワード強化（施策6）— 2026-05-24 実装済み
- ✅ 画像サイトマップ追加・JSON-LD整備・残ページのog:image個別化（施策8）— 2026-05-24 実装済み（figure/figcaption化のみ未対応）
- トップページの信頼性シグナル追加（撮影実績数、地域名密度）（施策1）— 地域名密度は実装済み、撮影実績数は未対応
- モバイル Core Web Vitals 改善（施策1）
- 地域特化LP `/area/chigasaki/`・`/area/kamakura/` 新設（施策4）
- BreadcrumbList 構造化データ全ページ追加（施策4）
- CTA文言の具体化＋フローティングLINE CTA（施策3）
- contact ページのフォーム/LINE導線UI改善（施策3）
- MEO強化: GBP口コミ獲得フロー・週1投稿・属性情報充実（施策2）
- Instagram埋め込み（施策7）
- `/guide/` ハブページとロングテール記事（施策5）

---

## 2. 優先度別アクション一覧

優先度は ⭐5段階。投資対効果（SEO/CVへの寄与）× 着手しやすさ で評価。

### ⭐⭐⭐⭐⭐ 最優先（Month 1: 5月下旬〜6月）

#### ✅ A1. 下層ページのtitle/h1キーワード最適化（施策6） — 2026-05-24 実装済み

GSC上で下層5ページの表示が合計10にとどまり、検索の入口になっていない。
タイトルの固有名のみ表記をやめ、「サービス語＋地域語」に書き換える。

| ページ | 現状title | 推奨title |
|---|---|---|
| /gallery | `Gallery \| little seeds photography` | `ニューボーンフォト撮影事例\|藤沢の little seeds photography` |
| /plan | `Plan \| little seeds photography` | `料金プラン\|藤沢のニューボーンフォト出張撮影 \| little seeds` |
| /voice | `Voice \| little seeds photography` | `お客様の声・口コミ\|藤沢ニューボーンフォト \| little seeds` |
| /about | `About \| little seeds photography` | `フォトグラファー紹介\|藤沢のニューボーンフォト \| little seeds` |
| /faq | `FAQ \| little seeds photography` | `よくあるご質問\|藤沢ニューボーンフォト撮影 \| little seeds` |

h1 も同様に見直し（現状は単に英単語「Gallery」「Plan」など）。デザインを崩さない範囲で
visually-hiddenの補助h1テキストを追加するか、subtitleにキーワードを織り込む。

#### ✅ A2. 画像サイトマップとJSON-LDによるマルチイメージSERP対応（施策8） — 2026-05-24 実装済み（figure/figcaption化のみ未対応）

OurPhotoが「神奈川県藤沢市でニューボーンフォト」で作品サムネ3枚のリッチリザルトを獲得している。
写真サービスのCTRはSERP上の画像有無で大きく変わるため最優先。

- **画像サイトマップ追加**: `web/sitemap.xml` に `xmlns:image` を追加し、各 `<url>` 配下に `<image:image>` ＋ `<image:loc>` ＋ `<image:caption>` を記述
  - 例: `/gallery/` に gallery_1〜21.webp の画像URL＋altと同等のキャプション
  - `/` に hero_1〜5.webp、`/plan/` に plan_*.webp
- **構造化データの追加**
  - トップの LocalBusiness の `image` を **配列化**（hero_1〜hero_5の代表画像3-5枚）
  - `/gallery/` に **ImageGallery** または ImageObject の集合をJSON-LDで追加（`contentUrl`/`caption`/`creator`/`datePublished`）
- **og:image の個別化（残り）**
  - `/gallery/` → hero_1.webp → gallery_2.webp 等の代表作品に
  - `/voice/`、`/faq/`、`/contact/` → hero_1.webp の共通から各ページの代表画像に
- **figure/figcaption 化**: Gallery の主要作品を `<figure><figcaption>` 構造に置き換え、画像とキャプションを意味的に結合

#### ✅ A3. トップh1/h2の地域名密度強化（施策1） — 2026-05-24 実装済み（subtitle変更のみ）

現状トップh1は「little seeds photography」のみで、サブタイトルに「藤沢市を拠点に湘南エリア・神奈川・東京で」と記載。
**藤沢・茅ヶ崎・鎌倉の3市明記**にリライト。

- hero subtitle: 「藤沢・茅ヶ崎・鎌倉を中心に湘南エリア・神奈川・東京で<br>ニューボーンフォトの出張撮影をしています」 ← 実装済み
- ~~ファーストビュー直下に「対応エリア: 藤沢・茅ヶ崎・鎌倉を中心に」のテキスト追加~~ ← subtitleと重複のため不採用
- LocalBusiness JSON-LD の `description` は既に3市言及済みで対応不要

### ⭐⭐⭐⭐ 高優先（Month 1〜2）

#### B1. MEO強化（施策2）

藤沢市内ユーザーの「ニューボーンフォト 藤沢」検索でマップパックが最上段に表示される。
GBPは登録済みのため、運用フロー構築のみで効果が出る。

- **撮影完了後のサンクスメール／LINEテンプレート作成**
  - GBPレビュー誘導リンク（[Googleレビュー直リンク生成](https://developers.google.com/my-business/) もしくはshort URL）を組み込む
  - 文面はライトに「撮影体験をぜひ他のお客様にも知らせていただけると嬉しいです」程度
  - 送付タイミング: 納品から3日〜1週間後
- **GBP撮影投稿の週1更新ルール**: Instagram投稿の流用でOK（投稿時の同期フロー化）
- **GBP属性情報の充実**: 女性経営、出張対応、料金帯、対応エリア（藤沢・茅ヶ崎・鎌倉）

3ヶ月後の目標: 口コミ5件、星評価4.8以上

#### B2. 地域特化LP（茅ヶ崎・鎌倉）の新設（施策4）

商圏を3市に絞る方針に従い、藤沢以外の2市の専用LPを作る。
**湘南LP・横浜LPは作らない**（ライフパレット寡占＋GA4で質が低い）。

- `/area/chigasaki/` 制作
  - h1: 「茅ヶ崎のニューボーンフォト出張撮影 \| little seeds photography」
  - 「茅ヶ崎での撮影事例3件以上」「アクセス情報」「茅ヶ崎の特徴（自宅出張のしやすさ・湘南エリアの自然光）」
- `/area/kamakura/` 制作（同形式）
- トップから両LPへの内部リンク（hero下「対応エリア」テキストからリンク）
- BreadcrumbList JSON-LDをこの2ページ＋既存全ページに追加

#### B3. CV導線の強化（施策3）

CV2件はすべて /contact 直来訪。回遊CVがゼロ。

- **各ページCTA文言の具体化**
  - plan: 「このプランで予約する」「料金を相談する」
  - gallery: 「同じスタイルで撮影を相談する」
  - voice: 「私たちも予約する」
  - 現状は全ページ共通の「公式LINEで申し込み／お問い合わせ」のため、ページ文脈に合わせた言い回しに差し替え
- **contact ページのUI改善**（平均滞在12秒 → フォーム面倒・LINE導線弱の仮説）
  - 「LINEで申し込み」と「フォームで問い合わせ」の二択UIをファーストビューに配置
  - フォーム項目を必須最小化
- **voice/faq からのフローティングLINE CTA**
  - 画面右下に常時表示の小さなLINEボタンを設置
  - 既存の末尾CTAとは別に、長文閲覧中に手元で押せる導線を確保

### ⭐⭐⭐ 中優先（Month 2〜3）

#### C1. トップに撮影実績数・お客様の声抜粋を追加（施策1）

baby marc が「8年以上」と明示しているのに対し、当サイトには実績数の数値表現がない。

- ファーストビュー直下に「撮影実績 ◯◯組（2026年5月時点）」を表示
- About Preview セクションに信頼性シグナルとしての撮影実績数を1行追加
- Voice Preview は既存だが、可能なら「藤沢のママ」「茅ヶ崎のママ」など地域語を含む声を1〜2件選定

具体的な数値は別途確認が必要（撮影実績の総数）。

#### C2. モバイル Core Web Vitals 改善（施策1）

PC 7.06位 / モバイル 10.4位 = モバイル順位が3ランク下。Page Experienceシグナルの影響を疑う。

- PageSpeed Insights でモバイルのCLS/LCP/INPを実測
- CLS悪化箇所の特定（hero、gallery preview、plan-preview の3カ所が候補）
- 必要に応じてヘッダー圧縮・画像のwidth/height再点検

#### C3. Instagram埋め込み（施策7）

サイト鮮度シグナルが目的。被リンク強化は期待薄（フォロワー94人）。

- gallery ページに Instagram フィード埋め込み（公式埋め込みは重いため Curator.io 等のサードパーティ or 手動同期を検討）
- 投稿時にサイトのギャラリーにも同期掲載するフロー化

### ⭐⭐ 着手余裕があれば（Month 3〜）

#### D1. `/guide/` ハブページとロングテール記事（施策5）

「ナチュラル ニューボーンフォト」「自然体」単独KWは大手寡占で取れない。
複合長尾を狙う。

- `/guide/` をコラム集約ページとして新設
- 記事1本目: 「ニューボーンフォトの撮影時期と予約タイミング」（着手判断容易・既存FAQと内部リンク連携可能）
- 記事2本目: 「ナチュラルなニューボーンフォトに最適な時間帯」
- 記事3本目: 「自然体の写真を撮るための自宅環境準備」
- 記事4本目: 「ニューボーンフォト 服装の選び方（赤ちゃん・家族）」
- 各記事3,000字以上、独自写真3-5枚以上

**前提**: 月1-2本ペースで継続的に書ける運用体制が必要。継続できない場合は後回し。

---

## 3. 実行ロードマップ（次の3ヶ月）

### Month 1（2026-05-16 〜 2026-06-15）: 既存資産の最適化

| 週 | 施策 | 修正対象ファイル |
|---|---|---|
| W1 | ✅ A1: 下層5ページのtitle/h1見直し | gallery/plan/voice/about/faq |
| W1 | B1: GBP口コミ誘導テンプレート作成（運用） | — |
| W2 | ✅ A2-1: 画像サイトマップ追加 | sitemap.xml |
| W2 | ✅ A2-2: トップ LocalBusiness の image 配列化 | index.html |
| W2 | ✅ A2-3: 残ページの og:image 個別化 | gallery/voice/faq/contact/index.html |
| W3 | ✅ A2-4: gallery に ImageGallery JSON-LD 追加 | gallery/index.html |
| W3 | ✅ A3: トップh1/subtitle の地域名強化 | index.html |
| W4 | B3-1: 各ページCTA文言の具体化 | plan/gallery/voice/index.html |
| W4 | B3-2: contact フォーム/LINE導線UI改善 | contact/index.html |

### Month 2（2026-06-16 〜 2026-07-15）: 商圏特化＋導線補強

| 週 | 施策 | 修正対象ファイル |
|---|---|---|
| W5-6 | B2-1: `/area/chigasaki/` 制作・公開 | area/chigasaki/index.html（新規） |
| W6 | B2-3: BreadcrumbList 全ページ追加 | 全ページ |
| W7-8 | B2-2: `/area/kamakura/` 制作・公開 | area/kamakura/index.html（新規） |
| W7 | B3-3: voice/faq フローティングLINE CTA | voice/faq/index.html, css |
| W8 | C2: モバイル Core Web Vitals 計測・改善 | css/js |

### Month 3（2026-07-16 〜 2026-08-15）: コンテンツSEO＋追加最適化

| 週 | 施策 | 修正対象ファイル |
|---|---|---|
| W9 | C1: トップに撮影実績数・お客様の声追加 | index.html |
| W9 | C3: Instagram埋め込み | gallery/index.html |
| W10 | D1-1: `/guide/` ハブページ + 記事1本目 | guide/index.html（新規） |
| W11-12 | D1-2: 記事2-3本目 | guide/*/index.html |
| 並行 | B1: GBP週1投稿の運用継続 | — |

---

## 4. KPI（再掲）

元レポートの再設定KPIをそのまま継承。

| 指標 | 2026-05現在 | 3ヶ月後（08月） | 6ヶ月後（11月） |
|---|---|---|---|
| 「ニューボーンフォト 藤沢」順位 | 9.04位 | 4位以内 | 2-3位 |
| 「ニューボーンフォト 茅ヶ崎/鎌倉」順位 | 圏外 | 10位以内 | 5位以内 |
| 表示検索クエリ数（GSC） | 3 | 15 | 30 |
| 月間検索クリック数 | ~30 | 80 | 150 |
| 月間セッション数 | ~250 | 400 | 600 |
| CV率（全体） | 0.87% | 2.0% | 3.0% |
| GBP口コミ数 | 0（未確認） | 5 | 15 |

---

## 5. 着手前に確定が必要な情報

実装を始める前に以下を確定したい。

1. **トップに載せる撮影実績数**（C1）: 過去の総撮影組数を共有してほしい
2. **湘南・横浜への言及をどこまで残すか**（A3関連）: GA4データでは捨てるべきだが、湘南は地理的アイデンティティに直結。完全に削るか、3市メインで湘南エリアもサブで残すか
3. **GBPレビュー誘導の運用主体**（B1）: メール送信は手動か、LINE公式アカウントの自動応答に組み込むか
4. **`/guide/` 制作の継続可否**（D1）: 月1-2本の執筆を継続できる前提があるか。困難なら Month 3 のD1はスキップしB1〜C3の深掘りに切り替え
5. **Instagram埋め込み方式**（C3）: 公式埋め込み（重い）／Curator.io等のサードパーティ／手動同期画像のいずれを採用するか

---

## 6. 参照ファイル

- 元レポート: `draft/260512_seo_review.html`
- 競合分析: `draft/260320_competitor_analysis.md`
- 戦略プラン（旧）: `draft/260315_seo_strategy_plan.md`
- 初期SEOレポート: `draft/260308_seo_strategy_report.md`
