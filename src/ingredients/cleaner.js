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
    let ingredientsList = text.split(',');

    if (ingredientsList.every(isBelowThreshold)){
        ingredientsList= ingredientsList.map(x => x.trim().toLowerCase().replace(/[^0-9A-Za-z\s+()-]/g, ''));

        return ingredientsList;

    } else {
      return [];
    }

  
}
module.exports = cleaner;