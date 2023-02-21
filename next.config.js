/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config, options) {
    config.module.noParse = [/gun\.js$/, /sea\.js$/];
    return config;
  },
  eslint: {
    dirs: ['components', 'models', 'pages'],
  },
};

module.exports = nextConfig;
