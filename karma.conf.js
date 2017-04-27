module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: false,

    frameworks: [ 'mocha' ],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js',
      {pattern: '/UtopiaTargetFinder/Content/js/**/_tests_/*.js', included: false, served: true}
    ],

    preprocessors: {
      '/UtopiaTargetFinder/Content/js/**/_tests_/*.js': ['eslint'],
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-sourcemap-loader'),
      require('karma-phantomjs-launcher'),
      require('karma-teamcity-reporter'),
      require('karma-eslint')
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },

    //increase the timeout while waiting for webpack to finish (up from 10,000)
    browserNoActivityTimeout: 60000,

    reporters: [ 'dots' ],

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon.js'
        }
      },
      module: {
        noParse: [
          /\/sinon\.js/
        ],
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
          { test: /\.json$/, exclude: /node_modules/, loader: 'json' },
          { test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/, loader: 'imports?define=>false,require=>false' }
        ]
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },

    eslint: {
      stopOnError: true,
      stopOnWarning: false,
      configFile: '.eslintrc'
    }
  });
};
