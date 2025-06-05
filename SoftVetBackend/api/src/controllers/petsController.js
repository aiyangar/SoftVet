const { Pets } = require('../database');

const createPetDB = async (name, species, breed, age, ownerId) => {
    return await Pets.create({name, species, breed, age, ownerId});
}

module.exports = {
    createPetDB,
}