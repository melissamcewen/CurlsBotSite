// TODO refactor entire data model so you don't need all these parameters
/* 
    let siliconeAnalysis= silicones(text);

    let sulfateAnalysis= sulfates(text);

    let alcoholAnalysis= alcohol(text);

    let waxOilAnalysis= wax(text);

    let waterInsolubleAnalysis = other(text); */


function structure(silicones, sulfates, alcohol, wax, other){
  var data = {};
  data["silicones"] = silicones;
  data["sulfates"] = sulfates;
  data["alcohol"] = alcohol;
  data["wax"] = wax;
  data["other"] = {
    bad: other,
    good: [],
    unknown: []

  };



  return data;


}

module.exports = structure;
