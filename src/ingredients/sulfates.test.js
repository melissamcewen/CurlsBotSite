const sulfates = require('./sulfates');


test('should detect bad sulfates', () => {
  var list = "Water (Aqua), Sodium Laureth Sulfate, Cocamidopropyl Betaine*, Sodium Chloride, Lavandula Angustifolia (Lavender) Oil*, Argania Spinosa Kernel Oil*, Cocos Nucifera (Coconut) Oil*, Glycol Distearate, Fragrance (Parfum), Sodium Benzoate, Citric Acid, Polyquaternium-10, Cocamide MEA, PPG-9, Disodium EDTA, Citronellol, Coumarin, Limonene, Linalool.";
  var result = {"bad": ["sodium laureth sulfate"], "caution": [], "good": [], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});


test('should allow OK sulfates', () => {
  var list = "Water (Aqua), Sodium Lauroyl Methyl Isethionate, Sodium Cocoyl Isethionate, Cocamidopropyl Hydroxysultaine, Fragrance (Parfum), PEG-120 Methyl Glucose Dioleate, Glycol Distearate, Mangifera Indica (Mango) Seed Butter, Gardenia Taitensis Flower Extract, Glycerin, Polyquaternium-10, Quaternium-80, Phenoxyethanol, Ethylhexylglycerin.";
  var result = {"bad": [], "caution": [], "good": [], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});


test('should detect misspelled sulfates', () => {
  var list = "Water (Aqua), Sodium Laureth Sulfuate, Cocamidopropyl Betaine*, Sodium Chloride, Lavandula Angustifolia (Lavender) Oil*, Argania Spinosa Kernel Oil*, Cocos Nucifera (Coconut) Oil*, Glycol Distearate, Fragrance (Parfum), Sodium Benzoate, Citric Acid, Polyquaternium-10, Cocamide MEA, PPG-9, Disodium EDTA, Citronellol, Coumarin, Limonene, Linalool.";
  var result = {"bad": ["sodium laureth sulfuate"], "caution": [], "good": [], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});