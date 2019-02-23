const cleaner = require('./cleaner');

import lists from '../ingredient-data/others';



function analysis(source){
  
  let results = {
    good: [],
    bad: [],
    unknown: [],
    caution: []
  }

  var soap = source.filter( function( el ) {
   return lists.soaps.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (soap.length > 0) {
    results.caution.push("soap");
  }

  var witch = source.filter( function( el ) {
   return lists.witchHazel.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 
  
  if (witch.length > 0) {
    results.caution.push("witch");
  }
  

  var parabens = source.filter( function( el ) {
   return lists.parabenList.some(function(ff) { 
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

