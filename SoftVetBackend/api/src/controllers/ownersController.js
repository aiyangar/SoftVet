// Importa el modelo Owners desde la base de datos
const { Owner } = require('../database');
const { 
    validatePerson, 
    validateIfExists 
} = require('../validators/validateDB');

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
    //validar que los datos sean válidos usando validatePerson
    if (validatePerson(ownerData) !== true) {
        throw new Error(validatePerson(ownerData));
    }
    return await Owner.create(ownerData);
}

// Crea varios dueños en la base de datos (bulk create)
const createOwnersBulk = async (ownersData) => {
    //validar que los datos sean válidos usando validatePerson
    for (const owner of ownersData) {
        if (validatePerson(owner) !== true) {
            throw new Error(validatePerson(owner));
        }
    }
    return await Owner.bulkCreate(ownersData);
} 

// Actualiza un dueño existente en la base de datos
const updateOwnerDB = async (id, ownerData) => {
    //validar que el dueño exista
    const owner = await validateIfExists(Owner, id);
    return await owner.update(ownerData);
}

// Elimina un dueño de la base de datos
const deleteOwnerDB = async (id) => {
    //validar que el dueño exista
    const owner = await validateIfExists(Owner, id);

    // destruir el dueño si éste existe y enviar un mensaje de éxito
    await owner.destroy();
    return { message: 'Dueño eliminado correctamente' };
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