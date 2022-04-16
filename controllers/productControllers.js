const data = require('../db/data');

const controlador={
    product: function(req, res, next) {
        res.render('product', { title: 'Express' });
      },
    add: function name(req, res, next) {
            res.render('product-add', {title: 'Express'});
        
    }
}

module.exports=controlador;