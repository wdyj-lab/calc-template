/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://script.google.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
