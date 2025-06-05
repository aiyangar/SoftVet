const {Sequelize} = require('sequelize');
require('dotenv').config();

const OwnersModel = require('./models/OwnersModel');
const PetsModel = require('./models/PetsModel');

const { 
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST,
    DB_PORT, 
    DB_NAME } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {logging: false}
)

OwnersModel(sequelize);
PetsModel(sequelize);

module.exports = {
    conn: sequelize
}