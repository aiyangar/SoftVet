// Importa el modelo Staff desde la base de datos
const { Staff } = require('../database');
const { validatePerson } = require('../validators/validateDB');

// Obtiene todos los empleados, permitiendo pasar opciones de filtrado
const getAllStaff = async (options = {}) => {
    return await Staff.findAll(options);
};

// Obtiene un empleado por su ID primario
const getStaffById = async (id) => {
    return await Staff.findByPk(id);
};

// Crea un nuevo empleado en la base de datos
const createStaffDB = async (staffData) => {
    //validar que los datos sean válidos usando validatePerson
    if (validatePerson(staffData) !== true) {
        throw new Error(validatePerson(staffData));
    }
    return await Staff.create(staffData);
};

// Crea varios empleados en la base de datos (bulk create)
const createStaffBulk = async (staffData) => {
    //validar que los datos sean válidos usando validatePerson
    for (const staff of staffData) {
        if (validatePerson(staff) !== true) {
            throw new Error(validatePerson(staff));
        }
    }
    return await Staff.bulkCreate(staffData);
};

// Actualiza un empleado existente en la base de datos
const updateStaffDB = async (id, staffData) => {
    // validar que el empleado exista
    const staff = await validateIfExists(Staff, id);

    // actualizar los datos del empleado si éste existe
    return await staff.update(staffData);
};

// Elimina un empleado de la base de datos
const deleteStaffDB = async (id) => {
    // validar que el empleado exista
    const staff = await validateIfExists(Staff, id);

    // destruir el empleado si éste existe y enviar un mensaje de éxito
    await staff.destroy();
    return { message: 'Empleado eliminado correctamente' };
};

// Exporta las funciones del controlador para ser usadas en los handlers
module.exports = {
    getAllStaff,
    getStaffById,
    createStaffDB,
    createStaffBulk,
    updateStaffDB,
    deleteStaffDB
};