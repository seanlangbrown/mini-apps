const JSData = require(__dirname + '/JSData.js');


let jobs = {};

let n = 0;

const generateId = function() {
  n++;
  return n;
};

const newJob = function(input_json) {
  let job = {};
  job.id = generateId();
  job.input_json - input_json;
  job.csv = null;
  job.status = 'processing';
  jobs[job.id] = job;
  setTimeout(processJob(job.id).bind(this), 200);
  return job.id;
};

const processJob = function(id) {
  job.csv = convert(job.input_json);
  fs.writeFile(__dirname + '/CSV/' + job.id + '.csv', 'utf-8', job.csv)
  .then(() => (job.status = 'complete'))
  .on('error', () => (job.status = 'error'));
};

const jobStatus = function(id) {
  return jobs[id].status;
};


const convert = function(inputJSON) {
  /*
  let data = new JSData();

  data.importJSON(json);

  return data.printCSV();
  */
  return "CSV version of : " + inputJSON
}


module.exports.convert = convert;