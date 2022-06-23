var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //primero requerimos el modulo, linea22
var logger = require('morgan');
const session = require('express-session'); //primero requerimos el paquete para usar la sesion luego linea 26 usamos y linea 47 guardamos en locals

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
app.use(cookieParser()); //usa la cookie
app.use(express.static(path.join(__dirname, 'public'))); //donde guarda los recursos estaticos

//
app.use(session( {
  secret: 'mensaje secreto',  // texto unico que identifica a nuestra sesion de las del resto en el sitio web. 
  resave:false,
  saveUninitialized: true 
}));

//como se acuerda la pagina si el usuario esta logueado o no?
app.use(function(req, res, next){
  console.log(req.cookies);
  if(!req.session.user){ // si existe la cookie pero por alguna razon la sesion se borro, como la cookie vive mas que la sesion, la crea
    db.User.findByPk(req.cookies.user_id) // buscame un usuario que tenga el id que guarde en la cookie. user_id es el nombre de la cookie q defini en el controlador
    .then(function(user){
      req.session.user = user; // volve a crear la sesion; en caso de q exista la sesion, esta logueado
      next();
    })
  } else{
    next(); //estas logueado
  }
  
})

// session middleware
app.use(function(req, res, next){ //Variable accesible en todo el sitio, permite guardar y compartir info de un mismo usuario entre las vistas
    res.locals.user = req.session.user; //le agregamos la prop user a res.locals para guardar datos del usuario
    next();   //luego usando user en las vistas incluimos los datos del usuario; 
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
