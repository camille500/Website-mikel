/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');

/* DEPENDENCIES CONFIGURATION
----------------------------------------- */
const app = express();
const http = require('http').Server(app);
require('dotenv').config();
app.use(cors());

/* SESSIONS CONFIGURATION
----------------------------------------- */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = mongodb.MongoClient;
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err)
    return console.log(err)
  db = database;
});

/* SET PORT FOR HEROKU
----------------------------------------- */
const port = process.env.PORT || 3000;

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true);
app.use(compression());

/* LOAD ALL ROUTERS
----------------------------------------- */
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* BODY-PARSER FOR READING POST REQUESTS
----------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* INITIALIZE ROUTES
----------------------------------------- */
app.use(express.static('public')); // For server static files
app.use('/', indexRouter);
app.use('/admin', adminRouter);

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors');
app.use(function(req, res, next) {
  res.render('error/404');
});

/* START THE NPM SERVER
----------------------------------------- */
http.listen(port, function() {
  console.log(`Server started on ${port}`);
});
