import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      {
        source: '/howitworks',
        destination: '/about',
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
        source: '/harder-water',
        destination: '/blog/curly-hair-hard-water',
        permanent: true,
      },
      {
        source: '/shampoo-bars-are-not-cg',
        destination: '/categories/soaps',
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
    ];
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
