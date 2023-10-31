/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/browse-anime',
  images: {
    domains: ['cdn.myanimelist.net']
  }
}

module.exports = nextConfig
