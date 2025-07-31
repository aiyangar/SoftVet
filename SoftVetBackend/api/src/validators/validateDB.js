const validatePerson = (ownerData) => {
    const errors = {}
    
    if (!ownerData) {
        errors.ownerData = 'No se proporcionaron datos de dueño';
    }
    if (!ownerData.firstName || !ownerData.lastName || !ownerData.primaryPhone || !ownerData.email) {
        if (!ownerData.firstName) {
            errors.firstName = 'El nombre es obligatorio';
        }
        if (!ownerData.lastName) {
            errors.lastName = 'El apellido es obligatorio';
        }
        if (!ownerData.primaryPhone) {
            errors.primaryPhone = 'El teléfono es obligatorio';
        }
        if (!ownerData.email) {
            errors.email = 'El correo electrónico es obligatorio';
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (ownerData.email && !emailRegex.test(ownerData.email)) {
        errors.email = `El correo electrónico ${ownerData.email} no es válido`;
    } 
    const phoneRegex = /^\d{10,15}$/;
    if (ownerData.primaryPhone && !phoneRegex.test(ownerData.primaryPhone)) {
        errors.primaryPhone = `El teléfono ${ownerData.primaryPhone} no es válido`;
    }
    if (Object.keys(errors).length > 0) {
        throw new Error('Errores de validación: ' + Object.values(errors).join(', '));
    }
    return errors || true;
}

const validateIfExists = async (model, id) => {
    const exists = await model.findByPk(id);
    if (!exists) {
        throw new Error(`${model.name} no encontrado`);
    }
    return exists;
}

module.exports = {
    validatePerson,
    validateIfExists
}