const parser = require('./parser');


const unknown = [
  "sulfate",
  "sulfo",
  "sarcosinate"

]

//these are no longer used
const good = [
  "behentrimonium methosulfate",
  "disodium laureth sulfosuccinate",
  "magnesium sulfate",
  "sodium lauroyl sarcosinate",
  "sodium laurylglucosides hydroxypropylsulfonate",
  "isostearamidopropyl ethyldimonium ethosulfate",
  "disodium distyrylbiphenyl disulfonate",
  "cocotrimonium methosulfate",
  "sodium laneth-40 maleatestyrene sulfonate copolymer",
  "isoalkylamidopropylethyldimonium ethosulfate"
];

const bad = [
  "alkylbenzene sulfonate",
  "alkyl benzene sulfonate",
  "ammonium laureth sulfate",
  "ammonium lauryl sulfate",
  "ammonium xylenesulfonate",
  "sodium cocoyl sarcosinate",
  "sodium laureth sulfate",
  "sodium lauryl sulfate",
  "sodium lauryl sulfoacetate",
  "sodium myreth sulfate",
  "sodium xylenesulfonate",
  "tea-dodecylbenzenesulfonate",
  "ethyl peg-15 cocamine sulfate",
  "dioctyl sodium sulfosuccinate",
  "sodium coco-sulfate",
  "sodium coco sulfate"
];


function sulfates(list) {
  return parser(list, unknown, good, bad);
}

module.exports = sulfates;

