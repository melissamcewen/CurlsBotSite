const structure = require('./structure');
const silicones = require('./silicones');
const sulfates = require('./sulfates');
const alcohol = require('./alcohol');
const wax = require('./wax');
const other = require('./other');



function analyze(list){
  var sil = silicones(list);
  var sul = sulfates(list);
  var al = alcohol(list);
  var wa = wax(list);
  var ot = other(list);

 return structure(sil, sul, al, wa, ot)

}


module.exports = analyze;
