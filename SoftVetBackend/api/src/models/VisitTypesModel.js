const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Defines the model with the name 'VisitType' (singular)
    sequelize.define(
        'VisitType',{
            // VisitTypeID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Description (Text)
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensures no duplicate visit types
            },
        },{
            // Model options
            timestamps: false, // Not necessary for this type of static data
            underscored: true,
            tableName: 'visit_types',
        }
    );
};