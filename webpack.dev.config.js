const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './css/scss')
];

const config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './components/App'
  ],
  module: {
    loaders: [
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'components')
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

module.exports = config;
