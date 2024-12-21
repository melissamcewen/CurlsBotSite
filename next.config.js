/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: '/cleansers',
        destination: '/groups/detergents',
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
        destination: '/ingredients',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
