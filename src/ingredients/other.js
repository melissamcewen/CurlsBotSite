const cleaner = require('./cleaner');

var sodiumc14Vals = [
  "sodium c14-16 olefin sulfonate", 
  "sodium c14 16 olefin sulfonate",
];

var parabenList = [
  "paraben"
]

var soaps = [
  "sodium palm",
  "saponified",
  "saponification",
  "soap",
  "sodium carboxylate"
];

var witchHazel = [
  "witch"
];



function analysis(source){
  
  let results = {
    good: [],
    bad: [],
    unknown: [],
    caution: []
  }

  var soap = source.filter( function( el ) {
   return soaps.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (soap.length > 0) {
    results.bad.push("soap");
  }

  var witch = source.filter( function( el ) {
   return witchHazel.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (witch.length > 0) {
    results.caution.push("witch");
  }
  
  var sodiumc14 = source.filter( function( el ) {
   return sodiumc14Vals.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (sodiumc14.length > 0) {
    results.caution.push("sodiumc14");
  }

  var parabens = source.filter( function( el ) {
   return parabenList.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (parabens.length > 0) {
    results.caution.push("parabens");
  }
  
  return results;
  
}



function other(list){
  var cleanList = cleaner(list);
  return analysis(cleanList)
}



module.exports = other;

