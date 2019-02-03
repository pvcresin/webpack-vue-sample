const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
	entry: path.join(__dirname, '/src/app.js'),
	output: {
		filename: 'app.js',
		path: path.join(__dirname, '/dist')
	},
	devServer: {
		contentBase: 'dist',
		hot: process.env.NODE_ENV === 'hot'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json']
	},
	plugins:
		process.env.NODE_ENV === 'hot'
			? [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin()]
			: [new VueLoaderPlugin()]
}
