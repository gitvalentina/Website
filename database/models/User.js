module.exports = function(sequelize, DataTypes) {
    const cols = {
        id:{
            autoIncremet: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre_usuario:{
            type: DataTypes.STRING
        },
        contrasenia:{type: DataTypes.STRING},
        email: {type: DataTypes.STRING}
    }
    const config ={
        tableName: 'usuarios',
        timestamps: false

    }
    const usuario = sequelize.define('User', cols, config);
    
    return usuario;
}