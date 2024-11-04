import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: '@import "src/assets/styles/mixins.scss";',
  },
};

export default nextConfig;
