#!/usr/bin/env python3
"""
Script to remove duplicate AI tools and add new ones to reach 550 total tools
"""

# This script will:
# 1. Read the tools.ts file
# 2. Remove duplicate sections (lines 4746-7211 and 8810-8885)
# 3. Add new AI tools to reach 550 total

import sys

def main():
    print("Reading /data/tools.ts...")
    
    with open('/data/tools.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    total_lines = len(lines)
    print(f"Total lines in file: {total_lines}")
    
    # Remove first duplicate section (lines 4746-7211 = indices 4745-7210)
    # Remove second duplicate section (lines 8810-8885 = indices 8809-8884)
    # After removing first section, indices shift by -(7211-4746+1) = -2466
    # So original line 8810 becomes 8810-2466 = 6344
    
    # Keep: 0 to 4745 (indices 0-4744)
    part1 = lines[0:4745]
    print(f"Part 1 (before first duplicate): lines 1-4745 ({len(part1)} lines)")
    
    # Skip: 4746 to 7211 (indices 4745-7210) - FIRST DUPLICATE
    skipped1_count = 7211 - 4746 + 1
    print(f"Skipping first duplicate section: lines 4746-7211 ({skipped1_count} lines)")
    
    # Keep: 7212 to 8809 (indices 7211-8808)
    part2 = lines[7211:8809]
    print(f"Part 2 (between duplicates): lines 7212-8809 ({len(part2)} lines)")
    
    # Skip: 8810 to 8885 (indices 8809-8884) - SECOND DUPLICATE
    skipped2_count = 8885 - 8810 + 1
    print(f"Skipping second duplicate section: lines 8810-8885 ({skipped2_count} lines)")
    
    # Keep: 8886 to end (indices 8885-end)
    part3 = lines[8885:]
    print(f"Part 3 (after second duplicate): lines 8886-{total_lines} ({len(part3)} lines)")
    
    # Combine parts
    cleaned_lines = part1 + part2 + part3
    
    print(f"\nCleaned file will have {len(cleaned_lines)} lines")
    print(f"Removed {total_lines - len(cleaned_lines)} duplicate lines")
    
    # Write cleaned version
    print("\nWriting cleaned version...")
    with open('/data/tools.ts', 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    
    print("✅ Duplicates removed successfully!")
    print("\n=== NEXT STEP ===")
    print("Now we need to add 267 new AI tools to reach 550 total.")
    print("Current: ~283 tools")
    print("Target: 550 tools")
    print("To add: 267 tools")

if __name__ == '__main__':
    main()
