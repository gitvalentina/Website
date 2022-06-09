var express = require('express');
var router = express.Router();
var controlador = require('../controllers/productControllers');


/* GET home page. *///Usamos metodo. get porque queremos mostrar la vista o formulario //
router.get('/', controlador.product);

router.get('/:id', controlador.show);

router.get('/:id/edit', controlador.edit);


router.get('/delete', controlador.delete);
router.post('/delete', controlador.delete);

router.get('/add', controlador.add);
router.post('/add', controlador.store);

module.exports = router;