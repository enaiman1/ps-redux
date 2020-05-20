const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'development',
    // set webpack to work with browser (as opposed to node)
    target: 'web',
    //will help with debugging(will allow us to see our original code before babel compilied it)
    devTool: 'cheap-module-source-map',
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    // this configures the webserver- tells webpack to serve our app in development
    devServer: {
        // reduces the info it write to the command line
        stats: 'minimal',
        // tell to overlay any errors that occur in the browser
        overlay: true,
        // all request will be sent to index.html(this will allow us to send all links to be handled by react router)
        historyApiFallback: true,
        // next three are for security purpose (will remove later)
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        // where to find our html and fav.icon
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: 'src/favicon.ico'
        })
    ],
    // this tell webpack what files to handle
    module: {
        rules: [
            {
                // import javascript and jsx and bundle it up
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // this will run babel on all of our javascript and wbepack will bundle it up
                use: ["babel-loader"]
            },
            {
                // will allows us to import css and bundle our css into a single file 
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}