/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["next-auth"],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
