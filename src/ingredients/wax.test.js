const wax = require('./wax');

const list = "Emulsifying Wax NF, beeswax, euphorbia cerifera (candelilla) wax, lonincera japonica (honeysuckle) flower extract"



test('should classify waxes correctly', () => {
  var result =   {"bad": ["beeswax", "euphorbia cerifera (candelilla) wax"], "good": ["emulsifying wax nf"], "unknown": []};
  expect(wax(list)).toEqual(result);
});