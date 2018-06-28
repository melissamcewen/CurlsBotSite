const wax = require('./wax');


test('should detect bad waxes', () => {
  var list = "Deionized Water, Oryza Sativa (Rice) Milk, Behentrimonium Methosulfate (BTMS) Cetearyl Alcohol, Cocos Nucifera Extract (Coconut Oil), Butyrospermum Parkii (Shea Butter) Fruit, Olea Europaea (Olive) Oil, Camellia Sinensis (Green Tea) Leaf Extract, Sesamum Indicum (Sesame) Seed Oil, Glycine Sojo (Soybean) Oil and Aloe Barbadensis Leaf (Aloe Vera Extract), Ricinus Communis (Castor) Seed Oil, Oryza Sativa (Rice) Bran Oil, Macadamia Ternifolia (Macadamia) Seed Oil, Persea Gratissiam (Avocado) Oil, Aloe Barbadensis (Aloe) Leaf Juice, Stearoxytrimethyl Silane and Stearyl Alcohol (Silky Wax), Ulmus Eulva (Slippery Elm), Sorbitol, Simmondsia Chinensis (Jojoba) Seed Oil, Ascorbic (Vitamin C) Acid, Tocopherol (Vitamin E), Phenoxyethanol and Caprylyl Glycol and Sorbic Acid, Scent and Love!";
  var result = {"bad": ["stearoxytrimethyl silane and stearyl alcohol (silky wax)"], "good": [], "unknown": []};
  expect(wax(list)).toEqual(result);
});


test('should allow OK waxes', () => {
  var list = "Water, Emulsifying Wax NF, Octafluoropentyl Methacrylate (OFPMA), Isoamyl Laurate, Glycerin, Behentrimonium Methosulfate, Polyquaternium-55, Cetyl Alcohol, Cystoseira Compressa Extract, Panthenol, Polyacrylate-1 Crosspolymer, Butylene Glycol, Zea Mays (Corn) Starch, Lauryl Methyl Gluceth-10 Hydroxypropyldimonium Chloride, Glycol Stearate, Glycolic Acid, Fragrance, Limonene, Linalool, Citronellol, Butylphenyl Methylpropional, Citral, Geraniol, Benzyl Alcohol, Phenoxyethanol, Methylisothiazolinone, Propanediol";
  var result =  {"bad": [], "good": ["emulsifying wax nf"], "unknown": []};
  expect(wax(list)).toEqual(result);
});