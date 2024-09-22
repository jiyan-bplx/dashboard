/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'example.com',
          port: '',
          pathname: '/images/**',
        },
      ],
      domains: ['via.placeholder.com', 'media.geeksforgeeks.org'], // Add your domains here
    },
  };
  
  export default nextConfig;
  