// Importa las dependencias principales
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/mainRouter');

// Inicializa la aplicación de Express
const app = express();

// Middleware para mostrar logs de las peticiones HTTP en consola
app.use(morgan('dev'));

// Middleware para configurar los encabezados CORS y permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Usa el enrutador principal para manejar las rutas de la API
app.use(mainRouter);

// Exporta la aplicación para ser utilizada en otros archivos (por ejemplo, server.js)
module.exports = app;