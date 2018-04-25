const path = require('path');
const express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:123@ds133094.mlab.com:33094/bloccbusters");
var db = mongoose.connection;

db.on('connected', function() { console.log("Successfully connected to database.") });
db.on('error', function(err) { console.log("Connection error: " + err) });
db.on('disconnected', function() { console.log("Disconnected from database"); });
process.on('SIGINT', function() {
	db.close(function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});


var imageSchema = new mongoose.Schema({
	url: { type: String },
	hashCode: { type: String },
	imageFileBinary: { type: String }
});
var Image = mongoose.model("Image", imageSchema);


app.listen(port, () => { console.log("Server started on port " + port); });

app.get('/photo/:id', (req, res) => {
	var id = req.params.id;

	Image.findOne({ 'url': id }, function(err, result) {
		if (err) console.log(err);
		else {
            if (result == null) {
                res.render('404')
            } else {
                res.render('photo', { picture: "data:image/jpeg;base64," + result.imageFileBinary, hash: result.hashCode })
            }
        }
	});
})

app.post('/postToDatabase', function(req, res) {
	var newImage = new Image({
		url: req.body.hashCode.slice(0, 5),
		hashCode: req.body.hashCode,
		imageFileBinary: req.body.imageFileBinary
	});

	newImage.save()
        .then(function(product) { console.log("New image saved to database"); })
		.catch(function(err) { console.error(err); });
});
