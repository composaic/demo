module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-typescript', { allowDeclareFields: true }],
        ['@babel/preset-react', { runtime: 'automatic' }],
    ],
    plugins: [['@babel/plugin-proposal-decorators', { version: '2023-05' }]],
    assumptions: {
        setPublicClassFields: true,
    },
};
