const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ModuleFederationPlugin =
    require('@module-federation/enhanced').ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deps = require('./package.json').dependencies;

const Modes = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

module.exports = (env, { mode }) => {
    const isProduction = mode === Modes.PRODUCTION;
    const isStandalone = process.env.STANDALONE === 'true';

    // Configure shared dependencies with eager loading in standalone mode
    const getSharedConfig = (pkg, config) => ({
        ...config,
        eager: isStandalone || config.eager || false,
    });

    return {
        mode,
        entry: path.join(__dirname, 'src', 'main.tsx'),
        output: {
            filename: 'bundle.js',
            chunkFilename: '[name]-[contenthash].js',
            path: path.resolve(__dirname, 'dist/testplugins'),
            publicPath: 'auto',
        },
        externals: {
            systemjs: 'System',
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
            new ModuleFederationPlugin({
                name: 'TestPlugins',
                filename: 'TestPlugins.js',
                exposes: {
                    './SimpleLogger': './src/plugins/simplelogger/SimpleLogger',
                    './NavbarExtension': './src/plugins/navbar/NavbarExtension',
                    './ViewsExtension': './src/plugins/views/ViewsExtension',
                    './NotificationPlugin':
                        './src/plugins/notification/NotificationPlugin',
                },
                shared: {
                    react: getSharedConfig('react', {
                        requiredVersion: deps.react,
                        import: 'react',
                        shareKey: 'react',
                        shareScope: 'default',
                        singleton: true,
                    }),
                    'react-dom': getSharedConfig('react-dom', {
                        requiredVersion: deps['react-dom'],
                        singleton: true,
                    }),
                    '@composaic/core': getSharedConfig('@composaic/core', {
                        singleton: true,
                        requiredVersion: deps['@composaic/core'],
                    }),
                    '@composaic/web': getSharedConfig('@composaic/web', {
                        singleton: true,
                        requiredVersion: deps['@composaic/web'],
                    }),
                },
                dts: false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './public/manifest.json',
                        to: '../testplugins/manifest.json',
                    },
                ],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'esnext',
                        sourcemap: !isProduction,
                        tsconfigRaw: {
                            compilerOptions: {
                                experimentalDecorators: true,
                                emitDecoratorMetadata: true,
                            },
                        },
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

        devtool: isProduction ? false : 'eval-cheap-module-source-map',

        devServer: {
            host: '0.0.0.0',
            port: 9000,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true, // Force webpack-dev-server to write files to disk
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods':
                    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers':
                    'X-Requested-With, content-type, Authorization',
            },
        },
    };
};
