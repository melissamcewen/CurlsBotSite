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


function validator(array) {
    if (array.every(isBelowThreshold)){
      return true

    }

    return false;
}

module.exports = validator;