'use strict';

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    path: './src/client/assets',
    filename: 'build.js',
  },

  watch: true,

  module: {
    loaders: [
      {
        test: /index.jsx/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      }
    ]
  },
}