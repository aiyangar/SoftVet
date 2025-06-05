const { Owners } = require('../database');

const getOwnerByID = async (id) => {
    return await Owners.findByPk(id);
}

const createOwnerDB = async (name, email, phone) => {
    return await Owners.create({name, email, phone});
}

module.exports = {
    getOwnerByID,
    createOwnerDB,
}