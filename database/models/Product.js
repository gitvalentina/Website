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
        tableName: 'productos',
        timestamps: false,
    }
    const Product = sequelize.define('Product', cols, config);
    Product.associate=(model) =>{
        Product.hasMany(model.Coment,{
            as:"comentario",
            foreignKey: "product_id"
        })
        Product.belongsTo(model.User, {
            as: "usuario",
            foreignKey: "user_id"
        })
    }

    return Product;
}