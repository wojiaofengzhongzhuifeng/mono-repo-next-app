/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
      '@mono-repo': require('path').resolve(__dirname, '../../packages'),
    };
    return config;
  },
}

module.exports = nextConfig