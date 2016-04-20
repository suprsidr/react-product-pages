const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './css/scss')
];

const config =module.exports = {
  entry: './components/App.js',
  output: {
  	path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

module.exports = config;