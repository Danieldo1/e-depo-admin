/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname:'e-depo.s3.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
