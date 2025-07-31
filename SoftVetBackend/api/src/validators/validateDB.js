const validatePerson = (ownerData) => {
    const errors = {}
    
    if (!ownerData) {
        return 'Errores de validación: No se proporcionaron datos de dueño';
    }
    
    // Validar campos obligatorios (incluyendo strings vacíos y espacios en blanco)
    if (!ownerData.firstName || ownerData.firstName.trim() === '') {
        errors.firstName = 'El nombre es obligatorio';
    }
    if (!ownerData.lastName || ownerData.lastName.trim() === '') {
        errors.lastName = 'El apellido es obligatorio';
    }
    if (!ownerData.primaryPhone || ownerData.primaryPhone.trim() === '') {
        errors.primaryPhone = 'El teléfono es obligatorio';
    }
    if (!ownerData.email || ownerData.email.trim() === '') {
        errors.email = 'El correo electrónico es obligatorio';
    }
    
    // Validar formato de email solo si existe y no está vacío
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (ownerData.email && ownerData.email.trim() !== '' && !emailRegex.test(ownerData.email)) {
        errors.email = `El correo electrónico ${ownerData.email} no es válido`;
    } 
    
    // Validar formato de teléfono solo si existe y no está vacío
    const phoneRegex = /^\d{10,15}$/;
    if (ownerData.primaryPhone && ownerData.primaryPhone.trim() !== '' && !phoneRegex.test(ownerData.primaryPhone)) {
        errors.primaryPhone = `El teléfono ${ownerData.primaryPhone} no es válido`;
    }
    
    if (Object.keys(errors).length > 0) {
        return 'Errores de validación: ' + Object.values(errors).join(', ');
    }
    return true;
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