/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["bit.ly", "i.scdn.co", "mosaic.scdn.co"],
  },
};

module.exports = nextConfig;
