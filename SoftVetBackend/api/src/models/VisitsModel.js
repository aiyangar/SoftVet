const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Se define el modelo con el nombre 'Visit' (singular)
    sequelize.define(
        'Visit',{
            // VisitID (PK, UUID)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // FechaHoraVisita (Fecha/Hora)
            visitDateTime: {
                type: DataTypes.DATE, // DATE incluye fecha y hora
                allowNull: false,
            },
            // MotivoConsulta (Texto Largo)
            reasonForVisit: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // AnamnesisReciente (Texto Largo)
            recentHistory: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // PesoKg (Decimal)
            weightInKg: {
                type: DataTypes.DECIMAL(5, 2), // Precisión de 5 dígitos, 2 de ellos decimales (ej. 123.45)
                allowNull: true,
            },
            // TemperaturaC (Decimal, Nulable)
            temperatureInC: {
                type: DataTypes.DECIMAL(4, 2), // Precisión de 4 dígitos, 2 de ellos decimales (ej. 38.50)
                allowNull: true,
            },
            // FrecuenciaCardiaca (Entero, Nulable)
            heartRate: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            // FrecuenciaRespiratoria (Entero, Nulable)
            respiratoryRate: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            // NotasExamenFisico (Texto Largo - Hallazgos sistemáticos)
            physicalExamNotes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            // Las claves foráneas se definen mediante asociaciones:
            // petId se crea con Pet.hasMany(Visit) y Visit.belongsTo(Pet)
            // visitTypeId se crea con VisitType.hasMany(Visit) y Visit.belongsTo(VisitType)
            // vetId (o staffId) se crea con Staff.hasMany(Visit) y Visit.belongsTo(Staff)
        },{
            // Opciones del modelo
            timestamps: true, // Habilita createdAt y updatedAt
            underscored: true, // Convierte camelCase a snake_case en la BD
            tableName: 'visits', // Nombre explícito de la tabla
        }
    );
};