const { Owners } = require('../database');

const createOwnerDB = async (name, email, phone) => {
    return await Owners.create({name, email, phone});
}

module.exports = {
    createOwnerDB,
}