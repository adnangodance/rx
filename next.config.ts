import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/rx",
        assetPrefix: "/rx/",
        trailingSlash: true,
        typescript: {
          // The static Pages build does not load the Cloudflare-only D1 module.
          ignoreBuildErrors: true,
        },
      }
    : {}),
};

export default nextConfig;
