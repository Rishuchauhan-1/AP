const fs = require('fs');

// Read the original file
const content = fs.readFileSync('/data/tools.ts', 'utf8');

// Split by tool objects - looking for pattern },\n  {
const lines = content.split('\n');

// Find the part before aiTools array and after
const aiToolsStartIndex = lines.findIndex(line => line.includes('export const aiTools'));
const headerLines = lines.slice(0, aiToolsStartIndex + 1); // Include the export line

// Collect all tools
const seenIds = new Set();
const uniqueTools = [];
let currentTool = [];
let inTools = false;
let skipCurrent = false;

for (let i = aiToolsStartIndex + 1; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if we hit the closing bracket
  if (line.trim() === '];') {
    // Add last tool if not duplicate
    if (currentTool.length > 0 && !skipCurrent) {
      uniqueTools.push(...currentTool);
    }
    uniqueTools.push(line);
    break;
  }
  
  // Check for tool ID
  const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
  if (idMatch) {
    const id = idMatch[1];
    
    // Save previous tool if it wasn't a duplicate
    if (currentTool.length > 0 && !skipCurrent) {
      uniqueTools.push(...currentTool);
    }
    
    // Start new tool
    currentTool = [];
    if (seenIds.has(id)) {
      console.log(`Skipping duplicate: ${id}`);
      skipCurrent = true;
    } else {
      seenIds.add(id);
      skipCurrent = false;
    }
  }
  
  // Add line to current tool
  currentTool.push(line);
}

// Combine everything
const result = [
  ...headerLines,
  ...uniqueTools
].join('\n');

// Write back
fs.writeFileSync('/data/tools.ts', result, 'utf8');
console.log(`\nDone! Kept ${seenIds.size} unique tools.`);
