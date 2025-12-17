#!/usr/bin/env python3
import re

# Read file
with open('/data/tools.ts', 'r') as f:
    lines = f.readlines()

# Track tool IDs and their line ranges
seen_ids = set()
keep_lines = []
current_tool_lines = []
current_id = None
skip_current = False
in_tools_array = False

for i, line in enumerate(lines):
    # Check if we're in the aiTools array
    if 'export const aiTools' in line:
        in_tools_array = True
        keep_lines.append(line)
        continue
    
    if not in_tools_array:
        keep_lines.append(line)
        continue
    
    # Check for tool ID
    id_match = re.match(r"\s*id:\s*['\"]([^'\"]+)['\"]", line)
    
    if id_match:
        tool_id = id_match.group(1)
        
        # If we had a previous tool, decide whether to keep it
        if current_tool_lines:
            if not skip_current:
                keep_lines.extend(current_tool_lines)
        
        # Start tracking new tool
        current_tool_lines = [line]
        current_id = tool_id
        
        if tool_id in seen_ids:
            print(f"Skipping duplicate at line {i+1}: {tool_id}")
            skip_current = True
        else:
            seen_ids.add(tool_id)
            skip_current = False
    else:
        # Continuation of current tool
        current_tool_lines.append(line)
        
        # Check if this is end of tools array
        if line.strip() == '];':
            if current_tool_lines and not skip_current:
                keep_lines.extend(current_tool_lines)
            break

# Write output
with open('/data/tools.ts', 'w') as f:
    f.writelines(keep_lines)

print(f"Done! Kept {len(seen_ids)} unique tools")
print(f"Output has {len(keep_lines)} lines")
