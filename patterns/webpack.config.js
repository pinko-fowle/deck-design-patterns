const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('../webpack.config');

module.exports = {
  ...base,
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'design-patterns.js'
  },
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Design Patterns Introduction',
      template: `./index.html`
    })
  ],
  resolve: {
    alias: {
      spectacle: path.resolve(__dirname, '../src')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    compress: true
  }
};
