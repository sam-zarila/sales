import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '6gy9systudbmcbju.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/Bed-com-03-20/asset-s/**', // GitHub image path
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    
    inlineCss: true,
  },
};

export default nextConfig;
