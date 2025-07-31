const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'Staff' to manage clinic personnel.
    sequelize.define(
        'Staff',{
            // PersonalID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
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
            // Status of the employee
            status: {
                type: DataTypes.ENUM('Active', 'Inactive', 'On Leave'),
                allowNull: false,
                defaultValue: 'Active',
            },
            // Role within the clinic (e.g., Veterinarian, Technician, Receptionist)
            role: {
                type: DataTypes.ENUM(
                    'Veterinarian',
                    'Technician',
                    'Receptionist',
                    'Admin'
                ),
                allowNull: false,
            },
            // Professional license number, e.g., for veterinarians
            licenseNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
        },{
            // Model options
            timestamps: true, // Tracks when a staff member is added or updated
            underscored: true,
            tableName: 'staff',
        }
    );
};