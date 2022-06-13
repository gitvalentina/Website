var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
const db = require('./database/models')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {
  secret: 'mensaje secreto',
  resave:false,
  saveUninitialized: true 
}));
//le pasa a todas las vistas una variable
app.use(function(req, res, next){
  console.log(req.cookies);
  if(!req.session.user){
    db.User.findByPk(req.cookies.user_id)
    .then(function(user){
      req.session.user = user;
      next();
    })
  } else{
    next();
  }
  
})

// session middleware
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

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
