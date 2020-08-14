const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'karma-typescript'],
    files: [
      'node_modules/jquery/dist/jquery.js',
      'src/plugin/**/*.ts',
      'test/**/*.ts',
    ],
    exclude: [
    ],
    preprocessors: {
      'src/plugin/**/*.ts': ['karma-typescript', 'coverage'],
      'test/**/*.ts': ['karma-typescript'],
    },
    webpack: {
      mode: 'development',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
    },
    reporters: ['progress', 'karma-typescript', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'text-summary' },
        { type: 'html' },
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
