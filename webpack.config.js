const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src/js/main'),
    style: path.join(__dirname, 'src/scss', 'main.scss'),
    dist: path.join(__dirname, 'dist'),
    templates: path.join(__dirname, 'src/templates')
};

const common = {
    entry: {
        app: PATHS.src,
        style: PATHS.style

    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: '/node_modules/',
                use: 'eslint-loader',
                enforce: 'pre',
                include: PATHS.src
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                include: PATHS.templates
            }
        ]
    },
    resolve: {
        modules: [
            path.join('./node_modules'),
            path.join(__dirname, 'node_modules'),
            'node_modules',
            path.join(__dirname, '/src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css', '.hbs'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/app.html'
        })
    ],
    node: {
        fs: 'empty'
    }

};

module.exports = function(env) {
    if (env === 'build') {
        return merge(
            common,
            {
                devtool: 'source-map',
                output: {
                    path: PATHS.dist,
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                }
            },
            {
                module: {
                    rules: [
                        {
                            test: /\.s?css$/,
                            include: PATHS.style,
                            use: ExtractTextPlugin.extract({
                                fallback: 'style-loader',
                                use: ['css-loader', 'sass-loader']
                            })
                        }
                    ]
                },
                plugins: [
                    new CleanWebpackPlugin(([ PATHS.dist ]), {
                        root: process.cwd()
                    }),
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        sourceMap: true,
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpack.LoaderOptionsPlugin({
                        minimize: true
                    }),
                    new ExtractTextPlugin('[name].[chunkhash].css'),
                    new CompressionPlugin({
                        asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: /\.js$|\.html$/,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                ]
            }
        );
    }
    return merge(
        common,
        {
            devtool: 'cheap-module-eval-source-map',
            performance: {
                hints: false
            }
        },
        {
            module: {
                rules: [
                    {
                        test: /\.s?css$/,
                        use: ['style-loader?sourceMap', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
                        include: PATHS.style
                    }
                ]
            }
        },
        {
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            devServer: {
                historyApiFallback: true,
                inline: true,
                stats: 'errors-only',
                host: process.env.HOST,
                port: process.env.PORT
            },
            plugins: [
                new webpack.HotModuleReplacementPlugin({
                    multiStep: false
                }),
                new webpack.WatchIgnorePlugin([
                    path.join(__dirname, 'node_modules')
                ])
            ]
        }

    );
};
