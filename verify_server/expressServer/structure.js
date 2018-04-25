// Libraries
const path = require('path');            // Writing file path easier
const express = require('express');      // express server framework
var bodyParser = require("body-parser"); // JSON parser
var mongoose = require('mongoose');      // Middleware for MongoDB
var fs = require('fs');                  // To read local filesystem

var app = express();
var port = 3000;
var blockchain = [];                     // Blockchain stores here
var tempBlock = [];                      // List of blocks to be uploaded ot the blockchain
var timer;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/imageDB");
var db = mongoose.connection;
// Successfully connected
db.on('connected', function() {console.log('Mongoose default connection open to ' + dbURI);});
// Connection throws an error
db.on('error', function(err) {console.log('Mongoose default connection error: ' + err);});
// Connection disconnected
db.on('disconnected', function() {console.log('Mongoose default connection disconnected');});
// If node process ends, close the Mongoose connection.
process.on('SIGINT', function() {
  db.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Database (for images) document schema
var imageSchema = new mongoose.Schema({
  hashCode: {type: String},
  imageFileBinary: {type: String}
});

// Model initiation with document schemda
var Image = mongoose.model("Image", imageSchema);

// >>>>> CRUD endpoints <<<<<
app.listen(port, () => {
  console.log("Web server listening on localhost:" + port);
});

// POST image to database
app.post('/postToDatabase', function(req, res) {

// Create new image model with hash and imageFileBinary

  var newImage = new Image({
    hashCode: lastBlockHash,
    imageFileBinary: res.body     // Need to check if body works...
  });

  // Save model to mongoDB
  newImage.save()
    .then(function(product) {
      console.log("newImage is saved to database!");
    })
    .catch(function(err) {
      console.error(err);
    });
  
});