"use strict";

let multer = require('multer');
let app = require('express')();

// maximum allowed file size
const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 1000000;

// If SAVE_FILES is set, store in /uploads, else use memory
let storage;
if (process.env.SAVE_FILES) {
  console.log("diskStorage is set");
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.mimetype.split("/")[0] + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
    }
  });
} else {
  console.log("diskStorage is not set");
  storage = multer.memoryStorage();
}

// upload settings
let upload = multer({
  storage: storage,
  limits: {fileSize: MAX_FILE_SIZE}
}).single('uploaded-file');

app.get('/', (req, res) => {
  // instructions page
  res.sendFile(__dirname + '/public/index.html');
})

.get('/*', (req, res) => {
  // redirect everything else to /
  res.redirect('/');
})

.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(413).send("<p>Error: upload exceeded max size of " + MAX_FILE_SIZE + " bytes.");
      } else {
        res.send("<p>There was an error processing your file. Please try again.</p>");
      }
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
