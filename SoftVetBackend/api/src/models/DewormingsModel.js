const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'DewormingProduct' as a catalog for available deworming products.
    sequelize.define(
        'DewormingProduct',{
            // ProductoID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // NombreProducto (Texto)
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Product names should be unique
            },
            // PrincipioActivo (Texto, Nulable)
            activeIngredient: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Tipo (Enum)
            type: {
                type: DataTypes.ENUM(
                    'Pipette',
                    'Collar',
                    'Pill',
                    'Injectable',
                    'Liquid'
                ),
                allowNull: false,
            },
            // Espectro (Texto: Pulgas, Garrapatas, Ácaros, etc.)
            spectrum: {
                type: DataTypes.TEXT, // TEXT is suitable for a potentially long list or description
                allowNull: true,
            },
        },{
            // Model options
            timestamps: false, // This is static catalog data
            underscored: true,
            tableName: 'deworming_products',
        }
    );
};