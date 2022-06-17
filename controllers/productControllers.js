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
                content: req.body.comentario,
                productId: req.body.idProducto,
                user_id: req.body.id
            }).then(function (comentario) {
                res.redirect(`/products/:id/${comentario.product_id}`);
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
        db.Product.update({
            user_id: req.session.user.id,
            title: req.body.nombre,                
            description: req.body.descripcion,
            createdAt: req.body.fecha
        },{where:{id: req.body.product_id}
        })
        .then(function () {
             res.redirect(`/products/${product_id}>`);
        })
        .catch(function (error) {
            res.send(error);
        })
    },
    // Editar un producto en funcion del id
    edit: function (req, res) {
        if(!req.session.user){
            return res.render('product-edit', {error: 'Not authorized'});
        } else{ db.Product.findOne({
            where:[{id: req.params.id, userAdded: req.session.user.id}]
        }) .then(function(producto){
            if(producto != null){
                res.render('product-edit', {producto, id})
            } else{ res.redirect('/')}
        })}  
    }
}


module.exports = controlador;