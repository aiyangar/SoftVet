const { Router } = require('express');
const ownersRouter = Router();
const {
    getOwnersHandler, 
    getOwnerByIdHandler, 
    createOwnerHandler
} = require('../handlers/ownersHandler');

ownersRouter.get('/', getOwnersHandler);
ownersRouter.get('/:id', getOwnerByIdHandler);
ownersRouter.post('/', createOwnerHandler);

module.exports = ownersRouter;