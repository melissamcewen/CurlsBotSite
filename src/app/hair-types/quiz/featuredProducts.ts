import type { HairPatternType } from './newTypes';

export interface FeaturedProduct {
  image: string;
  title: string;
  description: string;
  primaryLink: {
    url: string;
    text: string;
  };
  curlsMonthlyLink: string;
}

export const featuredProducts: Record<HairPatternType, FeaturedProduct> = {
  'tight-coils': {
    image: '/images/products/tropical_oasis_anti-humidity_firm_hold_hair_gel.png',
    title: 'Tropical Oasis Firm Hold Hair Gel',
    description:
      'Tightly coiled hair benefits from **dense yet light humectant-rich products** like this deliciously scented strong hold gel, which keeps your coils hydrated and bouncy.',
    primaryLink: {
      url: 'https://www.michebeauty.com/products/tropical-oasis-firm-hold-hair-gel?rfsn=8688386.3de231',
      text: 'Miche',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
  coily: {
    image: '/images/products/bounce_styling_cream.png',
    title: 'Bounce Styling Cream',
    description:
      'Coily hair benefits from rich, dense products like this styling cream, which offers the rich hydration that coils crave.',
    primaryLink: {
      url: 'https://www.michebeauty.com/products/bounce-curl-defining-cream?rfsn=8688386.3de231',
      text: 'Miche',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
  'tight-curls': {
    image: '/images/products/bounce_styling_cream.png',
    title: 'Bounce Styling Cream',
    description:
      'Coily hair benefits from rich, dense products like this styling cream, which offers the rich hydration that curls crave.',
    primaryLink: {
      url: 'https://www.michebeauty.com/products/bounce-curl-defining-cream?rfsn=8688386.3de231',
      text: 'Miche',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
  'loose-curls': {
    image: '/images/products/all_weather_styling_gel.png',
    title: 'Tootilab All Weather Styling Gel',
    description:
      'Loose curls benefit from light, high-hold products like this gel, which keeps curls bouncy and structured, without adding extra weight.',
    primaryLink: {
      url: 'https://collabs.shop/cebjoi',
      text: 'Tootilab',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
  wavy: {
    image: '/images/products/big_energy_conditioner.png',
    title: 'Big Energy Volumizing Conditioner',
    description:
      'Waves benefit from volumizing products like Curl Keeper\'s Big Energy line, which offers a cleansing shampoo to get rid of any weight holding your waves down, and a lightweight conditioner to provide hydration without weight.',
    primaryLink: {
      url: 'https://curlkeeper.com/r?id=ms7prl',
      text: 'Curl Keeper',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
  swavy: {
    image: '/images/products/set_gel_to_foam_styling_mousse.png',
    title: "Miche's Set Gel to Foam Styling Mousse",
    description:
      'Swavy hair benefits from lightweight moderate to high hold products like this mousse, which provides the definition for beachy waves without weighing them down. You don\'t need any other styling products with this product, it counts as a leave-in too.',
    primaryLink: {
      url: 'https://www.michebeauty.com/collections/stylers/products/set-curl-defining-mousse?rfsn=8688386.3de231',
      text: 'Miche',
    },
    curlsMonthlyLink: 'https://curlsmonthly.com/?ref=curlsbot',
  },
};

