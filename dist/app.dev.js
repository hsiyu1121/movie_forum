"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var app = express();
var port = 3000;

var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var flash = require('connect-flash');

var session = require('express-session');

var passport = require('./config/passport');

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./config/helper')
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]('public'));
app.use('/upload', express["static"](__dirname + '/upload'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
  secret: 'movies',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user;
  next();
});
app.listen(port, function () {
  console.log("Express server running on port ".concat(port));
});

require('./routes')(app, passport);

module.exports = app;