const path = require('path');

let vars = {};

vars.pathes = {
  input: {
    src: '../assets_src',
    styles: '../assets_src/shared/styles',
    fonts: '../assets_src/shared/fonts',
    images: '../assets_src/shared/images',
    components: '../assets_src/shared/components',
    hoc: '../assets_src/shared/hoc',
    containers: '../assets_src/shared/containers',
    actions: '../assets_src/shared/actions',
    reducers: '../assets_src/shared/reducers',
    pages: '../assets_src/shared/containers/pages',
    // elements: './assets_src/shared/elements',
    modules: '../assets_src/shared/modules',
  },
  output: {
    dist: '../dist',
    public: './public',
    publicPath: '/',
    robots: './robots',
    images: './images',
    assetsInCode: 'assets',
    cssInCode: 'css',
    fontsInCode: 'fonts',
    imagesInCode: 'images',
  },
  clean: {
    public: './dist/public/*',
  },
  config: {
    appConfigFolder: '../config',
    apiFolder: '../assets_src/shared/api',
    webpackConfigFolder: './',
    extraFiles: '../assets_src/extraFiles',
    serverStatic: './dist/public'
  },
  entry: {
    client: '../assets_src/client/index.js',
    clientTemplate: '../assets_src/client/index.html',
    server: '../assets_src/server/index.js',
    serverRenderer: '../assets_src/server/renderer.js',
    serverTemplate: '../assets_src/server/template.js',
  },
};

vars.aliases = {
  $styles: path.resolve(__dirname, vars.pathes.input.styles),
  $fonts: path.resolve(__dirname, vars.pathes.input.fonts),
  $images: path.resolve(__dirname, vars.pathes.input.images),
  $components: path.resolve(__dirname, vars.pathes.input.components),
  $hoc: path.resolve(__dirname, vars.pathes.input.hoc),
  $containers: path.resolve(__dirname, vars.pathes.input.containers),
  $pages: path.resolve(__dirname, vars.pathes.input.pages),
  $actions: path.resolve(__dirname, vars.pathes.input.actions),
  $reducers: path.resolve(__dirname, vars.pathes.input.reducers),
  $modules: path.resolve(__dirname, vars.pathes.input.modules),
  $apiFolder: path.resolve(__dirname, vars.pathes.config.apiFolder),
  $extraFiles: path.resolve(__dirname, vars.pathes.config.extraFiles),
  $webpackConfigFolder: path.resolve(__dirname, vars.pathes.config.webpackConfigFolder),
  $appConfigFolder: path.resolve(__dirname, vars.pathes.config.appConfigFolder)
};

vars.statsOptions = {
  builtAt: true,
  depth: false,
  entrypoints: true,
  env: true,
  performance: true,
  errors: true,
  errorDetails: true,
  children: false,
  warnings: true,
  source: false,
  timings: true,
  colors: true,
  modules: false,
  reasons: false,
  chunkModules: false,
  assets: false,
};

module.exports = vars;



