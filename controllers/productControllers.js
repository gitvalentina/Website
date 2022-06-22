var db = require('../database/models');
const controlador = {
    product: function (req, res) {
        res.render('index')
    },
    productAdd: function (req, res) {
        res.render('product-add');
    },
    show: function (req, res) {
        db.Product.findByPk(req.params.id, {
                order: [
                    ['comentario', 'createdAt', 'DESC']
                ],
                include: [{
                    association: "comentario",
                    include: {
                        association: "usuario"
                    }
                }, {
                    association: "usuario"
                }]
            })
            .then(function (data) {
                res.render('product-show', {
                    data
                });
                //res.send(data)
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    store: function (req, res) {
        if (!req.session.user) {
            return res.render('product-add', {
                error: 'Not authorized'
            });
        }
        if (!req.body.nombre || !req.body.descripcion || !req.file) {
            res.render('noregister', {
                msg: 'No puede haber campos vacios'
            })
        } else {
            //guardamos en req.body.photo la ruta a la foto que el usuario se puso
            //req.body.photo = (req.file.path).replace('public', '');
            //creamos el producto , guardamos sus datos en la base
            db.Product.create({
                    user_id: req.session.user.id,
                    title: req.body.nombre,
                    description: req.body.descripcion,
                    createdAt: Date.now(),
                    photo: '/images/products/' + req.file.filename,
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
            res.redirect('/users/login')
        }
        req.body.userid = req.session.user.id;
        // set book from url params
        req.body.product_id = req.params.id;
        req.body.createdAt = Date.now();
        db.Coment.create({
                content: req.body.comentario,
                product_id: req.params.id,
                user_id: req.body.userid
            }).then(function (comentario) {
                res.redirect(`/product/${req.params.id}`);
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
    // Editar un producto en funcion del id
    edit: function (req, res) {
        if (!req.session.user) {
            return res.render('product-edit', {
                error: 'Not authorized'
            });
        } else {
            db.Product.findByPk(req.params.id)
                .then(function (producto) {
                    if (producto != null) {
                        res.render('product-edit', {
                            producto
                        })
                    } else {
                        res.redirect('/')
                    }
                })
        }
    },
    //ruta post al editar el producto
    update: function (req, res) {
        if (req.body.nombre) req.body.title = req.body.nombre;
        if (req.body.descripcion) req.body.description = req.body.descripcion;
        if (req.body.file) req.body.photo = '/images/products/' + req.file.filename;
        req.body.updatedAt = Date.now();
        db.Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(function () {
                res.redirect("/");
            })
            .catch(function (error) {
                res.send(error);
            })
    },
}


module.exports = controlador;