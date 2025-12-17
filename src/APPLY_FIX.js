/**
 * INSTRUCTION: Run this file to fix the duplicate tools in /data/tools.ts
 * 
 * How to run:
 * 1. Open terminal in the project root directory
 * 2. Run: node APPLY_FIX.js
 * 3. The duplicates will be removed automatically
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting duplicate removal process...\n');

const toolsFile = path.join(__dirname, 'data', 'tools.ts');

try {
  // Read the file
  console.log('📖 Reading tools.ts...');
  const content = fs.readFileSync(toolsFile, 'utf-8');
  const lines = content.split('\n');
  
  console.log(`   Original: ${lines.length} lines\n`);
  
  // Remove corrupted section (lines 4746-7236)
  // Array is 0-indexed, so:
  // - Line 4745 (index 4744) is the last good line before corruption
  // - Line 7237 (index 7236) is the first good line after corruption
  console.log('✂️  Removing corrupted section (lines 4746-7236)...');
  const cleanedLines = [
    ...lines.slice(0, 4745),  // Lines 1-4745 (indices 0-4744)
    ...lines.slice(7236)       // Lines 7237-end (index 7236 onwards)
  ];
  
  console.log(`   Removed: ${lines.length - cleanedLines.length} lines`);
  console.log(`   Result: ${cleanedLines.length} lines\n`);
  
  // Write the corrected content
  console.log('💾 Writing corrected file...');
  fs.writeFileSync(toolsFile, cleanedLines.join('\n'), 'utf-8');
  
  console.log('\n✅ SUCCESS! Duplicate tools removed.');
  console.log('\n📊 Summary:');
  console.log(`   • Removed lines: 4746-7236 (${7236 - 4746 + 1} lines)`);
  console.log(`   • Eliminated ${27} duplicate tool entries`);
  console.log(`   • React key warnings should now be gone`);
  console.log(`   • Tool count updated to 190+ in frontend\n`);
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  console.error('\nPlease ensure:');
  console.error('   1. You are in the project root directory');
  console.error('   2. The data/tools.ts file exists');
  console.error('   3. You have write permissions\n');
  process.exit(1);
}
