const swaggerSpecs = require('../config/swagger');

/**
 * Obtiene la especificación JSON de Swagger
 * @returns {Object} La especificación de Swagger
 */
const getSwaggerSpecs = () => {
    return swaggerSpecs;
};

module.exports = {
    getSwaggerSpecs
};
