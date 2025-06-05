const {createOwnerDB} = require('../controllers/ownersController')

const getOwnersHandler = (req, res) => {
    res.status(200).send('List of owners');
};
const getOwnerByIdHandler = (req, res) => {
    const ownerId = req.params.id;
    res.status(200).send(`Details of owner with ID: ${ownerId}`);
};
const createOwnerHandler = async (req, res) => {
    const {name, phone, email} = req.body;
    
    try {
        const response = await createOwnerDB(name, email, phone);
        res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({error: error.message});
        
    }
    
};

module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler
};