const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'Vaccine' as a catalog for available vaccine types.
    sequelize.define(
        'Vaccine',{
            // VaccineID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Vaccine Name (Text)
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Vaccine names should be unique
            },
            // Target Species (Enum)
            targetSpecies: {
                type: DataTypes.ENUM('Canine', 'Feline', 'Both', 'Other'),
                allowNull: false,
            },
            // Booster Interval in Months (Integer, Nullable)
            boosterIntervalInMonths: {
                type: DataTypes.INTEGER,
                allowNull: true, // Null if it's a single-dose vaccine or has a variable schedule
            },
        },{
            // Model options
            timestamps: false, // This is static catalog data
            underscored: true,
            tableName: 'vaccines',
        }
    );
};