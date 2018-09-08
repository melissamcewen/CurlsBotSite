const sulfates = require('./sulfates');


test('should detect bad sulfates', () => {
  var list = "Water (Aqua), Sodium Laureth Sulfate, Cocamidopropyl Betaine*, Sodium Chloride, Lavandula Angustifolia (Lavender) Oil*, Argania Spinosa Kernel Oil*, Cocos Nucifera (Coconut) Oil*, Glycol Distearate, Fragrance (Parfum), Sodium Benzoate, Citric Acid, Polyquaternium-10, Cocamide MEA, PPG-9, Disodium EDTA, Citronellol, Coumarin, Limonene, Linalool.";
  var result =  {"bad": ["sodium laureth sulfate"], "caution": [], "good": ["cocamidopropyl betaine"], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});


test('should allow OK sulfates', () => {
  var list = "Water (Aqua), Sodium Lauroyl Methyl Isethionate, Sodium Cocoyl Isethionate, Cocamidopropyl Hydroxysultaine, Fragrance (Parfum), PEG-120 Methyl Glucose Dioleate, Glycol Distearate, Mangifera Indica (Mango) Seed Butter, Gardenia Taitensis Flower Extract, Glycerin, Polyquaternium-10, Quaternium-80, Phenoxyethanol, Ethylhexylglycerin.";
  var result =   {"bad": [], "caution": ["sodium lauroyl methyl isethionate"], "good": ["sodium cocoyl isethionate", "cocamidopropyl hydroxysultaine"], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});


test('should detect misspelled sulfates', () => {
  var list = "Water (Aqua), Sodium Laureth Sulfuate, Cocamidopropyl Betaine*, Sodium Chloride, Lavandula Angustifolia (Lavender) Oil*, Argania Spinosa Kernel Oil*, Cocos Nucifera (Coconut) Oil*, Glycol Distearate, Fragrance (Parfum), Sodium Benzoate, Citric Acid, Polyquaternium-10, Cocamide MEA, PPG-9, Disodium EDTA, Citronellol, Coumarin, Limonene, Linalool.";
  var result =  {"bad": [], "caution": [], "good": ["cocamidopropyl betaine"], "unknown": ["sodium laureth sulfuate"]};
  expect(sulfates(list)).toEqual(result);
});

test('should detect sodium c14-16 olefin sulfonate', () => {
  var list = "Isopropyl Palmitate, Sodium c14-16 olefin sulfonate, Isododecane, Sclerocarya Birrea Seed Oil, Tocopheryl Acetate, Sclerocarya Birrea Callus Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Passiflora Edulis Seed Oil, Euterpe Oleracea Fruit Oil, Oryza Sativa (Rice) Bran Oil, Moringa Oleifera Seed Oil, Mauritia Flexuosa Fruit Oil, Mauritia Flexuosa Fruit Oil, Citrus Reticulata (Mandarin Red) Peel Oil, Citrus Sinensis (Orange) Peel Oil, Lavandula Angustifolia (Lavender) Flower Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Cedrus Atlantica Wood Oil, Helianthus Annuus (Sunflower) Seed Oil, Caprylic/Capric Triglyceride, Limonene.";
  var result =  {"bad": [], "caution": ["sodium c14-16 olefin sulfonate"], "good": [], "unknown": []};
  expect(sulfates(list)).toEqual(result);
});
