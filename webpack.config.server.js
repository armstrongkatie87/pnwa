const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    //mode: not set explicitly but will be passed as req when running webpack cmd w/respect to running for dev or bldg for production
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],//starts bundling f/server folder w/server.js
    target: "node",
    output: {//outputs bundled code in server.generated.js in dist folder
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",//run server-side code using generated bundle in server.generated.js
        publicPath: '/dist/',
        libraryTarget: "commonjs2"//specifying commonjs2 in libraryTarget so output assigned to module.exports
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            }
        ]
    }

}

module.exports = config