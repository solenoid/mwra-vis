const basePath = '/mwra-vis'
const nextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE: basePath,
  },
  async exportPathMap() {
    const paths = {
      '/': {
        page: '/',
        // without the following query, was getting a bunch of warn noise locally
        // warn  - Url '/' defines a query parameter '__nextDefaultLocale' that is missing in exportPathMap
        // warn  - Url '/' defines a query parameter '__nextDataReq' that is missing in exportPathMap
        query: { __nextDefaultLocale: 'en', __nextDataReq: null },
      },
    }
    return paths
  },
}

export default nextConfig
