const { Router } = require('express');
const ownersRouter = require('./ownersRouter');
const petsRouter = require('./petsRouter');
const mainRouter = Router();

mainRouter.use('/owners', ownersRouter);
mainRouter.use('/pets', petsRouter);

module.exports = mainRouter;