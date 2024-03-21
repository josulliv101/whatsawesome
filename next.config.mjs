/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/explore/boston",
      },
    ];
  },
};

export default nextConfig;
