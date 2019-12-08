const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.min.js',
    chunkFilename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            ['@babel/plugin-proposal-decorators', { legacy: true }]
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: debug
          ? [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
          : [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              name: './assets/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/'
            }
          }
        ]
      }
    ]
  },
 
  resolve: {
    extensions: ['.js','jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
        favicon: './src/favicon.ico',
      title: ' Webpack build for JS Project',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([
        { from: './src/favicon.ico' },
      ]),
      new CompressionPlugin({
        test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
        exclude: /(node_modules)/,
      }),
  ],
  
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    port:"2500",
  },
  devtool: debug ? 'cheap-module-eval-source-map' : false,
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          ie8: true,
          safari10: true,
          sourceMap: true
        }
      })
    ]
  }
};