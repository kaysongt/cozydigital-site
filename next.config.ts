import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Site is hosted on GitHub Pages, which serves the static export in ./out.
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
