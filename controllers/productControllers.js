var db = require('../database/models');
const controlador = {
    product:function(req,res){
        res.render('index')
    },
    productAdd: function (req, res) {
        res.render('product-add');
    },
    show: function (req, res) {
        db.Product.findByPk(req.params.id, {
            includes: [{
                association: 'usuarios'
            }]
        })
        .then(function (data) {
                res.render('product-show', { data });
        })
        .catch(function (error) {
                res.send(error);
        })
    },
    store: function (req, res) {
        if(!req.session.user){
            return res.render('product-add', {error: 'Not authorized'});
        } 
        console.log(req.body)
        if (!req.body.nombre || !req.body.descripcion || !req.file || !req.body.fecha ) {
            res.render('noregister', {msg: 'No puede haber campos vacios'})    
        } else{
            //guardamos en req.body.photo la ruta a la foto que el usuario se puso
            req.body.photo = (req.file.path).replace('public', '');
            //creamos el producto , guardamos sus datos en la base
            db.Product.create({
                user_id: req.session.user.id,
                title: req.body.nombre,                
                description: req.body.descripcion,
                createdAt: req.body.fecha,
                photo: req.body.photo
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })
        }
        
    },

    comment: function (req, res) {
        if (!req.session.user) {
            throw Error('Not authorized')
        }
        // 
        req.body.user_id = req.session.user.id;
        // set book from url params
        req.body.product_id = req.params.id;
        db.Coment.create({
                comentario: req.body.comentario,
                productId: req.params.id,
                user_id: req.session.user.id
            }).then(function (product) {
                res.redirect('/products/:id/' + req.params.id);
            })
            .catch(function (error) {
                res.send(error);
            })
    },


    delete: function (req, res) {
        if (!req.session.user) {
            throw Error('Not authorized')
        }
        db.Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    update: function (req, res) {
        db.Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    edit: function (req, res) {
        res.render('product-edit')
    }

}


module.exports = controlador;