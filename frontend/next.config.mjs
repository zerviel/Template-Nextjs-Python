/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://api:8000/:path*" }
    ];
  }
};
export default nextConfig;
