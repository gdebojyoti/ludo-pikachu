var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

var sourceDirectory = path.resolve(__dirname, 'src')
var publicDirectory = path.resolve(__dirname, 'public')

var config = {
  entry: {
    app: sourceDirectory + '/index.jsx'
  },
  mode: 'development',
  optimization: {
		// minimize: false // We do not want to minimize our code
	},
  output: {
    path: publicDirectory,
    filename: 'js-[name].js',
    chunkFilename: 'jschunk-[name].bundle.js',
    publicPath: ''
  },
  resolve: { extensions: ['.jsx', '.js', '.json', '.scss'] },
  devServer: {
    inline: true,
    port: 31291,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2000, // Convert images < 2kb to base64 strings
            name: 'images/[name]-[hash].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      title: 'Ludo - a PWA',
      template: sourceDirectory + '/index.html',
      chunks: ['app'],
      filename: 'index.html' // relative to root of the application
    }),
    new MiniCssExtractPlugin({
      filename: 'css-[name].css',
      chunkFilename: 'csschunk-[name].bundle.css'
    })
  ]
}

module.exports = config
