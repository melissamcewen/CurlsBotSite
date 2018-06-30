function detector(data){
  var bad = false;
  var unknown = false;
  for (var list in data) {
    if(data[list].bad.length > 0){
      bad = true;
    }    
    if(data[list].unknown.length > 0){
      unknown = true;
    }
  }
  
  if(bad === true){
    return "bad";
  } else if(unknown === true) {
    return "unknown"
  } else {
    return "good"
  }
  
}

module.exports = detector;
