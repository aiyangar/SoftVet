const { Router } = require('express');
const ownerRouter = require('./ownerRouter');
const petsRouter = require('./petsRouter');
const mainRouter = Router();

mainRouter.use('/owners', ownerRouter);
mainRouter.use('/pets', petsRouter);

module.exports = mainRouter;