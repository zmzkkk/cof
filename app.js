global.basePath = __dirname;
global.modelPath = __dirname+"/model";
global.includePath = __dirname+"/include";
global.routePath = __dirname+"/routes";
var express = require('express');
var path = require('path');


var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');


var config = require('./include/config');

var app = express();

require(global.includePath+"/common.function")(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("detewterewr25525234"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000*3600 }}))
// app.use(connect.cookieParser());
// app.use(connect.session({secret: config.sha1Key, cookie: {maxAge: 60000}}));


//初始
require('./routes/init.route')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
