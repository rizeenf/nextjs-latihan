/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "robohash.org",
      },
    ],
  },
};

export default nextConfig;
