module.exports = {
	mode: 'production',
	entry: {
		metrics: './metrics.js',
		toolbar: './toolbar.js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	resolve: {
		extensions: ['*', '.js']
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	}
}