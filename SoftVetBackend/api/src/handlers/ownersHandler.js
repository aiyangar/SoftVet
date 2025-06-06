// Importa las funciones del controlador de dueños y el operador Op de Sequelize
const {
    getAllOwners,
    getOwnerByID,
    createOwnerDB
} = require('../controllers/ownersController')
const { Op } = require('sequelize');

// Handler para obtener dueños con filtros OR (name, phone, email) y búsquedas insensibles a mayúsculas/minúsculas
const getOwnersHandler = async (req, res) => {
    const { name, phone, email } = req.query;
    try {
        // Construye dinámicamente el array de condiciones para un OR
        const orFilters = [];
        if (name) orFilters.push({ name: { [Op.iLike]: `%${name}%` } });
        if (phone) orFilters.push({ phone: { [Op.iLike]: `%${phone}%` } });
        if (email) orFilters.push({ email: { [Op.iLike]: `%${email}%` } });

        // Si hay filtros, aplica OR; si no, trae todos los dueños
        const where = orFilters.length ? { [Op.or]: orFilters } : undefined;
        const response = await getAllOwners(where ? { where } : {});

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Handler para obtener un dueño por su ID
const getOwnerByIdHandler = async (req, res) => {
    const ownerId = req.params.id;
    try {
        const response = await getOwnerByID(ownerId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

// Handler para crear un nuevo dueño
const createOwnerHandler = async (req, res) => {
    const {name, phone, email} = req.body;
    try {
        const response = await createOwnerDB(name, email, phone);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

// Exporta los handlers para ser usados en las rutas
module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler
};