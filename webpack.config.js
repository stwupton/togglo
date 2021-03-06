const path = require('path');
const webpack = require('webpack');
const fiber = require('fibers');

module.exports = (env, args) => {
  const mode = args.mode || 'development';
  const plugins = mode == 'development' ? 
    [new webpack.HotModuleReplacementPlugin()] : [];

  const config = {
    entry: './src/index.js',
    mode,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env'] }
        },
        {
          test: /\.(s?)css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                fiber: fiber
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ],
        },
      ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'app.bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, './'),
      port: 3000,
      publicPath: 'http://localhost:3000/dist/',
      historyApiFallback: true,
      hotOnly: true
    },
    plugins
  };

  return config;
}