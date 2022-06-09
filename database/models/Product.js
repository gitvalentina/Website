module.exports = function (sequelize, DataTypes) {
    const cols = {
        id: {
            autoIncremet: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        user_id: {
            type: DataTypes.INTEGER
        }

    }
    const config = {
        tableName: 'productos',
        timestamps: false

    }
    const Product = sequelize.define('Product', cols, config);
    Product.associate=(model) =>{
        Product.hasMany(model.Coment,{
            as:"comentario",
            foreingKey: "producto_id"
        })
        Product.belongsTo(model.User, {
            as: "usuario",
            foreignKey: "user_id"
        })
    }

    return Product;
}