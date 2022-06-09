const { comment } = require("../../controllers/productControllers");

module.exports = function (sequelize, DataTypes) {
    const cols = {
        id: {
            autoIncremet: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.STRING
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }
    const config = {
        tableName: 'comentarios',
        timestamps: false

    }
    const comentario = sequelize.define('Coment', cols, config);
    comentario.asssociate = function (models) {
        comentario.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "user_id"
        })
        comentario.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "producto_id"
        })
    }

    return comentario;
}