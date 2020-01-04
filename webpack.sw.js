const path = require('path');

module.exports = (env, args) => {
  const baseConfig = {
    entry: './src/sw.js',
    mode: args.mode || 'development',
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
  };

  const resolvedPath = path.resolve(__dirname, './');
  return [
    {
      ...baseConfig,
      entry: './src/sw.js',
      output: { path: resolvedPath, filename: 'sw.bundle.js' }
    },
    {
      ...baseConfig,
      entry: './src/firebase_messaging_sw.js',
      output: { path: resolvedPath, filename: 'firebase-messaging-sw.js' }
    }
  ];
} 