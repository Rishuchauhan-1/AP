// Script to remove duplicate tools from /data/tools.ts
const fs = require('fs');

// Read the file
const content = fs.readFileSync('/data/tools.ts', 'utf8');

// Parse to find all tool IDs and their line numbers
const lines = content.split('\n');
const toolIds = new Map();
const duplicateRanges = [];

let currentTool = null;
let currentStartLine = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is a tool ID line
  const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
  
  if (idMatch) {
    const id = idMatch[1];
    
    if (toolIds.has(id)) {
      // This is a duplicate!
      console.log(`Duplicate found: ${id} at line ${i + 1} (first seen at line ${toolIds.get(id) + 1})`);
      
      // Mark the start of duplicate
      if (!currentTool) {
        currentStartLine = i - 1; // Start from the opening brace
      }
      currentTool = id;
    } else {
      // First occurrence
      toolIds.set(id, i);
      
      // If we were tracking duplicates and now found a unique tool,
      // mark the end of duplicate range
      if (currentTool !== null && !toolIds.has(line.match(/^\s*id:\s*['"]([^'"]+)['"]/)?.[1])) {
        // Previous section was duplicates
      }
      currentTool = null;
    }
  }
}

console.log(`\nTotal unique tools: ${toolIds.size}`);
console.log(`Total lines: ${lines.length}`);
