// Importa el modelo Owners desde la base de datos
const { Owner } = require('../database');
const { validatePerson } = require('../validators/validateDB');

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

    if (validatePerson(ownerData) !== true) {
        throw new Error(validatePerson(ownerData));
    }
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

    // Generar un RegExp para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const owner of ownersData) {
        if (owner.email && !emailRegex.test(owner.email)) {
            errors.push(new Error(`El correo electrónico ${owner.email} no es válido`));
        }
    }

    // Validar que el número de teléfono sea un número válido
    const phoneRegex = /^\d{10,15}$/; // Ajusta el regex según tus necesidades
    for (const owner of ownersData) {
        if (owner.primaryPhone && !phoneRegex.test(owner.primaryPhone)) {
            errors.push(new Error(`El número de teléfono ${owner.primaryPhone} no es válido`));
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

//comentario chido importante

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