var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var JavaScriptObfuscator = require('webpack-obfuscator');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var root = path.resolve(__dirname, 'src');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        vvs_admin_app: path.resolve(root, 'vvs.admin.app.jsx'),
        admin_style: path.resolve(root, 'assets/sass/style.scss')
    },
    output:{
        path: __dirname + '/build',
        filename: '[name].js'
    },

    watch: false,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' })
            }, {
                test: /\.(css)$/,
                loader: 'file-loader?name=common/[name].[ext]'
            }
        ]
    },
    //devtool: "eval-source-map",
    plugins: [
        new ExtractTextPlugin({ filename: './[name].css', disable: false, allChunks: true }),
        new JavaScriptObfuscator ({
            rotateUnicodeArray: true
        }, ['[name].js'])
    ]
};