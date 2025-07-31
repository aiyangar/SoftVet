// Test para verificar que Swagger funciona correctamente
const request = require('supertest');
const app = require('../src/app');
const { getSwaggerJsonHandler } = require('../src/handlers/swaggerHandler');
const { getSwaggerSpecs } = require('../src/controllers/swaggerController');

describe('Tests de Swagger', () => {
    test('debería servir la interfaz de Swagger UI', async () => {
        const response = await request(app)
            .get('/api-docs')
            .expect(301); // Swagger UI redirige a /api-docs/

        // Seguir la redirección
        const redirectResponse = await request(app)
            .get('/api-docs/')
            .expect(200);

        // Verificar que la respuesta contiene elementos de Swagger UI
        expect(redirectResponse.text).toContain('swagger-ui');
        expect(redirectResponse.text).toContain('SoftVet API');
    });

    test('debería servir la especificación JSON de Swagger', async () => {
        const response = await request(app)
            .get('/api-docs.json')
            .expect(200)
            .expect('Content-Type', /json/);

        // Verificar que la especificación contiene elementos básicos
        expect(response.body).toBeDefined();
        expect(response.body.openapi).toBe('3.0.0');
        expect(response.body.info.title).toBe('SoftVet API');
        expect(response.body.info.version).toBe('1.0.0');
        expect(response.body.paths).toBeDefined();
        expect(response.body.components.schemas).toBeDefined();
    });

    test('debería servir la especificación JSON desde el nuevo endpoint', async () => {
        const response = await request(app)
            .get('/api-docs/json')
            .expect(200)
            .expect('Content-Type', /json/);

        // Verificar que la especificación contiene elementos básicos
        expect(response.body).toBeDefined();
        expect(response.body.openapi).toBe('3.0.0');
        expect(response.body.info.title).toBe('SoftVet API');
        expect(response.body.info.version).toBe('1.0.0');
        expect(response.body.paths).toBeDefined();
        expect(response.body.components.schemas).toBeDefined();
    });

    test('debería incluir esquemas de datos', () => {
        const specs = require('../src/config/swagger');
        
        // Verificar que los esquemas están definidos
        expect(specs.components.schemas.Owner).toBeDefined();
        expect(specs.components.schemas.Staff).toBeDefined();
        expect(specs.components.schemas.Pet).toBeDefined();
        expect(specs.components.schemas.Error).toBeDefined();
    });

    test('debería incluir endpoints documentados', () => {
        const specs = require('../src/config/swagger');
        
        // Verificar que los endpoints están documentados
        expect(specs.paths['/owners']).toBeDefined();
        expect(specs.paths['/owners/{id}']).toBeDefined();
        expect(specs.paths['/owners/bulk']).toBeDefined();
        expect(specs.paths['/staff']).toBeDefined();
        expect(specs.paths['/staff/{id}']).toBeDefined();
        expect(specs.paths['/staff/bulk']).toBeDefined();
        expect(specs.paths['/pets']).toBeDefined();
        expect(specs.paths['/pets/{id}']).toBeDefined();
        expect(specs.paths['/pets/bulk']).toBeDefined();
    });

    test('debería tener información de contacto', () => {
        const specs = require('../src/config/swagger');
        
        expect(specs.info.contact).toBeDefined();
        expect(specs.info.contact.name).toBe('SoftVet Team');
        expect(specs.info.contact.email).toBe('support@softvet.com');
    });

    test('debería tener servidores configurados', () => {
        const specs = require('../src/config/swagger');
        
        expect(specs.servers).toBeDefined();
        expect(specs.servers).toHaveLength(2);
        
        const developmentServer = specs.servers.find(s => s.description === 'Servidor de desarrollo');
        const productionServer = specs.servers.find(s => s.description === 'Servidor de producción');
        
        expect(developmentServer).toBeDefined();
        expect(developmentServer.url).toBe('http://localhost:3000');
        expect(productionServer).toBeDefined();
        expect(productionServer.url).toBe('https://api.softvet.com');
    });

    test('debería tener tags organizados', () => {
        const specs = require('../src/config/swagger');
        
        // Verificar que los endpoints están organizados por tags
        const ownersEndpoints = Object.values(specs.paths).filter(path => 
            path.get?.tags?.includes('Owners') || 
            path.post?.tags?.includes('Owners')
        );
        
        const staffEndpoints = Object.values(specs.paths).filter(path => 
            path.get?.tags?.includes('Staff') || 
            path.post?.tags?.includes('Staff')
        );
        
        const petsEndpoints = Object.values(specs.paths).filter(path => 
            path.get?.tags?.includes('Pets') || 
            path.post?.tags?.includes('Pets')
        );
        
        expect(ownersEndpoints.length).toBeGreaterThan(0);
        expect(staffEndpoints.length).toBeGreaterThan(0);
        expect(petsEndpoints.length).toBeGreaterThan(0);
    });
});

describe('Tests del Swagger Controller', () => {
    test('getSwaggerSpecs debería retornar la especificación correctamente', () => {
        const specs = getSwaggerSpecs();
        
        expect(specs).toBeDefined();
        expect(specs.openapi).toBe('3.0.0');
        expect(specs.info.title).toBe('SoftVet API');
        expect(specs.info.version).toBe('1.0.0');
        expect(specs.paths).toBeDefined();
        expect(specs.components.schemas).toBeDefined();
    });

    test('getSwaggerSpecs debería retornar el objeto de configuración directamente', () => {
        const specs = getSwaggerSpecs();
        const originalSpecs = require('../src/config/swagger');
        
        expect(specs).toBe(originalSpecs);
    });
});

describe('Tests del Swagger Handler', () => {
    test('getSwaggerJsonHandler debería retornar la especificación JSON', () => {
        const req = {};
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        getSwaggerJsonHandler(req, res);

        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test('getSwaggerJsonHandler debería manejar errores correctamente', () => {
        const req = {};
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock del controller para simular error
        jest.spyOn(require('../src/controllers/swaggerController'), 'getSwaggerSpecs')
            .mockImplementation(() => {
                throw new Error('Error de configuración');
            });

        getSwaggerJsonHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error al obtener la especificación de Swagger',
            details: 'Error de configuración'
        });

        // Restaurar el mock
        jest.restoreAllMocks();
    });
}); 