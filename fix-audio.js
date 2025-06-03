const fs = require('fs');

let content = fs.readFileSync('src/App.js', 'utf8');

// Fix all AudioPlayer transcript props
content = content.replace(/transcriptFile={audioContent\.chapters\[\d+\]\.transcriptFile}/g, 'transcript="Audio transcript available"');

// Ensure proper import
if (!content.includes('import { audioContent }')) {
  content = content.replace(
    'import AudioPlayer from "./components/shared/AudioPlayer";',
    'import AudioPlayer from "./components/shared/AudioPlayer";\n// import { audioContent } from "./data/audioContent";'
  );
}

fs.writeFileSync('src/App.js', content);
console.log('Fixed audio transcripts');
