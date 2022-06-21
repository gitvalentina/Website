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
        //creamos el usuario , guardamos sus datos en la base
        db.User.create({
          nombre_usuario: req.body.username,
          contrasenia: hasher.hashSync(req.body.password, 10),
          email: req.body.email,
          birthdate: req.body.birthdate,
          photo: '/images/users/'+ req.file.filename,
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
      include: [{ all: true, nested: true }]
    })
    .then(data => {
    res.render('profile', { data });
    })
    .catch (function(error){
      res.send(error)
    })
  },
  profile: function (req, res) {
    if(req.session.user){
      if(req.session.user.id == req.params.id){res.redirect('/myProfile')}
    }
    db.User.findByPk(req.params.id, {
    include: [{all: true, nested: false} ]})
    .then(function(data) {
      db.Product.findAll({
        where:[{user_id: req.params.id}],
        include:{all: true, nested: false}
      }) .then(function(products){
        res.render('profile', {          
          //le mando la info al render con data y products
          data, products
        });

      })
      
    })
    .catch(function(error){
      res.send(error)
    })
  },
  profileEdit: function (req, res) {
    res.render('profile-edit')    
  },
  editPost:function (req, res) {
    //verifico que llene todos los campos 
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
      if(user.email == req.body.email && user.id != req.session.user.id){
        res.render('noregister', {msg: 'Este email ya esta registrado'})
      } else{
        if(req.body.username) req.body.nombre_usuario = req.body.username;
        if(req.body.email) req.body.email = req.body.email;
        if (req.body.password) req.body.contrasenia = hasher.hashSync(req.body.password, 10);
        if (req.body.birthdate) req.body.birthdate = req.body.birthdate;
        if(req.file) req.body.photo = '/images/users/'+req.file.filename,
        //creamos el usuario , guardamos sus datos en la base
        db.User.update(req.body,{where: {id: req.session.user.id}})     
        .then(function () {
          res.redirect('/');
        })
        .catch(function (error) {
          res.send(error);
        })
      }
    })
  }
}

module.exports = controlador;