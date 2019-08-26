var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//require middleware for Passport use
var session = require('express-session');
var passport = require('passport');

//load the env vars
require('dotenv').config();

//create the Express app
var app = express();

//connect to the MongoDB with mongoose
require('./config/database');
//require Passport here
require('./config/passport');

//require routes here
var indexRouter = require('./routes/index');
var petsRouter = require('./routes/pets');
var usersRouter = require('./routes/users');
var providersRouter = require('./routes/providers');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session middleware for Passport use mount after cookieParser
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));

//mount Passport after session middleware but before local routes
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pets', petsRouter);
app.use('/providers', providersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
