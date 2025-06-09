const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Se define el modelo 'AdministeredVaccine' para registrar una vacuna aplicada.
    sequelize.define(
        'AdministeredVaccine',{
            // VacunacionAplicadaID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // FechaAplicacion (Fecha)
            applicationDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            // NumeroLote (Texto, Nulable)
            lotNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // FechaCaducidadLote (Fecha, Nulable)
            lotExpirationDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // SitioAplicacion (Texto, Nulable)
            applicationSite: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // FechaProximaDosis (Fecha, Nulable)
            nextDueDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // Notas (Texto, Nulable)
            notes: {
                type: DataTypes.TEXT, // TEXT para notas potencialmente más largas
                allowNull: true,
            },

            // Las claves foráneas se definen a través de las asociaciones:
            // visitId (nulable), petId y vaccineId.
        },{
            // Opciones del modelo
            timestamps: true, // Útil para saber cuándo se ingresó el registro
            underscored: true,
            tableName: 'administered_vaccines',
        }
    );
};