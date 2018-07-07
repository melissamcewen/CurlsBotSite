function detector(data){
  if (data == ""){
    return "";
  }

  var bad = false;
  var unknown = false;
  var caution = false;
  for (var list in data) {
    if(data[list].bad.length > 0){
      bad = true;
    }    
    if(data[list].unknown.length > 0){
      unknown = true;
    }

    if(data[list].caution.length > 0){
      caution = true;
    }
  }
  
  if (bad === true){
    return "bad";
  } else if(unknown === true) {
    return "unknown"
   } else if(caution === true) {
    return "caution"
  } else {
    return "good"
  }
  
}

module.exports = detector;
