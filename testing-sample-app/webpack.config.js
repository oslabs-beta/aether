
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
       path: path.resolve(__dirname, 'build'),
       filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
             // test for .js & .jsx file extensions and allows to transpile React code
             test:/\.jsx?/, 
             //node_modules don't need to be transpiled, they are good to go as is
             exclude: /node_modules/,
             use: {
                 loader: 'babel-loader',
                 options: {
                     presets: ['@babel/preset-env', '@babel/preset-react']
                 }
             }

            },
            {
                //npm install style-loader css-loader
             test: /\.css$/,
             use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        publicPath: '/build/',
        port: 8080,
        proxy: {'/': 'http://localhost:3000'}
    }
}