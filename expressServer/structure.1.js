// Libraries
// import { userInfo } from 'os';
const path = require('path');            // Writing file path easier
const express = require('express');      // express server framework
var bodyParser = require("body-parser"); // JSON parser
var mongoose = require('mongoose');      // Middleware for MongoDB
var fs = require('fs');                  // To read local filesystem

var app = express();
var port = 3000;
var blockChain = [];

app.post('/postBlock', (req, res) => {
  // Use html id to identify hash or image

  // Hash is appended to the blockchain
  blockChain.append(req);

  // Image and hash is sent to data base through Mongoose 
});













app.use(bodyParser.json());  // Tell system to use JSON
app.use(bodyParser.urlencoded( {extended: true} ));
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/imageDB");
console.log("Connected MongoDB is running on " + mongoose.connection.host + ":" + mongoose.connection.port); // debug

/// DEBUG ///
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});
/// DEBUG ///

// Database (for images) document schema
var imageSchema = new mongoose.Schema({
  hashCode: {type: String},
  imageFileBinary: {type: String}
});

// Model initiation with document schemda
var Image = mongoose.model("Image", imageSchema);

// CRUD endpoints
// app.get('/', (req, res) => res.sendFile('introPage.txt', {root: __dirname}))


app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}))


/// HARD CODE ///
var newImage = new Image({
  hashCode: '{type: String}',
  imageFileBinary: 'lkjdf'
});

newImage.save(function(error) {
  console.log("SAVED!");
  if (error) {
    console.error(error);
  }
});







// app.post('/addname', (req, res) => {
//   var
// });

// app.post('/addname', (req, res) => {
//   var myData = new Image(req.body);
//   myData.save()
//     .then(item => {
//       res.send("Item saved to database");
//     })
//     .catch(err => {
//       res.status(400).send("Unable to save to database.");
//     });
// });

// Test REST methods
app.get('/last_block', (req, res) => res.send("This is the last block."))
app.get('/file', (req, res) => res.sendFile('structure.js', {root: path.join(__dirname)}))


app.listen(port, () => {
  console.log("Web server listening on localhost:" + port);
});


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