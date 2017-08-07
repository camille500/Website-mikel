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
  res.render('admin/index');
});

router.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if(username === process.env.USERNAME && password === process.env.PASSWORD) {
    req.session.images = [];
    const imageFolder = 'public/dist/images'
    fs.readdir(imageFolder, (err, files) => {
      files.forEach(file => {
        if(file.charAt(3) == 1) {
          req.session.images.push(file);
        }
      });
      res.locals.images = req.session.images;
      res.render('admin/overview');
    });
  }
});

router.get('/overview', function(req, res) {
  req.session.images = [];
  const imageFolder = 'public/dist/images'
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(file => {
      if(file.charAt(3) == 1) {
        req.session.images.push(file);
      }
    });
    res.locals.images = req.session.images;
    res.render('admin/overview');
  });
})

router.get('/edit/:image', function(req, res) {
  res.locals.image = req.params.image
  res.render('admin/edit')
});

router.get('/delete/:image', function(req, res) {
  let image = req.params.image;
  let negative = image.replace("1", "2");
  const imagePaths = [`public/dist/images/${image}`, `public/dist/images/${negative}`]
  imagePaths.forEach(function(image) {
    fs.unlink(image, function(error) {
    });
    res.redirect('/admin/overview');
  })
})

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
