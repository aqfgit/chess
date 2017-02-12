module.exports = {
    entry: './src/main.js',
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
            }
        ]
    }
}
