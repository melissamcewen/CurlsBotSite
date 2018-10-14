function isBelowThreshold(currentValue) {

  if (/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(currentValue)){
    return false
  }
  else if (currentValue.length > 150) {
    return false
  }

  else {
    return true;
  }

}


function cleaner(text) {
    let parentheses = / *\([^)]*\) */g;
    let forbidden = /[^0-9A-Za-z\s+-]/g;
    let and = /\band\b/ig;
    let sepChar = /[|&]/ig;
    let lineBreaks = /\r?\n|\r/g;
    let excessSpaces = /\s\s+/g;


    let ingredientsList = text.replace(lineBreaks, ' ').replace(excessSpaces, ' ').replace(and, ',').replace(sepChar, ',').split(',');


    if (ingredientsList.every(isBelowThreshold)){
        ingredientsList= ingredientsList.map(x => x.trim().toLowerCase().replace(parentheses, ' ').replace(forbidden, '').trim());

        

        return ingredientsList;

    } else {
      return [];
    }

  
}
module.exports = cleaner;