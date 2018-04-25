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
app.use(bodyParser.json());
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
  hashCode: {type: String},          // Hash code in String format
  imageFileBinary: {type: String}    // Image in binary format
});

// Model initiation with document schemda
var Image = mongoose.model("Image", imageSchema);   // Mongoose automatically looks for the plural version of the model name --> "images"


// >>>>> CRUD endpoints <<<<<
app.listen(port, () => {
  console.log("Web server listening on localhost:" + port);
});

// Landing page --> Take out when incorporating with app
app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}))

// POST image to database
app.post('/postToDatabase', function(req, res) {

// Create new image model with hash and imageFileBinary
  var newImage = new Image({
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
