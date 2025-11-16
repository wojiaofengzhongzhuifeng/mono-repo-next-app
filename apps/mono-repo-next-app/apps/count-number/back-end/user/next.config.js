/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@mono-repo/common-tailwind',
    '@mono-repo/ui',
    '@mono-repo/utils',
  ],
}

module.exports = nextConfig
