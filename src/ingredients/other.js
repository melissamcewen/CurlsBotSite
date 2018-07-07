const cleaner = require('./cleaner');


function simpleAnalysis (source, find){
      return source.filter( function( el ) {
       return find.includes( el );
    } ); 
  
}


var others = [
  "sodium c14-16 olefin sulfonate", 
  "sodium c14 16 olefin sulfonate"
];

function other(list){
  var cleanList = cleaner(list);
  return simpleAnalysis(cleanList, others)
}



module.exports = other;

