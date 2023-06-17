const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        mode: 'development',
        devtool: false,
        entry: {
            top: './src/top/js/webflow.js',
            candidates: './src/candidates/js/webflow.js',
            idol1: './src/idol/js/webflow.js',
            idol2: './src/custom/js/idol.js',
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|webm|mp4)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name].[contenthash][ext]',
                    },
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'candidates.html',
                template: path.resolve(__dirname, 'src', 'candidates', 'index.html'),
            }),
            new HtmlWebpackPlugin({
                filename: 'idol.html',
                template: path.resolve(__dirname, 'src', 'idol', 'index.html'),
            }),
            new HtmlWebpackPlugin({
                filename: 'mint.html',
                template: path.resolve(__dirname, 'src', 'idol', 'mint.html'),
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, 'src', 'top', 'index.html'),
            }),
        ]
    }
];
