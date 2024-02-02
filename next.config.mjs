/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => [
    {
      source: "/storage/:path*",
      destination: `${process.env.S3_ENDPOINT}/:path*`,
    },
  ],
};

export default nextConfig;
