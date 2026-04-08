#!/usr/bin/env bash
set -euo pipefail;

rm -rf node_modules/rynth;

bash scripts/link.sh;

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)";
cd "$ROOT_DIR";

echo "Cleaning previous build...";
rm -rf dist;
mkdir -p dist;

echo "Transpiling...";
tsc;

echo "Bundling...";
npx webpack;