/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        // {
        //   source: "/",
        //   destination: "/explore/boston",
        //   // has: [{ type: 'query', key: 'overrideMe' }],
        // },
        {
          source: "/foobar/:hub",
          destination: "/foobar/:hub/index/index/0/index",
          // has: [{ type: 'query', key: 'overrideMe' }],
        },
        {
          source: "/foobar/:hub/:pt",
          destination: "/foobar/:hub/:pt/index/0/index",
          // has: [{ type: 'query', key: 'overrideMe' }],
        },
        {
          source: "/foobar/:hub/:pt/:t3",
          destination: "/foobar/:hub/:pt/:t3/0/index",
          // has: [{ type: 'query', key: 'overrideMe' }],
        },
        {
          source: "/foobar/:hub/:pt/:t3/:distance",
          destination: "/foobar/:hub/:pt/:t3/:distance/index",
          // has: [{ type: 'query', key: 'overrideMe' }],
        },
        {
          source: "/foobar/:hub/:pt/:t3/:distance/:uid",
          destination: "/foobar/:hub/:pt/:t3/:distance/:uid",
          // has: [{ type: 'query', key: 'overrideMe' }],
        },
      ],
    };
  },
};

export default nextConfig;
