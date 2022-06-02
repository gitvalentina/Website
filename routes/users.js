var express = require('express');
var router = express.Router();
var controlador = require('../controllers/usersControllers');


/* GET users listing. */
router.get('/login', controlador.login);
//siempre que haya un formulario vamos a tener dos rutas, y una es por post, con un metodo que procesa ese formulario, el body del formulario
router.post('/login', controlador.access);
//en store almacenamos
router.get('/register', controlador.register)
router.post('/register', controlador.store);
router.get('/profile', controlador.profile);
router.get('/profile-edit', controlador.profileEdit);
router.get('/logout', controlador.logout);

module.exports = router;
