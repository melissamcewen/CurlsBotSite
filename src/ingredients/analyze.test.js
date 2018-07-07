const analyze = require('./analyze');


const list = "Butane, Trisiloxane, Dimethicone, Isobutane, Propane, Isopropyl Myristate, Parfum, Tocopherol, Linalool, Limonene, Butylphenyl Methylpropional, Argania Spinosa Kernel Oil, Benzyl Salicylate, Geraniol";

test('should analyze and structure data correctly', () => {
  var result =  {"alcohol": {"bad": [], "caution": [], "good": [], "unknown": []}, "other": {"bad": [], "caution": [], "good": [], "unknown": []}, "silicones": {"bad": ["trisiloxane", "dimethicone"], "caution": [], "good": [], "unknown": []}, "sulfates": {"bad": [], "caution": [], "good": [], "unknown": []}, "wax": {"bad": [], "caution": [], "good": [], "unknown": []}}
;
  expect(analyze(list)).toEqual(result);
});
