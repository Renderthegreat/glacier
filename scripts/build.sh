#!/usr/bin/env bash
set -euo pipefail;

mkdir -p dist;

deno bundle ./src/index.ts > ./dist/bundle.js;

deno bundle ./tests/backtopaper/index.tsx \
	--unstable-raw-imports \
	> ./dist/btp.bundle.js;
