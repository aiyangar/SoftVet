// Importa el modelo Owners desde la base de datos
const { Owners } = require('../database');

// Obtiene todos los dueños, permitiendo pasar opciones de filtrado
const getAllOwners = async (options = {}) => {
    return await Owners.findAll(options);
}

// Obtiene un dueño por su ID primario
const getOwnerByID = async (id) => {
    return await Owners.findByPk(id);
}

// Crea un nuevo dueño en la base de datos
const createOwnerDB = async (name, email, phone) => {
    return await Owners.create({name, email, phone});
}

// Exporta las funciones del controlador para ser usadas en los handlers
module.exports = {
    getAllOwners,
    getOwnerByID,
    createOwnerDB,
}