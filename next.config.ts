import type { NextConfig } from "next";

// @ts-ignore – ignore-loader doesn't have types
const nextConfig: NextConfig = {
  reactStrictMode: false, // Disables React Strict Mode (use with caution)
  webpack(config) {
    config.module?.rules?.push({
      test: /\.html$/,
      use: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
