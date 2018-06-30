const analyze = require('./analyze');


const list = "Butane, Trisiloxane, Dimethicone, Isobutane, Propane, Isopropyl Myristate, Parfum, Tocopherol, Linalool, Limonene, Butylphenyl Methylpropional, Argania Spinosa Kernel Oil, Benzyl Salicylate, Geraniol";

test('should analyze and structure data correctly', () => {
  var result =  {"alcohol": {"bad": [], "good": [], "unknown": []}, "other": {"bad": [], "good": [], "unknown": []}, "silicones": {"bad": ["trisiloxane", "dimethicone"], "good": [], "unknown": []}, "sulfates": {"bad": [], "good": [], "unknown": []}, "wax": {"bad": [], "good": [], "unknown": []}}
;
  expect(analyze(list)).toEqual(result);
});
