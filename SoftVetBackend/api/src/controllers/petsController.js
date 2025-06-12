const { Pet } = require('../database');

const getAllPets = async (options = {}) => {
    return await Pet.findAll(options);
}

const getPetById = async (id) => {
    return await Pet.findByPk(id);
}

const createPetDB = async (petData) => {
    return await Pet.create(petData);
}

const createPetsBulk = async (petsData) => {
    return await Pet.bulkCreate(petsData);
}

module.exports = {
    getAllPets,
    getPetById,
    createPetDB,
    createPetsBulk
}