module.exports = function (sequelize, DataTypes) {
    const cols = {
        id: {
            autoIncremet: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre_usuario: {
            type: DataTypes.STRING
        },
        contrasenia: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATE
        },
        photo: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    }
    const config = {
        tableName: 'usuarios',
        timestamps: false

    }
    const usuario = sequelize.define('User', cols, config);
    usuario.associate=(model) =>{
        usuario.hasMany(model.productos,{
            as:"producto",
            foreingKey: "user_id"
        })
        usuario.hasMany(model.comentarios),{
            as:"comentario",
            foreingKey:"user_id"
        }
    }

    return usuario;
}