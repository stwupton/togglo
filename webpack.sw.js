const path = require('path');

module.exports = {
  entry: './src/sw.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      }
    ]
  },
  resolve: { extensions: ['*', '.js'] },
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'sw.bundle.js'
  }
};