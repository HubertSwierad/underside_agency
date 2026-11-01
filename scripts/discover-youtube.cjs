const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const portfolio = path.join(root, 'public', 'Portfolio');
const covers = [];
function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(file);
    else {
      const match = /^watch\?v=([a-zA-Z0-9_-]{11})\.(png|jpe?g|webp)$/i.exec(entry.name);
      if (!match) continue;
      covers.push({
        folder: path.relative(portfolio, file).split(path.sep)[0],
        src: '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/'),
        url: 'https://www.youtube.com/watch?v=' + match[1],
      });
    }
  }
}
scan(portfolio);
fs.writeFileSync(path.join(root, 'src', 'data', 'youtubeCovers.json'), JSON.stringify(covers, null, 2) + '\n');
console.log(`Found ${covers.length} YouTube cover(s).`);
