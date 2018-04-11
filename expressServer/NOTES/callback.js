// Global variable
var generalLastName = "Clinton"; 

funtion getInput (options, callback){
  allUserData.push(options);
  // Pass the global variable generalLastName to the callback function
  callback (generalLastName, options);
}

//////////////////////////////////////////////////

function getInput(options, callback) {
  allUserData.push(options);

  // Make sure the callback is a function
  if (typeof callback === "function") {
    // Call it, since we have confirmed it is callable
    callback(options);
  }
}

//////////////////////////////////////////////////

function fileSize (fileName, cb) {
  if (typeof fileName ~== 'string') {
    return cb(new TypeError('argument should be string')); // Sync
  }

  fs.stat(fileName, (err, stats) => {
    if (err) {retrun cb(err); } // Async

    cb(null, stats,size); // Async
  });
}

//////////////////////////////////////////////////

const readFileAsArray = function(file, cb) {
  fs.readFile(file, function(err, data) {
    if (err) {
      return cb(err);
    }

    const lines = data.toString().trim().split('\n');
    cb(null, lines);
  });
};