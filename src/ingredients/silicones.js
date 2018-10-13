const parser = require('./parser');
const cleaner = require('./cleaner');

import siliconesList from '../ingredient-data/silicones';



//TODO refactor this
function silicones(source){

  let list = cleaner(source);
  let detected = [];

  // first let's see if anything is detected that might contain silicones

  let base = list.filter( function( el ) {
    return siliconesList.unknown.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's whitelist anything containing peg/ppg/pg-
  let goodList = base.filter( function( el ) {
    return siliconesList.good.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  //finally, take the base list and remove anything from the good list

  let badList = base.filter( function( el ) {
    return goodList.includes(el) == false;
  });


  let unknownList =  [];



  let results = {
    good: [],
    bad: badList,
    unknown: unknownList,
    caution: goodList
  }

  return results;

} 




module.exports = silicones;
