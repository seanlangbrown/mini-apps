const JSData = require('JSData.js');


const convert = function(json) {

  let data = new JSData();

  data.importJSON(json);

  return data.printCSV();
}


module.exports.convert = convert;