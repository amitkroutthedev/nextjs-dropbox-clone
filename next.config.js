/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"www.shareicon.net"
            }
        ]
    }
}

module.exports = nextConfig
