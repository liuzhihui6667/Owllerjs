'use strict'
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const port = 8090
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT) ? process.env.PORT : port

const config = {
    prod: {
        assetsPublicPath: '/',
        assetsSubDirectory: 'static',
        autoOpenBrowser: true,
        errorOverlay: true,
        proxyTable: {},
        poll: false
    }
}
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const wpkconfig = {
    mode: 'production',
    entry: {
        app: ["babel-polyfill", './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'owlljs.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development'
        }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             warnings: false
        //         }
        //     },
        //     sourceMap: true,
        //     parallel: true
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.prod.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            }, {
                test: /\.css$/,
                loaders: ['style', 'css', 'autoprefixer']
            }
        ]
    }
}

module.exports = wpkconfig