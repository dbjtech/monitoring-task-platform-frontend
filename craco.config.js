const CracoLessPlugin = require("craco-less")
const CracoAlias = require("craco-alias")
const { theme } = require("./src/theme")
const path = require("path")
const isProd = process.argv.includes("--prod")
const proxyDev = isProd ? require("./proxy.prod.conf.json") : require("./proxy.config.json")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

module.exports = {
	devServer: {
		proxy: proxyDev
	},
	webpack: {
		plugins: [
			// new BundleAnalyzerPlugin({
			// 	analyzerMode: 'server',
			// 	analyzerHost: '127.0.0.1',
			// 	analyzerPort: 8888,
			// 	openAnalyzer: true, // 构建完打开浏览器
			// 	reportFilename: path.resolve(__dirname, `analyzer/index.html`)
			// }),
		],
		configure: (webpackConfig, { env, paths }) => {
			paths.appBuild = webpackConfig.output.path = path.resolve("dist")
			return webpackConfig
		}
	},
	babel: {},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: "tsconfig",
				baseUrl: ".",
				tsConfigPath: "./tsconfig.extend.json"
			}
		},
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: theme,
						javascriptEnabled: true
					}
				}
			}
		}
	]
}
