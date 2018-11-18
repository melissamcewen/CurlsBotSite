//sulfates + those similar to sulfates
//sulphate is used in UK and some other countries
const bad = [
"ammonium lauryl sulfate",
"ammonium lauryl sulphate",

"ammonium laureth sulfate",
"ammonium laureth sulphate",

"sodium lauryl sulfate",
"sodium lauryl sulphate",

"sodium laureth sulfate",
"sodium laureth sulphate",

//tea sulfate
"tea lauryl sulfate",
"tea lauryl sulphate",

// tea sulfate
"tea-dodecylbenzenesulfonate",
// tea sulfate
"triethanolamine lauryl sulfate",
"triethanolamine lauryl sulphate",

"sodium cetearyl sulfate",
"sodium cetearyl sulphate",

"sodium coco sulfate",
"sodium coco sulphate",

"sodium cocosulfate",
"sodium cocosulphate",

"sodium coco-sulfate",
"sodium coco-sulphate",

"ammonium laureth sulfate",
"ammonium laureth sulphate",

"ammonium lauryl sulfate",
"ammonium lauryl sulphate",

"sodium myreth sulfate",
"sodium myreth sulphate",

"sodium polystyrene sulfate",
"sodium polystyrene sulphate",

"ammonium cocoyl sulfate",
"ammonium cocoyl sulphate",

"sodium c12-18 alkyl sulfate",
"sodium c12-18 alkyl sulphate",

"sodium alkyl sulfate",
"sodium alkyl sulphate",

"sodium laureth-40 sulfate",
"sodium laureth-40 sulphate",


// Evidence needed 
  "alkylbenzene sulfonate",
  "alkyl benzene sulfonate",
//Evidence needed
 "ammonium xylenesulfonate",
 "ammonium xylene-sulfonate",
 //Evidence needed
 "ethyl peg-15 cocamine sulfate",
//Evidence needed
  "sodium xylenesulfonate",
  "sodium xylene-sulfonate",
//Evidence needed
  "tea-dodecylbenzenesulfonate",
  "tea dodecylbenzenesulfonate",

]

const caution = [
// should catch them all
  "olefin sulfonate",
  "oliefin sulfonate",
// 14-16
  "sodium c14-16 olefin sulfonate", 
// 14-15
  "sodium c14-15 olefin sulfonate", 
// 12-14
  "sodium c12-14 olefin sulfonate",
// 14-26
  "sodium c14-26 olefin sulfonate",
//14-18
  "sodium c 14-18 olefin sulfonate",
// 16-18
  "sodium c 16-18 olefin sulfonate",
  //unknown how harsh this is- previously listed as non-cg
  "sodium cocoyl sarcosinate",
  "sodium lauroyl sarcosinate",
  "sodium lauryl sarcosinate",
  "sodium lauroyl sarcosine",
  //might be OK caution for now
  "sodium lauryl sulfoacetate",
  "sodium cocoyl glutamate",
  "sodium lauroyl methyl isethionate",
  //misspellings
  "sodium lauryl methyl isothionate",
  "sodium lauroyl methyl lsethionate",
  "sodium lauroylmethyl isethionate",
  //Evidence needed 
  "dioctyl sodium sulfosuccinate",
  //Evidence needed
  "disodium cocoyl glutamate",
  "sodium myristoyl sarcosinate"
]

const good = [
  "disodium laureth sulfosuccinate",
  "disodium laureth succinate",
  "sodium lauryl glucose carboxylate",
  "sodium methyl cocoyl taurate",
  "sodium lauroyl glutamate",
  //poor evidence
  "ammonium cocoyl isethionate",
  "sodium cocoyl isethionate",
  "coco betaine",
  "coco betaine",
  "cocamidopropyl betaine",
  "disodium cocoamphodiacetate",
  "cocamidopropyl hydroxysultaine",
  "lauryl hydroxysultaine",
  "sodium cocoamphoacetate",
  "sodium lauroamphoacetate",
  "coco glucoside",
  "capryl glucoside",
  "caprylyl glucoside",
  "decyl glucoside",
  "lauryl glucoside",
  "decyl polyglucose",
  "disodium cocoamphodipropionate",
  "babassuamidopropyl betaine",
  //need more research
  "sodium laurylglucosides hydroxypropylsulfonate",
  //need more research- not a detergent need to filter
  "sodium lauroyl lactylate",
  "sodium lauroyl hydrolyzed silk",
  "sodium methyl 2-sulfolaurate",
  "disodium 2-sulfolaurate",
  "sodium lauroyl oat amino acids",
  "disodium lauryl sulfosuccinate"
]

// Possibly bad or caution
const partials = [
//"ammonium lauryl sulfate"
  "ammonium lauryl",
// "ammonium lauryl sulfate", TEA lauryl sulfate, sodium lauryl sulfate
  "lauryl sulfate",
  "lauryl sulphate",
//"sodium cetearyl sulfate"
  "cetearyl sulfate",
  "cetearyl sulphate",

//sodium cocosulfate
  "cocosulfate",
  "coco-sulfate",
  "coco sulfate",
  "cocoyl sulfate",
  "cocosulphate",
  "coco-sulphate",
  "coco sulphate",
  "cocoyl sulphate",

//ammonium Laureth Sulfate, sodium Laureth Sulfate
  "laureth sulfate",
  "laureth sulphate",

//ammonium Laureth Sulfate,
  "ammonium laureth",
// sarcosinates
  "sarcosinate",
//sodium lauryl sulfate, sodium lauryl sulfoacetate
  "sodium lauryl",
//"sodium myreth sulfate"
  "sodium myreth",
  "myreth sulfate",
  "myreth sulphate",

 // "sodium lauroyl methyl isethionate"
  "sodium lauroyl",
 // "sodium laureth sulfate
  "sodium laureth",
//"ammonium laureth sulfate", "sodium laureth sulfate",
  "laureth sulfate", 
  "laureth sulphate", 

// "ammonium lauryl sulfate",
  "ammonium lauryl",
//ammonium xylenesulfonate/ AMMONIUM XYLENE-SULFONATe
  "ammonium xylenesulfonate",
  "ammonium xylene-sulfonate",
  // "disodium cocoyl glutamate"
  "cocoyl glutamate",
  //Sodium polystyrene sulfate
  "polystyrene sulfate",
  "polystyrene sulphate",
  //sodium c12-18 alkyl sulfate
  "alkyl sulfate",
  "alkyl sulphate"

]





module.exports = {
   bad,
   good,
   caution,
   partials
}