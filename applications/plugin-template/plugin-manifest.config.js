/** @type {import('@composaic/core/lib/plugin-system/config-types').PluginManifestConfig} */
module.exports = {
    plugins: [
        {
            type: 'remote',
            collective: {
                name: '@composaic/plugin-test',
                output: 'public/manifest.json',
                plugins: [
                    {
                        source: 'src/plugins/simplelogger/SimpleLogger.ts',
                        remote: {
                            name: 'TestPlugins',
                            bundleFile: 'TestPlugins.js',
                        },
                    },
                    {
                        source: 'src/plugins/navbar/NavbarExtension.ts',
                        remote: {
                            name: 'TestPlugins',
                            bundleFile: 'TestPlugins.js',
                        },
                    },
                    {
                        source: 'src/plugins/views/ViewsExtension.ts',
                        remote: {
                            name: 'TestPlugins',
                            bundleFile: 'TestPlugins.js',
                        },
                    },
                    {
                        source: 'src/plugins/notification/NotificationPlugin.ts',
                        remote: {
                            name: 'TestPlugins',
                            bundleFile: 'TestPlugins.js',
                        },
                    },
                ],
            },
        },
    ],
    optimization: {
        cacheDir: '.manifest-cache',
        watchMode: {
            directory: 'dist/testplugins/',
            patterns: ['src_plugins_*.js', 'src_plugins_*.hot-update.js'],
            debounceMs: 100,
        },
    },
};
