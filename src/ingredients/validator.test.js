const validator = require('./validator');

const url = ["http://curlsbot.com"];
const url2 = ["http://www.curlsbot.com"];


test('Validator does not allow urls', () => {
  expect(validator(url)).toBe(false);
  expect(validator(url)).toBe(false);

});

const invalidList = ["Arctium Lappa Root Extract Chamomilla Recutita (Matricaria) Extract Sympytum Officinale Leaf Extract Viscum Album (Mistletoe) Extract Urtica Dioica (Nettle) Extract Avena Sativa (Oat) Meal Extract Rosmarinus Officinalis (Rosemary) Leaf Extract Salvia Officinale (Sage) Leaf Extract Nasturtium Officinale Extract Benzyl Benzoate Propylene Glycol "];

test('Validator does not allow non-comma seperated lists', () => {
  expect(validator(invalidList)).toBe(false);

});


const list = ["Cetrimonium Chloride", "Ricinus Communis (Castor) Seed Oil", "Apple Vinegar", "silicone"];

test('Validator does allow comma seperated lists', () => {
  expect(validator(list)).toBe(true);

});