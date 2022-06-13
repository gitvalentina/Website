var express = require('express');
var router = express.Router();
var controlador = require('../controllers/usersControllers');
var path = require('path');
var multer = require('multer');

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage
})


router.get('/login', controlador.login);
//siempre que haya un formulario vamos a tener dos rutas, una por get y una por post, con un metodo que procesa ese formulario, el body del formulario
router.post('/login', controlador.access);

router.get('/register', controlador.register)
router.post('/register', upload.single('photo'), controlador.store); //en store almacenamos

router.get('/profile', controlador.profile);
router.get('/profile', controlador.myProfile);

router.get('/profile-edit', controlador.profileEdit);

router.get('/logout', controlador.logout);

module.exports = router;