/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './app/utils/imageLoader.ts',
  }
};

module.exports = nextConfig;
