var path = require("path")
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function(env) {

  const PROD = env === 'prod'

  const copyWebpackPlugin = new CopyWebpackPlugin([
      { from: path.join(__dirname, 'static_src') },
    ], {
      ignore: ['js/**/*']
    })

  return {
    devtool: PROD ? 'source-map' : 'eval-source-map',
    entry: {
      index: [path.join(__dirname, 'static_src/js/index')]
    },
    target: 'web',
    output: {
      path: path.join(__dirname, 'static/web_app'),
      filename: 'js/[name].bundle.js'
    },
    plugins: PROD ?
    [
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
      copyWebpackPlugin
      // TODO: UglifyJS isn't working, apparently we need to use a different plugin to handle ES6
      // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    ] :
    [
      new webpack.NoEmitOnErrorsPlugin(),
      copyWebpackPlugin
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ['babel-loader']},
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
}