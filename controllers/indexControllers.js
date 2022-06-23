var db = require('../database/models'); //requerimos los modelos de donde sacamos lainfo de la db
const op = db.Sequelize.Op;

const controlador = {
  index: function (req, res, next) { //vamos a ver formas de hacer busqueedas mas refinadas
    db.Product.findAll({ // buscamos todos los datos registrados en la tabla productos
        include: [{
          all: true,      // incluimos todas las tablas de la db
          nested: false
        }],
        order: [
          ['createdAt', 'DESC'] //Order organiza la info que nos trae, en este caso de manera descendente a partir del campo createdAt
        ]
      })
      .then(function (products) { // promesa que se ejecuta cuando lo anterior se haya cumplido de forma asincronica
        res.render('index', { //el parametro products es la resolucion de la promesa, que lo utilizamos dentro del .callback: mostrar vista de index
          products
        });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  search: function (req, res, next) {
    db.Product.findAll({
        where: { //le pedimosque encuentre todos los productos donde
          [op.or]: [{ //operador or para que se cumplan las dos condiciones
              title: {
                [op.like]: '%' + req.query.search + '%' //que lo que se manda en la url este incluido en algun title de los productos
              }
            },
            {
              description: {
                [op.like]: '%' + req.query.search + '%' //que lo que se manda en la url este incluido en alguna descripcion de los productos
              }
            }
          ]
        },
        include: {
          all: true,
          nested: false
        }
      })
      .then(function (products) {
        db.User.findAll({
            where: {
              nombre_usuario: {
                [op.like]: '%' + req.query.search + '%'
              }

            },
            include: {
              all: true,
              nested: true
            }
          })
          .then(function (users) {
            if (products.length == 0 && users.length == 0) {
              res.render('noresult', {
                msg: "No hay resultados para su criterio de busqueda"
              })
            } else {
              res.render('search-results', {
                products,
                users
              });
            }
          })

      })
      .catch(function (error) {
        res.send(error);
      });
  }
}

module.exports = controlador;