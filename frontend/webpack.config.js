var path = require('path');
var WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package_ = require('./package.json');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },

    entry: {
        app: "./src/index.js"
    },
    
    output: {
      filename: "index_bundle.js",
      publicPath: '/',
      path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css?$/,
                use: 'css-loader'
            },

            {
                test: /\.s(c|a)ss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    // Requires sass-loader@^7.0.0
                    options: {
                      implementation: require('sass'),
                      indentedSyntax: true // optional
                    },
                    // Requires >= sass-loader@^8.0.0
                    options: {
                      implementation: require('sass'),
                      sassOptions: {
                        indentedSyntax: true // optional
                      },
                    },
                  },
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: {name: 'my manifest' },
                extend: {version: package_.version}
            }
        })
    ],

    devServer: {
        historyApiFallback: true,
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:1337'
        }),
        
    }
}