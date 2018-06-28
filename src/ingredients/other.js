const cleaner = require('./cleaner');


function simpleAnalysis (source, find){
      return source.filter( function( el ) {
       return find.includes( el );
    } ); 
  
}


var others = [
  "isohexadecane", 
  "dimethcione", 
  "stearoxytrimethyl silane",
  "cyclopentasiloxane"
];

function other(list){
  var cleanList = cleaner(list);
  return simpleAnalysis(cleanList, others)
}



module.exports = other;

