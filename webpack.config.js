import Path from 'node:path';

const __dirname = Path.dirname(new URL(import.meta.url).pathname);

export default {
	entry: {		
		backtopaper: './dist/tests/backtopaper/index.js',
	},
	output: {
		path: Path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},
	
	mode: 'development',
	optimization: {
		minimize: false,
	},
	devtool: 'source-map',

	resolve: {
		alias: {
			'rynth': Path.resolve(__dirname, '../rynth/dist/src/'),
		},
	},
};
