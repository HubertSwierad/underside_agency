#!/usr/bin/env python3
"""Limit portfolio JPEG/PNG files to 500,000 bytes using macOS sips.
Run npm run images:optimize, or append -- --dry-run to preview.
Originals are backed up outside public/ before any image is replaced.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
LIMIT = 500_000


def optimize(path, backup_root):
    original_size = path.stat().st_size
    if original_size <= LIMIT:
        return False
    info = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', str(path)],
                          check=True, capture_output=True, text=True).stdout
    dimensions = [int(value) for value in re.findall(r'pixel(?:Width|Height):\s*(\d+)', info)]
    if len(dimensions) != 2:
        raise RuntimeError(f'Could not read dimensions: {path}')
    edge = min(max(dimensions), 2560)
    jpeg = path.suffix.lower() in {'.jpg', '.jpeg'}
    with tempfile.TemporaryDirectory(prefix='underside-images-') as temporary:
        candidate = Path(temporary) / path.name
        for attempt in range(60):
            quality = [85, 75, 65][min(attempt, 2)]
            command = ['sips', '-Z', str(edge)]
            if jpeg:
                command += ['-s', 'formatOptions', str(quality)]
            subprocess.run(command + [str(path), '--out', str(candidate)],
                           check=True, capture_output=True)
            if candidate.stat().st_size <= LIMIT:
                digest = hashlib.sha256(path.read_bytes()).hexdigest()
                backup = backup_root / digest / path.name
                backup.parent.mkdir(parents=True, exist_ok=True)
                if not backup.exists():
                    shutil.copy2(path, backup)
                # Copy beside the source, then replace atomically on the same filesystem.
                with tempfile.NamedTemporaryFile(dir=path.parent, suffix=path.suffix, delete=False) as staged:
                    staged_path = Path(staged.name)
                try:
                    shutil.copyfile(candidate, staged_path)
                    shutil.copymode(path, staged_path)
                    staged_path.replace(path)
                finally:
                    staged_path.unlink(missing_ok=True)
                print(f'{path.name}: {original_size / 1000:.0f} → {path.stat().st_size / 1000:.0f} KB')
                return True
            if not jpeg or attempt >= 2:
                edge = max(1, int(edge * .8))
        raise RuntimeError(f'Could not reach 500 KB; original kept: {path}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--directory', type=Path, default=ROOT / 'public' / 'Portfolio')
    parser.add_argument('--backup-directory', type=Path, default=ROOT / '.image-originals')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    if not args.directory.is_dir():
        parser.error(f'Directory not found: {args.directory}')
    if not shutil.which('sips'):
        parser.error('This script requires macOS (sips).')
    files = sorted(p for p in args.directory.rglob('*') if p.is_file() and p.suffix.lower() in {'.jpg', '.jpeg', '.png'})
    oversized = [p for p in files if p.stat().st_size > LIMIT]
    if args.dry_run:
        for path in oversized:
            print(f'{path.relative_to(args.directory)}: {path.stat().st_size / 1000:.0f} KB')
        print(f'{len(oversized)} of {len(files)} images need optimization. No files changed.')
        return
    for path in oversized:
        optimize(path, args.backup_directory)
    print(f'Optimized {len(oversized)} images. All {len(files)} JPEG/PNG files are within 500 KB.')
    # Reserve the correct image proportions before lazy-loaded files arrive.
    if args.directory.resolve() == (ROOT / 'public' / 'Portfolio').resolve():
        dimensions = {}
        for path in files:
            info = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', str(path)],
                                  check=True, capture_output=True, text=True).stdout
            values = [int(value) for value in re.findall(r'pixel(?:Width|Height):\s*(\d+)', info)]
            if len(values) != 2:
                raise RuntimeError(f'Could not read dimensions: {path}')
            dimensions['/' + path.relative_to(ROOT / 'public').as_posix()] = dict(width=values[0], height=values[1])
        (ROOT / 'src' / 'data' / 'imageDimensions.json').write_text(json.dumps(dimensions, indent=2) + '\n')
        print('Updated image dimensions for stable lazy-loaded tiles.')



if __name__ == '__main__':
    main()
