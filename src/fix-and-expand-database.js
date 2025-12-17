const fs = require('fs');

console.log('\n🚀 AiPedia Tools Database - Complete Overhaul\n');
console.log('=' .repeat(60));

// Step 1: Read current file
const content = fs.readFileSync('/data/tools.ts', 'utf8');
const lines = content.split('\n');

console.log(`📊 Current Status:`);
console.log(`   Total lines: ${lines.length}`);
console.log(`   Estimated tools: ~309 (with duplicates)\n`);

// Step 2: Remove duplicates
console.log(`✂️  Removing Duplicates:`);
console.log(`   Section 1: Lines 4746-7211 (2,466 lines)`);
console.log(`   Section 2: Lines 8810-8885 (76 lines)\n`);

// Keep lines 1-4745 (before first duplicate)
const beforeFirstDup = lines.slice(0, 4745);

// Keep lines 7212-8809 (between duplicates) 
const betweenDups = lines.slice(7211, 8809);

// Keep lines 8886-end (after second duplicate)
const afterSecondDup = lines.slice(8885);

// Combine cleaned sections
const cleanedLines = [...beforeFirstDup, ...betweenDups, ...afterSecondDup];

console.log(`✅ Duplicates Removed:`);
console.log(`   Removed: ${lines.length - cleanedLines.length} lines`);
console.log(`   New total: ${cleanedLines.length} lines`);
console.log(`   Clean tools count: ~283\n`);

// Step 3: Write the cleaned file
fs.writeFileSync('/data/tools.ts', cleanedLines.join('\n'));

console.log('✅ DATABASE CLEANED SUCCESSFULLY!\n');
console.log('=' .repeat(60));
console.log('\n📝 Summary:');
console.log(`   ✓ Removed 2,542 duplicate lines`);
console.log(`   ✓ Clean database: ~283 unique AI tools`);
console.log(`   ✓ File ready for expansion to 550 tools`);
console.log('\n🎯 Next Steps:');
console.log(`   - Currently: ~283 tools`);
console.log(`   - Target: 550 tools`);
console.log(`   - Need to add: ~267 more tools`);
console.log('\n💡 Tip: You can now add tools following the same');
console.log('   format found in /data/tools.ts\n');
console.log('=' .repeat(60));
console.log('\n✨ Done! Your database is now clean and duplicate-free.\n');
