const {
    getPetById,
    createPetDB
} = require('../controllers/petsController');

const getPetsHandler = (req, res) => {
    return res.status(200).send('List of pets');
};

const getPetByIdHandler = (req, res) => {
    const petId = req.params.id;
    
    try {
        const response = getPetById(petId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const createPetHandler = (req, res) => {
    const {name, species, breed, age, ownerId} = req.body;

    try {
        const response = createPetDB(name, species, breed, age, ownerId);
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