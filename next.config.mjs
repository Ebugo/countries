/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // {
          //     key: 'Content-Security-Policy',
          //     value: cspHeader.replace(/\n/g, ''),
          // },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Keep-Alive',
            value: 'timeout=120',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'null',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,PATCH,DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // output: "export",
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     {
    //       loader: '@svgr/webpack',
    //       options: {
    //         svgo: true,
    //         svgoConfig: {
    //           plugins: [
    //             {
    //               name: 'preset-default', // Ensure the correct plugin name
    //               params: {
    //                 overrides: {
    //                   removeViewBox: false, // Preserve the viewBox attribute for responsive SVGs
    //                 },
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   ],
    // });

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    // unoptimized: true,
    domains: [],
    // formats: ['image/avif', 'image/webp'],
    // loader: 'default',
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //     {
  //       source: '/index',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
