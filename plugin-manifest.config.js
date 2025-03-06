/** @type {import('@composaic/core/lib/plugin-system/config-types').PluginManifestConfig} */
module.exports = {
    plugins: [], // Empty array - plugins can be added later
    optimization: {
        cacheDir: '.manifest-cache',
        watchMode: {
            patterns: [], // Watch patterns can be added when plugins are added
            debounceMs: 100,
        },
    },
};
