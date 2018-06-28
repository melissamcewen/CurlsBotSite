
const silicones = require('./silicones');



const listSilicones = "Cetrimonium Chloride, Ricinus Communis (Castor) Seed Oil, Apple Vinegar, silicone";

const resultSilicones = {"bad": ["silicone"], "good": [], "unknown": []};


test('should detect bad silicones', () => {
  var list = "Cetrimonium Chloride, Ricinus Communis (Castor) Seed Oil, Apple Vinegar, silicone";
  var result =  {"bad": ["silicone"], "good": [], "unknown": []};
  expect(silicones(list)).toEqual(result);
});

test('should allow PEG silicones', () => {
  var list =  "Water (Aqua), Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate, Hydrolyzed Keratin, Theobroma Cacao (Cocoa) Seed Butter, Fragrance (Parfum), Cocos Nucifera (Coconut) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Extract, Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M, Blue 1 (CI 42090), Red 40 (CI 16035), Yellow 5 (CI 19140).";
  var result = {"bad": [], "good": ["peg-12 dimethicone"], "unknown": []};
  expect(silicones(list)).toEqual(result);
});

test('should detect unknown silicones', () => {
  var list =  "coney, mdimethicon";
  var result = {"bad": [], "good": [], "unknown": ["coney", "mdimethicon"]}
;
  expect(silicones(list)).toEqual(result);
});
