const { conn } = require('../src/database');
const { Owner } = require('../src/database');

describe('Configuración de base de datos para testing', () => {
    beforeAll(async () => {
        // Sincronizar la base de datos para testing
        await conn.sync({ force: true });
    });

    afterAll(async () => {
        // Cerrar la conexión después de todos los tests
        await conn.close();
    });

    test('debería conectarse a la base de datos correctamente', async () => {
        try {
            await conn.authenticate();
            expect(true).toBe(true); // Si llega aquí, la conexión fue exitosa
        } catch (error) {
            fail('No se pudo conectar a la base de datos: ' + error.message);
        }
    });

    test('debería sincronizar el modelo Owner correctamente', async () => {
        // Verificar que el modelo Owner existe
        expect(Owner).toBeDefined();
        
        // Verificar que la tabla se creó correctamente
        const tableExists = await conn.getQueryInterface().showAllTables();
        expect(tableExists).toContain('owners');
    });

    test('debería poder crear y eliminar registros de prueba', async () => {
        // Crear un registro de prueba
        const testOwner = await Owner.create({
            firstName: 'Test',
            lastName: 'User',
            primaryPhone: '1234567890',
            email: 'test@example.com',
            status: 'Active'
        });

        expect(testOwner.id).toBeDefined();
        expect(testOwner.firstName).toBe('Test');

        // Eliminar el registro de prueba
        await testOwner.destroy();
        
        // Verificar que se eliminó
        const deletedOwner = await Owner.findByPk(testOwner.id);
        expect(deletedOwner).toBeNull();
    });
}); 