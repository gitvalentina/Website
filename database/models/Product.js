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
    //ASOCIACIONES: Se hacen en los modelos, para optimizar la obtención de datos (a partir de FK)
    
    Product.associate = (model) => { //hacemos una funcion y declaramoslas associations
        Product.hasMany(model.Coment, { //1er parametro el modelo con el q se relaciona,
            as: "comentario",           // el alias refiere al nombre de la asociacion
            foreignKey: "product_id"    // luego el objeto con el alias y la FK de la tabla comentarios en dde se encuentra la asociacion
                                        // que comentario pertenece a cada producto? lo dice la fk    
        })
        Product.belongsTo(model.User, {
            as: "usuario",
            foreignKey: "user_id"      //que poducto le pertenece a cada usuario? lo dice la fk
        })
    }

    return Product;
}