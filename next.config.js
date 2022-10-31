const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

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
			'drive.google.com',
			'i.scdn.co',
		]
	}
}

module.exports = withBundleAnalyzer(nextConfig)
