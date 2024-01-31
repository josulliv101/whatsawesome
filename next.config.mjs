/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/all",
      },
    ];
  },
};

export default nextConfig;
