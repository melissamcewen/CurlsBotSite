import { Organization, WebApplication } from 'schema-dts';

export function generateWebAppSchema(): WebApplication {
  return {
    '@type': 'WebApplication',
    name: 'CurlsBot Hair Care Ingredient Analyzer',
    description:
      'Analyze hair care ingredients and learn about their effects on curly and wavy hair',
    applicationCategory: 'Beauty',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Hair care ingredient analysis',
      'Curly hair product recommendations',
      'Ingredient safety information',
    ],
  } as WebApplication;
}

export function generateOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    name: 'CurlsBot',
    url: 'https://curlsbot.com',
    logo: 'https://curlsbot.com/logo.png',
    sameAs: ['https://twitter.com/curlsbot'],
    description:
      'CurlsBot helps people with curly and wavy hair understand product ingredients and find suitable hair care products.',
  } as Organization;
}
