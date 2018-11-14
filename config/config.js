const path = require('path');

module.exports = {
  rootPath    : path.resolve(__dirname, '../'),                              // root path
  distPath    : path.resolve(__dirname, '../dist'),                          // build output path
  nodeModules : path.resolve(__dirname, '../node_modules'),                  // default node modules path
  srcPath     : path.resolve(__dirname, '../src'),                           // source code path
  appMountId  : 'app',    
  apiHostDev  : 'http://vapor.blockmeta.com',
  apiHostProd : 'http://vapor.blockmeta.com',                                                   // reactjs mount element id
  // apiHostProd : 'http://139.224.11.46/api',                                                   // reactjs mount element id
  alias: {                                                                   // alias conf
    '_conf': path.join(__dirname, '../src/conf/config.js'),
    '_utils': path.join(__dirname, '../src/utils'),
  }
}