const webpack = require('webpack')
const path = require('path')

module.exports = {
	// devtool: 'eval-source-map',
	entry: {
		app: ['./client/src/main.js']
	},
	output: {
		path: './server/public/javascripts',
		publicPath: '/',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
	    fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue': 'vue/dist/vue.js',
	        'src': path.resolve(__dirname, './client/src'),
	        'assets': path.resolve(__dirname, './client/assets'),
	        'components': path.resolve(__dirname, './client/src/components')
	    }
    },
	module: {
		loaders:[
			// {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name].[ext]'},
			{test: /\.(sass|scss)$/, loader: 'style!css!sass'},
			{
				test: /\.vue$/,
				loader: 'vue',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
		        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		        loader: 'url',
		        query: {
			        limit: 10000,
			        name: path.posix.join('client/static', 'fonts/[name].[hash:7].[ext]')
		        }
		    }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	devServer: {
		contentBase: "./client",
		colors: true,
		historyApiFallback: true,
		inline: true
	},
	vue: {
		loaders: {
			js: 'babel',
			scss: 'vue-style-loader!css!sass',
			css: 'vue-style-loader!css'
		}
	},
	babel: {
		presets: ['es2015']
	}
}