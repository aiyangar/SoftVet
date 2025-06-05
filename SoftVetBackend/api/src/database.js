const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const modelsDir = path.join(__dirname, 'models');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false }
);

// Cargar todos los modelos automáticamente
fs.readdirSync(modelsDir)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        const modelDefiner = require(path.join(modelsDir, file));
        modelDefiner(sequelize);
    });

module.exports = {
    conn: sequelize
}