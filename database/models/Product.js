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
    const product = sequelize.define('Product', cols, config);
    product.associate=(model) =>{
        product.hasMany(model.comentarios,{
            as:"comentario",
            foreingKey: "user_id"
        })
        product.belongsTo(model.usuarios, {
            as: "usuario",
            foreignKey: "user_id"
        })
    }

    return product;
}