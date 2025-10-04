/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  transpilePackages: [
    '@mono-repo/utils',
    '@mono-repo/test-utils',
    '@mono-repo/ui',
    '@mono-repo/common-tailwind',
  ],
}

module.exports = nextConfig
