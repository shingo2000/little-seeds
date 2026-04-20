#!/bin/bash
# Gallery画像をサムネイル(768x768正方形クロップ)とLightbox拡大用(長辺1200px)の
# WebP形式に一括変換する。
# 使用: bash tools/optimize-gallery.sh
# 依存: ImageMagick (magick)
# ソース: /Users/suzukishingo/Desktop/images/gallery/ の gallery_*.jpg

set -euo pipefail

SOURCE_DIR="/Users/suzukishingo/Desktop/images/gallery"
OUTPUT_DIR="web/assets/images/gallery"
THUMB_SIZE=768
FULL_LONG_EDGE=1200
THUMB_Q=80
FULL_Q=82

cd "$(dirname "$0")/.."

if [ ! -d "$SOURCE_DIR" ]; then
  echo "ERROR: $SOURCE_DIR が見つかりません" >&2
  exit 1
fi

shopt -s nullglob
for src in "$SOURCE_DIR"/gallery_*.jpg; do
  name="$(basename "${src%.jpg}")"
  thumb="${OUTPUT_DIR}/${name}-thumb.webp"
  full="${OUTPUT_DIR}/${name}.webp"

  magick "$src" \
    -gravity center \
    -resize "${THUMB_SIZE}x${THUMB_SIZE}^" \
    -extent "${THUMB_SIZE}x${THUMB_SIZE}" \
    -quality "$THUMB_Q" \
    "$thumb"
  echo "OK: $thumb"

  magick "$src" \
    -resize "${FULL_LONG_EDGE}x${FULL_LONG_EDGE}>" \
    -quality "$FULL_Q" \
    "$full"
  echo "OK: $full"
done

echo "完了"
