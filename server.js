"use strict";

let multer = require('multer');
let app = require('express')();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.mimetype.split("/")[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
  }
});

let upload = multer({ storage: storage });

app.get('/', (req, res) => {
  // instructions page
  res.sendFile(__dirname + '/public/index.html');
})

.get('/*', (req, res) => {
  // redirect everything to /
  res.redirect('/');
})

.post('/', (req, res) => {
  multer().single('uploaded-file')(req, res, (err) => {
    if (err) {
      console.log(err);
      res.send("<h1>There was an error processing your file. Please try again.</h1>");
    } else {
      console.log(req.file);
      res.json({
        "Name": req.file.originalname,
        "Size": req.file.size
      });
    }
  });
});

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is running on port " + port + "\n");
});
