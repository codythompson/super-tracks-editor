const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
 * scss setup taken from:
 * https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/
 */

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              localsConvention: 'camelCase'
              // sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader'
            // options: {
            //   sourceMap: isDevelopment
            // }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          // isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            // options: {
            //   sourceMap: isDevelopment
            // }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      // chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      // filename: '[name].[hash].css',
      // chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};