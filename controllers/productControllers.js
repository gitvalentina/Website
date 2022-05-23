const computadoras = require('../db/data');
var db = require('../database/models');


const controlador={
    product: function(req, res, next) {
        res.render('product', {computadoras: computadoras});
    },
    add: function (req, res, next) {
        res.render('product-add');
    },
    show: function(req,res){
        const computadoras = db.Product.findByPk(req.params.id)
        .then(function(product){
            res.render('product-show', { product });
        })
        .catch(function(error){
            res.send(error);
        })
    },
    store: function (req, res) {
        db.Product.create(req.body)
            .then(function(){
                res.redirect('/');
            })
            .catch(function(error){
                res.send(error);
            })
    },
    delete: function (req, res) {
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