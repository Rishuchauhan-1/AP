// Deduplicate tools in /data/tools.ts
const fs = require('fs');

// Read the file
const filePath = '/data/tools.ts';
const content = fs.readFileSync(filePath, 'utf-8');

// Find the aiTools array start
const startMarker = 'export const aiTools: AITool[] = [';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
  console.error('Could not find aiTools array');
  process.exit(1);
}

// Extract everything before the array
const beforeArray = content.substring(0, startIndex + startMarker.length);

// Extract the array content and what comes after
const afterStart = content.substring(startIndex + startMarker.length);

// Find the closing bracket of the array
// We need to match brackets carefully
let bracketCount = 1;
let arrayEndIndex = 0;
let inString = false;
let stringChar = '';
let escaped = false;

for (let i = 0; i < afterStart.length; i++) {
  const char = afterStart[i];
  const prevChar = i > 0 ? afterStart[i - 1] : '';
  
  // Handle string escaping
  if (escaped) {
    escaped = false;
    continue;
  }
  
  if (char === '\\') {
    escaped = true;
    continue;
  }
  
  // Track if we're inside a string
  if ((char === '"' || char === "'" || char === '`') && !inString) {
    inString = true;
    stringChar = char;
    continue;
  }
  
  if (char === stringChar && inString && prevChar !== '\\') {
    inString = false;
    stringChar = '';
    continue;
  }
  
  // Only count brackets outside of strings
  if (!inString) {
    if (char === '[' || char === '{') {
      bracketCount++;
    } else if (char === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        arrayEndIndex = i;
        break;
      }
    } else if (char === '}') {
      bracketCount--;
    }
  }
}

const arrayContent = afterStart.substring(0, arrayEndIndex);
const afterArray = afterStart.substring(arrayEndIndex);

// Now parse tools - we'll use a simpler regex approach to find tool IDs
const toolRegex = /\{\s*id:\s*['"]([^'"]+)['"]/g;
const seenIds = new Set();
const duplicateIds = new Set();

// Find all tool IDs and identify duplicates
let match;
const allMatches = [];
while ((match = toolRegex.exec(arrayContent)) !== null) {
  const id = match[1];
  const position = match.index;
  
  if (seenIds.has(id)) {
    duplicateIds.add(id);
    allMatches.push({ id, position, isDuplicate: true, matchText: match[0] });
  } else {
    seenIds.add(id);
    allMatches.push({ id, position, isDuplicate: false, matchText: match[0] });
  }
}

console.log(`Found ${seenIds.size} unique tools`);
console.log(`Found ${duplicateIds.size} tools with duplicates:`, Array.from(duplicateIds));

// Now we need to remove duplicate tools
// We'll do this by finding complete tool objects and removing duplicates
const seenToolIds = new Set();
const lines = arrayContent.split('\n');
let inTool = false;
let currentToolId = null;
let toolStartLine = -1;
let bracketDepth = 0;
let linesToRemove = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line starts a new tool
  const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch && !inTool) {
    currentToolId = idMatch[1];
    toolStartLine = i;
    inTool = true;
    bracketDepth = 0;
    
    // Count opening braces on this line
    for (const char of line) {
      if (char === '{') bracketDepth++;
      if (char === '}') bracketDepth--;
    }
  } else if (inTool) {
    // Count braces to find the end of the tool object
    for (const char of line) {
      if (char === '{') bracketDepth++;
      if (char === '}') bracketDepth--;
    }
    
    // Check if tool object is complete
    if (bracketDepth <= 0) {
      // Tool is complete
      if (seenToolIds.has(currentToolId)) {
        // This is a duplicate - mark lines for removal
        console.log(`Marking duplicate '${currentToolId}' for removal (lines ${toolStartLine}-${i})`);
        for (let j = toolStartLine; j <= i; j++) {
          linesToRemove.add(j);
        }
      } else {
        seenToolIds.add(currentToolId);
      }
      
      inTool = false;
      currentToolId = null;
      toolStartLine = -1;
    }
  }
}

// Filter out the lines to remove
const filteredLines = lines.filter((line, index) => !linesToRemove.has(index));

// Reconstruct the file
const newContent = beforeArray + '\n' + filteredLines.join('\n') + afterArray;

// Write the file back
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log(`\n✓ Successfully removed ${linesToRemove.size} lines containing duplicate tools`);
console.log(`✓ File now contains ${seenToolIds.size} unique AI tools`);
