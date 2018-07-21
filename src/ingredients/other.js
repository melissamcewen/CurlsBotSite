const cleaner = require('./cleaner');

var sodiumc14Vals = [
  "sodium c14-16 olefin sulfonate", 
  "sodium c14 16 olefin sulfonate",
];

var parabenList = [
  "paraben"
]



function analysis(source){
  var results = []
  
  var sodiumc14 = source.filter( function( el ) {
   return sodiumc14Vals.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (sodiumc14.length > 0) {
    results.push("sodiumc14");
  }

  var parabens = source.filter( function( el ) {
   return parabenList.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (parabens.length > 0) {
    results.push("parabens");
  }
  
  return results;
  
}



function other(list){
  var cleanList = cleaner(list);
  return analysis(cleanList)
}



module.exports = other;

