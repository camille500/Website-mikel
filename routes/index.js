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
  const collection = db.collection('info');
  req.session.images = [];
  const imageFolder = 'public/dist/images'
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(file => {
      req.session.images.push(file);
    });
    request('https://site-mikel.herokuapp.com/data/data.json', function (error, response, body) {
      const data = JSON.parse(body);
      res.locals.descr = data;
      res.locals.images = req.session.images;
      res.render('index');
    });
  });
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
