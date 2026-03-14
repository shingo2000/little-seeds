# Google Fonts 読み込み最適化 調査レポート

## 現状の課題

現在の実装:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
```

- Lighthouse で**レンダーブロッキングリソース**として検出（約750ms）
- `<link rel="stylesheet">` はブラウザの描画を完全にブロックする
- `display=swap` は既に設定済み（フォント読み込み中はフォールバックフォントを表示）
- ウェイト500は今後削除予定 → 300, 400 のみに変更

---

## 手法1: Async Loading（media="print" + onload パターン）

### 実装コード

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
      rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
        rel="stylesheet">
</noscript>
```

### 仕組み

1. `media="print"` を指定することで、ブラウザはこのCSSを画面描画に不要と判断し、**非同期で低優先度ダウンロード**する
2. ダウンロード完了後、`onload` イベントで `media='all'` に切り替え、画面に適用
3. `<noscript>` タグで JavaScript 無効時のフォールバックを提供

### メリット

- レンダーブロッキングを**完全に排除**
- 追加の JavaScript ライブラリ不要
- 実装がシンプル（HTMLの変更のみ）
- `<noscript>` によるフォールバックが容易
- 全モダンブラウザ対応

### デメリット

- ブラウザがダウンロード優先度を「低」にするため、フォントの表示が少し遅れる可能性
- **FOUC（Flash of Unstyled Content）** が発生する（フォールバックフォント→Quicksandへの切り替わりが見える）
- ただし `display=swap` を既に使用しているため、現状でもFOUCは発生している前提

### 推定パフォーマンス改善

- FCP（First Contentful Paint）: **約1.5〜1.7秒改善**（ベースライン比）
- レンダーブロッキング: **完全排除**

---

## 手法2: Preload（`<link rel="preload">`）

### 実装コード

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
      rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
        rel="stylesheet">
</noscript>
```

### 仕組み

1. `<link rel="preload">` でCSSファイルを**高優先度で非同期ダウンロード**
2. 手法1の `media="print"` パターンと**組み合わせて使用**
3. preload はダウンロードのみ行い、適用は `onload` で制御

### メリット

- 手法1の「低優先度ダウンロード」問題を解決
- 非同期かつ高優先度でフェッチされる
- レンダーブロッキングを排除しつつ、フォント表示も高速化
- CSS Wizardry の Harry Roberts 氏が推奨する最速パターン

### デメリット

- `preload` は一部の古いブラウザで未対応（ただし `media="print"` フォールバックで安全）
- preload を過度に使用すると逆効果（このサイトは1フォントなので問題なし）
- 注意: **Google Fonts CSS のpreload であり、woff2ファイルのpreloadではない**（Google Fonts CDN はユーザーエージェントに応じてURLが変わるため、woff2の直接preloadは非推奨）

### 推定パフォーマンス改善

- 手法1と比較して、フォント表示がさらに**約600ms改善**
- Lighthouse スコア: **98〜100を達成**可能

---

## 手法3: `&text=` パラメータによるサブセット化

### Quicksand フォントで実際に使用されている文字の分析

サイト上で Quicksand（`--font-en`）が適用される箇所:

| 使用箇所 | テキスト内容 | CSSクラス |
|---------|-----------|-----------|
| ヒーロータイトル | `little seeds photography` | `.hero__title` |
| セクション見出し | `Concept`, `Safety`, `Plan`, `Flow`, `Profile`, `Area`, `Contact` | `.section__title` |
| メニュー英語テキスト | 上記と同じ7つ | `.menu-overlay__en` |
| Safety番号 | `1`, `2`, `3`, `4`, `5` | `.safety__number` |
| プラン名 | `Mini Plan`, `Basic Plan`, `Premium Plan` | `.plan-card__name` |
| 価格 | `27,000`, `30,000`, `38,700`, `43,000`, `70,000` | `.plan-card__price-amount` |
| Flow番号 | `01`, `02`, `03`, `04` | `.flow__number` |
| プロフィール名 | `Ayako Suzuki` | `.profile__name` |
| フッター | `little seeds photography` | `.footer__copyright` |
| ヘッダーロゴ | （現在未使用だがCSSにあり） | `.header__logo` |

### 必要な文字一覧

```
英大文字: A B C F M P S
英小文字: a b c d e f g h i k l m n o p r s t u w y z
数字:     0 1 2 3 4 5 7 8
記号:     , . (スペース) ©
```

整理すると: `ABCFMPSabcdefghiklmnoprstuwyz012345780,. `

**合計: 約40文字**（通常のラテン文字セットは約220グリフ）

### 実装コード

```html
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap&text=ABCFMPSabcdefghiklmnoprstuwyz012345780%2C.%20%C2%A9"
      rel="stylesheet">
```

URL エンコードの説明:
- `,` → `%2C`
- ` `（スペース）→ `%20`
- `©` → `%C2%A9`

### メリット

- フォントファイルサイズを**最大90%削減**可能
- ダウンロード時間が大幅短縮
- ネットワーク帯域の節約

### デメリット

- **レンダーブロッキングは解消されない**（`<link rel="stylesheet">` は依然ブロッキング）
- テキスト内容を変更するたびにHTMLを更新する必要がある（メンテナンスコスト）
- 新しいセクションやテキスト追加時に文字の抜け漏れリスク
- 単独では不十分で、**手法1または手法2と組み合わせる必要がある**

### 推定パフォーマンス改善

- フォントファイルサイズ: **約80〜90%削減**
- ただしボトルネックはファイルサイズよりもレンダーブロッキングなので、単独効果は限定的
- ネットワーク転送削減: **数KB → 1KB未満**

---

## 手法4: JavaScript によるフォント読み込み

### 4A: Google Web Font Loader（webfontloader.js）

```html
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Quicksand:300,400']
    }
  });
</script>
```

### 4B: CSS Font Loading API（FontFace API）

```html
<script>
  if ('fonts' in document) {
    const font300 = new FontFace('Quicksand',
      'url(https://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G.woff2)',
      { weight: '300', style: 'normal', display: 'swap' }
    );
    const font400 = new FontFace('Quicksand',
      'url(https://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBio18G.woff2)',
      { weight: '400', style: 'normal', display: 'swap' }
    );
    Promise.all([font300.load(), font400.load()]).then(fonts => {
      fonts.forEach(f => document.fonts.add(f));
    });
  }
</script>
```

### Web Font Loader のデメリット（非推奨）

- **追加のJSライブラリ**（約5KB gzip）のダウンロードが必要
- JS自体がパース・レンダーブロッキングになりうる
- 10年以上前のライブラリで、2023年に事実上メンテナンス終了
- Core Web Vitals の FCP/LCP に悪影響
- 専門家は「**WebFontLoaderの使用をやめるべき**」と明言

### Font Face API のデメリット

- Google Fonts CDN の woff2 URL を**直接ハードコードする必要がある**
- Google Fonts は UA に応じて異なる URL を返すため、URL が将来変わる可能性
- セルフホスティングに近い形になり、Google Fonts CDN の自動最適化（unicode-range分割、UA別最適フォーマット配信）の恩恵を失う
- `text=` サブセットとの併用が困難

### 推定パフォーマンス改善

- Web Font Loader: FCP に**悪影響**の可能性あり（JSの追加読み込みコスト）
- Font Face API: レンダーブロッキング排除だが、CDNの自動最適化を失うため**総合的にはマイナス**の可能性

---

## 手法5: その他のCDNベース最適化テクニック

### 5A: preconnect の最適化（既に実施済み）

現在の実装で `preconnect` は正しく設定されている。ただし `fonts.googleapis.com` への preconnect は `media="print"` パターン使用時には DNS prefetch に変更可能:

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

理由: CSS は `fonts.googleapis.com` から取得するが、実際のフォントファイルは `fonts.gstatic.com` から取得される。非同期読み込み時は CSS 側は `dns-prefetch` で十分。

### 5B: ウェイトの削減（計画済み）

```
変更前: wght@300;400;500  （3ウェイト）
変更後: wght@300;400      （2ウェイト）
```

ウェイトを1つ減らすことで、ダウンロードする @font-face ルールとフォントファイルが減少。

### 5C: Google Fonts CSS2 API の自動 unicode-range 分割

Google Fonts CSS2 API は自動的にフォントを unicode-range で分割し、必要なサブセットのみをダウンロードする仕組みを持つ。Quicksand はラテン文字のみ使用なので、日本語ページでは自動的に最小セットが読み込まれる。

**これは既に有効になっている**（CSS2 API 使用時に自動適用）。

---

## 比較表

| 手法 | レンダーブロッキング排除 | FOUC リスク | 実装の複雑さ | 推定改善効果 | メンテナンス性 | 推奨度 |
|------|----------------------|------------|------------|-------------|-------------|-------|
| **1. media="print" + onload** | 完全排除 | 中（display:swapと同等） | 低（HTML変更のみ） | 高（FCP 1.5〜1.7s改善） | 高 | ★★★★ |
| **2. preload + media="print"** | 完全排除 | 低〜中（高速取得で軽減） | 低（HTML変更のみ） | 最高（手法1+600ms改善） | 高 | ★★★★★ |
| **3. &text= サブセット** | 排除しない | なし（同期読み込み時） | 中（文字管理が必要） | 中（ファイルサイズ80-90%削減） | 低（テキスト変更時要更新） | ★★★（単独）/ ★★★★★（手法2と併用） |
| **4A. Web Font Loader** | 排除 | 高 | 中（JS追加） | マイナスの可能性 | 低（非推奨ライブラリ） | ★ |
| **4B. Font Face API** | 排除 | 高 | 高（URL管理が必要） | 中 | 低（URL変更リスク） | ★★ |
| **5A. dns-prefetch最適化** | - | - | 低 | 低（微小改善） | 高 | ★★★ |
| **5B. ウェイト削減** | - | - | 低 | 低〜中 | 高 | ★★★★ |

---

## 推奨実装案

**手法2（preload + media="print"）+ 手法3（&text= サブセット）+ 手法5B（ウェイト削減）の組み合わせ**

```html
<!-- Google Fonts（最適化済み） -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap&text=ABCFMPSabcdefghiklmnoprstuwyz012345780%2C.%20%C2%A9">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap&text=ABCFMPSabcdefghiklmnoprstuwyz012345780%2C.%20%C2%A9"
      rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap&text=ABCFMPSabcdefghiklmnoprstuwyz012345780%2C.%20%C2%A9"
        rel="stylesheet">
</noscript>
```

### この組み合わせの効果

1. **レンダーブロッキング完全排除**（preload + media="print"）
2. **高優先度非同期ダウンロード**（preload）
3. **フォントファイル80〜90%削減**（text= サブセット）
4. **不要なウェイト排除**（500を削除）
5. **JS無効時のフォールバック**（noscript）
6. **Google Fonts CDNの自動最適化を維持**（unicode-range、WOFF2配信等）

### FOUC対策（オプション）

Quicksandフォント読み込み完了前のフォールバックフォントとの差異を最小化するため、CSSに `font-display: swap` が既に指定されている（Google Fonts URL の `display=swap`）。Quicksand は sans-serif に近い書体なので、`sans-serif` フォールバックとの差異は小さく、FOUCは目立ちにくい。

### 注意事項

- `&text=` パラメータ使用時は、サイト上のテキスト変更時にURLも更新する必要がある
- `&text=` を使わない代替案（手法2のみ）も十分に効果的であり、メンテナンス性を優先する場合はそちらを推奨

### text= なしのシンプル版（メンテナンス性重視）

```html
<!-- Google Fonts（最適化済み・シンプル版） -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
      rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap"
        rel="stylesheet">
</noscript>
```

---

## 参考資料

- [The Fastest Google Fonts - CSS Wizardry](https://csswizardry.com/2020/05/the-fastest-google-fonts/)
- [Google Fonts CSS2 API ドキュメント](https://developers.google.com/fonts/docs/css2)
- [Google Fonts Getting Started](https://developers.google.com/fonts/docs/getting_started)
- [Make your Google Fonts render faster - 3perf](https://googlefonts.3perf.com/)
- [Still using WebFontLoader? Don't! - Erwin Hofman](https://www.erwinhofman.com/blog/still-using-webfontloader-to-load-google-fonts/)
- [Asynchronous Google Fonts For Page Speed](https://pagespeedchecklist.com/asynchronous-google-fonts)
