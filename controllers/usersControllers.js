const computadoras = require('../db/data');

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
}

module.exports=controlador;