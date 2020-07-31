const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'test/**/*.ts',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack', 'coverage'],
    },
    webpack: {
      mode: 'development',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
