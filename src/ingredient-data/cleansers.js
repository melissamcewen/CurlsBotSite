//sulfates + those similar to sulfates
const bad = [
"ammonium lauryl sulfate",
"ammonium laureth sulfate",
"sodium lauryl sulfate",
"sodium laureth sulfate",
//tea sulfate
"tea lauryl sulfate",
// tea sulfate
"tea-dodecylbenzenesulfonate",
// tea sulfate
"triethanolamine lauryl sulfate",
"sodium cetearyl sulfate",
"sodium coco sulfate",
"sodium cocosulfate",
"sodium coco-sulfate",
"ammonium laureth sulfate",
"ammonium lauryl sulfate",
"sodium myreth sulfate",
"sodium polystyrene sulfate",
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
  "ammonium cocoyl sulfate",
  "sodium c12-18 alkyl sulfate",
  "sodium alkyl sulfate",
  "sodium laureth-40 sulfate"
]

const caution = [
  "sodium c14-16 olefin sulfonate", 
  "sodium c14 16 olefin sulfonate",
  "sodium (c-14-16) olefin sulfonate",
  "sodium c14-16 oliefin sulfonate",
  "sodium c12-14 olefin sulfonate",
  "sodium c12 14 olefin sulfonate",
  "sodium c14-26 olefin sulfonate",
  "sodium c14 26 olefin sulfonate",
  "sodium c 14-18 olefin sulfonate",
  "sodium c14-18 olefin sulfonate",
  "sodium c 14 18 olefin sulfonate",
  "sodium c 16-18 olefin sulfonate",
  "sodium c16-18 olefin sulfonate",
  "sodium c 16 18 olefin sulfonate",
  "sodium olefin sulfonate",
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
// (Sodium) C14-16 Olefin Sulfonate
  "olefin sulfonate",
  "sodium c14-16",
  "sodium c1416",
//"sodium cetearyl sulfate"
  "cetearyl sulfate",
//sodium cocosulfate
  "cocosulfate",
  "coco-sulfate",
  "coco sulfate",
//ammonium Laureth Sulfate, sodium Laureth Sulfate
  "laureth sulfate",
//ammonium Laureth Sulfate,
  "ammonium laureth",
// sarcosinates
  "sarcosinate",
//sodium lauryl sulfate, sodium lauryl sulfoacetate
  "sodium lauryl",
//"sodium myreth sulfate"
 "sodium myreth",
 "myreth sulfate",
 // "sodium lauroyl methyl isethionate"
  "sodium lauroyl",
 // "sodium laureth sulfate
  "sodium laureth",
//"ammonium laureth sulfate", "sodium laureth sulfate",
  "laureth sulfate", 
// "ammonium lauryl sulfate",
  "ammonium lauryl",
//ammonium xylenesulfonate/ AMMONIUM XYLENE-SULFONATe
  "ammonium xylenesulfonate",
  "ammonium xylene-sulfonate",
  // "disodium cocoyl glutamate"
  "cocoyl glutamate",
  //Sodium polystyrene sulfate
  "polystyrene sulfate",
  //coco sulfates
  "coco sulfate",
  "coco-sulfate",
  "cocoyl sulfate",
  //sodium c12-18 alkyl sulfate
  "alkyl sulfate"
]





module.exports = {
   bad,
   good,
   caution,
   partials
}