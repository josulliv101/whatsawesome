/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/root/person",
      },
    ];
  },
};

export default nextConfig;
