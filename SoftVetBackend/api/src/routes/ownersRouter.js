const { Router } = require('express');
const ownersRouter = Router();
const {
    getOwnersHandler, 
    getOwnerByIdHandler, 
    createOwnerHandler,
    createOwnersBulkHandler
} = require('../handlers/ownersHandler');

ownersRouter.get('/', getOwnersHandler);
ownersRouter.get('/:id', getOwnerByIdHandler);
ownersRouter.post('/', createOwnerHandler);
ownersRouter.post('/bulk', createOwnersBulkHandler);

module.exports = ownersRouter;