/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const jsonfile = require('jsonfile')

var file = 'public/data/data.json'

/* INDEX ROUTE
----------------------------------------- */
router.get('/', getDescriptions, function(req, res) {
  jsonfile.writeFile(file, req.session.data, function (err) {
    console.error(err);
  })
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

router.get('/edit/:image', getDescriptions, function(req, res) {
  jsonfile.writeFile(file, req.session.data, function (err) {
    console.error(err);
  })
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
  });
  res.redirect('/admin/overview');
});

router.get('/api', function(req, res) {
   res.send(req.session.data);
});

function getDescriptions(req, res, next) {
  req.session.data = {
    images: {},
  };
  const collection = db.collection('info');
  const data = collection.find({});
  data.forEach(function(d) {
    req.session.data.images[d.image_id] = d.description;
  });
  setTimeout(function(){
    next();
  }, 3000)
}

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
