/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:4000/api/:path*", // Proxy to Backend
			},
		];
	},
	// assetPrefix: "http://localhost:4000/",
};

export default nextConfig;
