// Configuración global para los tests
const { Sequelize } = require('sequelize');

// Configurar variables de entorno para testing
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'softvet_test';

// Configuración global de Jest
global.console = {
    ...console,
    // Silenciar logs durante los tests
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

// Configurar timeout para tests
jest.setTimeout(30000); 