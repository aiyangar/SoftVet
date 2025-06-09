const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'VisitDiagnosis' to log diagnoses made during a visit.
    sequelize.define(
        'VisitDiagnosis',{
            // DiagnosticoVisitaID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // DiagnosticoPresuntivo (Texto Largo, Nulable)
            presumptiveDiagnosis: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // DiagnosticoDefinitivo (Texto Largo, Nulable)
            definitiveDiagnosis: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // EsCronico (Booleano)
            isChronic: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            // NotasDiagnostico (Texto Largo, Nulable)
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Foreign keys 'visit_id' and 'diagnosis_code_id' are created
            // automatically when associations are defined.
        },{
            // Model options
            timestamps: true, // Useful to know when the diagnosis was recorded/updated
            underscored: true,
            tableName: 'visit_diagnoses',
        }
    );
};