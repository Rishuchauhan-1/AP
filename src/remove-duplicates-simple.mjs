import { readFileSync, writeFileSync } from 'fs';

// Read file
const content = readFileSync('./data/tools.ts', 'utf-8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);

// Remove lines 4746-7236 (indices 4745-7235 in 0-based array)
const cleanedLines = [
  ...lines.slice(0, 4745),  // Keep lines 1-4745
  ...lines.slice(7236)       // Keep lines 7237-end
];

console.log(`Cleaned lines: ${cleanedLines.length}`);
console.log(`Removed: ${lines.length - cleanedLines.length} lines`);

// Write back
writeFileSync('./data/tools.ts', cleanedLines.join('\n'), 'utf-8');
console.log('✅ Done!');
