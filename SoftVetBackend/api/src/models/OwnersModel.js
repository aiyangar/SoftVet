const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Define the model with the name 'Owner' (singular)
    // Sequelize will automatically create the table 'owners' (plural)
    sequelize.define(
        'Owner',{
            // Owner ID (PK, UUID)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // Name (Text)
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Last Name (Text)
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Full Address (Text)
            address: {
                type: DataTypes.STRING,
                allowNull: true, // Assuming it can be null
            },
            // City (Text)
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // State/Province (Text)
            state: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Postal Code (Text)
            postalCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Primary Phone (Text)
            primaryPhone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Secondary Phone (Text, Nullable)
            secondaryPhone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Email (Text, Unique)
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true, // Model-level validation
                },
            },
            // Additional Notes (Long Text, Nullable)
            additionalNotes: {
                type: DataTypes.TEXT, // Using TEXT for long strings
                allowNull: true,
            },
            // Status (Enum: Active, Inactive)
            status: {
                type: DataTypes.ENUM('Active', 'Inactive'),
                allowNull: false,
                defaultValue: 'Active',
            },
        },{
            // Model options
            // This enables `createdAt` and `updatedAt` fields.
            // `createdAt` will serve as the registration date.
            timestamps: true,

            // This option automatically converts camelCase model fields
            // to snake_case column names in the database.
            // e.g., 'firstName' in the model becomes 'first_name' in the DB table.
            underscored: true,

            // Explicitly set the table name
            tableName: 'owners',
        }
    );
};