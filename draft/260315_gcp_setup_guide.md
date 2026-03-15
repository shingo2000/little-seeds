# GCP セットアップガイド — GA4 / Search Console API

GA4 Data API と Search Console API をサービスアカウント経由で利用するためのセットアップ手順。

---

## 1. GCPプロジェクト作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 左上のプロジェクト選択 → 「新しいプロジェクト」をクリック
3. プロジェクト名を入力（例: `little-seeds-analytics`）して「作成」

## 2. API の有効化

GCPコンソールの「APIとサービス」→「ライブラリ」から以下の2つを検索して有効化:

- **Google Analytics Data API**（GA4用）
- **Google Search Console API**

## 3. サービスアカウント作成

1. 「IAMと管理」→「サービスアカウント」→「サービスアカウントを作成」
2. 名前を入力（例: `analytics-reader`）
3. ロールの付与は不要（外部サービス側で権限を設定するため）
4. 「完了」をクリック

### JSON鍵のダウンロード

1. 作成したサービスアカウントの行をクリック
2. 「鍵」タブ → 「鍵を追加」→「新しい鍵を作成」
3. 「JSON」を選択して「作成」
4. ダウンロードされたJSONファイルを `tools/credentials/service-account.json` に配置

> **注意**: この鍵ファイルは秘密情報です。Gitにコミットしないでください（`.gitignore` で除外済み）。

## 4. GA4 プロパティへの権限付与

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 管理 → 対象プロパティの「プロパティのアクセス管理」
3. 「+」→「ユーザーを追加」
4. サービスアカウントのメールアドレスを入力（例: `analytics-reader@little-seeds-analytics.iam.gserviceaccount.com`）
5. 役割: **閲覧者** を選択して追加

### GA4 プロパティIDの確認

1. Google Analytics → 管理 → プロパティ設定
2. 「プロパティID」の数値をメモ（`.env` の `GA4_PROPERTY_ID` に使用）

## 5. Search Console への権限付与

1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. 対象プロパティの「設定」→「ユーザーと権限」
3. 「ユーザーを追加」
4. サービスアカウントのメールアドレスを入力
5. 権限: **制限付き** を選択して追加

## 6. ローカル環境セットアップ

### 前提条件

- Python 3.10以上
- [uv](https://docs.astral.sh/uv/) がインストール済み

### 手順

```bash
# 1. tools ディレクトリに移動
cd tools

# 2. .env ファイルを作成
cp .env.example .env
```

`.env` を編集して値を設定:

```
GOOGLE_APPLICATION_CREDENTIALS=./credentials/service-account.json
GA4_PROPERTY_ID=（GA4プロパティIDの数値）
GSC_SITE_URL=https://little-seeds.ayako-suzuki.net/
```

```bash
# 3. 依存パッケージのインストール
uv sync

# 4. 動作確認 — GA4データ取得
uv run python fetch_ga4.py

# 5. 動作確認 — GSCデータ取得
uv run python fetch_gsc.py
```

正常に実行されると `tools/data/` ディレクトリに以下のCSVファイルが出力されます:

| ファイル | 内容 |
|---------|------|
| `ga4_summary.csv` | GA4 サマリー（PV・セッション・ユーザー数等） |
| `ga4_pages.csv` | GA4 ページ別レポート |
| `ga4_traffic_sources.csv` | GA4 トラフィックソース別レポート |
| `gsc_queries.csv` | GSC 検索クエリレポート |
| `gsc_pages.csv` | GSC ページ別レポート |
| `gsc_devices.csv` | GSC デバイス別レポート |

### オプション引数

両スクリプトとも以下の引数で期間と出力先を変更できます:

```bash
uv run python fetch_ga4.py --start-date 2026-01-01 --end-date 2026-01-31 --output-dir ./data
uv run python fetch_gsc.py --start-date 2026-01-01 --end-date 2026-01-31 --output-dir ./data
```

| 引数 | デフォルト | 説明 |
|------|-----------|------|
| `--start-date` | 過去28日前 | 開始日（YYYY-MM-DD） |
| `--end-date` | GA4: 昨日 / GSC: 3日前 | 終了日（YYYY-MM-DD） |
| `--output-dir` | `./data` | CSV出力先ディレクトリ |
