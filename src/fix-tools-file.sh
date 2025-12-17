#!/bin/bash

# Script to remove duplicate sections from /data/tools.ts

echo "Fixing /data/tools.ts by removing duplicate tool entries..."

# Backup original
cp ./data/tools.ts ./data/tools.ts.backup

# Remove first duplicate section (lines 4746-7211: 2466 lines)
# Remove second duplicate section (lines 8810-8885: 76 lines, but adjust after first removal)

# Using sed to delete line ranges
# First duplicate: lines 4746 to 7211
# Second duplicate: after first removal, lines shift, so original 8810-8885 becomes 6344-6419

sed -i '4746,7211d' ./data/tools.ts
echo "✅ Removed first duplicate section (lines 4746-7211)"

# Now remove second section with adjusted line numbers
sed -i '6344,6419d' ./data/tools.ts  
echo "✅ Removed second duplicate section (adjusted lines 6344-6419)"

echo ""
echo "📊 File size comparison:"
wc -l ./data/tools.ts.backup ./data/tools.ts

echo ""
echo "✅ Done! Duplicate tools removed."
echo "Original file backed up as: ./data/tools.ts.backup"
