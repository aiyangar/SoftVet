const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'TestType' as a catalog for available diagnostic test types.
    sequelize.define(
        'TestType',{
            // TipoPruebaID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // NombrePrueba (e.g., Blood Panel, X-Ray, Urinalysis)
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensures each test type has a unique name
            },
        },{
            // Model options
            timestamps: false, // Static data, no need to track creation/update times
            underscored: true,
            tableName: 'test_types',
        }
    );
};