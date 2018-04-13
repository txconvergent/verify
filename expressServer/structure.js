import { userInfo } from 'os';

/*
- /last_block --> returns the last block
- post block --> accepts a block and appends to chain
- save the chain in a dated folder of each instance

- can the blocks be exported to json that allows res.send()

- search through list to find the hash?
*/

// Libraries
const path = require('path');            // Writing file path easier
const express = require('express');      // express server framework
var bodyParser = require("body-parser"); // JSON parser
var mongoose = require('mongoose');      // Middleware for MongoDB
var fs = require('fs');                  // To read local filesystem

var app = express();
var port = 3000;

app.use(bodyParser.json());  // Tell system to use JSON
app.use(bodyParser.urlencoded( {extended: true} ));
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/<db name>")  // Need to change db name here

// Database (for images) document schema
var imageSchema = new mongoose.Schema({  // Have been having issue saving, maybe its because of the schema?
  img: { hashCode: String,
         imageFileBinary: String
  }
});

// Model initiation with document schemda
var Image = mongoose.model("Image", imageSchema);


////////// vvvvv Testing vvvvv //////////
mongoose.connection.on('open', function () {
  console.error('mongo is open');

  // empty the collection
  Image.remove(function (err) {
    if (err) throw err;
    console.error('removed old docs');

    // store an img in binary in mongo
    var image = new Image;
    image.img.data = fs.readFileSync(imgPath);
    image.img.contentType = 'image/png';
    image.save(function (err, image) {
      if (err) throw err;

      console.error('saved img to mongo');

// // CRUD endpoints
// app.post("/uploadImage", (req, res) => {
//   var myDataToBeSaved = new Image(req.image); // req.image needs to be changed to take image in some way
//   myDataToBeSaved.save() // Saves to mongodb
//     .then(item => {
//       res.send("Item saved to db");
//     })
//     .catch(err => {
//       res.status(400).send("Unable to save to db");
//     }):
// });

////////// ^^^^^ Testing ^^^^^ //////////












app.get('/', (req, res) => res.sendFile('introPage.txt', {root: __dirname}))
app.get('/last_block', (req, res) => res.send("This is the last block."))
app.get('/file', (req, res) => res.sendFile('structure.js', {root: path.join(__dirname)}))

app.listen(3000, () => console.log("Example app listening on port 3000!\nConnect using localhost:3000"))



// Create a block with python script
app.get('/blockchain', callPythonScript);

function callPythonScript(req, res) {
  // using spawn instead of exec, prefer a stream over a buffer
  // to avoid maxBuffer issue

  var spawn = require("child_process").spawn;
  var process = spawn('python', ["./Verify.py", 
    req.query.one,   // method one
    req.query.two,   // method two
    req.query.three, // method three
    req.query.four   // method four
  ]);

  process.stdout.on('data', function(data) {
    res.send(data.toString());
  });
}
