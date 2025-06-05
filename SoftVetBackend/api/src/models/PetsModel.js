const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Pets', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            species: {
                type: DataTypes.STRING,
                allowNull: false
            },
            breed: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ownerId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Owners',
                    key: 'id'
                }
            }
        },
        {timestamps: false}
    );
}