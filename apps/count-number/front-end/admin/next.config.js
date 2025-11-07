/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@mono-repo/common-tailwind',
    '@mono-repo/ui',
    '@mono-repo/utils',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010'}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
