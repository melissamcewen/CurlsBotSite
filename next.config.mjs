import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // Production optimizations
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
    optimizeServerReact: true
  },

  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },

  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'ingredients',
          },
        ],
        destination: '/analyzer',
        permanent: true,
      },
      {
        source: '/ads.txt',
        destination: 'https://ads.adthrive.com/sites/67aceaec554bb80802312182/ads.txt',
        permanent: true, // 301 status code
      },
      {
        source: '/howitworks',
        destination: '/about',
        permanent: true, // 308 status code
      },
      {
        source: '/categories/drying-alcohols',
        destination: '/categories/volatile-alcohols',
        permanent: true, // 308 status code
      },
      {
        source: '/cg-lite',
        destination: '/porosity/low-porosity',
        permanent: true, // 308 status code
      },
      {
        source: '/groups/detergents',
        destination: '/groups/surfactants',
        permanent: true, // 308 status code
      },
      {
        source: '/cleansers',
        destination: '/groups/surfactants',
        permanent: true, // 308 status code
      },
      {
        source: '/high-porosity',
        destination: '/porosity/high-porosity',
        permanent: true,
      },
      {
        source: '/normal-porosity',
        destination: '/porosity/normal-porosity',
        permanent: true,
      },
      {
        source: '/curly-girl-ingredient-list',
        destination: '/ingredients-cheat-sheet',
        permanent: true,
      },
      {
        source: '/dye',
        destination: '/blog/curl-friendly-hair-dye',
        permanent: true,
      },
      {
        source: '/hard-water',
        destination: '/blog/curly-hair-hard-water',
        permanent: true,
      },
      {
        source: '/shampoo-bars-are-not-cg',
        destination: '/categories/soaps',
        permanent: true,
      },
      {
        source: '/tik-tok',
        destination: '/link-in-bio',
        permanent: true,
      },
      {
        source: '/blog/is-soap-good-for-curls',
        destination: '/categories/soaps',
        permanent: true,
      },
      {
        source: '/shea',
        destination: '/blog/is-shea-moisture-curl-friendly',
        permanent: true,
      },
      {
        source: '/porosity',
        destination: '/porosity-quiz',
        permanent: true,
      },
      {
        source: '/groups',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/categories/humectants',
        destination: '/groups/humectants',
        permanent: true,
      },
      {
        source: '/categories/petroleum-oils',
        destination: '/groups/oils',
        permanent: true,
      },
    ];
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter', exported: true }]
    ],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
