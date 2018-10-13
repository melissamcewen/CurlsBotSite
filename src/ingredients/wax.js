const parser = require('./parser');
const cleaner = require('./cleaner');
import waxes from '../ingredient-data/waxes';



//TODO refactor this
function wax(source){

  let list = cleaner(source);
  let detected = [];

  // first let's see if anything is detected that might contain waxes

  let base = list.filter( function( el ) {
    return waxes.unknown.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's whitelist anything on the good list
  let goodList = base.filter( function( el ) {
    return waxes.good.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 


  //now let's just remove things that aren't waxes at all
  let nonList = base.filter( function( el ) {
    return waxes.not.some(function(ff) { 
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
