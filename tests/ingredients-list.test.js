import analyze from '../src/ingredients/analyze';
import detector from '../src/ingredients/detector';



test('analyze Keratin shampoo correctly', () => {
  var list = "Water (Aqua), Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate, Hydrolyzed Keratin, Theobroma Cacao (Cocoa) Seed Butter, Fragrance (Parfum), Cocos Nucifera (Coconut) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Extract, Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M, Blue 1 (CI 42090), Red 40 (CI 16035), Yellow 5 (CI 19140).";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": ["cetyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": ["sodium c14-16 olefin sulfonate"], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": ["peg-12 dimethicone"], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": ["disodium laureth sulfosuccinate"], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list); 
  expect(results).toEqual(expected);
  expect(detector(results)).toEqual("caution");

});

test('analyze Tresemme Runway Waves correctly', () => {
  var list = "Aqua (Water), Acrylates Copolymer, Glycerin, Propylene Glycol, Polysorbate 20, VP/Methacrylamide/Vinyl Imidazole Copolymer, Triethanolamine, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Ammonium Hydroxide, Caprylyl Glycol, Citric Acid, Disodium EDTA, Hydrolyzed Milk Protein, Hydroxyethylcellulose, Iodopropynyl Butylcarbamate, Lactic Acid, Laureth-7, Parfum (Fragrance), PEG/PPG-25/25 Dimethicone, PEG-10 Dimethicone, PEG-4 Dilaurate, PEG-4 Laurate, PEG-4, Phenoxyethanol, Phenylpropanol, Propanediol, Sodium Benzoate, Alpha-Isomethyl Ionone, Benzyl Alcohol, Butylphenyl Methylpropional, Citronellol, Geraniol, Hexyl Cinnamal, Hydroxycitronellal, Linalool, Contains Milk Protein";
  var expected =  {"alcohol": {"bad": ["phenylpropanol"], "caution": [], "good": ["benzyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": ["pegppg-2525 dimethicone", "peg-10 dimethicone"], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};
  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("bad");

});



test('analyze Ouidad Curl Recovery Meltdown correctly', () => {
  var list = "Water/Aqua/Eau, C12-15 Alkyl Benzoate, Cetearyl Alcohol, Stearamidopropyl Dimethylamine, Glycerin, Propanediol, Bis-Hydroxy/Methoxy Amodimethicone, Behentrimonium Chloride, Cetrimonium Chloride, Cetyl Esters, Methyl Hydroxyethylcellulose, Behentrimonium Methosulfate, Cetyl Alcohol, Cocos Nucifera (Coconut) Oil, Limnanthes Alba (Meadowfoam) Seed Oil, Persea Gratissima (Avocado) Oil, Raphanus Sativus (Radish) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Citrullus Lanatus (Watermelon) Seed Oil, Trichilia Emetica Seed Butter, Lactic Acid, Euterpe Oleracea Fruit Oil, Oryza Sativa (Rice) Bran Oil, Passiflora Edulis Seed Oil, Panthenol (Provitamin B5), Tocopheryl Acetate (Vitamin E), Hydrogenated Castor Oil/Sebacic Acid Copolymer, Dipropylene Glycol, Quaternium-91, Cetrimonium Methosulfate, C10-40 Isoalkylamidopropylethyldimonium Ethosulfate, Guar Hydroxypropyltrimonium Chloride, Potassium Sorbate, Ethylhexylglycerin, Disodium EDTA, Phenoxyethanol, Vanillyl Butyl Ether, Butylene Glycol, Isopropyl Alcohol, Hexyl Cinnamal, Linalool, Butylphenyl Methylpropional, Limonene, Citronellol, Benzyl Benzoate, Fragrance/Parfum.";
  var expected = {"alcohol": {"bad": ["isopropyl alcohol"], "caution": [], "good": ["cetearyl alcohol", "cetyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": ["bis-hydroxymethoxy amodimethicone"], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};
  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("bad");

});

test('analyze COCONUT & HIBISCUS CURL ENHANCING SMOOTHIE 12OZ correctly', () => {
  var list = "Deionized Water, Butyrospermum Parkii (Shea Butter)*, Cocos Nucifera (Coconut ) Oil*, Macadamia Ternifolia Seed Oil, Magnifera Indica (Mango) Seed Butter*, Persea Gratissima (Avacado) Oil, Vegetable Glycerin, Aloe Barbadensis Leaf Extract, Silk Protein, Ammonium Salt, Melia Azadiratcha (Neem) Seed Oil,Daucus Carota Sativa (Carrot) Seed oil, Sorbitol Esters, Panthenol (Pro-Vitamin B-5), Caprylyl Glycol, Essential Oil Blend, Lonicera Caprifolium (honeysuckle) Flower (and) Lonicera Japonica (Japanese Honeysuckle) Flower Extract, Tocopherol (Vitamin E), Hibiscus Flower Extract ";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("good");

});


test('analyze Bounce Light Creme Gel correctly', () => {
  var list = "Water, VP/VA copolymer, Glycerin, Hydrolyzed Jojoba Esters, Jojoba Esters, Hydrolyzed wheat protein, Hydrolyzed Oat protein, Aloe Barbadensis Leaf Extract, Panax Ginseng root Extract, Salvia Officlnalis (Sage) Extract,*Nigella Sativa (Virgin Black Cumin) Oil, Boswellia Carter Oil, Polyquaternium-10, Polysorbate 20, Aminomethyl Propanol, Carbomer, Disodium Edta, Caprylyl Glycol, Hexylene Glycol, Phenoxyethanol, Citric Acid, Fragrance. ";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": ["aminomethyl propanol"], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("good");

});