const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'VisitTreatment' to log treatments, prescriptions,
    // or procedures performed during a visit.
    sequelize.define(
        'VisitTreatment',{
            // TratamientoID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // DescripcionTratamiento (Texto)
            treatmentDescription: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'Free-text description of the treatment, e.g., Medication name or procedure type.',
            },
            // Dosis (Texto, Nulable)
            dosage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // ViaAdministracion (Texto, Nulable)
            route: {
                type: DataTypes.ENUM(
                    'Oral',
                    'Topical',
                    'SC', // Subcutaneous
                    'IM', // Intramuscular
                    'IV'  // Intravenous
                ),
                allowNull: true,
            },
            // Frecuencia (Texto, Nulable)
            frequency: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Duracion (Texto, Nulable)
            duration: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // CantidadDispensada (Texto, Nulable)
            quantityDispensed: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Instrucciones (Texto Largo, Nulable)
            instructions: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Foreign keys 'visit_id', 'medication_id', and 'procedure_id'
            // are created automatically via associations.
        },{
            // Model options
            timestamps: true,
            underscored: true,
            tableName: 'visit_treatments',
        }
    );
};