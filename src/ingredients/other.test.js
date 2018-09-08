const other = require('./other');



test('should detect parabens', () => {
  var list = "methylparaben, propylparaben, butylparaben";
  var result =  {"bad": [], "caution": ["parabens"], "good": [], "unknown": []};
  expect(other(list)).toEqual(result);
});


test('should detect witch hazel', () => {
  var list = "methylparaben, witch hazel, butylparaben";
  var result =  {"bad": [], "caution": ["witch", "parabens"], "good": [], "unknown": []};
  expect(other(list)).toEqual(result);
});
