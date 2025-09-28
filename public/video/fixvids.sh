#!/usr/bin/env bash

# Directory containing your summon videos
INPUT_DIR="./summon_videos"          # adjust path
OUTPUT_DIR="./summon_videos_fixed"   # adjust path

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through all mp4 files
for file in "$INPUT_DIR"/*.mp4; do
  # Extract filename without path
  filename=$(basename "$file")

  echo "🔄 Re-encoding $filename ..."

  ffmpeg -i "$file" \
    -c:v copy -c:a copy \
    -movflags +faststart \
    "$OUTPUT_DIR/$filename"

  if [ $? -eq 0 ]; then
    echo "✅ Fixed: $filename"
  else
    echo "❌ Failed: $filename"
  fi
done

echo "🎉 All done! Fixed files are in $OUTPUT_DIR"
