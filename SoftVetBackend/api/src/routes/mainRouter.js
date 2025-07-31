const { Router } = require('express');
const swaggerRouter = require('./swaggerRouter');
const ownersRouter = require('./ownersRouter');
const petsRouter = require('./petsRouter');
const staffRouter = require('./staffRouter');
const mainRouter = Router();

// Rutas de Swagger
mainRouter.use('/api-docs', swaggerRouter);

// Rutas de la API
mainRouter.use('/owners', ownersRouter);
mainRouter.use('/pets', petsRouter);
mainRouter.use('/staff', staffRouter);

module.exports = mainRouter;