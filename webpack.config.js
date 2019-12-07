const development = require('./webpack.development.js');
const production = require('./webpack.production.js');

module.exports = (env, args) => {
  if (!args.mode || args.mode == 'development') {
    return development;
  } else if (args.mode == 'production') {
    return production;
  }
};