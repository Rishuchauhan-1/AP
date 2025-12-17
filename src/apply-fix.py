#!/usr/bin/env python3
"""
Remove duplicate tool entries from /data/tools.ts

This script removes two duplicate sections:
1. Lines 4746-7211 (2466 lines) - duplicates of tools already appearing before line 4746
2. Lines 8810-8885 (76 lines, adjusted to 6344-6419 after first removal)
"""

def fix_duplicates():
    # Read the file
    with open('./data/tools.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"Original file: {len(lines)} lines")
    
    # Keep lines before first duplicate (lines 1-4745)
    part1 = lines[0:4745]
    print(f"Part 1 (lines 1-4745): {len(part1)} lines")
    
    # Skip first duplicate section (lines 4746-7211)
    # Keep lines after first duplicate until second duplicate (lines 7212-8809)
    part2 = lines[7211:8809]
    print(f"Part 2 (lines 7212-8809): {len(part2)} lines")
    
    # Skip second duplicate section (lines 8810-8885)
    # Keep remaining lines (8886 to end)
    part3 = lines[8885:]
    print(f"Part 3 (lines 8886-{len(lines)}): {len(part3)} lines")
    
    # Combine all parts
    fixed_lines = part1 + part2 + part3
    print(f"\nFixed file: {len(fixed_lines)} lines")
    print(f"Removed: {len(lines) - len(fixed_lines)} lines")
    
    # Write the fixed file
    with open('./data/tools.ts', 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)
    
    print("\n✅ Successfully removed duplicate tools!")
    print(f"   Original: {len(lines)} lines → Fixed: {len(fixed_lines)} lines")

if __name__ == '__main__':
    fix_duplicates()
