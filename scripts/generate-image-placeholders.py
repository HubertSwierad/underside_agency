#!/usr/bin/env python3
"""Create tiny embedded previews so portfolio images never render as blank tiles."""
from base64 import b64encode
from pathlib import Path
import json
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / 'public' / 'Portfolio'
ABOUT = ROOT / 'public' / 'About'
DIMENSIONS = json.loads((ROOT / 'src' / 'data' / 'imageDimensions.json').read_text())
OUTPUT = ROOT / 'src' / 'data' / 'imagePlaceholders.json'

if not shutil.which('cwebp'):
    raise SystemExit('cwebp is required to generate image placeholders.')

placeholders = {}
with tempfile.TemporaryDirectory() as temporary_directory:
    temporary_file = Path(temporary_directory) / 'placeholder.webp'
    for directory in (PORTFOLIO, ABOUT):
        for source in directory.rglob('*'):
            if not source.is_file() or source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
                continue
            key = '/' + source.relative_to(ROOT / 'public').as_posix()
            if key not in DIMENSIONS:
                raise RuntimeError(f'Could not read image dimensions: {source}')
            subprocess.run(
                ['cwebp', '-quiet', '-q', '24', '-resize', '36', '0', str(source), '-o', str(temporary_file)],
                check=True,
                capture_output=True,
            )
            encoded = b64encode(temporary_file.read_bytes()).decode('ascii')
            placeholders[key] = f'data:image/webp;base64,{encoded}'

OUTPUT.write_text(json.dumps(placeholders, separators=(',', ':')) + '\n')
print(f'Generated {len(placeholders)} embedded image previews.')
