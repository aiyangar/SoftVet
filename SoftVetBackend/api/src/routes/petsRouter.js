const { Router } = require('express');
const petsRouter = Router();
const {
    getPetsHandler, 
    getPetByIdHandler, 
    createPetHandler
} = require('../handlers/petsHandler');

petsRouter.get('/', getPetsHandler);
petsRouter.get('/:id', getPetByIdHandler);
petsRouter.post('/', createPetHandler);

module.exports = petsRouter;