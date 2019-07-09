/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,'public/dist/images')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);

  }
});
const upload = multer({storage: storage});
const jsonfile = require('jsonfile');
const file = 'public/data/data.json';

/* INDEX ROUTE
----------------------------------------- */
router.get('/', getDescriptions, function(req, res) {
  jsonfile.writeFile(file, req.session.data, function(err) {})
  res.render('admin/index');
});

router.post('/', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    req.session.auth = true;
    req.session.images = [];
    const imageFolder = 'public/dist/images'
    fs.readdir(imageFolder, (err, files) => {
      files.forEach(file => {
        if (file.charAt(3) == 1 || file.charAt(4) == 1) {
          req.session.images.push(file);
        }
      });
      res.locals.images = req.session.images;
      res.render('admin/overview');
    });
  }
});

router.get('/overview', checkForSession, getDescriptions, function(req, res) {
	jsonfile.writeFile(file, req.session.data, function(err) {})
  req.session.images = [];
  const imageFolder = 'public/dist/images'
  fs.readdir(imageFolder, (err, files) => {
    files.forEach(file => {
      if (file.charAt(3) == 1 || file.charAt(4) == 1) {
        req.session.images.push(file);
      }
    });
    res.locals.images = req.session.images;
    res.render('admin/overview');
  });
})

router.get('/edit/:image', checkForSession, getDescriptions, function(req, res) {
  jsonfile.writeFile(file, req.session.data, function(err) {
    console.error(err);
  })
  res.locals.data = req.session.data;
  res.locals.image = req.params.image;
  res.render('admin/edit')
});

router.post('/edit/:image', checkForSession, function(req, res) {
  const imageID = req.params.image;
  const description = req.body.description;
  const collection = db.collection('info');
  const new_data = {
    image_id: imageID,
    description: description
  }
  collection.findOne({
    image_id: imageID
  }, function(err, image) {
    collection.update({
      image_id: imageID
    }, new_data, {
      upsert: false
    }, function(err, doc) {
      if (err)
        return res.send(500, {error: err});
      res.redirect('/admin/overview')
    });
  });
});

router.get('/delete/:image', checkForSession, function(req, res) {
  let image = req.params.image;
  let negative = image.replace(".1", ".2");
  const imagePaths = [`public/dist/images/${image}`, `public/dist/images/${negative}`];
  imagePaths.forEach(function(image) {
    fs.unlink(image, function(error) {});
  });
  const collection = db.collection('info');
  collection.deleteOne({image_id: image})
  res.redirect('/admin/overview');
});

router.get('/api', function(req, res) {
  res.send(req.session.data);
});

router.get('/upload', function(req, res) {
  res.render('admin/upload');
});

router.post('/upload', upload.any(), getLatest, function(req, res) {
  const collection = db.collection('info');
  const positive = req.files[0].originalname;
  const negative = req.files[1].originalname;
  const amount = req.session.amount;
  fs.rename(`public/dist/images/${positive}`, `public/dist/images/${amount}.1.jpg`, function(err) {
    if (err)
      console.log('ERROR: ' + err);
    }
  );
  fs.rename(`public/dist/images/${negative}`, `public/dist/images/${amount}.2.jpg`, function(err) {
    if (err)
      console.log('ERROR: ' + err);
    }
  );
  const description = 'Beschrijving nog toevoegen';
  const data = {
    image_id: `${amount}.1.jpg`,
    description: description
  }
  collection.findOne({
    image_id: `${amount}.1.jpg`
  }, function(err, info) {
    if (info) {
      console.log('bestaat al');
    } else {
      collection.save(data, (err, result) => {
        if (err) return console.log(err);
        console.log(`${amount} is opgeslagen`);
        res.redirect('/admin/overview')
      });
      console.log('Bestaat nog niet');
    }
  });
});

function getDescriptions(req, res, next) {
  req.session.data = {
    images: {}
  };
  const collection = db.collection('info');
  const data = collection.find({});
  data.forEach(function(d) {
    console.log(d);
    console.log(d.image_id);
    req.session.data.images[d.image_id] = d.description;
  });
  setTimeout(function() {
    next();
  }, 3000)
}

router.get('/add', function(req, res) {
  const collection = db.collection('info');
  const test = collection.find({});
  test.forEach(function(id) {
    console.log(id);
  })
  // const numbers = ['62.1', '63.1', '64.1', '65.1', '66.1', '67.1', '68.1', '69.1', '70.1', '71.1', '72.1', '73.1', '74.1', '75.1', '76.1', '77.1', '78.1', '79.1'];
  // const description = 'Beschrijving nog toevoegen';
  // numbers.forEach(function(number) {
  //   const data = {
  //     image_id: number,
  //     description: description
  //   }
  //   collection.findOne({
  //   image_id: number
  // }, function(err, info) {
  //   if (info) {
  //     console.log(info);
  //     console.log('bestaat al');
  //     collection.updateOne(info, {$set: {image_id: `${number}.jpg`}}, (error, result) => {
  //       if (err) return console.log(err)
  //       console.log(result);
  //     })
  //   } else {
  //     // collection.save(data, (err, result) => {
  //     //   if (err) return console.log(err);
  //     //   console.log(`${number} is opgeslagen`)
  //     // });
  //     console.log('Bestaat nog niet');
  //   }
  // });
  // })
});

function getLatest(req, res, next) {
  const collection = db.collection('data');
  collection.findOne({
    type: 'latest'
  }, function(err, data) {
    req.session.amount = data.amount;
    const newAmount = Number(data.amount) + 1;
    collection.updateOne(data, {
      $set: {
        amount: newAmount
      }
    }, (error, result) => {
      if (err)
        return console.log(err)
      next();
    });
  });
}

function checkForSession(req, res, next) {
  if (req.session.auth === true) {
    next();
  } else {
    res.redirect('/admin');
  }
}

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
