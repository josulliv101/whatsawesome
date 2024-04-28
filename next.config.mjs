/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       // These rewrites are checked after headers/redirects
  //       // and before all files including _next/public files which
  //       // allows overriding page files
  //       {
  //         source: "/",
  //         destination: "/explore/boston",
  //         // has: [{ type: 'query', key: 'overrideMe' }],
  //       },
  //       {
  //         source: "/explore",
  //         destination: "/explore/all",
  //         // has: [{ type: 'query', key: 'overrideMe' }],
  //       },
  //     ],
  //   };
  // },
};

export default nextConfig;
