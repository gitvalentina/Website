const computadoras = require('../db/data');
var db = require('../database/models');
const req = require('express/lib/request');
const res = require('express/lib/response');

const controlador={
    login: function(req, res, next) {
        res.render('login');
      },
    profile: function (req, res, next) {
            res.render('profile', {user: computadoras});
    },
    profileEdit: function(req, res, next) {
        res.render('profile-edit', { user: computadoras.user });
      },
    register: function (req, res, next) {
            res.render('register');
    },
    store: function (req, res) {
      db.User.create(req.body)
          .then(function(){
              res.redirect('/');
          })
          .catch(function(error){
              res.send(error);
          })
    },
    access: function(req,res, next){
      db.User.findOne({ where: { username: req.body.username } } )
        .then(function(user){
          if (!user) throw Error('User not found')
          if (hasher.compareSync (req.body.password, user.password)) {
            req.session.user = user;
            if (req.body.rememberme) {
            res.cookie('userId', user.id, {maxAge: 1000 * 60 * 60* 7})
            }
            res.redirect('/');
          } else {
            throw Error('Invalid credentials.')
          }
      })
      .catch(function(err){
        next(err)
      })
    },

    logout: function(req, res, next){
      req.session.user = null;
      res.clearCookie('userId');
      res.redirect('/')
    }
}

module.exports=controlador;