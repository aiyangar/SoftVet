const getOwnersHandler = (req, res) => {
    res.status(200).send('List of owners');
};
const getOwnerByIdHandler = (req, res) => {
    const ownerId = req.params.id;
    res.status(200).send(`Details of owner with ID: ${ownerId}`);
};
const createOwnerHandler = (req, res) => {
    const {name, phone, email} = req.body;
    
    res.status(201).send(`Owner created successfully with Name: ${name}, Phone: ${phone}, Email: ${email}`);
};

module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler
};