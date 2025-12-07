import type { HairPatternType } from './newTypes';

/**
 * Product recommendations mapped by hair type
 * Products are keyed by their ID in the haircare-ingredients-analyzer database
 */
export const hairTypeProductMap: Record<HairPatternType, string[]> = {
  'tight-coils': [
    'gentle_clarifying_shampoo',
    'cleansed_moisturizing_shampoo',
    'prime_3-minute_moisture_conditioner',
    'set_gel_to_foam_styling_mousse',
    'boost_hydrate_and_refresh_spray',
  ],
  coily: [
    'gentle_clarifying_shampoo',
    'cleansed_moisturizing_shampoo',
    'prime_3-minute_moisture_conditioner',
    'bounce_styling_cream',
    'tropical_oasis_anti-humidity_firm_hold_hair_gel',
  ],
  'tight-curls': [
    'gentle_clarifying_shampoo',
    'hydration_conditioner',
    'all_weather_styling_gel',
    'boost_hydrate_and_refresh_spray',
    'butter_whip_styling_foam',
  ],
  'loose-curls': [
    'gentle_clarifying_shampoo',
    'big_energy_conditioner',
    'set_gel_to_foam_styling_mousse',
    'curl_keeper_original_liquid_styler',
    'all_weather_styling_gel',
  ],
  wavy: [
    'gentle_clarifying_shampoo',
    'big_energy_conditioner',
    'set_gel_to_foam_styling_mousse',
    'neem_plant_silk_serum',
    'all_weather_styling_gel',
  ],
  swavy: [
    'gentle_clarifying_shampoo',
    'big_energy_conditioner',
    'neem_plant_silk_serum',
    'set_gel_to_foam_styling_mousse',
    'omega_9_hair_mask',
  ],
};

