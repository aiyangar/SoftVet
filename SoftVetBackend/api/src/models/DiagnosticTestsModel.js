const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'DiagnosticTest' to log a test ordered/performed.
    sequelize.define(
        'DiagnosticTest',{
            // PruebaID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // FechaSolicitud (Fecha)
            requestDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            // FechaResultado (Fecha, Nulable)
            resultDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // ResultadosResumen (Texto Largo)
            resultsSummary: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // RutaArchivoResultado (Texto, Nulable)
            resultFileUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isUrl: true, // Validates that the input is a URL
                },
            },
            // Notas (Texto Largo, Nulable)
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Foreign keys 'visit_id' and 'test_type_id' are created
            // automatically when associations are defined.
        },{
            // Model options
            timestamps: true, // Useful to know when the test record was entered
            underscored: true,
            tableName: 'diagnostic_tests',
        }
    );
};