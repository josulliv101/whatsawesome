/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/cambridge-ma/place",
      },
    ];
  },
};

export default nextConfig;
