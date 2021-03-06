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
    //busco dentro de los usuario si coincide el email que me manda el q se esta logueando con algun email que ya tengo en la base de datos con el criterio del where
    db.User.findOne({
        where: { //busca registros que cumplan esta condicion, filtra por igualdad
          email: req.body.email
        }
      })
      .then(function (user) {
        if (!user) throw Error('User not found') // validacion: si no encuentra en la columna email, el mail que manda el cliente 
        //comparo la password que me manda con la de la base de datos
        if (hasher.compareSync(req.body.contra, user.contrasenia)) {
          req.session.user = user; //Ahora q se creo la sesion, debemos usarla, como se que estoy logueado? me cambia el header, puedo agregar productos, editar mi perfil, etc. app.js
          if (req.body.rememberme) { //preguntamos si toco el checkbox
            res.cookie('user_id', user.id, { //que cree la cookie: le indicamos el nombre, la info que guarda, que no puede ser sensible 
              maxAge: 1000 * 60 * 60 * 7    //y el objeto con su tiempo de vida
            })
          }
          res.redirect('/');
        } else {
          res.render('noregister', {
            msg: 'Invalid credentials.'
          })
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
      res.render('noregister', {
        msg: 'No puede haber campos vacios'
      })
    }
    if (req.body.password.length < 4) {
      res.render('noregister', {
        msg: 'Password too short'
      })
    }
    // verifico que el email no este repetido
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function (user) {
        if (user) {
          res.render('noregister', {
            msg: 'Este email ya esta registrado'
          })
        } else {
          //creamos el usuario , guardamos sus datos en la base
          db.User.create({
              nombre_usuario: req.body.username,
              contrasenia: hasher.hashSync(req.body.password, 10),
              email: req.body.email,
              birthdate: req.body.birthdate,
              photo: '/images/users/' + req.file.filename,
              createdAt: Date.now()
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
        include: [{
          all: true,
          nested: true
        }]
      })
      .then(data => {
        //res.send(data)
        res.render('profile', {
          data
        });
      })
      .catch(function (error) {
        res.send(error)
      })
  },
  profile: function (req, res) {
    if (req.session.user) {
      if (req.session.user.id == req.params.id) {
        res.redirect('/users/myProfile')
      }
    }
    db.User.findByPk(req.params.id, {
        include: [{
          all: true,
          nested: true
        }]
      })
      .then(function (data) {

        res.render('profile', {
          //le mando la info al render con data 
          data
        });
      })
      .catch(function (error) {
        res.send(error)
      })
  },
  profileEdit: function (req, res) {
    res.render('profile-edit')
  },
  editPost: function (req, res) {
    // verifico que el email no este repetido
    db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(function (email) {
        if (email && email.id != req.session.user.id) {
          res.render('noregister', {
            msg: 'Este email ya esta registrado'
          })
        } else {
          if (req.body.password) {
            req.body.contrasenia = hasher.hashSync(req.body.password, 10)
          } else {
            req.body.contrasenia = undefined;
            if (req.body.username) req.body.nombre_usuario = req.body.username;
            if (req.body.email) req.body.email = req.body.email;
            if (req.body.birthdate) req.body.birthdate = req.body.birthdate;
            if (req.file) req.body.photo = '/images/users/' + req.file.filename;
            req.body.updatedAt = Date.now();
            //actualizamos el usuario , guardamos sus datos en la base
            db.User.update(req.body, {
                where: {
                  id: req.session.user.id
                }
              })
              .then(function () {
                res.redirect('/');
              })
              .catch(function (error) {
                res.send(error);
              })
          }
        }
      })
  }
}

module.exports = controlador;