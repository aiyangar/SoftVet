const { Pet } = require('../database');

const getPetById = async (id) => {
    return await Pet.findByPk(id);
}

const createPetDB = async (petData) => {
    return await Pet.create(petData);
}

const getAllPets = async (options = {}) => {
    return await Pet.findAll(options);
}

module.exports = {
    getAllPets,
    getPetById,
    createPetDB,
}