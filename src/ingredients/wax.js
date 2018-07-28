const parser = require('./parser');
const cleaner = require('./cleaner');


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
  "isododecane"
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
  "peg 8 beeswax"
];

var not = [
  "lonincera",
  "lonicera"
]

//TODO refactor this
function wax(source){

  let list = cleaner(source);
  let detected = [];

  // first let's see if anything is detected that might contain waxes

  let base = list.filter( function( el ) {
    return unknown.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's whitelist anything on the good list
  let goodList = base.filter( function( el ) {
    return good.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 


  //now let's just remove things that aren't waxes at all
  let nonList = base.filter( function( el ) {
    return not.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  //finally, take the base list and remove anything from the good list

  let badList = base.filter( function( el ) {
    return goodList.includes(el) == false  && nonList.includes(el) == false;
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

module.exports = wax;
