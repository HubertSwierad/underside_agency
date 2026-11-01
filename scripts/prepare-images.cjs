require('./discover-youtube.cjs');
const { spawnSync } = require('child_process');
// Originals stay in the ignored .image-originals directory outside public/.
if (process.platform === 'darwin') {
  const result = spawnSync('python3', ['scripts/optimize_images.py'], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
// Also enforce the limit on non-macOS deployment hosts.
require('./check-images.cjs');
