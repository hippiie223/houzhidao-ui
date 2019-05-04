'use strict'
const path = require('path')
const pkg = require('./package.json')

const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         [process.env.VUE_APP_BASE_API]: {
    //           target: `http://localhost:${port}/mock`,
    //           changeOrigin: true,
    //           pathRewrite: {
    //             ['^' + process.env.VUE_APP_BASE_API]: ''
    //           }
    //         }
    //       }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                'component': resolve('src/components'),
                'router': resolve('src/router')
            }
        },

        plugins: [
            new webpack.ProvidePlugin({
                'videojs': 'video.js'
            })
        ]
    }
}