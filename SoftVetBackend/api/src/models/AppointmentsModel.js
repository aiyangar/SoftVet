const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // Defines the model 'Appointment' for scheduling future visits.
    sequelize.define(
        'Appointment',{
            // CitaID (PK)
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            // The scheduled date and time for the appointment
            appointmentDateTime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            // Reason for the appointment, e.g., 'Annual Checkup', 'Vaccination'
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Status of the appointment
            status: {
                type: DataTypes.ENUM(
                    'Scheduled',
                    'Confirmed',
                    'Cancelled',
                    'Completed',
                    'No Show'
                ),
                allowNull: false,
                defaultValue: 'Scheduled',
            },
            // Any additional notes from the owner or staff regarding the appointment
            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            // Foreign keys: 'pet_id' and 'staff_id' are created via associations.
            // A 'visit_id' could also be added to link an appointment to the actual
            // visit record once it occurs.
        },{
            // Model options
            timestamps: true,
            underscored: true,
            tableName: 'appointments',
        }
    );
};