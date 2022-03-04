/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
