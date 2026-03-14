#!/bin/bash
# WebP画像の480px・768px幅バージョンを生成するスクリプト
# 使用: bash tools/resize-images.sh
# 依存: ImageMagick (magick)
# ソース: /Users/suzukishingo/Desktop/images/ のJPG元画像（二重圧縮回避）

set -euo pipefail

SOURCE_DIR="/Users/suzukishingo/Desktop/images"
OUTPUT_DIR="web/assets/images"
WIDTHS=(480 768)
QUALITY=85

# 対象ファイル一覧
targets=(
  hero_1
  hero_2
  hero_3
  hero_4
  hero_5
  concept
  safety
  flow
  plan_mini
  plan_basic
  plan_premium
)

for name in "${targets[@]}"; do
  src="${SOURCE_DIR}/${name}.jpg"

  if [ ! -f "$src" ]; then
    echo "SKIP: ${src} が見つかりません"
    continue
  fi

  for w in "${WIDTHS[@]}"; do
    dst="${OUTPUT_DIR}/${name}-${w}w.webp"
    magick "$src" -resize "${w}x" -quality "$QUALITY" "$dst"
    echo "OK: ${dst}"
  done
done

echo "完了"
