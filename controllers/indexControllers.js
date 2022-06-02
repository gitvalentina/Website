var db = require('../database/models');

const controlador={
    index: function(req, res, next) {
        db.Product.findAll()
          .then(function(products){
            res.render('index', { products });
          })
          .catch(function(error){
            res.send(error);
          });
        
      },
    search: function (req, res, next) {
            res.render('search-results');
    },
    prueba: function(req,res){
      db.product.findAll()
        .then(function(product){
          res.send(product);
        });
      
    }
}

module.exports=controlador;