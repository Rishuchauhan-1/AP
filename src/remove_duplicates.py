#!/usr/bin/env python3
"""
Script to remove duplicate tool entries from /data/tools.ts
Removes duplicates from lines 4746-7211 (first duplicate block)
and lines 8810-8885 (second duplicate block with HR tools)
"""

# Read the file
with open('/data/tools.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Remove lines 4746-7211 (0-indexed: 4745-7210)
# This is the first major duplicate block
print(f"Total lines before: {len(lines)}")
print("Removing lines 4746-7211 (first duplicate block)...")

# Keep everything before line 4746 and after line 7211
part1 = lines[:4745]  # Lines 1-4745
part2 = lines[7211:]  # Lines 7212 onwards

# Combine
lines = part1 + part2

print(f"Total lines after removing first duplicate block: {len(lines)}")

# Now we need to find and remove the second duplicate block
# The HR tools duplicates (eightfold-ai, paradox-olivia) that appear around line 8810
# After removing the first block, the line numbers will have shifted down by (7211 - 4745) = 2466 lines
# So the new position would be approximately 8810 - 2466 = 6344

# Let's search for the duplicate IDs and remove them
# We'll search for the comment "// HR Tech (More Tools)" which marks the duplicate section

# Find the second duplicate section
for i, line in enumerate(lines):
    if '// HR Tech (More Tools)' in line:
        start_idx = i
        print(f"Found second duplicate marker at line {i+1}")
        # Find where this duplicate section ends (approximately 76 lines based on 8810-8885)
        # Look for the next major section marker or the end of duplicate tools
        end_idx = start_idx
        for j in range(i+1, min(i+100, len(lines))):
            # The duplicate section ends when we see 'leena-ai' closing brace
            if "'id': 'leena-ai'" in lines[j] or 'id: \'leena-ai\'' in lines[j]:
                # Find the closing brace of this tool
                for k in range(j, min(j+50, len(lines))):
                    if lines[k].strip() == '},':
                        end_idx = k + 1
                        break
                break
        
        if end_idx > start_idx:
            print(f"Removing second duplicate block from line {start_idx+1} to {end_idx}")
            # Remove this section
            lines = lines[:start_idx] + lines[end_idx:]
            break

print(f"Total lines after removing both duplicate blocks: {len(lines)}")

# Write the cleaned file
with open('/data/tools.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("✓ Duplicates removed successfully!")
print("The file now contains only unique AI tools.")
