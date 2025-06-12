// Importa las funciones del controlador de mascotas y el operador Op de Sequelize
const {
    getAllPets,
    getPetById,
    createPetDB,
    createPetsBulk
} = require('../controllers/petsController');
const { Op } = require('sequelize');

// Handler para obtener mascotas con filtros OR (name, type, breed) y búsquedas insensibles a mayúsculas/minúsculas
const getPetsHandler = async (req, res) => {
    try {
        const orFilters = [];
        for (const [key, value] of Object.entries(req.query)) {
            orFilters.push({ [key]: { [Op.iLike]: `%${value}%` } });
        }
        const where = orFilters.length ? { [Op.or]: orFilters } : undefined;
        const response = await getAllPets();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

// Handler para obtener una mascota por su ID
const getPetByIdHandler = async (req, res) => {
    const petId = req.params.id;
    try {
        const response = await getPetById(petId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

// Handler para crear una nueva mascota
const createPetHandler = async (req, res) => {
    try {
        const response = await createPetDB(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

// Handler para crear varias mascotas (bulk)
const createPetsBulkHandler = async (req, res) => {
    try {
        const response = await createPetsBulk(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Exporta los handlers para ser usados en las rutas
module.exports = {
    getPetsHandler,
    getPetByIdHandler,
    createPetHandler,
    createPetsBulkHandler
};