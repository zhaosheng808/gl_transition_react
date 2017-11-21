/**
 * Created by DELL on 2017/8/10.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtracsTextPlugin = require('extract-text-webpack-plugin'); // css样式处理
const url = require('url');
const publicPath = '';
module.exports = (options = {}) =>({
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        index: './src/index',
        vendor: ['./src/vendor']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash:8]',
        // publicPath: '/'
        chunkFilename: '[name].js?[chunkhash:8]',   // 非入口文件的命名规则
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     loaders: 'babel-loader',
            //     include: path.join(__dirname, 'src')
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|mov)(\?.+)?$/,

                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1
                    }
                }]
            }
        ],
    },
    plugins: [
        //添加插件 会自动生成一个html文件
        new HtmlwebpackPlugin({
            template: 'src/index.html',
        }),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
         // name: 'manifest',  // name是提取公共代码块后js文件的名字。
         // chunks: ['vendor'] // 只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
        }),
        /* 上线需要注释掉热更新 ，否则 chunkhash 会报错 */
        // new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        hot: true,
        inline: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000',
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map',
    // resolve: {
    //     extensions: ['', '.js', '.jsx']
    // },
});