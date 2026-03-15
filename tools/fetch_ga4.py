"""GA4 Data API からレポートデータを取得してCSV出力するスクリプト."""

import argparse
import csv
import os
from datetime import date, timedelta
from pathlib import Path

from dotenv import load_dotenv
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)

load_dotenv()

PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "")


def get_client() -> BetaAnalyticsDataClient:
    return BetaAnalyticsDataClient()


def run_report(
    client: BetaAnalyticsDataClient,
    dimensions: list[str],
    metrics: list[str],
    start_date: str,
    end_date: str,
    row_limit: int = 0,
) -> list[dict]:
    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name=d) for d in dimensions],
        metrics=[Metric(name=m) for m in metrics],
        date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
        limit=row_limit if row_limit > 0 else 10000,
    )
    response = client.run_report(request)

    rows = []
    for row in response.rows:
        record = {}
        for i, dim in enumerate(dimensions):
            record[dim] = row.dimension_values[i].value
        for i, met in enumerate(metrics):
            record[met] = row.metric_values[i].value
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


def fetch_summary(client: BetaAnalyticsDataClient, start: str, end: str, output_dir: Path) -> None:
    print("サマリーレポート取得中...")
    metrics = [
        "screenPageViews",
        "sessions",
        "totalUsers",
        "newUsers",
        "averageSessionDuration",
        "bounceRate",
    ]
    rows = run_report(client, dimensions=["date"], metrics=metrics, start_date=start, end_date=end)
    write_csv(rows, output_dir / "ga4_summary.csv")


def fetch_pages(client: BetaAnalyticsDataClient, start: str, end: str, output_dir: Path) -> None:
    print("ページ別レポート取得中...")
    metrics = ["screenPageViews", "sessions", "totalUsers"]
    rows = run_report(
        client, dimensions=["pagePath"], metrics=metrics, start_date=start, end_date=end, row_limit=20
    )
    write_csv(rows, output_dir / "ga4_pages.csv")


def fetch_traffic_sources(client: BetaAnalyticsDataClient, start: str, end: str, output_dir: Path) -> None:
    print("トラフィックソースレポート取得中...")
    metrics = ["sessions", "totalUsers"]
    rows = run_report(
        client,
        dimensions=["sessionDefaultChannelGroup"],
        metrics=metrics,
        start_date=start,
        end_date=end,
    )
    write_csv(rows, output_dir / "ga4_traffic_sources.csv")


def main() -> None:
    yesterday = date.today() - timedelta(days=1)
    default_start = (yesterday - timedelta(days=27)).isoformat()
    default_end = yesterday.isoformat()

    parser = argparse.ArgumentParser(description="GA4データ取得")
    parser.add_argument("--start-date", default=default_start, help="開始日 (YYYY-MM-DD)")
    parser.add_argument("--end-date", default=default_end, help="終了日 (YYYY-MM-DD)")
    parser.add_argument("--output-dir", default="./data", help="CSV出力先ディレクトリ")
    args = parser.parse_args()

    if not PROPERTY_ID:
        print("エラー: GA4_PROPERTY_ID が設定されていません。.env を確認してください。")
        raise SystemExit(1)

    output_dir = Path(args.output_dir)
    client = get_client()

    print(f"期間: {args.start_date} 〜 {args.end_date}")
    print(f"GA4 プロパティ: {PROPERTY_ID}\n")

    fetch_summary(client, args.start_date, args.end_date, output_dir)
    fetch_pages(client, args.start_date, args.end_date, output_dir)
    fetch_traffic_sources(client, args.start_date, args.end_date, output_dir)

    print("\n完了!")


if __name__ == "__main__":
    main()
