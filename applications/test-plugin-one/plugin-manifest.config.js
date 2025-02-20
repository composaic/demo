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
            patterns: ['src/plugins/**/*.ts'],
            debounceMs: 100,
        },
    },
};
