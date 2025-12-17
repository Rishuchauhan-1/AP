#!/usr/bin/env python3
"""Remove duplicate AI tools from /data/tools.ts"""

# Read the entire file
with open('/data/tools.ts', 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.splitlines(keepends=True)

print(f"Original file has {len(lines)} lines")

# The first duplicate section is from lines 4746-7211 (0-indexed: 4745-7210)
# Remove these lines
lines_before = lines[:4745]
lines_after = lines[7211:]

lines = lines_before + lines_after

print(f"After removing first duplicate block (lines 4746-7211): {len(lines)} lines")

# Now find and remove the second duplicate section (HR tools around line 8810)
# After removing first block, this will be at approximately 8810 - (7211-4745) = 8810 - 2466 = 6344

# Find the marker "// HR Tech (More Tools)"
marker_found = False
for i, line in enumerate(lines):
    if '// HR Tech (More Tools)' in line:
        print(f"Found second duplicate marker at line {i+1}: {line.strip()}")
        start_idx = i
        
        # Find the end of this duplicate section (approximately 76 lines)
        # Look for the closing of 'leena-ai' tool
        end_idx = i
        brace_count = 0
        tool_count = 0
        
        for j in range(i, min(i+200, len(lines))):
            if 'id: \'eightfold-ai\'' in lines[j] or 'id: "eightfold-ai"' in lines[j]:
                tool_count += 1
            if 'id: \'paradox-olivia\'' in lines[j] or 'id: "paradox-olivia"' in lines[j]:
                tool_count += 1  
            if 'id: \'leena-ai\'' in lines[j] or 'id: "leena-ai"' in lines[j]:
                tool_count += 1
                # Find the closing brace of leena-ai
                for k in range(j, min(j+100, len(lines))):
                    if lines[k].strip() == '},':
                        end_idx = k + 1
                        print(f"Found end of duplicate section at line {end_idx}")
                        break
                break
        
        if end_idx > start_idx:
            print(f"Removing lines {start_idx+1} to {end_idx} ({end_idx-start_idx} lines)")
            lines = lines[:start_idx] + lines[end_idx:]
            marker_found = True
            break

if marker_found:
    print(f"After removing second duplicate block: {len(lines)} lines")
else:
    print("Second duplicate block not found - may have already been removed")

# Write the cleaned file
with open('/data/tools.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("\n✓ Successfully removed duplicate AI tools!")
print(f"Final file has {len(lines)} lines")
