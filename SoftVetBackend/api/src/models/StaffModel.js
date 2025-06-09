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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Status of the employee
            status: {
                type: DataTypes.ENUM('Active', 'Inactive', 'On Leave'),
                allowNull: false,
                defaultValue: 'Active',
            },
        },{
            // Model options
            timestamps: true, // Tracks when a staff member is added or updated
            underscored: true,
            tableName: 'staff',
        }
    );
};