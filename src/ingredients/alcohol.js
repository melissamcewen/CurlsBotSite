const parser = require('./parser');
const cleaner = require('./cleaner');

import alcohols from '../ingredient-data/alcohols';

//TODO factor this
function alcohol(source){
  let list = cleaner(source);
  let detected = [];

    //see if there are any "mistaken identity compounds" and remove them 
  var noList = list.filter( function( el ) {
    return alcohols.notAlcohol.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 


  // now let's see what's on the good list
  let goodList = list.filter( function( el ) {
    return alcohols.good.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 



  //remove anything on the good list  or no listfrom the base list
  let newList = list.filter( function( el ) {
    return goodList.includes(el) == false && noList.includes(el) == false ; 
  });

  //see if anything on the list contains a partial match with the badContains list

  let badContains = newList.filter( function( el ) {
    return alcohols.badContains.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 

  let badExact = list.filter( function( el ) {
    return alcohols.badExact.includes(el) == true;
  });

  let badList = badContains.concat(badExact);

  //finally, take the base list and remove anything from the good list

  let filteredList = list.filter( function( el ) {
    return goodList.includes(el) == false && badList.includes(el) == false ;
  });

  //see if anything needs to be on the unknown list
  let unknownList = filteredList.filter( function( el ) {
    return alcohols.partials.some(function(ff) { 
      return el.indexOf(ff) > -1;
    });
  }); 


  let results = {
    good: goodList,
    bad: badList,
    unknown: unknownList,
    caution: []

  }

  return results;

} 

module.exports = alcohol;
