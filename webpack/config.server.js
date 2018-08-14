const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const minimist = require('minimist');

const vars = require('./variables');
const appCfg = require('../config/server');
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

/*SERVER config build*/
const serverConfig = {
  mode: appCfg.env,
  target: 'node',
  name: 'server',
  devtool: isDevelopment ? 'eval' : false,
  bail: !isDevelopment,
  externals: [ nodeExternals({ whitelist: [ 'webpack/hot/poll?1000' ] }) ],
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, vars.pathes.entry.server)
    ].concat(isHot ? [
      'webpack/hot/poll?1000',
    ] : []),
  },
  output: {
    path: path.resolve(__dirname, vars.pathes.output.dist),
    publicPath: vars.pathes.output.publicPath,
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  node: {
    __filename: false,
    __dirname: false
  },
  resolve: {
    alias: aliases,
  },
  stats: vars.statsOptions,
  module: {
    rules: [
      {
        test: /js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: isDevelopment,
          babelrc: false,
          presets: [
            ['babel-preset-env', {
              targets: {
                node: true,
              },
              modules: false,
              useBuiltIns: true,
              uglify: !isDevelopment,
            }],
            'react',
            'stage-0',
          ]
        },
      },
      {
        test: [/\.svg$/,/\.gif$/, /\.jpe?g$/, /\.png$/],
        include: path.resolve(__dirname, vars.pathes.input.images),
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: vars.pathes.output.public + '/' + vars.pathes.output.imagesInCode + '/[name]-[hash].[ext]',
              publicPath: url => url.replace(/.\/public/, ''),
              limit: 10000,
              emit: false
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, vars.pathes.input.fonts),
        loader: 'file-loader?emitFile=false',
      },
      {
        test: /\.(pcss|css)$/,
        loader: 'css-loader/locals',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __isClient__: false,
      __isDevelopment__: isDevelopment,
      __isHot__: isHot,
      'process.env.NODE_ENV': JSON.stringify(appCfg.env),
      'process.env': {BUILD_TARGET: JSON.stringify('server')},
    })
  ].concat(isHot ? [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : [
  ]),
};

module.exports = serverConfig;
