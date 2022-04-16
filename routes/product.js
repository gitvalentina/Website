var express = require('express');
var router = express.Router();
var controlador = require('../controllers/productControllers');


/* GET home page. */
router.get('/', controlador.product);
router.get('/add', controlador.add);


module.exports = router;