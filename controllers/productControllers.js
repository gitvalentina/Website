var db = require('../database/models');


const controlador = {
    product: function (req, res, next) {
        res.render('product', {
            computadoras: computadoras
        });
    },
    add: function (req, res, next) {
        res.render('product-add');
    },
    show: function (req, res) {
        db.Product.findByPk(req.params.id)
            .then(function (product) {
                res.render('product-show', {
                    product
                });
            })
            .catch(function (error) {
                res.send(error);
            })
    },
    store: function (req, res) {
        console.log(req.body);
        if (!req.body.username) {
            throw Error('El nombre de usuario es requerido')
        } else if (!req.body.password || req.body.password.length < 3) {
            throw Error('La password debe tener mas de 3 caracteres')
        } else if (!req.photo) {
            throw Error('La imagen es requerida')
        } else if (!req.body.birthdate) {
            throw Error('La fecha de nacimiento es requerida')
        } else if (!req.body.email) {
            throw Error('Email not provided')
        } else {
            db.User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(function (user) {
                    if (user) {
                        throw Error('Este email ya esta siendo utilizado')
                    }
                })
        }
        db.User.create({
                nombre_usuario: req.body.username,
                contrasenia: hasher.hashSync(req.body.password, 10),
                email: req.body.email,
                birthdate: req.body.birthdate,
                photo: req.body.photo
            })
            .then(function () {
                res.redirect('/');
            })
            .catch(function (error) {
                res.send(error);
            })

    },

    comment: function (req, res) {
        if (!req.session.user) {
            throw Error('Not authorized')
        }
        // 
        req.body.user_id = req.session.user.id;
        // set book from url params
        req.body.product_id = req.params.id;
        db.Comment.create(req.body)
            .then(function (product) {
                res.redirect('/');
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
        res.render
    }

}


module.exports = controlador;