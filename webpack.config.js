'use strict';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: './src/client/assets',
    publicPath: '/assets/',
    filename: 'build.js',
  },

  watch: true,

  module: {
    loaders: [
      {
        test: /index.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      }
    ]
  },
}