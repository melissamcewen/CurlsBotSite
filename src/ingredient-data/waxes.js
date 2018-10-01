var unknown = [
  "wax",
  "cire",
  "cera",
  "paraffin",
  "lanolin",
  "mineral oil",
  "petrolatum",
  "isohexadecane",
  "isohexanedecane",
  "isododecane",
  "dodecene",
  "dodecane"

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
  "emulsifying wax nf",
  "peg 8 beeswax",
  "peg-75 lanolin"
];

var not = [
  "lonincera",
  "lonicera",
  "acetylated lanolin alcohol",
  "lanolin alcohol"
]


module.exports = {
   bad,
   good,
   unknown,
   not
}