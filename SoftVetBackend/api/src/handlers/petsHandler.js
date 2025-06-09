const {
    getAllPets,
    getPetById,
    createPetDB
} = require('../controllers/petsController');

const getPetsHandler = async (req, res) => {
    try {
        const pets = await getAllPets();
        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

const getPetByIdHandler = async (req, res) => {
    const petId = req.params.id;
    try {
        const response = await getPetById(petId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const createPetHandler = async (req, res) => {
    try {
        const response = await createPetDB(req.body);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {
    getPetsHandler,
    getPetByIdHandler,
    createPetHandler
};