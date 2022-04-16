const data = require('../db/data');

const controlador={
    login: function(req, res, next) {
        res.render('login', { title: 'Express' });
      },
    profile: function name(req, res, next) {
            res.render('profile', {title: 'Express'});
    },
    profileEdit: function(req, res, next) {
        res.render('profile-edit', { title: 'Express' });
      },
    register: function name(req, res, next) {
            res.render('register', {title: 'Express'});
    },
}

module.exports=controlador;