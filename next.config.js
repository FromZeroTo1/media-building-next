/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination:
					'https://outstanding-lamb-life-jacket.cyclic.app/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination:
					'https://outstanding-lamb-life-jacket.cyclic.app/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
