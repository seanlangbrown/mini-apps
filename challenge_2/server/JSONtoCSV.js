const JSData = require(__dirname + '/JSData.js');
const fs = require('fs');


let jobs = {};

let n = 0;

const generateId = function() {
  n++;
  return '' + n;
};

module.exports.newJob = function(input_json) {
  console.log('creating new job');
  let job = {};
  let id = generateId();
  job.id = id;
  job.input_json = input_json;
  job.csv = null;
  job.status = 'processing';
  console.log('job', job);
  jobs[id] = job;
  console.log(jobs);
  setTimeout(() => {
    processJob(job.id);
  }, 100);
  return id;
};

const processJob = function(id) {
  console.log('processing json');
  let data = new JSData();
  data.importJSON(jobs[id].input_json);
  jobs[id].csv = data.printCSV();//convert(job.input_json);
  fs.writeFile(makeCSVfilename(id), jobs[id].csv, 'utf-8', (err) => {
    if (err) {
      jobs[id].status = 'error';
      console.log('fs write error');
      throw err;
    } else {
      jobs[id].status = 'complete';
    }
  });
};

module.exports.jobStatus = function(id) {
  //console.log('checking status', jobs);
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

const makeCSVfilename = function(id) {
  return csvDir + id + '.csv';
}

const csvDir = __dirname + '/CSV/';
fs.mkdir(csvDir, ()=>(console.log('CSV directory created')));

module.exports.makeCSVfilename = makeCSVfilename;
module.exports.convert = convert;