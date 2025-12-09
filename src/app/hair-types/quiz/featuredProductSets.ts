import { HairPatternType } from './newTypes';

export interface FeaturedProductSet {
  image: string;
  title: string;
  description: string;
  primaryLink: {
    url: string;
    text: string;
  };
  secondaryLink?: {
    url: string;
    text: string;
  };
}

export const featuredProductSets: Partial<
  Record<HairPatternType, FeaturedProductSet>
> = {
  'tight-coils': {
    image: '/images/hair-types/sets/miche-set.png',
    title: 'Miche Wash and Go Styling Bundle',
    description:
      'This starter set is perfect for your hair type, with a gentle clarifying shampoo to keep your scalp healthy, a rich moisturizing conditioner, and a lightweight yet hydrating leave-in foam hybrid.',
    primaryLink: {
      url: 'https://www.michebeauty.com/collections/bundles-1/products/wash-and-go-styling-bundle?rfsn=8688386.3de231',
      text: 'Miche',
    },
  },
  coily: {
    image: '/images/hair-types/sets/miche-set.png',
    title: 'Miche Wash and Go Styling Bundle',
    description:
      'This starter set is perfect for your hair type, with a gentle clarifying shampoo to keep your scalp healthy, a rich moisturizing conditioner, and a lightweight yet hydrating leave-in foam hybrid.',
    primaryLink: {
      url: 'https://www.michebeauty.com/collections/bundles-1/products/wash-and-go-styling-bundle?rfsn=8688386.3de231',
      text: 'Miche',
    },
  },
  'tight-curls': {
    image: '/images/hair-types/sets/curly-trial.png',
    title: 'Curly Trial Set',
    description:
      'This set is ideal for your hair type, with a gentle clarifying shampoo to keep your scalp healthy, a rich slippery deep conditioner, a cream for definition, and a nourishing light hold gel',
    primaryLink: {
      url: 'https://glnk.io/x26q/curlsbot7wm',
      text: 'Get Set',
    },
  },
  'loose-curls': {
    image: '/images/hair-types/sets/loose-curl-kit-curl-keeper.png',
    title: 'Curl Keeper Loose Curl Kit',
    description:
      'This set is ideal for your hair type, with volumizing shampoo to keep your pattern from being weighed down, a lightweight water-based conditioner, and liquid serum gel for definition, and a gel for long-term hold.',
    primaryLink: {
      url: 'https://curlkeeper.com/r?id=pbo4dc',
      text: 'Curl Keeper',
    },
  },
  wavy: {
    image: '/images/hair-types/sets/loose-curl-kit-curl-keeper.png',
    title: 'Curl Keeper Loose Curl Kit',
    description:
      'This set is ideal for your hair type, with volumizing shampoo to keep your pattern from being weighed down, a lightweight water-based conditioner, and liquid serum gel for definition, and a gel for long-term hold.',
    primaryLink: {
      url: 'https://curlkeeper.com/r?id=pbo4dc',
      text: 'Curl Keeper',
    },
  },
  swavy: {
    image: '/images/hair-types/sets/living-proof-set.png',
    title: 'Living Proof Voluminous Hair Essentials',
    description:
      'With swavy hair you don\'t need curly products. This set is ideal because it has a cleansing shampoo to remove weight, a light conditioner, a foam for definition, and a texture spray to enhance your waviness.',
    primaryLink: {
      url: 'https://www.livingproof.com/products/full-voluminous-hair-essentials',
      text: 'Living Proof',
    },
    secondaryLink: {
      url: 'https://www.ulta.com/p/voluminous-hair-essentials-kit-pimprod2050769?sku=2635314',
      text: 'Ulta',
    },
  },
};

