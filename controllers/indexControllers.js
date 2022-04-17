const data = require('../db/data');

const controlador={
    index: function(req, res, next) {
        res.render('index', { title: 'Express' });
      },
    search: function (req, res, next) {
            res.render('search-results', {title: 'Express'});
        
    }
}

module.exports=controlador;