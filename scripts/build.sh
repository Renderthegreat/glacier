#!/usr/bin/env bash
set -euo pipefail;

mkdir -p dist;

deno check ./src/index.ts;
deno bundle ./src/index.ts > ./dist/bundle.js;

deno check ./tests/backtopaper/index.tsx \
	--unstable-raw-imports;
deno bundle ./tests/backtopaper/index.tsx \
	--unstable-raw-imports \
	> ./dist/btp.bundle.js;

echo "
<html>
	<head>
		<script>$(cat ./dist/btp.bundle.js)</script>
	</head>
</html>
" > ./dist/btp.html

echo 'Bundled HTML page';