// Importa las funciones del controlador de dueños y el operador Op de Sequelize
const {
    getAllOwners,
    getOwnerByID,
    createOwnerDB,
    createOwnersBulk
} = require('../controllers/ownersController')
const { Op } = require('sequelize');

// Handler para obtener dueños con filtros OR (name, phone, email) y búsquedas insensibles a mayúsculas/minúsculas
const getOwnersHandler = async (req, res) => {
    try {
        const orFilters = [];
        for (const [key, value] of Object.entries(req.query)) {
            orFilters.push({ [key]: { [Op.iLike]: `%${value}%` } });
        }
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
    try {
        const response = await createOwnerDB(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

// Handler para crear varios dueños (bulk)
const createOwnersBulkHandler = async (req, res) => {
    try {
        const response = await createOwnersBulk(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Exporta los handlers para ser usados en las rutas
module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler,
    createOwnersBulkHandler
};