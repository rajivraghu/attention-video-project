#!/usr/bin/env python3
"""Validate that a rendered explainer MP4 has a decodable video stream."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, check=False, text=True, capture_output=True)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("video", type=Path)
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    parser.add_argument("--fps", type=float)
    parser.add_argument("--duration", type=float)
    parser.add_argument("--tolerance", type=float, default=0.1)
    args = parser.parse_args()

    if not args.video.is_file():
        parser.error(f"video does not exist: {args.video}")
    for binary in ("ffprobe", "ffmpeg"):
        if not shutil.which(binary):
            parser.error(f"required executable is unavailable: {binary}")

    probe = run([
        "ffprobe", "-v", "error", "-show_streams", "-show_format",
        "-of", "json", str(args.video),
    ])
    if probe.returncode:
        print(probe.stderr, file=sys.stderr)
        return 1

    metadata = json.loads(probe.stdout)
    videos = [s for s in metadata.get("streams", []) if s.get("codec_type") == "video"]
    if not videos:
        print("No video stream found", file=sys.stderr)
        return 1
    stream = videos[0]
    duration = float(metadata.get("format", {}).get("duration", 0))
    rate_n, rate_d = (stream.get("r_frame_rate") or "0/1").split("/", 1)
    fps = float(rate_n) / float(rate_d)

    expected = {
        "width": args.width,
        "height": args.height,
        "fps": args.fps,
        "duration": args.duration,
    }
    actual = {
        "path": str(args.video.resolve()),
        "codec": stream.get("codec_name"),
        "width": int(stream.get("width", 0)),
        "height": int(stream.get("height", 0)),
        "fps": fps,
        "duration": duration,
    }

    failures: list[str] = []
    for key in ("width", "height"):
        if expected[key] is not None and actual[key] != expected[key]:
            failures.append(f"{key}: expected {expected[key]}, got {actual[key]}")
    for key in ("fps", "duration"):
        if expected[key] is not None and abs(actual[key] - expected[key]) > args.tolerance:
            failures.append(f"{key}: expected {expected[key]}, got {actual[key]}")

    decode = run(["ffmpeg", "-v", "error", "-i", str(args.video), "-f", "null", "-"])
    if decode.returncode:
        failures.append("ffmpeg could not decode the complete video")
        if decode.stderr:
            failures.append(decode.stderr.strip())

    print(json.dumps({"status": "failed" if failures else "ok", **actual}, indent=2))
    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
