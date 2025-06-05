const {createPetDB} = require('../controllers/petsController');

const getPetsHandler = (req, res) => {
    res.status(200).send('List of pets');
};
const getPetByIdHandler = (req, res) => {
    const petId = req.params.id;
    res.status(200).send(`Details of pet with ID: ${petId}`);
};
const createPetHandler = (req, res) => {
    const {name, species, breed, age, ownerId} = req.body;

    try {
        const response = createPetDB(name, species, breed, age, ownerId);
        res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {
    getPetsHandler,
    getPetByIdHandler,
    createPetHandler
};