const path = require('path');

module.exports = {
    mode: 'development', // dev only
    devtool: 'inline-source-map', // dev only
    
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'boundle.js',
        path: path.resolve(__dirname, '.'),
    },
};
