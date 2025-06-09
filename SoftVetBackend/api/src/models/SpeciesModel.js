const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Species',{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // No debe haber dos especies con el mismo nombre
            },
        },{
            timestamps: false, // Las especies raramente cambian, no se necesitan timestamps
            underscored: true,
            tableName: 'species',
        }
    );
};