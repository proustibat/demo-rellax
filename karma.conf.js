let path = require('path');
module.exports =  config => {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // frameworks: ['jasmine'],
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            './tests/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './tests/**/*.js': ['webpack']
        },

        // webpack config
        webpack: {
            module: {
                loaders : [
                    { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
                    { test: /\.hbs$/, loader: 'handlebars-loader' }
                ]
            },
            resolve: {
                modules: [
                    path.resolve('./node_modules'),
                    path.resolve(__dirname, 'node_modules'),
                    'node_modules',
                    path.resolve(__dirname, '/src')
                ],
                extensions: ['.js', '.json', '.jsx', '.css', '.hbs'],
                alias: {
                    'Rellax': path.resolve(__dirname, 'node_modules/rellax/rellax.js')
                },
            },
        },
        // webpackMiddleware: {
        //     stats: {
        //         colors: true
        //     },
        //     quiet: true,
        //     noInfo: 'errors-only'
        // },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'mocha', 'coverage-istanbul'],

        // any of these options are valid:
        // https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
        coverageIstanbulReporter: {

            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ['html', 'lcov', 'text-summary', 'lcovonly'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: path.join(__dirname, 'coverage', '%browser%'),

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            // Most reporters accept additional config options. You can pass these through the `report-config` option
            'report-config': {

                // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: 'html'
                }

            },
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'Chrome',
            // 'Firefox',
            'PhantomJS',
            // 'Safari'
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,


        client: {
            captureConsole: true
        },

        specReporter: {
            showSpecTiming: true
        },

        reportSlowerThan: 25,

    });
};
