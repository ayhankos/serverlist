/** @type {import('next').NextConfig} */
import { withSitemap } from "next-sitemap";

const nextConfig = {
  images: {
    domains: ["pvpserverlar.tr"],
    unoptimized: true,
  },
};

export default withSitemap(nextConfig);
