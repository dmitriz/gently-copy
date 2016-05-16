// webpack.config.js

var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
  // Load `demo/index.js`
  entry: './demo',

  // Generate `demo/bundle.js`
  output: {
    path: '.',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loaders: ['style', 'css']
      }
    ]
  },

  plugins: [
    new NpmInstallPlugin({
      cacheMin: 999999,  // --cache-min=999999 (prefer NPM cached version)
      save: true,       // --save
      saveDev: true,    // --save-dev
      saveExact: true  // --save-exact
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: 'demo',
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
}
