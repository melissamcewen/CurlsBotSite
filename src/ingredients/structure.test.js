const structure = require('./structure');
const silicones = require('./silicones');
const sulfates = require('./sulfates');
const alcohol = require('./alcohol');
const wax = require('./wax');

const other = require('./other');




//silicones, sulfates, alcohol, wax, other

const list = "Butane, Trisiloxane, Dimethicone, Isobutane, Propane, Isopropyl Myristate, Parfum, Tocopherol, Linalool, Limonene, Butylphenyl Methylpropional, Argania Spinosa Kernel Oil, Benzyl Salicylate, Geraniol";
const sil = silicones(list);
const sul = sulfates(list);
const al = alcohol(list);
const wa = wax(list);
const ot = other(list);


test('should structure data correctly', () => {
  var result =   {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": ["trisiloxane", "dimethicone"], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}}
;
  expect(structure(sil, sul, al, wa, ot)).toEqual(result);
});
