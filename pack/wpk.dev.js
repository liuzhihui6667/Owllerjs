'use strict'
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const port = 8090
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT) ? process.env.PORT : port

const config = {
    dev: {
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
    entry: {
        // app: ["babel-polyfill", './src/index.js']
        app: ['./src/entry.ts']
    },
    output: {
        library: 'OwllerUI',
        libraryTarget: 'var'
    },
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {
                    from: /.*/,
                    to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
                },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST,
        port: PORT,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development'
        }),
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
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
    resolve: {
        extensions: ['.js', '.ts', 'tsx']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
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

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = PORT
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            wpkconfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            wpkconfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${wpkconfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(wpkconfig)
        }
    })
})
