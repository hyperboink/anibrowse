/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/anibrowse',
  images: {
    domains: ['cdn.myanimelist.net']
  }
}

module.exports = nextConfig
