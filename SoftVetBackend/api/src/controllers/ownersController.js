// Importa el modelo Owners desde la base de datos
const { Owner } = require('../database');

// Obtiene todos los dueños, permitiendo pasar opciones de filtrado
const getAllOwners = async (options = {}) => {
    return await Owner.findAll(options);
}

// Obtiene un dueño por su ID primario
const getOwnerByID = async (id) => {
    return await Owner.findByPk(id);
}

// Crea un nuevo dueño en la base de datos
const createOwnerDB = async (ownerData) => {
    return await Owner.create(ownerData);
}

// Exporta las funciones del controlador para ser usadas en los handlers
module.exports = {
    getAllOwners,
    getOwnerByID,
    createOwnerDB,
}