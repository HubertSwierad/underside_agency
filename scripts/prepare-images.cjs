require('./discover-youtube.cjs');
const { spawnSync } = require('child_process');
// Responsive variants are generated locally in the build filesystem, then
// copied into the static site artifact. Originals remain untouched.
const variants = spawnSync('python3', ['scripts/generate-image-variants.py'], { stdio: 'inherit' });
if (variants.error) throw variants.error;
if (variants.status !== 0) process.exit(variants.status ?? 1);
require('./check-images.cjs');
