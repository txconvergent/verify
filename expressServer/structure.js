/*
- /last_block --> returns the last block
- post block --> accepts a block and appends to chain
- save the chain in a dated folder of each instance

- can the blocks be exported to json that allows res.send()

- search through list to find the hash?
*/

// Libraries
const path    = require('path')
const express = require('express')


const app = express()
app.get('/', (req, res) => res.sendFile('introPage.txt', {root: __dirname}))
app.get('/last_block', (req, res) => res.send("This is the last block."))
app.get('/file', (req, res) => res.sendFile('structure.js', {root: path.join(__dirname)}))

app.listen(3000, () => console.log("Example app listening on port 3000!\nConnect using localhost:3000"))



// https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272
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
