import analyze from '../src/ingredients/analyze';
import detector from '../src/ingredients/detector';



test('analyze Keratin shampoo correctly', () => {
  var list = "Water (Aqua), Disodium Laureth Sulfosuccinate, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Cocamidopropyl Hydroxysultaine, PEG-12 Dimethicone, Cocamide MIPA, Glycol Distearate, Hydrolyzed Keratin, Theobroma Cacao (Cocoa) Seed Butter, Fragrance (Parfum), Cocos Nucifera (Coconut) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Extract, Panthenol, Polyquaternium-11, DMDM Hydantoin, Sodium Chloride, Cetyl Alcohol, Guar Hydroxypropyltrimonium Chloride, PEG-14M, Blue 1 (CI 42090), Red 40 (CI 16035), Yellow 5 (CI 19140).";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": ["cetyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": ["sodiumc14"], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": ["peg-12 dimethicone"], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": ["disodium laureth sulfosuccinate"], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list); 
  expect(results).toEqual(expected);
  expect(detector(results)).toEqual("caution");

});

test('analyze Tresemme Runway Waves correctly', () => {
  var list = "Aqua (Water), Acrylates Copolymer, Glycerin, Propylene Glycol, Polysorbate 20, VP/Methacrylamide/Vinyl Imidazole Copolymer, Triethanolamine, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Ammonium Hydroxide, Caprylyl Glycol, Citric Acid, Disodium EDTA, Hydrolyzed Milk Protein, Hydroxyethylcellulose, Iodopropynyl Butylcarbamate, Lactic Acid, Laureth-7, Parfum (Fragrance), PEG/PPG-25/25 Dimethicone, PEG-10 Dimethicone, PEG-4 Dilaurate, PEG-4 Laurate, PEG-4, Phenoxyethanol, Phenylpropanol, Propanediol, Sodium Benzoate, Alpha-Isomethyl Ionone, Benzyl Alcohol, Butylphenyl Methylpropional, Citronellol, Geraniol, Hexyl Cinnamal, Hydroxycitronellal, Linalool, Contains Milk Protein";
  var expected =  {"alcohol": {"bad": ["phenylpropanol"], "caution": [], "good": ["benzyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": ["pegppg-2525 dimethicone", "peg-10 dimethicone"], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};
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


test('analyze GVP Balm correctly', () => {
  var list = "Water (Aqua), Propylene Glycol, Myristyl Alcohol, Cetrimonium Chloride, Cetearyl Alcohol, Decyl Oleate, Phenoxyethanol, Fragrance (Parfum), Methylparaben, Propylparaben, Hexyl Cinnamal, Rosmarinus Officinalis (Rosemary) Leaf Extract, Hydrastis Canadensis (Golden Seal) Extract, Fucus Vesiculosus (Bladderwack) Extract, Methyl-2-Octynoate";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": ["myristyl alcohol", "cetearyl alcohol"], "unknown": []}, "other": {"bad": [], "caution": ["parabens"], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("caution");

});


test('analyze Ulta Total Textures kit correctly', () => {
  var list = "Ouidad Advanced Climate Control Heat and Humidity Gel: Water (Aqua), Butylene Glycol, Polyquaternium-28, Sericin, Tocopheryl Acetate, Retinyl Palmitate, Panthenol, Polyquaternium-7, Chamomilla Recutita (Matricaria) Flower Extract, Actinidia Chinensis (Kiwi) Fruit Extract, Lawsonia Inermis (Henna) Extract, Wheat Amino Acids, Hydrolyzed Wheat Protein/PVP Crosspolymer, PEG-60 Almond Glycerides, Glycerin, Guar Hydroxypropyltrimonium Chloride, Behentrimonium Chloride, Cetrimonium Chloride, PPG-26-Buteth-26, PEG-40 Hydrogenated Castor Oil, VP/DMAPA Acrylates Copolymer, Hydroxyethylcellulose, Hexylene Glycol, Caprylyl Glycol, Ethylhexylglycerin, Potassium Sorbate, Disodium EDTA, Phenoxyethanol, Fragrance (Parfum). Design Essentials Natural Almond and Avocado Curl Enhancing Mousse: Aqua/Water/Eau, Decyl Glucoside, Polyquaternium-55, Cetrimonium Chloride, Polysorbate 20, Fragrance (Parfum), Cetrimonium Dimethicone PEG-8 Olivate/Succinate, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, PEG-75 Lanolin, Hydrolyzed Wheat Protein, PEG-12 Dimethicone, Panthenol, Phenoxyethanol, Benzoic Acid, Ethylhexylglycerin, Glycereth-2 Cocoate, Citric Acid, Yellow 5 (CI 19140), Blue 1 (CI 42090). DevaCurl Leave-In Decadence: Water (Aqua, Eau), Isopentyldiol, Cocos Nucifera (Coconut) Oil, Caryocar Brasiliense Fruit Oil, Hydrolyzed Quinoa, Cyperus Esculentus Tuber Extract, Argania Spinosa Kernel Oil, Butyrospermum Parkii (Shea) Oil, Persea Gratissima (Avocado) Oil, Aloe Barbadensis Leaf Juice, Helianthus Annuus (Sunflower) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Melissa Officinalis Extract, Humulus Lupulus (Hops) Extract, Cymbopogon Schoenanthus Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Achillea Millefolium Extract, Hydrolyzed Jojoba Esters, Glycerin, Glycine Soja (Soybean) Oil, Glycine Soja (Soybean) Sterols, Glycolipids, Hydroxyethylcellulose, Phospholipids, Tocopherol, Xanthan Gum, PPG-3 Benzyl Ether Myristate, Sodium Hydroxide, Carbomer, Disodium EDTA, Phenoxyethanol, Ethylhexylglycerin, Fragrance (Parfum). Bumble and Bumble Hairdresser's Invisible Oil Balm-To-Oil Pre-Shampoo Masque: Elaeis Oleifera (Palm) Kernel Oil, Elaeis Guineensis (Palm) Oil, Fragrance, Vitis Vinifera (Grape) Seed Oil, Gardenia Tahitensis (Tiare) Flower Extract, Macadamia Integrifolia Seed Oil, Cocos Nucifera (Coconut) Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Argania Spinosa Kernel Oil, Carthamus Tinctorius (Safflower) Seed Oil, Hydrogenated Lecithin, Tocopherol, Coumarin, Linalool, Limonene, Hexyl Cinnamal, Butylphenyl Methylpropional. arth's Nectar Honey Curls: Water, Glycerin, Aloe Barbadensus Leaf Juice, Polysorbate 80, Carbomer, Jojoba Seed Oil, Sweet Almond Oil, Panthenol, Tocopheryl Acetate, Nettle Extract, Willow Bark Extract, Witch Hazel Water, Sodium Hydroxide, Caramel, Potassium Sorbate, DMDM Hydanton, Fragrance. CurlSmith Curl Defining Styling Souffle: Water (Aqua), Glycerin, Irish Moss (Chondrus Crispus), Sorbitol, Caprylyl/Capryl Glucoside, Fragrance (Parfum), Babassu Oil Polyglyceryl-4 Esters, Linum Usitatissimum (Flax) Seed Extract, Carapa Guaianensis (Andiroba) Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract, Salvia Officinalis (Sage) Leaf Extract, Persea Gratissima (Avocado) Oil, Selaginella Lepidophylla (Resurrection Flower) Extract, Aloe Barbadensis (Aloe Vera) Leaf Juice, Ocimum Basilicum (Basil) Leaf Extract, Piper Nigrum (Black Pepper) Seed Extract, Butyrospermum Parkii (Shea) Butter, Helianthus Annuus (Sunflower) Seed Oil, Glyceryl Caprylate, Glyceryl Undecylenate, Potassium Sorbate, Sodium Benzoate, Polyglyceryl-10 Laurate, Disodium EDTA, Citric Acid, Limonene, Linalool.";
  var expected = {"alcohol": {"bad": ["witch hazel water"], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": ["cetrimonium dimethicone peg-8 olivatesuccinate", "peg-12 dimethicone"], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": ["peg-75 lanolin"], "unknown": []}};
  var results = analyze(list); 
  expect(results).toEqual(expected);
  expect(detector(results)).toEqual("bad");

});


test('analyze Shea soap bar correctly', () => {
  var list = "Sodium Palmate, Sodium Palm Kernelate, Water, Glycerin (Vegetable), Fragrance (Essential Oil Blend), Sodium Gluconate, Butyrospermum Parkii (Shea) Butter*♥, Xanthan Gum, Palm Acid, Bentonite, Moroccan Lava Clay, Cocos Nucifera (Coconut) Oil, Sodium Chloride, Kaolinite, Palm Kernel Acid, Adansonia Digitata Seed Oil, Trichilia Emetica Seed Butter, Rosmarinus Officinalis (Rosemary) Leaf Extract, Ficus Carica (Fig) Fruit Extract *Certified Organic Ingredient ♥Fair Trade Ingredient";
  var expected = {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": ["soap"], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": [], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}};

  var results = analyze(list);
  expect(analyze(list)).toEqual(expected);
  expect(detector(results)).toEqual("bad");

});