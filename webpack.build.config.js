const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const clean = require('postcss-clean');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
  entry: './components/App.js',
  output: {
    path: './build',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass?outputStyle=expanded&includePaths[]=' + path.resolve(__dirname, './css/scss'))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/app.min.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
    clean()
  ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './components')]
  }
};

module.exports = config;