const cleaner = require('./cleaner');


function parser(source, unknown, good, bad){

    let list = cleaner(source);
    let detected = [];
    let goodList = list.filter( function( el ) {
       return good.includes( el );
    } ); 
    detected = detected.concat(goodList);  
    
    let badList= list.filter( function( el ) {
       return bad.includes( el );
    } ); 
  

    detected= detected.concat(badList);
  
    let unknownList = list.filter( function( el ) {
      return detected.indexOf( el ) < 0;
      } ).filter( function( el ) {
        return unknown.some(function(ff) { 
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



module.exports = parser;