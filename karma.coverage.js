var webpackConfig = require('./webpack.config');

webpackConfig.module.rules = [{
  test: /\.ts$/,
  exclude: /node_modules/,
  loader: "ts-loader",
  query: {
    compilerOptions: {
      inlineSourceMap: true,
      sourceMap: false
    }
  }
},
{
  test: /\.ts$/,
  enforce: "post",
  loader: 'istanbul-instrumenter-loader',
  query: {
    debug: true,
    preserveComments: true,
    esModules: true
  },
  exclude: [
    /node_modules/,
    /\.spec\.ts$/
  ]
}];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.ts'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.ts': ['webpack']
    },
    webpack: {
      mode: 'development',
      devtool: 'source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'html',
          subdir: 'report-html'
        },
        {
          type: 'lcov',
          subdir: 'report-lcov'
        },
        {
          type: 'cobertura',
          subdir: '.',
          file: 'cobertura.txt'
        }
      ]
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}
