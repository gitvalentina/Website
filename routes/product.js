var express = require('express');
var router = express.Router();
var controlador = require('../controllers/productControllers');
var multer = require('multer'); // para copiar la imagen
const path = require('path'); //extrae la extension de la foto de la original.
//creamos la variable storage. Es un objeto con dos parametros que define donde y como la guarda 
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/products'), //ruta
    filename: function (req, file, cb) { //nombre con tres parametros
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) //file.fieldname es el nombre del campo del input dde la subimos
    }
})
// creamo variable upload, para mandarla despues al controlador
let upload = multer({
    storage: storage
})


/* GET home page. */ //Usamos metodo. get porque queremos mostrar la vista o formulario //
router.get('/', controlador.product);

router.get('/add', controlador.productAdd);
router.post('/add', upload.single('photo'), controlador.store); //upload.single (nombre del campo del input)

router.get('/:id', controlador.show);

router.get('/:id/edit', controlador.edit);
router.post('/:id/edit',upload.single('photo'), controlador.update)

router.post('/:id/delete', controlador.delete);

router.post('/:id/comment', controlador.comment);



module.exports = router;