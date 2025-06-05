const getOwnersHandler = (req, res) => {
    res.status(200).send('List of owners');
};
const getOwnerByIdHandler = (req, res) => {
    const ownerId = req.params.id;
    res.status(200).send(`Details of owner with ID: ${ownerId}`);
};
const createOwnerHandler = (req, res) => {
    res.status(201).send('Owner created successfully');
};

module.exports = {
    getOwnersHandler,
    getOwnerByIdHandler,
    createOwnerHandler
};