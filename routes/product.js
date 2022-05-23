var express = require('express');
var router = express.Router();
var controlador = require('../controllers/productControllers');


/* GET home page. *///Usamos metodo. get porque queremos mostrar la vista o formulario //
router.get('/', controlador.product);
router.get('/add', controlador.add);
router.get('/:id', controlador.show);
router.get('/:id/edit', controlador.edit);
router.post('');
router.post('/delete', controlador.delete);


module.exports = router;