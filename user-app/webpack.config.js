var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var root = path.resolve(__dirname, 'src');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        vvs_admin_app: path.resolve(root, 'vvs.user.app.jsx'),
        admin_style: path.resolve(root, 'assets/sass/style.scss')
    },
    output:{
        path: __dirname + '/build',
        filename: '[name].js'
    },
    /*devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },*/
    watch: true,

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
            },
            {
                test: /\.(svg)|(png)|(jpg)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(css)$/,
                loader: 'file-loader?name=common/[name].[ext]'
            }
        ]
    },
    //devtool: "eval-source-map",
    plugins: [
        new ExtractTextPlugin({ filename: './[name].css', disable: false, allChunks: true }),
        new CopyWebpackPlugin([
            { from: './assets/images', to: './images/' },
            { from: './assets/vendor', to: './vendor'}
        ])
    ]
};