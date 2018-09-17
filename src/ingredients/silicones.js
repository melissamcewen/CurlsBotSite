const parser = require('./parser');
const cleaner = require('./cleaner');


const unknown = [
  "cone",
  "dimethicon",
  "silane",
  "siloxane",
  "dimethcione",
  "botanisil",
  "silicon",
  "silylate",
  "silsesquioxane",
  "siloxysilicate",
  "methiconol"

];


const bad = [
  "dimethicone",
  "silica silylate",
  "bisaminopropyl dimethicone",
  "cetearyl methicone",
  "cetyl dimethicone",
  "cyclopentasiloxane",
  "stearoxy dimethicone",
  "stearyl dimethicone",
  "trimethylsilylamodimethicone",
  "amodimethicone",
  "dimethiconol",
  "behenoxy dimethicone",
  "phenyl trimethicone",
  "aminopropyl triethoxysilane",
  "silicone",
  "bis-aminopropyl dimethicone",
  "polysilicone-22",
  "trimethylsiloxyamodimethicone",
  "silica dimethicone silylate",
  "cetrimonium dimethicone peg-8 olivate.",
  "cyclomethicone",
  "propoxytetramethyl piperdinyl dimethicone",
  "phenyl trimethicone",
  "dimethiconol cysteine",
  "caprylyl methicone",
  "polysilicone-15",
  "polysilicone-1 crosspolymer",
  "botanisil",
  "polymethylsilsesquioxane"
];



const good =  [
  "peg",
  "ppg",
  "pg-"
];


//TODO refactor this
function silicones(source){

  let list = cleaner(source);
  let detected = [];

  // first let's see if anything is detected that might contain silicones

  let base = list.filter( function( el ) {
    return unknown.some(function(ff) { 
      return el.indexOf(ff) > -1;

    });
  }); 

  // now let's whitelist anything containing peg/ppg/pg-
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
    good: [],
    bad: badList,
    unknown: unknownList,
    caution: goodList
  }

  return results;

} 




module.exports = silicones;
