var common = require('./webpack.common.js')

module.exports = function (config) {
    'use strict'
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files to exclude
        exclude: [],

        files: [{
            pattern: 'src/**/*.ts',
            included: false
        }, {
            pattern: 'test/**/*.ts',
            included: true
        }, {
            pattern: 'test/data/*.xml',
            included: true
        }, {
            pattern: 'test/data/*.mxl.base64',
            included: true
        }, {
            pattern: 'test/data/*.mxl',
            included: false,
            watched: false,
            served: true
        }],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/data/*.xml': ['xml2js'],
            'test/data/*.mxl.base64': ['base64-to-js'],
            // add webpack as preprocessor
            'src/**/*.ts': ['webpack'],
            'test/**/*.ts': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // copy parts of webpack configuration to use minimal effort here
            devtool: process.env.CI ? false : 'cheap-module-eval-source-map',
            mode: process.env.CI ? 'production' : 'development',
            module: {
                rules: common.module.rules
            },
            resolve: common.resolve
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        // Required for Firefox and Chorme to work
        // see https://github.com/webpack-contrib/karma-webpack/issues/188
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // web server port
        port: 9876,
        // timeout in ms:
        browserNoActivityTimeout: 100000,
        captureTimeout: 60000,
        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        client: {
            captureConsole: true
        },

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        browsers: [process.env.CI ? 'ChromeHeadlessNoSandbox' : 'ChromeHeadless'],

        // For security reasons, Google Chrome is unable to provide sandboxing
        // when it is running in container-based environments (e.g. CI).
        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
