// Script to add 241 new AI tools to reach 550 total

const fs = require('fs');

const newTools = `  ,{
    id: 'kapwing-ai',
    name: 'Kapwing',
    tagline: 'AI-powered collaborative video editor',
    description: 'Kapwing provides AI-powered video editing tools with automatic subtitles, background removal, and collaborative editing features.',
    category: 'video-editing',
    features: ['Auto subtitles', 'Background removal', 'Video resizing', 'Smart cut', 'Collaborative editing', 'Templates'],
    pricing: 'Free tier, Pro from $16/month, Business from $67/month',
    website: 'https://kapwing.com',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600',
    rating: 4.6,
    bestFor: ['Social media content', 'Subtitle generation', 'Quick edits', 'Team collaboration'],
    limitations: ['Watermark on free tier', 'Export limits', 'Processing time varies'],
    tips: [
      { title: 'Auto Subtitles', description: 'Generate accurate subtitles in 60+ languages.' },
      { title: 'Smart Templates', description: 'Use pre-made templates for faster creation.' },
      { title: 'Cloud-Based', description: 'Edit from anywhere, no software installation.' }
    ],
    howToUse: [
      { step: 1, title: 'Upload Media', description: 'Import videos, images, or audio.' },
      { step: 2, title: 'Apply AI Tools', description: 'Use auto-subtitle, remove background, etc.' },
      { step: 3, title: 'Edit & Customize', description: 'Fine-tune with editor tools.' },
      { step: 4, title: 'Export', description: 'Download or share directly.' }
    ]
  }`;

// Read the current tools.ts file
const toolsFile = fs.readFileSync('/data/tools.ts', 'utf8');

// Find the position of the last closing bracket
const lastBracket = toolsFile.lastIndexOf('];');

// Insert the new tools before the closing bracket
const updatedContent = toolsFile.slice(0, lastBracket) + newTools + '\n' + toolsFile.slice(lastBracket);

// Write back to the file
fs.writeFileSync('/data/tools.ts', updatedContent, 'utf8');

console.log('Successfully added new tools!');
