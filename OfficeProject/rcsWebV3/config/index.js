// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

//added by xiaohan for proxy debug
// 测试用代理地址 是本机运行的java服务端
//please see proxyTable at dev
//added by xiaohan for proxy debug

var fs = require('fs');
// var data = fs.readFileSync('./static/application.json','utf-8');   //同步读取
// let jsObj = JSON.parse(data);

var appcfg = path.resolve(__dirname, '../static/application.json')
var data = fs.readFileSync(appcfg,'utf-8');
var jsObj = JSON.parse(data);
var index = "../" + jsObj.build_output_dir + "/index.html";
var assetsRoot = "../" + jsObj.build_output_dir;

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, index),
        assetsRoot: path.resolve(__dirname, assetsRoot),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: jsObj.dev.clientPort,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: jsObj.dev.proxyTable,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}

