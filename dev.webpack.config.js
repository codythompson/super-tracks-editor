const config = require('./base.webpack.config')

const SCSS_MODULE_LOADER_INDEX = 1;
const SCSS_GLOBAL_LOADER_INDEX = 2;

config.mode = 'development'
config.devtool = 'eval-source-map'

// add sass dev settings
// https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/
const moduleLoaderConfig = config.module.rules[SCSS_MODULE_LOADER_INDEX]
moduleLoaderConfig.loader[0] = 'style-loader' // use style loader instead of extracting to separate css file
moduleLoaderConfig.loader[1].options.sourceMap = true // turn on source map for css loader
moduleLoaderConfig.loader[2].options = {sourceMap: true} // turn on source map for sass loader

const globalLoaderConfig = config.module.rules[SCSS_GLOBAL_LOADER_INDEX]
globalLoaderConfig.loader[0] = 'style-loader' // use style loader instead of extracting to separate css file
globalLoaderConfig.loader[1].options = {sourceMap: true} // turn on source map for sass loader

module.exports = config;