var db = require('../database/models');
const hasher = require('bcryptjs');

const controlador = {
  login: function (req, res, next) {
    res.render('login');
  },
  logout: function (req, res) {
    req.session.user = null;
    res.clearCookie('user_id');
    res.redirect('/')
  },
  //para procesar info del log in, usamos metodo post
  access: function (req, res, next) {
    //busco el usuario en base al email que me manda
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function (user) {
        if (!user) throw Error('User not found')
        //comparo la password que me manda con la de la base de datos
        if (hasher.compareSync(req.body.contra, user.contrasenia)) {
          req.session.user = user;
          if (req.body.rememberme) {
            res.cookie('user_id', user.id, {
              maxAge: 1000 * 60 * 60 * 7
            })
          }
          res.redirect('/');
        } else {
          res.render('noregister', {msg: 'Invalid credentials.'})
        }
      })
      .catch(function (err) {
        next(err)
      })
  },

  //REGISTER

  register: function (req, res, next) {
    res.render('register');
  },
  store: function (req, res) {
    //verifico que llene todos los campos 
    if (!req.body.email || !req.body.username || !req.body.password || !req.body.birthdate || !req.file) {
      res.render('noregister', {msg: 'No puede haber campos vacios'})    
    }
    if (req.body.password.length < 4) {
      res.render('noregister', {msg: 'Password too short'})  
    }
    // verifico que el email no este repetido
    db.User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then(function(user){
      if(user){
        res.render('noregister', {msg: 'Este email ya esta registrado'})
      } else{
        //guardamos en req.body.photo la ruta a la foto que el usuario se puso
        req.body.photo = (req.file.path).replace('public', '');
        //creamos el usuario , guardamos sus datos en la base
        db.User.create({
          nombre_usuario: req.body.username,
          contrasenia: hasher.hashSync(req.body.password, 10),
          email: req.body.email,
          birthdate: req.body.birthdate,
          photo: req.body.photo
        })
        .then(function () {
          res.redirect('/');
        })
        .catch(function (error) {
          res.send(error);
        })
      }
    })
  },

  //PERFILES

  myProfile: function (req, res) {
    db.User.findByPk(req.session.user.id, {
      include: [{ association: 'producto' },
        { association: 'comentario' }
      ]
    })
    .then(data => {
      res.render('profile', { data });
    })
    .catch (function(error){
      res.send(error)
    })
  },
  profile: function (req, res) {
    db.User.findByPk(req.params.id, {
    include: [{ association: 'producto'} ]})
    .then(function(data) {
      res.render('profile', {          
        //le mando la info al render con data 
        data
      });
    })
    .catch(function(error){
      res.send(error)
    })
  },
  profileEdit: function (req, res) {
    res.render('profile-edit');
  }
}

module.exports = controlador;