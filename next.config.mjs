/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This tells Next.js to generate a static site

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
