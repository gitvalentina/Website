const computadoras = require('../db/data');

const controlador={
    index: function(req, res, next) {
        res.render('index', { products: computadoras.products });
      },
    search: function (req, res, next) {
            res.render('search-results');
        
    }
}

module.exports=controlador;