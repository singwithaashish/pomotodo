const withPWA = require("next-pwa");

// const nextConfig = {
  // /** @type {import('next').NextConfig} */
//   reactStrictMode: true,
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// }

// module.exports = nextConfig

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});