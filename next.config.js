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
			'i.scdn.co',
			'admin.greengiantfm.com',
		]
	},
	outputFileTracing: true,
	async redirects() {
		return [
			{
				source: '/hitlist',
				destination: '/hitlists',
				permanent: true,
			},
			{
				source: '/dj-hunt/polls',
				destination: '/dj-hunt',
				permanent: false,
			}
		]
	},
	output: 'standalone',
}

module.exports = withBundleAnalyzer(nextConfig)
