"use strict";

let fs = require('fs');
let multer = require('multer');
let app = require('express')();

app.get('/', function(req,res) {
  // instructions page
  res.sendFile(__dirname + '/public/index.html');
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is running on port " + port + "\n");
});
