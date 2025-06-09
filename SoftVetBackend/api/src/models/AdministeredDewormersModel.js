const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'AdministeredDewormer' to log a deworming product application.
    sequelize.define(
        'AdministeredDewormer',{
            // DesparasitacionAplicadaID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // TipoDesparasitacion (Enum)
            dewormingType: {
                type: DataTypes.ENUM('Internal', 'External', 'Heartworm'),
                allowNull: false,
            },
            // FechaAplicacion (Fecha)
            applicationDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            // FechaProximaDosis (Fecha, Nulable)
            nextDueDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // Notas (Texto, Nulable)
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Foreign keys 'pet_id' and 'product_id' are created
            // automatically when associations are defined.
        },{
            // Model options
            timestamps: true, // Useful to know when the record was entered
            underscored: true,
            tableName: 'administered_dewormers',
        }
    );
};