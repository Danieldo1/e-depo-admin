/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:'e-depo.s3.amazonaws.com',

            },
        ],
    },
};

export default nextConfig;
