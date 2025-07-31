const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../config/swagger');
const { getSwaggerJsonHandler } = require('../handlers/swaggerHandler');

const swaggerRouter = Router();

// Configuración de Swagger UI
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'SoftVet API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestHeaders: true,
        showCommonExtensions: true
    }
}));

// Ruta para obtener la especificación JSON de Swagger
swaggerRouter.get('/json', getSwaggerJsonHandler);

module.exports = swaggerRouter;
