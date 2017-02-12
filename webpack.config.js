var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/Game.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    watch: true,
    module: {
        loaders: [
            {
                loaders: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
        ],
        loaders: [
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" }
        ]
    },
    context: __dirname,
    plugins: [
        new CopyWebpackPlugin([
            { from: 'static' }
        ])
    ],
}
