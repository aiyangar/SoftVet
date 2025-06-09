const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Se define el modelo con el nombre 'Pet' (singular)
    sequelize.define(
        'Pet',{
            // PetID (PK, UUID)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // Pet Name (Text)
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Sex (Enum)
            sex: {
                type: DataTypes.ENUM(
                    'Male',
                    'Female',
                    'Male Neutered',
                    'Female Spayed'
                ),
                allowNull: false,
            },
            // Date of Birth (Date only)
            dateOfBirth: {
                type: DataTypes.DATEONLY, // Usamos DATEONLY si no necesitamos la hora
                allowNull: false,
            },
            // Is Date of Birth Estimated (Boolean)
            isDobEstimated: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            // Color and Markings (Text)
            colorAndMarkings: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Microchip Number (Text, Nullable, Unique)
            microchipNumber: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },
            // Acquisition Date (Date only, Nullable)
            acquisitionDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // Diet Notes (Long Text, Nullable)
            dietNotes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // Photo URL (Text, Nullable)
            photoUrl: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                isUrl: true, // Buena práctica para validar que sea una URL
                },
            },
            // Status (Enum: Active, Deceased, Transferred)
            status: {
                type: DataTypes.ENUM('Active', 'Deceased', 'Transferred'),
                allowNull: false,
                defaultValue: 'Active',
            },
            // Date of Death (Date only, Nullable)
            dateOfDeath: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            // Cause of Death (Long Text, Nullable)
            causeOfDeath: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },{
            // Model options
            timestamps: true, // Habilita createdAt y updatedAt
            underscored: true, // Convierte camelCase a snake_case en la BD
            tableName: 'pets', // Nombre explícito de la tabla
        }
    );
};