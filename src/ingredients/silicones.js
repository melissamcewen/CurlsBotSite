const parser = require('./parser');
const cleaner = require('./cleaner');


const unknown = [
  "cone",
  "dimethicon",
  "silane",
  "siloxane"
];


const bad = [
  "dimethicone",
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
  "polysilicone-1 crosspolymer"
];

/// todo refactor to detect quart and peg silicone better
/*const good =  [
  "peg-dimethicone",
  "peg-8 distearmonium chloride pg-dimethicone",
  "dimethicone copolyol",
  "dimethicone-pg diethylmonium chloride",
  "pg-dimethicone", 
  "glycidoxy dimethicone crosspolymer", 
  "dimethicone hydroxypropyl trimonium chloride", 
  "hydroxyethyl acetomonium pg-dimethicone", 
  "stearalkonium dimethicone peg-8 phthalate", 
  "steardimonium hydroxypropyl panthenyl peg-7 dimethicone phosphate chloride",
  "peg-8 dimethicone",
  "peg-12 dimethicone",
  "peg-14 dimethicone",
  "peg-20 dimethicone",
  "peg-15 dimethicone",
  "peg-11 methyl ether dimethicone",
  "dimethicone peg-8 meadowfoamate"
];*/


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
    good: goodList,
    bad: badList,
    unknown: unknownList
  }

  return results;

} 




module.exports = silicones;
