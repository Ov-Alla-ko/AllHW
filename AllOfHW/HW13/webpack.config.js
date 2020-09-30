const path = require('path');

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        app: './app.js'
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    mode: 'development'
}