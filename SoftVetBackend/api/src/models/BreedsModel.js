const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Breed',{
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // La columna 'species_id' (FK) se crea automáticamente
            // al definir la asociación Pet.belongsTo(Species)
        },{
            timestamps: false,
            underscored: true,
            tableName: 'breeds',
            // Se añade un índice para asegurar que el nombre de la raza sea único POR ESPECIE
            indexes: [
                {
                unique: true,
                fields: ['species_id', 'name'],
                },
            ],
        }
    );
};