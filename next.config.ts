import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Site is hosted on GitHub Pages, which serves the static export in ./out.
    output: "export",
    // Keep live preview compilation separate from production validation.
    distDir: process.env.NODE_ENV === "development" ? ".next-preview" : ".next",
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
