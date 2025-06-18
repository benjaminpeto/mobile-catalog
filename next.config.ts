import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'prueba-tecnica-api-tienda-moviles.onrender.com',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Development mode: Disable asset minimization
      config.optimization.minimize = false;
    } else {
      // Production mode: Enable asset minimization
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default nextConfig;
