/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');

/* INDEX ROUTE
----------------------------------------- */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/images', function(req, res) {
  const collection = db.collection('info');
  req.session.images = [];
  const imageFolder = 'public/dist/images'
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(file => {
      req.session.images.push(file);
    });
    request('http://studio-orphee.eu/data/data.json', function (error, response, body) {
      const data = JSON.parse(body);
      res.send(data);
    });
  });
})

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
