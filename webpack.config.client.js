const path = require('path')
const webpack = require('webpack')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",//sets process.env.NODE_ENV (default:"production")
    devtool: 'eval-source-map',//how source maps are generated
    entry: [//specifies entry pt where Webpack starts bundling: main.js in client folder
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {//output path for bundled code: dist/bundle.js
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'//base path for all assets in app
    },
    module: {//sets regex rule for file extension used transpilation (babel-loader) & folders to exclude: 
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },  
    plugins: [
          new webpack.HotModuleReplacementPlugin(),//enables hot module replacement for react-hot-loader
          new webpack.NoEmitOnErrorsPlugin()//allows skipping emitting when compile errors
    ],
    resolve: {//add webpack alias to pt react-dom ref to @hot-loader/react-dom version
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
    }
}
//the client-side code of app will be loaded in browser f/bundled code in bundle.js
module.exports = config