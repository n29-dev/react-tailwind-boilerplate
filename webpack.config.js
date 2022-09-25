const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPluin = require("mini-css-extract-plugin");
const tailwindCss = require("tailwindCss");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, "/dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        open: true,
        compress: true,
        hot: true,
    },

    output: {
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                type: "asset/resource",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            [
                                "@babel/preset-react",
                                {
                                    runtime: "automatic",
                                },
                            ],
                        ],
                    },
                },
            },

            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    MiniCssExtractPluin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["postcss-preset-env", tailwindCss],
                            },
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new ESLintPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            title: "Webpack React Setup",
            filename: "index.html",
        }),

        new MiniCssExtractPluin({
            filename: "style.css",
        }),
    ],
};
