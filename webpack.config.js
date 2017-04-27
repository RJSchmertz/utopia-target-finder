const path = require('path');
const webpack = require('webpack');

const scriptsDir = path.join(__dirname, '/UtopiaTargetFinder/Content/js');
const main = path.join(scriptsDir, 'index.js');
const environment = JSON.stringify(process.env.NODE_ENV);
const versionNum = JSON.stringify(process.env.version_num || '(Local)');
console.log('NODE_ENV=' + environment);
console.log('version_num=' + versionNum);

module.exports = {
  entry: {
    main
  },
  output: {
    pathinfo: true,
    path: path.join(__dirname, '/UtopiaTargetFinder/wwwroot/build'),
    publicPath: '/build/',
    filename: '[name]-bundle.js'
  },
  devServer: {
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-1']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: environment,
        VERSION_NUM: versionNum
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
