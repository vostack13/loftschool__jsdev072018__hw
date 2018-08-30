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
        // rules: [
        //     {
        //         // указваем типы файлов для котороых ниже установим настройки 
        //         test: /\.js/,
        //         use: [
        //             {
        //                 loader: 'babel-loader',
        //                 // указываем настройки для babel-loader
        //                 // указываем прессет env
        //                 options: { presets: ["env"]}
        //             }
        //         ]
        //     }
        // ]
    }
}