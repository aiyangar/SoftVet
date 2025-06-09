const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'ActivityLevel',{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },{
            timestamps: false,
            underscored: true,
            tableName: 'activity_levels',
        }
    );
};