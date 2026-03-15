"""Google Search Console API からレポートデータを取得してCSV出力するスクリプト."""

import argparse
import csv
import os
from datetime import date, timedelta
from pathlib import Path

from dotenv import load_dotenv
from google.oauth2 import service_account
from googleapiclient.discovery import build

load_dotenv()

CREDENTIALS_PATH = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "")
GSC_SITE_URL = os.environ.get("GSC_SITE_URL", "")

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


def get_service():
    credentials = service_account.Credentials.from_service_account_file(
        CREDENTIALS_PATH, scopes=SCOPES
    )
    return build("searchconsole", "v1", credentials=credentials)


def query_search_analytics(service, site_url: str, start_date: str, end_date: str, dimensions: list[str], row_limit: int = 1000) -> list[dict]:
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    response = service.searchAnalytics().query(siteUrl=site_url, body=body).execute()

    rows = []
    for row in response.get("rows", []):
        record = {}
        for i, dim in enumerate(dimensions):
            record[dim] = row["keys"][i]
        record["clicks"] = row["clicks"]
        record["impressions"] = row["impressions"]
        record["ctr"] = round(row["ctr"], 4)
        record["position"] = round(row["position"], 1)
        rows.append(record)
    return rows


def write_csv(rows: list[dict], path: Path) -> None:
    if not rows:
        print(f"  データなし: {path.name}")
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f"  出力: {path}")


def fetch_queries(service, site_url: str, start: str, end: str, output_dir: Path) -> None:
    print("検索クエリレポート取得中...")
    rows = query_search_analytics(service, site_url, start, end, dimensions=["query"], row_limit=50)
    write_csv(rows, output_dir / "gsc_queries.csv")


def fetch_pages(service, site_url: str, start: str, end: str, output_dir: Path) -> None:
    print("ページ別レポート取得中...")
    rows = query_search_analytics(service, site_url, start, end, dimensions=["page"])
    write_csv(rows, output_dir / "gsc_pages.csv")


def fetch_devices(service, site_url: str, start: str, end: str, output_dir: Path) -> None:
    print("デバイス別レポート取得中...")
    rows = query_search_analytics(service, site_url, start, end, dimensions=["device"])
    write_csv(rows, output_dir / "gsc_devices.csv")


def main() -> None:
    three_days_ago = date.today() - timedelta(days=3)
    default_start = (three_days_ago - timedelta(days=27)).isoformat()
    default_end = three_days_ago.isoformat()

    parser = argparse.ArgumentParser(description="Google Search Console データ取得")
    parser.add_argument("--start-date", default=default_start, help="開始日 (YYYY-MM-DD)")
    parser.add_argument("--end-date", default=default_end, help="終了日 (YYYY-MM-DD)")
    parser.add_argument("--output-dir", default="./data", help="CSV出力先ディレクトリ")
    args = parser.parse_args()

    if not GSC_SITE_URL:
        print("エラー: GSC_SITE_URL が設定されていません。.env を確認してください。")
        raise SystemExit(1)
    if not CREDENTIALS_PATH:
        print("エラー: GOOGLE_APPLICATION_CREDENTIALS が設定されていません。.env を確認してください。")
        raise SystemExit(1)

    output_dir = Path(args.output_dir)
    service = get_service()

    print(f"期間: {args.start_date} 〜 {args.end_date}")
    print(f"サイト: {GSC_SITE_URL}\n")

    fetch_queries(service, GSC_SITE_URL, args.start_date, args.end_date, output_dir)
    fetch_pages(service, GSC_SITE_URL, args.start_date, args.end_date, output_dir)
    fetch_devices(service, GSC_SITE_URL, args.start_date, args.end_date, output_dir)

    print("\n完了!")


if __name__ == "__main__":
    main()
