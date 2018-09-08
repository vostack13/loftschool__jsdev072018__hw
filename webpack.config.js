const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
                loader: 'babel-loader'
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
                loader: 'handlebars-loader',
                // query: {
                //     inlineRequires: '/images/'
                // }

            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                    }
                }]
            }
          ]
    },

    plugins: [
        new ExtractTextPlugin('css/main.css'),
        new HtmlWebpackPlugin({
            title: 'FriendsFilter',
            template: 'src/index.hbs',
            filename: 'index.html',
            chunks: ['main']
        }),
        // new CopyWebpackPlugin([
        //     {from:'src/images',to:'images'} 
        // ]),
      ]
}

