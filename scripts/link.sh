set -euo pipefail;

. .env;

mkdir -p node_modules/;

(cd $RYNTH; bash ./scripts/build.sh);

cp -R $RYNTH/ node_modules/rynth/;