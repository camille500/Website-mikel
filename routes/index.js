/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

/* INDEX ROUTE
----------------------------------------- */
router.get('/', function(req, res) {
  req.session.images = [];
  const imageFolder = 'public/images'
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(file => {
      req.session.images.push(file);
    });
    res.locals.images = req.session.images;
    res.render('index');
  });
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
