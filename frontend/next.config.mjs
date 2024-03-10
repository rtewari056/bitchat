/** @type {import('next').NextConfig} */

const nextConfig = {
  // Using Next.js Rewrites to Create an API Proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'daisyui.com'
      },
    ]
  }
};

export default nextConfig;
