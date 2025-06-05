const getPetsHandler = (req, res) => {
    res.status(200).send('List of pets');
};
const getPetByIdHandler = (req, res) => {
    const petId = req.params.id;
    res.status(200).send(`Details of pet with ID: ${petId}`);
};
const createPetHandler = (req, res) => {
    res.status(201).send('Pet created successfully');
};

module.exports = {
    getPetsHandler,
    getPetByIdHandler,
    createPetHandler
};