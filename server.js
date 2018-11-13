process.env.NODE_ENV      = 'development';
const path                  = require('path');
const devConfig             = require('./webpack.config');
const webpack               = require('webpack');
const { choosePort }        = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser           = require('react-dev-utils/openBrowser');
const clearConsole          = require('react-dev-utils/clearConsole');
const webpackDevServer      = require('webpack-dev-server');
const getProcessForPort     = require('react-dev-utils/getProcessForPort');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
// 判断是否在终端环境中执行
const isInteractive         = process.stdout.isTTY;
const DEFAULT_HOST          = 'localhost';
const DEFAULT_PORT          = 8890;
const compiler              = webpack(devConfig);

compiler.plugin('done', stats => {
  const messages     = formatWebpackMessages(stats.toJson({}, true));
  const isSuccessful = !messages.errors.length && !messages.warnings.length;
  //终端运行
  if (isInteractive) {
    clearConsole();
  };
  //成功
  if (isSuccessful) {
    console.log('编译成功，监听中…');
  };
  //错误异常
  if (messages.errors.length) {
    console.log('编译失败！');
    messages.errors.forEach(msg => {
      console.log(msg);
    });
    return;
  };
  //警告异常
  if (messages.warnings.length) {
    console.log('警告！');
    messages.warnings.forEach(msg => {
      console.log(msg);
    });
    return;
  };
});

function runDevServer(host, port) {
  devConfig.entry.example = `webpack-dev-server/client?http://${host}:${port}/`;
  devConfig.output.publicPath = `http://${host}:${port}/`;
  const devServer = new webpackDevServer(compiler, {
    compress: false, //使用gzip压缩
    hot: true,
    noInfo: true,
    publicPath: devConfig.output.publicPath,
    clientLogLevel: 'error', //在浏览器中显示终端的日志消息
    stats: { colors: true, chunks:false, errorDetails: true, warnings: true },
    disableHostCheck: true,
  });
  //启动devServer
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    };
    if (isInteractive) {
      clearConsole();
      console.log('正在启动本地服务…');
      openBrowser(`http://${host}:${port}/example`);
    };
  });
};

function run(port) {
  //设置host
  const host = DEFAULT_HOST || 'localhost';
  //启动服务
  runDevServer(host, port);
};

//启动端口检测程序
choosePort(DEFAULT_HOST, DEFAULT_PORT).then(port => {
  if (port == null) {
    console.log('没有找到端口/(ㄒoㄒ)/~~');
    return;
  };
  run(port);
})
.catch(err => {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
});
