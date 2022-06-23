module.exports = function (sequelize, DataTypes) {
    const cols = { //variable que guarda el objeto con todas las columnas y que se define con un alias, para usarla en los controladores 
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
        tableName: 'comentarios', //nombre de la tabla, para evitar la preconfig de sequeliz que supone que va en plural
        timestamps: false

    }
    const comentario = sequelize.define('Coment', cols, config); //almacenamos el metodo define en una variable que luego retornamos, tiene el alias, la definicion de las columnas y las configuraciones especiales como timestapms false para los campos que no la tienen
    comentario.associate = function (models) {
        comentario.belongsTo(models.User, {
            as: "usuario",
            foreignKey: "user_id"
        })
        comentario.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "product_id"
        })
    }

    return comentario;
}