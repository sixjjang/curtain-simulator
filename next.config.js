/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? 'http://sixjjang.synology.me:4006' : '',
  images: {
    domains: ['localhost', 'sixjjang.synology.me'],
    unoptimized: true,
  },
  transpilePackages: ['curtain-simulator-ui'],
  // 시놀로지 NAS 배포를 위한 추가 설정
  basePath: '',
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig 