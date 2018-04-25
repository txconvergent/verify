// Very simple node.js application

// Explaination
// Requires the express application, then creates app by calling express.
// Our port is defined to be 3000
// app.use line will listen to requests from the browser and
// will return the text "Hello World!" back to the browser.
// The last line starts the server and tells it to listen to port 3000.

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

// Connecitng to the mongodb database through mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/nodeDemo")
// Document schema
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
// Model for the document schema
var User = mongoose.model("User", nameSchema);

// CRUD endpoint
app.post("/addname", (req, res) => {
  // Express.js V4 removed all middlewear so we need to isntall it
  // npm install body-parser --save
  // This configuration will allow us to pass the data for firstName
  // and lastName in the body to the server.
  // Additionally it also converts the data into JSON.
  var myData = new User(req.body);
  myData.save()
  .then(item => {
    res.send("Item saved to database");
  })
  .catch(err => {
    res.status(400).send("Unable to save to database.");
  });
});

app.get("/", (req, res) => {
  // res.send("Hellow World!");
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});