/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "github.com"
      }
    ]
  }
}

module.exports = nextConfig
