const { Router } = require('express');
const petsRouter = Router();
const {
    getPetsHandler, 
    getPetByIdHandler, 
    createPetHandler,
    createPetsBulkHandler
} = require('../handlers/petsHandler');

petsRouter.get('/', getPetsHandler);
petsRouter.get('/:id', getPetByIdHandler);
petsRouter.post('/', createPetHandler);
petsRouter.post('/bulk', createPetsBulkHandler);

module.exports = petsRouter;