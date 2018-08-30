const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
        // publicPath: 'dist/'
    },
    
    devtool: 'inline-source-map',

    // Настройки для webpack-dev-server
    devServer: {
        // отображаем ошибки компиляции файлов на лету в окне браузера
        overlay: true,
        // index: 'dist/index.html'
    },

    // указываем правила для модулей
    module: {
        rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                }
              }
            },
            {
                test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                      ]
                    })
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            }
          ]
    },

    plugins: [
        new ExtractTextPlugin('css/main.css'),
        new HtmlWebpackPlugin({
            title: 'FriendsFilter',
            template: 'index.hbs',
            filename: 'index.html',
            chunks: ['main']
        }),
      ]
}

