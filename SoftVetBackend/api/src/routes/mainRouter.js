const { Router } = require('express');
const ownersRouter = require('./ownersRouter');
const petsRouter = require('./petsRouter');
const staffRouter = require('./staffRouter');
const mainRouter = Router();

mainRouter.use('/owners', ownersRouter);
mainRouter.use('/pets', petsRouter);
mainRouter.use('/staff', staffRouter);

module.exports = mainRouter;