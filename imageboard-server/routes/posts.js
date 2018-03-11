const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const router = express.Router();

//Configure multer to store all images to static directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
  }
})

const upload =
 multer({
  storage: storage
});

//#############################################################################
//Get all threads
router.get('/', (req, res, next) => {

  const threads = req.db.get('threads');

  threads.find({}).then(result => {
    res.send(result);
  })
});

//#############################################################################
/* POST a new thread */
router.post('/', upload.single('file'), (req, res, next) => {

  const db = req.db;

  const threadsCollection = db.get('threads');

  const host = req.hostname;
  const filePath = req.protocol + "://" + host + ':3000' + '/' + req.file.path;

  //Insert to database
  threadsCollection.insert({
    message: req.body.message,
    file: filePath,
    timestamp: new Date().toLocaleString(),
    replies: []
  }).then(result => {
      console.log('Thread posted !');
      res.end();
    });
});

//#############################################################################
/* POST a new reply to a thread */
router.post('/:id', upload.single('file'), (req, res, next) => {

  const threadsColl = req.db.get('threads');

  //extract id from URL
  const threadToBeReplied = req.params.id;

  //Get the filepath
  const host = req.hostname;
  const filePath = req.protocol + "://" + host + ':3000' + '/' + req.file.path;

  threadsColl.update({"_id": threadToBeReplied},
     { $addToSet:
        { replies: {
            message: req.body.message,
            file: filePath,
            timestamp: new Date().toLocaleString()
        }}
  })
  .then(response => {
    console.log(response);
    res.end('Replied to thread ' + threadToBeReplied);
  })
});

//#############################################################################
/*
  GET Single thread
*/

router.get('/:id', (req, res, next) => {

  //extract id from URL
  const threadWeWant = req.params.id;

  const threads = req.db.get('threads');

  threads.find({"_id": threadWeWant }).then(result => {
    res.send(result);
  });
});

module.exports = router;
