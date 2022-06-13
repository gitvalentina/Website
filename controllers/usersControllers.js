var db = require('../database/models');
const hasher = require('bcryptjs');

const controlador = {
  login: function (req, res, next) {
    res.render('login');
  },
  //para procesar info del log in, usamos metodo post
  access: function (req, res, next) {
    //busco el usuario en base al username que me manda
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
          throw Error('Invalid credentials.')
        }
      })
      .catch(function (err) {
        next(err)
      })
  },
  myProfile: function (req, res) {
    db.User.findByPk(req.params.id, {
      include: [{
          association: "productos"
        },
        {
          association: "comentarios"
        }
      ],
      order: [
          ['producto', 'id', 'desc']
        ]
        .then(data => {
          res.render('profile'), {
            user: data
          }
        })
    })
    .catch (function(error){
      res.send(error)
    })
  },
  profile: function (req, res) {
    db.User.findByPk(req.params.id, {
      include: [{
          association: "productos"
        },
        {
          association: "comentarios"
        }
      ],
      order: [
          ['producto', 'id', 'desc']
        ]
        .then(data => {
          res.render('profile'), {
            user: data
          }
        })
    });
  },
  profileEdit: function (req, res) {
    res.render('profile-edit');
  },
  register: function (req, res, next) {
    res.render('register');
  },
  store: function (req, res) {
    if (!req.body.email) {
      throw Error('Not email provided')
    }
    db.User.create({
        nombre_usuario: req.body.username,
        contrasenia: hasher.hashSync(req.body.password, 10),
        email: req.body.email,
        birthdate: req.body.birthdate,
        photo: req.body.photo
      })
      .then(function () {
        res.redirect('/users/login');
      })
      .catch(function (error) {
        res.send(error);
      })
  },

  logout: function (req, res) {
    req.session.user = null;
    res.clearCookie('user_id');
    res.redirect('/')
  }
}

module.exports = controlador;