const path = require("path");

const resolve = dir => {
	return path.join(__dirname, dir);
};

const Version = new Date().getTime();

module.exports = {
	publicPath: '/',
	//
	lintOnSave: false,
	chainWebpack: config => {
		config.resolve.alias
			.set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set("_c", resolve("src/components"));
	},
	// 设为false打包时不生成.map文件
	productionSourceMap: false,
	// 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
	// devServer: {
	//   proxy: 'localhost:3000'
	// }
	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	// transpileDependencies: ['iview'],
	// configureWebpack: {
	// 	output: {
	// 		// 输出重构  打包编译后的 文件名称  【模块名称.hash.时间戳】
	// 		filename: `js/[name].${Version}.js`,
	// 		chunkFilename: `js/[name].${Version}.js`
	// 	},
	// }
};
