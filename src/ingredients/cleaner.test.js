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

  var result =  ["arctium lappa root extract", "chamomilla recutita (matricaria) extract", "sympytum officinale leaf extract", "viscum album (mistletoe) extract", "urtica dioica (nettle) extract", "avena sativa (oat) meal extract", "rosmarinus officinalis (rosemary) leaf extract", "salvia officinale (sage) leaf extract", "nasturtium officinale extract", "benzyl benzoate", "propylene glycol", ""];
  expect(cleaner(list)).toEqual(result);

});