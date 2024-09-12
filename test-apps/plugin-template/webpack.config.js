import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Modes = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

export default (env, { mode }) => {
    const isProduction = mode === Modes.PRODUCTION;

    return {
        mode,
        entry: path.join(__dirname, 'src', 'main.tsx'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                favicon: path.join(__dirname, 'src', 'assets/react.svg'),
            }),
            new MiniCssExtractPlugin({
                filename: isProduction
                    ? '[name]-[contenthash].css'
                    : '[name].css',
            }),
            new webpack.container.ModuleFederationPlugin({
                name: 'TestPlugins',
                filename: 'TestPlugins.js',
                exposes: {
                    './SimpleLogger': './src/plugins/simplelogger/SimpleLogger.ts',
                    './NavbarExtension': './src/plugins/navbar/NavbarExtension.ts',
                    './ViewsExtension': './src/plugins/views/ViewsExtension.ts',
                    './NotificationPlugin':
                        './src/plugins/notification/NotificationPlugin.ts',
                },
            })
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2015',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jp(e*)g|gif|webp|avif|webm)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.(woff|woff2)$/,
                    use: {
                        loader: 'url-loader',
                    },
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.s?css$/,
                    oneOf: [
                        {
                            test: /\.m\.s?css$/,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            localIdentName: `${isProduction ? '' : '[local]--'}[hash:base64:5]`,
                                        },
                                    },
                                },
                                'sass-loader',
                            ],
                        },
                        {
                            use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                'sass-loader',
                            ],
                        },
                    ],
                },
            ],
        },

        resolve: {
            extensions: [
                '.ts',
                '.js',
                '.tsx',
                '.json',
                '.scss',
                '.css',
                '.m.scss',
                '.m.css',
            ],
            modules: [path.resolve(__dirname, './src'), './node_modules'],

            alias: {
                '@root': path.resolve(__dirname, './src'),
                '@api': path.resolve(__dirname, './src/api'),
                '@assets': path.resolve(__dirname, './src/assets'),
                '@components': path.resolve(__dirname, './src/components'),
                '@interfaces': path.resolve(__dirname, './src/interfaces'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@styles': path.resolve(__dirname, './src/styles'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@reducers': path.resolve(__dirname, './src/store/reducers'),
            },
        },

        performance: {
            maxEntrypointSize: Infinity,
            maxAssetSize: 1024 ** 2,
        },

        devtool: isProduction ? 'source-map' : 'inline-source-map',

        devServer: {
            host: '0.0.0.0',
            port: 3000,
            historyApiFallback: true,
        },
    };
};
