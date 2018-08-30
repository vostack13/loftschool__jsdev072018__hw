const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    
    devtool: 'inline-source-map',

    // Настройки для webpack-dev-server
    devServer: {
        // отображаем ошибки компиляции файлов на лету в окне браузера
        overlay: true
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
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
            }
          ]
    },

    plugins: [
        new ExtractTextPlugin('css/main.css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
      ]
}

