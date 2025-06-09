// Importa las dependencias necesarias
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Define la ruta donde se encuentran los modelos
const modelsDir = path.join(__dirname, 'models');

// Extrae las variables de entorno para la conexión a la base de datos
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

// Inicializa la instancia de Sequelize para conectarse a PostgreSQL
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);

// Carga automáticamente todos los modelos definidos en la carpeta 'models'
fs.readdirSync(modelsDir)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const modelDefiner = require(path.join(modelsDir, file));
        modelDefiner(sequelize);
    });

// Extrae todos los modelos definidos en Sequelize
const {
    Owner,
    Pet,
    Visit,
    Staff,
    Species,
    Breed,
    Origin,
    Environment,
    ActivityLevel,
    MedicalHistoryEvent,
    VisitDiagnosis,
    VisitTreatment,
    DiagnosticTest,
    Medication,
    Procedure,
    TestType,
    Appointment,
    AdministeredVaccine,
    Vaccine,
    AdministeredDewormer,
    DewormingProduct
} = sequelize.models;

// 1. Relaciones fundamentales entre los modelos
Owner.hasMany(Pet);
Pet.belongsTo(Owner);

Pet.hasMany(Visit);
Visit.belongsTo(Pet);

Staff.hasMany(Visit, { as: 'consultations', foreignKey: 'veterinarianId' });
Visit.belongsTo(Staff, { as: 'veterinarian', foreignKey: 'veterinarianId' });

// 2. Relaciones de catálogos con mascota
Species.hasMany(Breed);
Breed.belongsTo(Species);

Pet.belongsTo(Species);
Pet.belongsTo(Breed);
Pet.belongsTo(Origin);
Pet.belongsTo(Environment);
Pet.belongsTo(ActivityLevel);

// 3. Relaciones de historial médico
Pet.hasMany(MedicalHistoryEvent);
MedicalHistoryEvent.belongsTo(Pet);

// 4. Relaciones de visitas con sus detalles
Visit.hasMany(VisitDiagnosis);
VisitDiagnosis.belongsTo(Visit);

Visit.hasMany(VisitTreatment);
VisitTreatment.belongsTo(Visit);

Visit.hasMany(DiagnosticTest);
DiagnosticTest.belongsTo(Visit);

// 5. Relaciones de detalles de visita con sus catálogos
VisitTreatment.belongsTo(Medication, { foreignKey: { allowNull: true} });
VisitTreatment.belongsTo(Procedure, { foreignKey: { allowNull: true} });
VisitDiagnosis.belongsTo(TestType);

// 6. Relaciones de vacunación y desparasitación
Pet.hasMany(AdministeredVaccine);
AdministeredVaccine.belongsTo(Pet);
Vaccine.hasMany(AdministeredVaccine);
AdministeredVaccine.belongsTo(Vaccine);
AdministeredVaccine.belongsTo(Visit, { foreignKey: { allowNull: true } });

Pet.hasMany(AdministeredDewormer);
AdministeredDewormer.belongsTo(Pet);
DewormingProduct.hasMany(AdministeredDewormer);
AdministeredDewormer.belongsTo(DewormingProduct, {as: 'product'});
AdministeredDewormer.belongsTo(Visit, { foreignKey: { allowNull: true } });

// 7. Relaciones de citas
Appointment.belongsTo(Pet);
Pet.hasMany(Appointment);

Appointment.belongsTo(Staff);
Staff.hasMany(Appointment);

Appointment.belongsTo(Visit, { foreignKey: { allowNull: true } });

// Exporta los modelos y la conexión para ser usados en otras partes de la aplicación
module.exports = {
    ...sequelize.models,
    conn: sequelize
}