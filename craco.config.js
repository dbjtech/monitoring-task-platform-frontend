const CracoLessPlugin = require('craco-less')
const CracoAlias = require('craco-alias')
const { theme } = require('./src/theme')
const path = require('path')
const isProd = process.argv.includes('--prod')
const proxyDev = isProd ? require('./proxy.prod.conf.json') : require('./proxy.config.json')

module.exports = {
	devServer: {
		proxy: proxyDev
	},
	webpack: {},
	babel: {},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: '.',
				tsConfigPath: './tsconfig.extend.json'
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
