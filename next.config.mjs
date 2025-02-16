// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["next-auth"],
    },
    webpack(config) {
      config.externals = {
        ...config.externals,
        "next-auth": "commonjs next-auth",
      };
      return config;
    },
  };
  
  export default nextConfig;
  