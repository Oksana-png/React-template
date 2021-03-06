const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';


module.exports = {
  mode,
  devtool: mode === 'development' ? 'eval' : false,
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true, // очистка папки при сборке
    filename: '[name][contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    }), 
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env']
            }
          }
        }, 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png)$/i, //форматы изображений какие используем
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|)$/i, //перечисляем форматы шрифтов
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        }
      },
      {
        test: /\.html$/i, //перечисляем форматы шрифтов
        loader: 'html-loader',
      }
    ]
  }
}