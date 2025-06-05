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

// Establece las relaciones entre los modelos (Owner tiene muchas Pets)
const { Pets, Owners } = sequelize.models;
Owners.hasMany(Pets, { foreignKey: 'ownerId' });
Pets.belongsTo(Owners, { foreignKey: 'ownerId' });

// Exporta los modelos y la conexión para ser usados en otras partes de la aplicación
module.exports = {
    ...sequelize.models,
    conn: sequelize
}