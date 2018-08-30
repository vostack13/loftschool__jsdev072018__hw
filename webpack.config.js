const path = require('path')

module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },

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
            //   exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                }
              }
            }
          ]
    }
}

