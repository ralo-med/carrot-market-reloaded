import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
    unoptimized: true, // 로컬 이미지 최적화 비활성화
  },
  experimental: {
    useCache: true, // ⬅️ "use cache" 지시어 활성화
    cacheComponents: true, // ⬅️ cacheTag 활성화
  },
  /* config options here */
};

export default nextConfig;
