const path = require("path");
const webpack = require("webpack");
const distPath = path.resolve(__dirname, "dist/");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.jsx",
        collections: "./src/collections.jsx",
        projects: "./src/projects.jsx"
    },
    devtool: 'source-map',
    output: {
        path: distPath,
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    node: {
        __dirname: false,
        __filename: false
    },
    devServer: {
        stats: 'errors-only',
        // contentBase: './dist', //index.html is not here
        host: '0.0.0.0',
        port: 3000
    },
    optimization: {
        nodeEnv: 'production',

    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            ko: 'knockout',
            _:'lodash'
        }),
        new webpack.HotModuleReplacementPlugin([
            path.join(__dirname, 'node_modules')
        ]),
        new HtmlWebpackPlugin({
            title: 'Home page',
            template: path.resolve(__dirname, 'index.html'),
            chunks: ['app'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Collections page',
            template: path.resolve(__dirname, 'collections.html'),
            chunks: ['collections'],
            filename: 'collections.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Projects page',
            template: path.resolve(__dirname, 'projects.html'),
            chunks: ['projects'],
            filename: 'projects.html'
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i
        })
    ]
}