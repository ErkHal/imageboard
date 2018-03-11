var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//MongoDB connection settings
const mongo = require('mongodb').MongoClient;

//get credentials
const creds = require('./dbConfig.json');

const url = "mongodb://"
+ creds.username + ":" + creds.password
+ "@"
+ creds.hostaddress + ":" + creds.port
+ "/" + creds.database;

//Use monk to connect to db instance
var monk = require('monk');
var db = monk(url);

var index = require('./routes/index');
const posts = require('./routes/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Allow cross-origin resourse sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Make db connection available to all routes
app.use((req,res,next) => {
    req.db = db;
    next();
});

//Add paths to server
app.use('/', index);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
