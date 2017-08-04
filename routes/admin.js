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
  console.log(req.body);
})

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
