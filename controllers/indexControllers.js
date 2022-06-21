var db = require('../database/models');
const op = db.Sequelize.Op;

const controlador = {
  index: function (req, res, next) {
    db.Product.findAll({
      include: [{all: true, nested: false} ]
  })
      .then(function (products) {
        res.render('index', {products});
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  search: function (req, res, next) {
    db.Product.findAll({
        where: {
          [op.or]: [{
              title: { [op.like]: '%' + req.query.search + '%'}
            },
            {
              description: {[op.like]: '%' + req.query.search + '%' }
            }
          ]
        }
      })
      .then(function (products) {
        if (products.length == 0) {
          res.render('noresult', {
            msg: "No hay resultados para su criterio de busqueda"
          })
        } else {
          res.render('search-results', {
            products
          });
        }
      })
      .catch(function (error) {
        res.send(error);
      });
  }
}

module.exports = controlador;