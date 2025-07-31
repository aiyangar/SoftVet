const { getSwaggerSpecs } = require('../controllers/swaggerController');

/**
 * Handler para obtener la especificación JSON de Swagger
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 */
const getSwaggerJsonHandler = (req, res) => {
    try {
        const specs = getSwaggerSpecs();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(specs);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener la especificación de Swagger',
            details: error.message 
        });
    }
};

module.exports = {
    getSwaggerJsonHandler
};
