const cleaner = require('./cleaner');

const url = "http://curlsbot.com";
const url2 = "http://www.curlsbot.com";


test('cleaner does not allow urls', () => {
  expect(cleaner(url)).toEqual([]);
  expect(cleaner(url2)).toEqual([]);

});

const invalidList = "Arctium Lappa Root Extract Chamomilla Recutita (Matricaria) Extract Sympytum Officinale Leaf Extract Viscum Album (Mistletoe) Extract Urtica Dioica (Nettle) Extract Avena Sativa (Oat) Meal Extract Rosmarinus Officinalis (Rosemary) Leaf Extract Salvia Officinale (Sage) Leaf Extract Nasturtium Officinale Extract Benzyl Benzoate Propylene Glycol ";

test('cleaner does not allow non-comma seperated lists', () => {
  expect(cleaner(invalidList)).toEqual([]);

});



test('cleaner properly treats valid comma seperated data', () => {
  var list = "Arctium Lappa Root Extract, Chamomilla Recutita (Matricaria) Extract, Sympytum Officinale Leaf Extract, Viscum Album (Mistletoe) Extract, Urtica Dioica (Nettle) Extract, Avena Sativa (Oat) Meal Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Salvia Officinale (Sage) Leaf Extract, Nasturtium Officinale Extract, Benzyl Benzoate, Propylene Glycol, ";

  var result =  ["arctium lappa root extract", "chamomilla recutita extract", "sympytum officinale leaf extract", "viscum album extract", "urtica dioica extract", "avena sativa meal extract", "rosmarinus officinalis leaf extract", "salvia officinale leaf extract", "nasturtium officinale extract", "benzyl benzoate", "propylene glycol", ""];
  expect(cleaner(list)).toEqual(result);

});


test('cleaner strips out parentheses', () => {
  var list = "Deionized Water, Cocomidroprpyl Betaine (Coconut ) Oil, Vegetable Gylcerine, Olea Europaea (Olive) Fruit Oil*, Butyrospermum Parkii (Shea Butter) Oil*,Moringa Oleifera Seed Oil, Vegetable Glycerin, Keratin, Polyquaternium-7, Hibiscus Sabdariffa Extract, Silk Protien, Polyquaternium-10, Sucrose Laurate (and) Alcohol (non-drying), Melia Azadiratcha (Neem) Seed Oil, Proprietary Essential Oil Blend,Potassium Sorbate, Citric Acid ";

  var result = ["deionized water", "cocomidroprpyl betaine oil", "vegetable gylcerine", "olea europaea fruit oil", "butyrospermum parkii oil", "moringa oleifera seed oil", "vegetable glycerin", "keratin", "polyquaternium-7", "hibiscus sabdariffa extract", "silk protien", "polyquaternium-10", "sucrose laurate", "alcohol", "melia azadiratcha seed oil", "proprietary essential oil blend", "potassium sorbate", "citric acid"];
  expect(cleaner(list)).toEqual(result);

});

test('cleaner removes line breaks', () => {
  var list = "alcohol\n denat, kittens";

  var result =  ["alcohol denat","kittens"];
  expect(cleaner(list)).toEqual(result);

});

test('cleaner turns "and" into comma', () => {
  var list = "bands, sand and land";

  var result =  ["bands", "sand", "land"];
  expect(cleaner(list)).toEqual(result);

});


test('cleaner removes excess spaces', () => {
  var list = "test alcohol, test   alcohol, test    alcohol";

  var result =  ["test alcohol", "test alcohol", "test alcohol"];
  expect(cleaner(list)).toEqual(result);

});

test('cleaner turns & and vertical bar into comma', () => {
  var list = "bands | sand & land";

  var result =  ["bands", "sand", "land"];
  expect(cleaner(list)).toEqual(result);

});