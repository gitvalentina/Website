module.exports = function(sequelize, DataTypes) {
    const cols = {
        id:{
            autoIncremet: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title:{
            type: DataTypes.STRING
        },
        description:{type: DataTypes.STRING}
    }
    const config ={
        tableName: 'productos',
        timestamps: false

    }
    const product = sequelize.define('Product', cols, config);
    
    return product;
}