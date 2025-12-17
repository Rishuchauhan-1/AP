#!/bin/bash

echo "=================================="
echo "AiPedia Database Cleanup"
echo "=================================="
echo ""

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✓ Node.js found"
    echo ""
    echo "Executing fix with Node.js..."
    node /fix-and-expand-database.js
    echo ""
    echo "✅ Done! Check /data/tools.ts"
elif command -v python3 &> /dev/null; then
    echo "✓ Python found"
    echo ""
    echo "Executing fix with Python..."
    python3 /complete-tools-update.py
    echo ""
    echo "✅ Done! Check /data/tools.ts"
else
    echo "⚠️  Neither Node.js nor Python found"
    echo ""
    echo "Please run one of these commands manually:"
    echo "  node /fix-and-expand-database.js"
    echo "  OR"
    echo "  python3 /complete-tools-update.py"
fi

echo ""
echo "=================================="
