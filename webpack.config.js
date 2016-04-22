const webpack = require('webpack');

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
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    /*new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })*/
  ]
};

module.exports = config;