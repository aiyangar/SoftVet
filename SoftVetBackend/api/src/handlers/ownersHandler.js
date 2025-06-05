const {
    getOwnerByID,
    createOwnerDB
} = require('../controllers/ownersController')

const getOwnersHandler = (req, res) => {
    res.status(200).send('List of owners');
};

const getOwnerByIdHandler = async (req, res) => {
    const ownerId = req.params.id;

    try {
        const response = await getOwnerByID(ownerId);
        res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const createOwnerHandler = async (req, res) => {
    const {name, phone, email} = req.body;
    
    try {
        const response = await createOwnerDB(name, email, phone);
        res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message});
        
    }
    
};

module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler
};