import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler (stable in Next.js 16)
  reactCompiler: true,
  
  // Cache Components - New Next.js 16 feature for explicit caching
  // Note: Disabled for now due to compatibility issues with dynamic routes
  // cacheComponents: true,
  
  // Turbopack configuration (now stable)
  // Note: Turbopack filesystem caching is configured in experimental section
  
  // Enhanced image configuration for Next.js 16
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Updated defaults for Next.js 16
    minimumCacheTTL: 14400, // 4 hours (new default)
    qualities: [75], // New default quality
    maximumRedirects: 3, // New security default
  },
  
  // Enhanced logging for development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Experimental features for Next.js 16
  experimental: {
    // Enable Turbopack filesystem caching
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
