var db = require('../database/models');


const controlador={
    product: function(req, res, next) {
        res.render('product', {computadoras: computadoras});
    },
    add: function (req, res, next) {
        res.render('product-add');
    },
    show: function(req,res){
        db.Product.findByPk(req.params.id)
        .then(function(product){
            res.render('product-show', { product });
        })
        .catch(function(error){
            res.send(error);
        })
    },
    store: function (req, res) {
        db.Product.create({
            title: req.body.nombre,
            description: req.body.descripcion,
            photo: req.body.img,
            user_id: 1,
            createdAt:req.body.fecha
          })
            .then(function(){
                res.redirect('/');
            })
            .catch(function(error){
                res.send(error);
            })
    },
    comment: function (req, res) {
        if (!req.session.user){
            throw Error('Not authorized')
        }
        // 
        req.body.user_id = req.session.user.id;
        // set book from url params
        req.body.product_id = req.params.id;
        db.Comment.create(req.body)
            .then(function(product){
                res.redirect('/');
            })
            .catch(function(error){
                res.send(error);
            })
    },
    delete: function (req, res) {
        if (!req.session.user){
            throw Error('Not authorized')
        }
        db.Product.destroy({where:{ id: req.params.id}})
            .then(function(){
                res.redirect('/');
            })
            .catch(function(error){
                res.send(error);
            })
    },
    update: function (req, res) {
        db.Product.update(req.body, {where:{ id: req.params.id}})
            .then(function(){
                res.redirect('/');
            })
            .catch(function(error){
                res.send(error);
            })
    },
    edit: function(req, res){
        res.render
    }

}


module.exports=controlador;