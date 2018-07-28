const parser = require('./parser');
const cleaner = require('./cleaner');


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
  "sodium myreth sulfate",
  "tea-dodecylbenzenesulfonate",
  "ethyl peg-15 cocamine sulfate",
  "dioctyl sodium sulfosuccinate",
  "sodium coco-sulfate",
  "sodium coco sulfate",
  "sodium laureth",
  "sodium lauryl",
  "ammonium laureth",
  "ammonium lauryl",
  "sodium xylene",
  "tea lauryl sulfate"
];


function sulfates(source){
  let list = cleaner(source);
  let detected = [];

  // first let's see if anything is detected that might contain the bad sulfates

  let base = list.filter( function( el ) {
    return bad.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's whitelist anything on the good list
  let goodList = base.filter( function( el ) {
    return good.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  //finally, take the base list and remove anything from the good list

  let badList = base.filter( function( el ) {
    return goodList.includes(el) == false;
  });


  let unknownList =  [];



  let results = {
    good: goodList,
    bad: badList,
    unknown: unknownList,
    caution: []
  }

  return results;

} 

module.exports = sulfates;

