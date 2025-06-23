/** @type {import('@composaic/core/lib/plugin-system/config-types').PluginManifestConfig} */
module.exports = {
    plugins: [
        {
            type: 'application',
            collective: {
                name: '@composaic/plugin-test-one',
                output: 'public/manifest.json',
                plugins: [
                    {
                        source: 'src/plugins/navbar/NavbarExtension.ts',
                        remote: {
                            name: 'TestPluginOne',
                            bundleFile: 'TestPluginOne.js',
                        },
                    },
                ],
            },
        },
    ],
    optimization: {
        cacheDir: '.manifest-cache',
        watchMode: {
            directory: 'dist/testplugin-one/',
            patterns: ['src_plugins_*.js', 'src_plugins_*.hot-update.js'],
            debounceMs: 100,
        },
    },
};
