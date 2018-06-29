const parser = require('./parser');

var unknown = [
  "wax",
  "cire",
  "cera"
]

var bad = [
  "bees wax",
  "beeswax",
  "candelia wax",
  "cire dabeille",
  "cera alba",
  "microcrystalline wax" ,
  "myrica pubescens fruit wax",
  "synthetic beeswax",
  "euphorbia cerifera (candelilla) wax",
  "stearoxytrimethyl silane and stearyl alcohol (silky wax)",
  "cera alba (beeswax)",
  "microcrystalline wax (cera microcristallina)"
];

// hmm maybe I need to refactor to remove hyphens haha
var good = [
  "peg-8 beeswax",
  "emulsifying wax",
  "emulsifying wax nf"
];

function wax(list) {
  return parser(list, unknown, good, bad);
}

module.exports = wax;
