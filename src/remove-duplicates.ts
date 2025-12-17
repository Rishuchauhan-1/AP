// This file documents the removal of duplicate sections from /data/tools.ts
// Execute by reading file, filtering out these line ranges, then writing back

const fs = require('fs');

// Read the file
const content = fs.readFileSync('./data/tools.ts', 'utf-8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);

// Define duplicate ranges to REMOVE
const duplicateSections = [
  {
    name: 'First duplicate section',
    start: 4745, // Line 4746 (0-indexed: 4745)  
    end: 7210,   // Line 7211 (0-indexed: 7210)
    lineCount: 2466,
    startsWithId: 'invideo-ai',
    endsBeforeId: 'nanonets'
  },
  {
    name: 'Second duplicate section (after first removal)',
    // After removing first section, line numbers shift by -2466
    // Original line 8810 becomes: 8810 - 2466 = 6344
    // Original line 8885 becomes: 8885 - 2466 = 6419
    start: 6343, // Adjusted line 6344 (0-indexed: 6343)
    end: 6418,   // Adjusted line 6419 (0-indexed: 6418)
    lineCount: 76,
    startsWithComment: '// HR Tech (More Tools)',
    containsIds: ['eightfold-ai', 'paradox-olivia', 'leena-ai'],
    endsBeforeId: 'klaviyo-ai'
  }
];

// Remove duplicate sections
let result = [...lines];

// Remove first section
console.log(`\nRemoving ${duplicateSections[0].name}:`);
console.log(`  Lines ${duplicateSections[0].start + 1} to ${duplicateSections[0].end + 1}`);
console.log(`  Count: ${duplicateSections[0].lineCount} lines`);
result.splice(duplicateSections[0].start, duplicateSections[0].lineCount);

// Remove second section (with adjusted indices after first removal)
console.log(`\nRemoving ${duplicateSections[1].name}:`);
console.log(`  Lines ${duplicateSections[1].start + 1} to ${duplicateSections[1].end + 1} (adjusted)`);
console.log(`  Count: ${duplicateSections[1].lineCount} lines`);
result.splice(duplicateSections[1].start, duplicateSections[1].lineCount);

// Write back
fs.writeFileSync('./data/tools.ts', result.join('\n'), 'utf-8');

console.log(`\n✅ Done!`);
console.log(`📊 Original: ${lines.length} lines → New: ${result.length} lines`);
console.log(`🗑️  Removed: ${lines.length - result.length} lines total`);
console.log(`\nExpected result: ~6,675 lines (from original ~9,217)`);
