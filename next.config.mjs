/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.com"
            },
            {
                protocol: "https",
                hostname: "another-domain.com"
            },
            {
                protocol: "https",
                hostname: "**" 
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: "/api/events",
                destination: "https://eventorize-api.kiet.site/events"
            }
        ];
    }
};

export default nextConfig;
