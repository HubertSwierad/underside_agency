const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const oversized = [];
function check(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) check(file);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name) && fs.statSync(file).size > 500000) {
      oversized.push(path.relative(root, file));
    }
  }
}
check(path.join(root, 'public', 'Portfolio'));
if (oversized.length) {
  throw new Error('Portfolio images exceed 500 KB. Run npm run images:optimize before building:\n' + oversized.join('\n'));
}
console.log('Verified: all published portfolio photos are within 500 KB.');
