const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Define el modelo 'Medication' como un catálogo para los medicamentos disponibles.
    sequelize.define(
        'Medication',{
            // MedicamentoID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // NombreMedicamento
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            // PrincipioActivo
            activeIngredient: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Concentracion
            concentration: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // FormaFarmaceutica
            pharmaceuticalForm: {
                type: DataTypes.ENUM(
                    'Tablet',
                    'Capsule',
                    'Injectable Solution',
                    'Oral Suspension',
                    'Topical Cream',
                    'Ointment',
                    'Other'
                ),
                allowNull: true,
            },
        },{
            // Opciones del modelo
            timestamps: false,
            underscored: true,
            tableName: 'medications',
        }
    );
};