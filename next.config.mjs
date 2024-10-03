/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pvpserverlar.tr"],
    unoptimized: true,
  },
  output: "standalone",
};

module.exports = nextConfig;

export default nextConfig;
