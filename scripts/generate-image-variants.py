#!/usr/bin/env python3
"""Generate responsive WebP widths from source photos during the server build."""
from pathlib import Path
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / 'public' / 'Portfolio'
VARIANTS = ROOT / 'public' / 'optimized' / 'Portfolio'
DIMENSIONS = json.loads((ROOT / 'src' / 'data' / 'imageDimensions.json').read_text())
MOBILE_LIMIT = 200_000

if not shutil.which('cwebp'):
    raise SystemExit('cwebp is required to generate responsive images during the build.')

for source in PORTFOLIO.rglob('*'):
    if not source.is_file() or source.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        continue
    source_key = '/' + source.relative_to(ROOT / 'public').as_posix()
    metadata = DIMENSIONS.get(source_key)
    if not metadata:
        raise RuntimeError(f'Could not read image width: {source}')
    source_width = metadata['width']
    for width in (800, 1600, 2200):
        if width >= source_width:
            continue
        relative = source.relative_to(PORTFOLIO)
        target = (VARIANTS / relative).with_name(f'{source.stem}-{width}w.webp')
        target.parent.mkdir(parents=True, exist_ok=True)
        quality_levels = (82, 75, 68, 61, 54, 47, 40)
        # 1600 px supplies a 2x asset for typical 800 CSS-pixel mobile layouts.
        size_limit = MOBILE_LIMIT if width in (800, 1600) else 450_000
        for quality in quality_levels:
            subprocess.run(['cwebp', '-quiet', '-q', str(quality), '-resize', str(width), '0',
                            str(source), '-o', str(target)], check=True, capture_output=True)
            if target.stat().st_size <= size_limit:
                break
        else:
            target.unlink(missing_ok=True)
            raise RuntimeError(f'Could not reach {size_limit // 1000} KB for {target.name}')
        if width == 1600:
            print(f'{target.name}: {target.stat().st_size / 1000:.0f} KB (retina mobile limit {MOBILE_LIMIT // 1000} KB)')
