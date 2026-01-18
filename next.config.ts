import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/dcc',
        permanent: true,
      },
      {
        source: '/dynamic-calculator',
        destination: '/dcc',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
