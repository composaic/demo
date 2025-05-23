const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin =
    require('@module-federation/enhanced').ModuleFederationPlugin;
const deps = require('./package.json').dependencies;
const SharedModuleCachePlugin = require('./SharedModuleCachePlugin');

const Modes = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

module.exports = (env, { mode }) => {
    const isProduction = mode === Modes.PRODUCTION;
    return {
        mode,
        entry: path.join(__dirname, 'src', 'main.tsx'),
        output: {
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            chunkFilename: isProduction
                ? '[name].[contenthash].js'
                : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        optimization: isProduction
            ? {
                  splitChunks: {
                      chunks: 'all',
                      maxInitialRequests: 25,
                      minSize: 20000,
                      cacheGroups: {
                          mui: {
                              test: /[\\/]node_modules[\\/]@mui/,
                              name: 'mui',
                              priority: 30,
                              reuseExistingChunk: true,
                          },
                          react: {
                              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                              name: 'react-core',
                              priority: 20,
                              reuseExistingChunk: true,
                          },
                          router: {
                              test: /[\\/]node_modules[\\/]react-router(-dom)?[\\/]/,
                              name: 'router',
                              priority: 10,
                              reuseExistingChunk: true,
                          },
                          vendors: {
                              test: /[\\/]node_modules[\\/]/,
                              name: 'vendors',
                              priority: -10,
                              reuseExistingChunk: true,
                          },
                      },
                  },
              }
            : undefined,
        //stats: 'verbose',
        plugins: [
            new SharedModuleCachePlugin(),
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
                name: 'host',
                shared: {
                    react: {
                        import: 'react', // the "react" package will be used a provided and fallback module
                        shareKey: 'react', // under this name the shared module will be placed in the share scope
                        shareScope: 'default', // share scope with this name will be used
                        singleton: true, // only a single version of the shared module is allowed
                        requiredVersion: deps.react,
                        eager: true,
                    },
                    'react-router-dom': {
                        singleton: true,
                        requiredVersion: deps['react-router-dom'],
                        eager: true,
                    },
                    '@composaic/core': {
                        singleton: true,
                        requiredVersion: deps['@composaic/core'],
                        eager: true,
                    },
                    '@composaic/web': {
                        singleton: true,
                        requiredVersion: deps['@composaic/web'],
                        eager: true,
                    },
                },
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)?$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2020',
                        sourcemap: !isProduction,
                        minify: isProduction,
                        jsx: 'automatic',
                        tsconfigRaw: {
                            compilerOptions: {
                                sourceMap: !isProduction,
                                jsx: 'react-jsx',
                                target: 'es2020',
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
            maxAssetSize: isProduction ? 1024 ** 2 : Infinity,
        },

        devtool: isProduction ? false : 'eval-cheap-module-source-map',

        devServer: {
            host: '0.0.0.0',
            port: 3000,
            historyApiFallback: true,
        },
    };
};
