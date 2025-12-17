#!/usr/bin/env python3
"""
Script to remove corrupted/duplicate entries from tools.ts
Removes lines 4746-7236 which contain duplicate and corrupted tool entries
"""

import os

# Read the file
file_path = os.path.join(os.path.dirname(__file__), 'data', 'tools.ts')

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Original file: {len(lines)} lines")

# Keep lines 0-4744 (lines 1-4745 in 1-indexed) and lines 7236+ (lines 7237+ in 1-indexed)
# Python is 0-indexed: line 1 = index 0, line 4745 = index 4744, line 7237 = index 7236
good_lines = lines[:4745] + lines[7236:]

print(f"New file: {len(good_lines)} lines")
print(f"Removed: {len(lines) - len(good_lines)} lines")

# Write the corrected file
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(good_lines)

print("✅ Successfully removed corrupted section (lines 4746-7236)!")
