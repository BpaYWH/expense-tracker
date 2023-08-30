/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	env: {
		APP_URL: process.env.APP_URL,
		APP_URL_ALIAS: process.env.APP_URL_ALIAS,
	},
};

module.exports = nextConfig;
