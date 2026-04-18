# Figma vs 実装 差分レポート

対象: `web/` 実装 × Figma `dxC9fuOK9Uf6pZK9wLxCAh` (2026-04-19時点)

## 判定凡例
- 🔴 **要対応**: ビジュアルが明らかに不一致。Figmaデザイン意図と乖離
- 🟡 **中程度**: 数値が微差。機能影響なし、修正推奨
- 🟢 **軽微**: 1〜2px程度の差、互換性・UX許容範囲

---

## A. デザイントークン / TextStyle 整合性

CSS変数（`common.css`）とFigmaトークンの突き合わせ：

| Figma トークン | 値 | 実装変数 | 実装値 | 判定 |
|---|---|---|---|---|
| `--color-neutral-foreground` | #111 | `--color-text` | #111111 | 🟢 |
| `--color-neutral-foreground-subtle` | #666 | `--color-text-subtle` | #666666 | 🟢 |
| `--color-neutral-background` | #ffffff | `--color-bg` | #ffffff | 🟢 |
| `--color-primary-background` | #ede8e2 | `--color-bg-warm` | #ede8e2 | 🟢 |
| `--color-border` | rgba(0,0,0,0.12) | `--color-border` | #e0e0e0 | 🟡 変換値違い |
| `--color-accent` | #c45c5c | `--color-accent` | #c45c5c | 🟢 |
| `--color-neutral-background-subtle` | #f5f5f5 | — | 未定義 | 🔴 FAQ preview用に追加要 |
| `--font-size-s/m/l/xl/2xl` | 13/15/18/24/32 | 同 | 同 | 🟢 |
| `--space-0/0_5/1/2/3/4/5` | 0/4/8/16/24/40/64 | 同 | 同 | 🟢 |
| `--space-side` | 20 | `--side-padding` | 20 | 🟢 |
| `--radius-card/banner` | 16/8 | 同 | 同 | 🟢 |

TextStyleの letter-spacing / line-height:

| TextStyle | Figma | 実装 | 判定 |
|---|---|---|---|
| EN/Heading 1 (32px) | weight 300, lh 1.1, tracking 0.06em | `.section__title` | 🟢 |
| EN/Heading 2 (24px) | weight 400, lh 1.1, tracking 0.06em | `.plan-card__name` 等 | 🟢 |
| EN/Price (18px) | weight 400, lh 1.4, tracking 0.08em | `.plan-card__price-amount` (lh 未指定 = body 1.8) | 🟡 lh違い |
| EN/Body Small (13px) | weight 400, lh 1.4, tracking 0.13em | フッター nav等で使用 | 🟢 |
| JA/Body Base (15px) | weight 300, lh 1.8, tracking 0.08em | body/`.voice__text` 等 | 🟢 |
| JA/Body Compact (15px) | weight 300, lh 1.4, tracking 0.08em | `.area__lead` 等 | 🟢 |
| JA/Body Small Compact (13px) | weight 300, lh 1.4, tracking 0.13em | `.section__subtitle` | 🟢 |

---

## B. コンポーネント Variant 整合性

### 🔴 B-1. Button / Outline（=「View More」）

**Figma仕様 (node 390:471):**
- height: 48px, rounded: 8px
- bg: `rgba(255,255,255,0.4)` 半透明
- border: 1px solid `#c45c5c` (accent)
- text color: `#c45c5c` (accent), EN Quicksand Regular 13px, tracking 0.13em, leading 1.4
- padding: pl-24 pr-16
- gap-8 text→icon
- `icon_chevron_right` (16x16) アイコン右側

**実装 `.section__more`:**
- width: 200px 固定, padding: 12px 8px (height暗黙)
- border: 1px solid `#111` (黒)
- text color: `#111`, 15px, tracking 0.06em
- border-radiusなし
- アイコンなし

**差異**: 色がacent/#c45c5cであるべき、サイズは13px、border-radius 8px、chevronアイコン必要

### 🔴 B-2. Header

**Figma仕様 (node 433:4053):**
- Top/Header: Instagramアイコン(30x30) + メニューアイコン(30x30)、右寄せ、gap-16
- Top固定（`Headerは上部固定`注記あり）

**実装 `.header`:**
- メニューボタンのみ
- Instagramアイコン **欠落**

### 🟡 B-3. Button / CTA（黒LINEボタン）

**Figma仕様 (122:4025):**
- h-56, w-300 (min-280), rounded-8, bg `#111`
- text white, JA W3, 15px, lh 1.8, tracking 0.08em

**実装 `.contact__btn`:**
- width 300px, padding 14px 8px (高さ約55px), border-radius 8px ✓

**差異**: 高さが56ではなく≈55px（1px差）🟢 許容

### 🔴 B-4. Footer

**Figma仕様 (433:3933/4100):**
- **border-top 1px**
- padding: pt-40 pb-40 px-20
- gap-40
- nav: **縦並び**, gap-24, EN Quicksand Regular **24px** (`font-size-xl`), lh 1.1, tracking 0.06em, color `#666`, center
- nav項目: Home / About / Gallery / Plan / FAQ / Contact（※Voice抜けはFigma側の欠落と思われる）
- SNS: Instagram 40x40 + LINE 40x40, gap-16
- Copyright: EN 13px, subtle, lh 1.4

**実装 `.footer`:**
- border-top なし
- nav: **横並び flex-wrap**, 15px (`font-size-m`), gap 8×24
- nav項目: 7個（Home〜Contact）
- SNS: 40x40 ✓
- Copyright: ✓

**差異**: 横並び→縦並び + フォントサイズ15→24 + border-top追加が必要。大きな視覚差

---

## C. ページ別差分

### 🔴 C-1. Home Plan Preview

**Figma (314:225):**
```
[Heading: Plan / 撮影プラン・料金]
[plan_mini 画像 (350 x ~233, aspect 4096/2730)]
┌─ Plan Card (Mini Plan) ─────────────┐
│ Mini Plan                            │
│ 赤ちゃんのソロショットのみを短時間で撮影       │
│ [オープン記念10%OFF バッジ]             │
│ ~~30,000円~~ (取り消し線)              │
│ 27,000 円 (accent color)              │
│ （税込29,700円）＋出張費                │
└──────────────────────────────────────┘
┌─ Plan Card (Basic Plan) ────────────┐
│ ... 同様の構造 38,700円               │
└──────────────────────────────────────┘
[Button / Outline: 撮影プラン・料金]
```

**実装 `index.html`:**
- plan_mini ヒーロー画像 **欠落**
- オープン記念10%OFF バッジ **欠落**
- 取り消し線の旧価格 **欠落**
- 割引価格のaccent色 **欠落**

### 🔴 C-2. Home FAQ Preview

**Figma (314:404):** 3つのQが**ピル/チップ型**
- bg `#f5f5f5`, rounded 20px (=40px径), padding 8px 24px
- font: EN Quicksand Regular 15px, center, tracking 0.06em
- 縦並び gap-16

**実装 `.faq-preview__item`:**
- border-bottom で区切るプレーンリスト

完全に異なるビジュアル。

### 🔴 C-3. Home Voice Preview

**Figma (433:3598):** 2カード、各カード上部に**64x64 円形画像**
- Card: bg white, border, rounded-16, px-40 py-24
- image_4/image_5: 64x64 circle

**実装 `.voice-preview__card`:**
- 円形アバター **欠落**（素材未配置のためテキストのみ）

素材追加待ち。

### 🔴 C-4. Home Contact Section

**Figma (314:473):** セクション全体が **warm bg** (`#ede8e2`)
- Subtitle は "お申し込み・お問い合わせ"
- "お問い合わせ" はW6(bold) + underline

**実装:** 
- warm bg **欠落** (通常の white)
- Subtitle は "お問い合わせ" (短縮)
- "お問い合わせ" W6/underline ✓

### 🟢 C-5. About ページ

- Concept/Safety/Profile の構造・余白・Typography はFigmaと概ね一致
- 🟡 Safety番号バッジ: Figmaは24x24 rounded-12、実装同じ ✓
- 🟢 概ねOK

### 🔴 C-6. Plan ページ

- 3プラン構造は反映済み
- 🟡 Premium Plan: Figma で `data-annotations="後で追加する"` の注記あり、要最終確認
- 🟡 Mini/Basic/Premium 各カード内 `plan_mini` 画像のアスペクト比: Figma 4096/2730 ≈ 3:2.0、実装 4:2.67 ≈ 3:2.0 ≈ 🟢 ほぼ一致
- 🟢 バッジ、strikethrough、accent価格色は実装済み ✓

### 🟢 C-7. Gallery ページ

- 2列グリッド構造OK
- 🟡 現状12枚中11枚+1再利用（暫定）— 素材差し替え待ち

### 🟢 C-8. FAQ ページ

- 10問のQ&A構造はFigma通り
- 🟢 `Q` ラベルがaccent色、Aがsubtle色 ✓
- 🟢 Layout一致

### 🟡 C-9. Voice ページ

- 5カードの構造 ✓
- 🔴 カード上部の64x64 円形画像 **欠落**（素材未配置）

### 🟢 C-10. Contact ページ

- フォーム構造、フィールド並び、必須マーク ✓
- 🟢 Layout一致

---

## D. マージン / パディング チェック結果

| 場所 | Figma | 実装 | 判定 |
|---|---|---|---|
| Section padding | py-64 px-20 | `.section { padding: 64 20 }` | 🟢 |
| Section内のgap(見出し→本文) | gap-40 | `.section__heading { margin-bottom: 40 }` | 🟢 |
| 見出し内のEN→JA gap | gap-8 | `.section__subtitle { margin-top: 8 }` | 🟢 |
| Plan card padding | px-41 py-25 | `.plan-preview__card { padding: 24 }` | 🔴 Home preview |
| Plan card padding (full) | px-41 py-41 | `.plan-card { padding: 40 }` | 🟡 近似 |
| Plan card gap (内部要素) | gap-16 | `.plan-card__*` 個別margin | 🟡 |
| Card rounded | 16 | `--radius-card: 16` | 🟢 |
| Banner rounded | 8 | `--radius-banner: 8` | 🟢 |
| Footer padding | pt-41 pb-40 px-20 | `.footer { padding: 40 20 }` | 🟢 |
| Plan card内 Banner padding | px-24 py-16 | `.plan-card__banner { padding: 16 24 }` | 🟢 |

---

## E. 修正優先度サマリー

### 🔴 最優先（ビジュアル齟齬が大きい）
1. **View More ボタン (section__more)** のaccent色+chevron化 → 全ページ影響
2. **Footer nav 縦並び化 + border-top 追加** → 全ページ影響
3. **Header Instagram アイコン追加** → 全ページ影響
4. **Home Plan Preview** にヒーロー画像+バッジ+取り消し線追加
5. **Home FAQ Preview** ピル型化
6. **Home Contact セクション** warm bg化

### 🟡 中（要検討）
7. Home Voice Preview 円形アバター画像（素材待ち）
8. Voice ページの円形アバター画像（素材待ち）
9. Gallery ページ実画像12枚（素材待ち）
10. Premium Plan 文言最終確認（Figma注記あり）
11. Footer nav に Voice を含めるか（Figma側は欠落）

### 🟢 軽微
12. `--color-border` 値を `rgba(0,0,0,0.12)` 寄りに合わせるかは任意
13. `.plan-card__price-amount` の line-height を明示 (1.4)

---

## F. 次のアクション

以下の修正を順次反映予定：
1. `common.css` で section__more / footer / header 共通スタイル更新
2. 各ページHTMLへ Instagram ヘッダーアイコン追加
3. `index.html` + `home.css` で Home Plan/FAQ/Contact プレビューを修正
4. Playwrightで再撮影し、Figmaスクリーンショットと目視比較
