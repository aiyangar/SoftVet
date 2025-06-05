const { Pets } = require('../database');

const getPetById = async (id) => {
    return await Pets.findByPk(id);
}

const createPetDB = async (name, species, breed, age, ownerId) => {
    return await Pets.create({name, species, breed, age, ownerId});
}

module.exports = {
    getPetById,
    createPetDB,
}