const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Define el modelo 'Procedure' como un catálogo para los procedimientos ofrecidos.
    sequelize.define(
        'Procedure',{
            // ProcedimientoID (PK)
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // NombreProcedimiento
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            // TipoProcedimiento (Enum)
            procedureType: {
                type: DataTypes.ENUM('Diagnostic', 'Surgical', 'Therapeutic'),
                allowNull: false,
            },
        },{
            // Opciones del modelo
            timestamps: false,
            underscored: true,
            tableName: 'procedures',
        }
    );
};