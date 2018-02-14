const JSData = require(__dirname + '/JSData.js');


const convert = function(inputJSON) {
  /*
  let data = new JSData();

  data.importJSON(json);

  return data.printCSV();
  */
  return "CSV version of : " + inputJSON
}


module.exports.convert = convert;