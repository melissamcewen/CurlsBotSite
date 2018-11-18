const parser = require('./parser');
const cleaner = require('./cleaner');

import cleansers from '../ingredient-data/cleansers';



function sulfates(source){
  let list = cleaner(source);
  let detected = [];
  console.log("test");

  // first let's see if anything is detected that might contain the bad sulfates

  let badList = list.filter( function( el ) {
    return cleansers.bad.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's see what's on the good list
  let goodList = list.filter( function( el ) {
    return cleansers.good.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

    // now let's see what's on the caution list
  let cautionList = list.filter( function( el ) {
    return cleansers.caution.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  //finally, take the base list and remove anything from the good list

  let filteredList = list.filter( function( el ) {
    return goodList.includes(el) == false && badList.includes(el) == false && cautionList.includes(el) == false;
  });

  //see if anything needs to be on the unknown list
  let unknownList = filteredList.filter( function( el ) {
    return cleansers.partials.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 


  let results = {
    good: goodList,
    bad: badList,
    unknown: unknownList,
    caution: cautionList
  }

  return results;

} 

module.exports = sulfates;

