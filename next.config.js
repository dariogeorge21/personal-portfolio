/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  fontLoaders: [
    { loader: '@next/font/google', options: { timeout: 30000 } }
  ]
};

module.exports = nextConfig;