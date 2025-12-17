#!/bin/bash

# ========================================
# AUTOMATIC FIX FOR DUPLICATE TOOLS
# ========================================
# This script removes lines 4746-7236 from /data/tools.ts
# Run this from your project root directory
#
# Usage: bash RUN_THIS_TO_FIX.sh
# Or: chmod +x RUN_THIS_TO_FIX.sh && ./RUN_THIS_TO_FIX.sh
# ========================================

echo "🔧 Fixing duplicate tools in data/tools.ts..."
echo ""

# Check if file exists
if [ ! -f "data/tools.ts" ]; then
    echo "❌ Error: data/tools.ts not found!"
    echo "   Make sure you're running this from the project root directory."
    exit 1
fi

# Create backup
echo "📦 Creating backup..."
cp data/tools.ts data/tools.ts.backup
echo "   Backup saved to: data/tools.ts.backup"
echo ""

# Remove corrupted lines (4746-7236)
echo "✂️  Removing duplicate entries (lines 4746-7236)..."
sed -i.temp '4746,7236d' data/tools.ts

# Remove temp file if on Mac (sed creates .temp on Mac)
rm -f data/tools.ts.temp

# Count lines
original_lines=$(wc -l < data/tools.ts.backup | tr -d ' ')
new_lines=$(wc -l < data/tools.ts | tr -d ' ')
removed_lines=$((original_lines - new_lines))

echo ""
echo "✅ SUCCESS! Duplicates removed."
echo ""
echo "📊 Summary:"
echo "   • Original: $original_lines lines"
echo "   • New: $new_lines lines"
echo "   • Removed: $removed_lines lines"
echo "   • Backup: data/tools.ts.backup"
echo ""
echo "🎉 All duplicate tool warnings should now be fixed!"
echo ""
echo "💡 Test the fix by refreshing your app."
echo "   If everything works, you can delete the backup:"
echo "   rm data/tools.ts.backup"
