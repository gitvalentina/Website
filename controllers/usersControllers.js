var db = require('../database/models');
const req = require('express/lib/request');
const res = require('express/lib/response');
const hasher = require('bcryptjs');

const controlador = {
  login: function (req, res, next) {
    res.render('login');
  },
  profile: function (req, res, next) {
    res.render('profile', {
      user: computadoras
    });
  },
  profileEdit: function (req, res, next) {
    res.render('profile-edit', {
      user: computadoras.user
    });
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
        res.redirect('/');
      })
      .catch(function (error) {
        res.send(error);
      })
  },
  //para procesar info como el log in, usamos metodo post
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
            res.cookie('userId', user.id, {
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

  logout: function (req, res, next) {
    req.session.user = null;
    res.clearCookie('userId');
    res.redirect('/')
  }
}

module.exports = controlador;