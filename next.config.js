const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.plugins.push(new WindiCSSWebpackPlugin())
		return config
	},
	images: {
		domains: [
			'drive.google.com'
		]
	}
}

module.exports = nextConfig
