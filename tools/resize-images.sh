#!/bin/bash
# WebP画像の480px幅バージョンを生成するスクリプト
# 使用: bash tools/resize-images.sh
# 依存: ImageMagick (magick)

set -euo pipefail

IMAGE_DIR="web/assets/images"
WIDTH=480
QUALITY=80

# 対象ファイル一覧
targets=(
  hero_1.webp
  hero_2.webp
  hero_3.webp
  hero_4.webp
  hero_5.webp
  concept.webp
  safety.webp
  flow.webp
  plan_mini.webp
  plan_basic.webp
  plan_premium.webp
)

for file in "${targets[@]}"; do
  src="${IMAGE_DIR}/${file}"
  name="${file%.webp}"
  dst="${IMAGE_DIR}/${name}-480w.webp"

  if [ ! -f "$src" ]; then
    echo "SKIP: ${src} が見つかりません"
    continue
  fi

  magick "$src" -resize "${WIDTH}x" -quality "$QUALITY" "$dst"
  echo "OK: ${dst}"
done

echo "完了"
