const basePath = '/mwra-vis'
const nextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE: basePath,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: basePath,
        permanent: false,
        basePath: false,
      },
    ]
  },
  async exportPathMap() {
    const paths = {
      '/': { page: '/' },
    }
    return paths
  },
}

export default nextConfig
