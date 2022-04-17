const computadoras = require('../db/data');


const controlador={
    product: function(req, res, next) {
        res.render('product', {computadoras: computadoras});
      },
    add: function (req, res, next) {
            res.render('product-add');
        
    }
}

module.exports=controlador;