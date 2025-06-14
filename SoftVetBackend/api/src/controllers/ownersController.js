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

// Crea varios dueños en la base de datos (bulk create)
const createOwnersBulk = async (ownersData) => {
    const errors = [];

    if (ownersData.length === 0) {
        errors.push(new Error('No se proporcionaron datos de dueños'));
    }

    for (const owner of ownersData) {
        if (!owner.firstName || !owner.lastName || !owner.primaryPhone || !owner.email) {
            errors.push(new Error('Nombre completo, teléfono y correo electrónico son obligatorios'));
        }
    }
    
    if (errors.length > 0) {
        throw new Error('Errores de validación: ' + errors.map(e => e.message).join(', '));
    }
    return await Owner.bulkCreate(ownersData);
}

// Actualiza un dueño existente en la base de datos
const updateOwnerDB = async (id, ownerData) => {
    const owner = await getOwnerByID(id);
    if (!owner) {
        throw new Error('Propietario no encontrado');
    }
    return await owner.update(ownerData);
}

// Elimina un dueño de la base de datos
const deleteOwnerDB = async (id) => {
    const owner = await getOwnerByID(id);
    if (!owner) {
        throw new Error('Propietario no encontrado');
    }
    return await owner.destroy();
}

// Exporta las funciones del controlador para ser usadas en los handlers
module.exports = {
    getAllOwners,
    getOwnerByID,
    createOwnerDB,
    createOwnersBulk,
    updateOwnerDB,
    deleteOwnerDB
}