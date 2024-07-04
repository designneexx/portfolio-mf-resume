import path from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import webpack, { DefinePlugin } from 'webpack';
import packageJSON from './package.json';

import 'webpack-dev-server';

type ConfigParams = Record<string, string>;

enum WebpackMode {
    Development = 'development',
    None = 'none',
    Production = 'production'
}

const { ModuleFederationPlugin } = webpack.container;

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3003;
const deps = packageJSON.dependencies;

function getWebpackMode(mode: string): WebpackMode {
    switch (mode) {
        case WebpackMode.Development:
        case WebpackMode.Production:
            return mode;
        default:
            return WebpackMode.None;
    }
}

export default (env: ConfigParams, args: ConfigParams): webpack.Configuration => {
    const mode = getWebpackMode(args.mode);
    const isDev = mode === WebpackMode.Development;
    const isProd = mode === WebpackMode.Production;

    return {
        context: path.resolve(__dirname),
        devServer: {
            allowedHosts: 'all',
            client: {
                logging: 'none',
                overlay: {
                    errors: true,
                    runtimeErrors: false,
                    warnings: false
                }
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            historyApiFallback: true,
            host: '0.0.0.0',
            hot: true,
            port: SERVER_PORT
        },
        devtool: 'source-map',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        mode,
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader'
                },
                {
                    test: /\.(css|scss)$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    generator: {
                        filename: 'public/media/[name].[hash:8][ext]'
                    },
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset'
                },
                {
                    issuer: /\.[jt]sx?$/,
                    test: /\.svg$/i,
                    type: 'javascript/auto',
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                svgoConfig: {
                                    plugins: [
                                        {
                                            active: false,
                                            name: 'removeViewBox'
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
                // {
                //     test: /\.svg$/,
                //     use: ['@svgr/webpack']
                // }
            ]
        },
        optimization: {
            minimize: isProd,
            minimizer: [new TerserWebpackPlugin()]
        },
        output: {
            chunkFilename: isDev
                ? 'public/js/[name].chunk.js'
                : 'public/js/[name].[contenthash:8].js',
            clean: true,
            filename: isDev ? 'public/js/bundle.js' : 'public/js/[name].[contenthash:8].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: isDev ? `//${SERVER_HOST}:${SERVER_PORT}/` : process.env.PUBLIC_PATH
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                title: 'ВТБ Про'
            }),
            new ESLintPlugin({
                extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx']
            }),
            new DefinePlugin({
                BASE_API_URL: process.env.BASE_API_URL || ''
            }),
            isProd &&
                new MiniCssExtractPlugin({
                    chunkFilename: 'public/css/[name].[contenthash:8].chunk.css',
                    filename: 'public/css/[name].[contenthash:8].css'
                }),

            new ModuleFederationPlugin({
                exposes: {
                    './Test': './src/components/MFProvider'
                },
                filename: 'remoteEntry.js',
                name: 'designexx_portfolio',
                shared: {
                    mobx: {
                        requiredVersion: deps.mobx,
                        singleton: true
                    },
                    'mobx-react-lite': {
                        requiredVersion: deps['mobx-react-lite'],
                        singleton: true
                    },
                    react: { requiredVersion: deps.react, singleton: true },
                    'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
                    'react-router-dom': {
                        requiredVersion: deps['react-router-dom'],
                        singleton: true
                    }
                }
            })
        ].filter(Boolean),
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src')
            },
            extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json']
        },
        target: 'web'
    };
};
