const path = require('path');


module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    mode: process.env.NODE_ENV,
    devServer: {
        publicPath: '/build/',
        //If proxy is needed 
        // proxy: {'/': 'http://localhost:3000'}
    },
    module: {
        rules: [
            {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
            },
        ]
    }



}