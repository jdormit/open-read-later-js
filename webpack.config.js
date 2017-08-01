const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'open-read-later.js',
        path: path.join(__dirname, 'build'),
        library: 'openReadLater',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}
