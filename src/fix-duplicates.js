// Script to remove duplicate entries from tools.ts
// This removes lines 4746-7236 (the corrupted section)

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'tools.ts');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

console.log(`Original file has ${lines.length} lines`);

// Keep lines 1-4745 and lines 7237-end
// (Note: array is 0-indexed, so line 1 is index 0, line 4745 is index 4744)
const goodLines = [
  ...lines.slice(0, 4745),  // Lines 1-4745
  ...lines.slice(7236)       // Lines 7237-end (index 7236 onwards)
];

console.log(`New file will have ${goodLines.length} lines`);
console.log(`Removed ${lines.length - goodLines.length} lines`);

const newContent = goodLines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log('✅ Successfully removed corrupted section!');
console.log(`Deleted lines 4746-7236 (${7236 - 4746 + 1} lines)`);
