// Importa las funciones del controlador de empleados y el operador Op de Sequelize
const {
    getAllStaff,
    getStaffById,
    createStaffDB,
    createStaffBulk
} = require('../controllers/staffController');
const { Op } = require('sequelize');

// Handler para obtener todos los empleados con filtros OR (name, phone, email) y búsquedas insensibles a mayúsculas/minúsculas
const getStaffHandler = async (req, res) => {
    try {
        const orFilters = [];
        for (const [key, value] of Object.entries(req.query)) {
            orFilters.push({ [key]: { [Op.iLike]: `%${value}%` } });
        }
        const where = orFilters.length ? { [Op.or]: orFilters } : undefined;
        const response = await getAllStaff(where ? { where } : {});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Handler para obtener un empleado por su ID
const getStaffByIdHandler = async (req, res) => {
    const staffId = req.params.id;
    try {
        const response = await getStaffById(staffId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};  

// Handler para crear un nuevo empleado
const createStaffHandler = async (req, res) => {
    try {
        // Verificar que se proporcionaron datos
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron datos para crear el empleado' });
        }
        
        const response = await createStaffDB(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Handler para crear varios empleados (bulk)
const createStaffBulkHandler = async (req, res) => {
    try {
        // Verificar que se proporcionaron datos
        if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({ error: 'Se requiere un array con datos de empleados para crear múltiples registros' });
        }
        
        const response = await createStaffBulk(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Exporta los handlers para ser usados en las rutas
module.exports = {
    getStaffHandler,
    getStaffByIdHandler,
    createStaffHandler,
    createStaffBulkHandler
};