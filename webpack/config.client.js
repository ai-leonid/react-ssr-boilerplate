const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const minimist = require('minimist');

/*Build decorations*/
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk'); //text-color

const vars = require('./variables');
const appCfg = require('../config/client');
const args = minimist(process.argv.slice(2), {
  default: {
    isWatch: false,
    watch: false,
    isHot: false,
    hot: false
  }
});
const isHot = args.isWatch || args.watch || args.isHot || args.hot;
const isDevelopment = appCfg.env === 'development';
const aliases = vars.aliases;

/*CLIENT config build*/
const clientConfig = {
  mode: appCfg.env,
  name: 'client',
  target: 'web',
  cache: isDevelopment,
  devtool: isDevelopment ? 'cheap-module-source-map' : 'hidden-source-map',

  entry: [
      'babel-polyfill',
      path.resolve(__dirname, vars.pathes.entry.client),
    ].concat(isHot ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8081',
      'webpack/hot/only-dev-server',
      'css-hot-loader/hotModuleReplacement',
      /*'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',*/
    ] : []),
  output: {
    path: path.resolve(__dirname, vars.pathes.output.dist, vars.pathes.output.public),
    filename: 'js/app.js',
    publicPath: isHot ? 'http://localhost:8081/' : vars.pathes.output.publicPath,
  },
  node: {
    fs: 'empty',
    __filename: false,
    __dirname: false
  },
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    stats: vars.statsOptions
  },
  resolve: {
    alias: aliases,
    modules: ['node_modules'],
  },
  stats: vars.statsOptions,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDevelopment,
          babelrc: false,
          presets: [
            ['babel-preset-env', {
              useBuiltIns: 'usage',
              modules: false,
              uglify: !isDevelopment,
          }],
            'react',
            'stage-0',
          ],
          plugins: [
            'transform-runtime'
          ].concat(isHot ? [
            'react-hot-loader/babel',
          ] : []),
        }
      },
      {
        test: /\.(pcss|css)$/,
        exclude: /node_modules/,
        use: (isHot ? ['css-hot-loader'] : []).concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                alias: aliases,
                url: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    /*old version of precss update later, cause new with bugs*/
                    require('precss'),
                    require('postcss-calc')({
                      mediaQueries: true,
                      warnWhenCannotResolve: true,
                      selectors: true,
                      import: false
                    }),
                    require('postcss-clearfix'),
                    require('css-mqpacker'),
                    require('autoprefixer')({
                      browsers: [
                        '> 0.5%',
                        'Firefox > 15',
                        'Chrome > 25',
                        'Opera > 15',
                        'Explorer > 9',
                        'iOS > 6',
                        'Safari > 6',
                        'last 2 versions',
                      ],
                    }),
                    require('lost'),
                    require('postcss-color-rgba-fallback'),
                    require('postcss-opacity'),
                    require('postcss-pseudoelements'),
                    require('pixrem'),
                  ];
                },
                parser: require('postcss-scss'),
              },
            },
          ],
        })),
      },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        exclude: /node_modules/,
        include: path.resolve(__dirname, vars.pathes.input.images),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: vars.pathes.output.imagesInCode + '/[name]-[hash].[ext]',
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, vars.pathes.input.fonts),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: vars.pathes.output.imagesInCode + '/[name]-[hash].[ext]',
              limit: 10000
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      complete: '█',
      incomplete: '.',
      format: chalk.white('  PROJECT build ') + chalk.green('[:bar] ') + chalk.magenta.bold(':percent' + ' (:elapsed seconds)'),
      width: 10,
      clear: false
    }),
    new ExtractTextPlugin({
      filename: vars.pathes.output.cssInCode + '/style.css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {removeAll: true},
        sourcemap: isDevelopment,
        map: {inline: false},
      },
      canPrint: true,
    }),
    new webpack.DefinePlugin({
      __isClient__: true,
      __isDevelopment__: isDevelopment,
      __isHot__: isHot,
      'process.env.NODE_ENV': JSON.stringify(appCfg.env),
      'process.env': {BUILD_TARGET: JSON.stringify('client')},
    }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      {
        from: path.resolve(__dirname, vars.pathes.config.extraFiles),
        to: path.resolve(__dirname, vars.pathes.output.dist, vars.pathes.output.public, vars.pathes.output.robots),
      },
      {
        from: path.resolve(__dirname, vars.pathes.input.images + '/icons/favicon.ico'),
        to: path.resolve(__dirname, vars.pathes.output.dist, vars.pathes.output.public, vars.pathes.output.images)
      },
    ]),
  ].concat(isHot ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : [
  ]),
};

module.exports = clientConfig;
