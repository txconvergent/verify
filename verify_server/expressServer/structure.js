// >>>>> Libraries <<<<<<
const path = require('path');            // Writing file path easier
const express = require('express');      // express server framework
var bodyParser = require("body-parser"); // JSON parser
var mongoose = require('mongoose');      // Middleware for MongoDB
var fs = require('fs');                  // To read local filesystem

var app = express();
var port = 3000;
var blockchain = [];                     // Blockchain stores here

// JSON parser for REST
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded( {extended: true} ));

// Mongoose promise for errors
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://blocc:bloccb@ds135777.mlab.com:35777/imagedb");  // Need to figure a way to hide username and pw
var db = mongoose.connection;

// Successfully connected
db.on('connected', function() {console.log('Mongoose default connection open to ' + db.host.toString())});
// Connection throws an error
db.on('error', function(err) {console.log('Mongoose default connection error: ' + err);});
// Connection disconnected
db.on('disconnected', function() {console.log('Mongoose default connection disconnected');});
// If node process ends, close the Mongoose connection.
process.on('SIGINT', function() { // INT (interruption) signal
  db.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); // Node exit the process
  });
});

// Database (for images) document schema
var imageSchema = new mongoose.Schema({
  url: {type: String},
  hashCode: {type: String},          // Hash code in String format
  imageFileBinary: {type: String}    // Image in binary format
});

// Model initiation with document schemda
var Image = mongoose.model("Image", imageSchema);   // Mongoose automatically looks for the plural version of the model name --> "images"


// >>>>> CRUD endpoints <<<<<
// Express listening --> For local hosting --> Take out when hosting on server
app.listen(port, () => {
  console.log("Web server listening on localhost:" + port);
});

// Landing page --> Take out when incorporating with app
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}))

app.get('/photo/:id', (req, res) => {
    var id = req.params.id;

    Image.findOne({ 'url':id }, function(err, result) {
        if (err) console.log(err);
        else {
            res.send("<!DOCTYPE html><html><head><title>Display Image</title></head><body>" +
                "<img style='display:block; width:500px;' id='base64image'" +
                "src='data:image/jpeg;base64," + result.imageFileBinary + "' /></body></html>");
        }
    });
})

// POST image to database
app.post('/postToDatabase', function(req, res) {
console.log("got request");
 // NOW trying to find a way to parse req so that the code and image feeds into the image creation


  // Create new image model with hash and imageFileBinary
  // var newImage = new Image({
  //   hashCode: "lastBlockHash",
  //   imageFileBinary: "res.body"     // Need to check if body works...
  // });

// Create new image model with hash and imageFileBinary
  var newImage = new Image({
    url: req.body.hashCode.slice(0, 5),
    hashCode: req.body.hashCode,
    imageFileBinary: req.body.imageFileBinary     // Need to check if body works...
  });

  // Save model to mongoDB
  newImage.save()
  .then(function(product) {
    console.log("newImage is saved to database!");          // debug
    res.send("SAVED! Yay!!!")
  })
  .catch(function(err) {
    console.error(err);
    res.send("NOT SAVED! Check console for error message.") // debug
  });

});



// app.post('/postBlock', function(req, res) {
//   blockchain.append(res);
// });


// // POST image to database
// app.post('/postImage', function(req, res) {
//   lastBlockHash = blockchain[-1];
//   // Create new image model with hash and imageFileBinary
//   var newImage = new Image({
//     hashCode: lastBlockHash,
//     imageFileBinary: res.body     // Need to check if body works...
//   });

//   // Save model to mongoDB
//   newImage.save()
//     .then(function(product) {
//       console.log("newImage is saved to database!");
//     })
//     .catch(function(err) {
//       console.error(err);
//     });

// });
// GET hash code
// app.get('/getHashCode', (req, res) => {
//   res.send specific blockchain block
//   blockchain[i]
// });





// // Test REST methods
// app.get('/last_block', (req, res) => res.send("This is the last block."))
// app.get('/file', (req, res) => res.sendFile('structure.js', {root: path.join(__dirname)}))

///////////// Ignore this for now /////////////
///////////// Ignore this for now /////////////
///////////// Ignore this for now /////////////

// // Create a block with python script
// app.get('/blockchain', callPythonScript);

// function callPythonScript(req, res) {
  //   // using spawn instead of exec, prefer a stream over a buffer
  //   // to avoid maxBuffer issue

  //   var spawn = require("child_process").spawn;
  //   var process = spawn('python', ["./Verify.py",
  //     req.query.one,   // method one
  //     req.query.two,   // method two
//     req.query.three, // method three
//     req.query.four   // method four
//   ]);

//   process.stdout.on('data', function(data) {
//     res.send(data.toString());
//   });
// };

///////////// Ignore this for now /////////////
///////////// Ignore this for now /////////////
///////////// Ignore this for now /////////////
