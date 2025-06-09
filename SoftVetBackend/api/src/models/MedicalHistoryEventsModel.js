const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Se define el modelo con el nombre 'MedicalHistoryEvent'
  // Representa un único evento médico significativo del pasado.
    sequelize.define(
        'MedicalHistoryEvent',{
            // HistorialID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // TipoEvento (Enum)
            eventType: {
                type: DataTypes.ENUM(
                    'Illness',
                    'Surgery',
                    'Trauma',
                    'Known Allergy',
                    'Adverse Reaction'
                ),
                allowNull: false,
            },
            // DescripcionEvento (Texto Largo)
            eventDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // FechaAproximada (Texto)
            approximateDate: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'Stores flexible date formats like "Summer 2023" or "2022".',
            },
            // DetallesTratamientoResultado (Texto Largo, Nulable)
            treatmentAndOutcome: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // La clave foránea 'pet_id' se crea automáticamente
            // al definir la asociación Pet.hasMany(MedicalHistoryEvent)
        },{
            // Opciones del modelo
            timestamps: true, // Útil para saber cuándo se añadió este registro histórico
            underscored: true,
            tableName: 'medical_history_events',
        }
    );
};