const request = require('supertest');
const { Owner } = require('../src/database');
const { validatePerson } = require('../src/validators/validateDB');
const { createOwnerDB } = require('../src/controllers/ownersController');

// Importar la aplicación Express
const app = require('../src/app');

describe('Tests para la creación de dueños', () => {
    // Datos de prueba válidos
    const validOwnerData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        primaryPhone: '1234567890',
        email: 'juan.perez@example.com',
        address: 'Calle Principal 123',
        city: 'Ciudad de México',
        state: 'CDMX',
        postalCode: '12345',
        secondaryPhone: '0987654321',
        additionalNotes: 'Cliente frecuente',
        status: 'Active'
    };

    // Datos de prueba inválidos
    const invalidOwnerData = {
        firstName: '', // Nombre vacío
        lastName: 'Pérez',
        primaryPhone: '123', // Teléfono muy corto
        email: 'email-invalido', // Email inválido
        status: 'Active'
    };

    beforeEach(async () => {
        // Limpiar la base de datos antes de cada test
        await Owner.destroy({ where: {} });
    });

    afterAll(async () => {
        // Limpiar después de todos los tests
        await Owner.destroy({ where: {} });
    });

    describe('Validación de datos', () => {
        test('debería validar datos correctos', () => {
            const result = validatePerson(validOwnerData);
            expect(result).toBe(true);
        });

        test('debería rechazar datos inválidos', () => {
            const result = validatePerson(invalidOwnerData);
            expect(result).toContain('Errores de validación');
            expect(result).toContain('El nombre es obligatorio');
            expect(result).toContain('El teléfono 123 no es válido');
            expect(result).toContain('El correo electrónico email-invalido no es válido');
        });

        test('debería rechazar datos undefined', () => {
            const result = validatePerson(undefined);
            expect(result).toBe('Errores de validación: No se proporcionaron datos de dueño');
        });

        test('debería rechazar datos null', () => {
            const result = validatePerson(null);
            expect(result).toBe('Errores de validación: No se proporcionaron datos de dueño');
        });

        test('debería rechazar objeto vacío', () => {
            const result = validatePerson({});
            expect(result).toContain('Errores de validación');
            expect(result).toContain('El nombre es obligatorio');
            expect(result).toContain('El apellido es obligatorio');
            expect(result).toContain('El teléfono es obligatorio');
            expect(result).toContain('El correo electrónico es obligatorio');
        });

        test('debería rechazar datos con campos faltantes', () => {
            const incompleteData = {
                firstName: 'Juan',
                lastName: 'Pérez'
                // Faltan primaryPhone y email
            };
            const result = validatePerson(incompleteData);
            expect(result).toContain('Errores de validación');
            expect(result).toContain('El teléfono es obligatorio');
            expect(result).toContain('El correo electrónico es obligatorio');
        });
    });

    describe('Creación de dueños en la base de datos', () => {
        test('debería crear un dueño válido correctamente', async () => {
            const owner = await createOwnerDB(validOwnerData);
            
            // Verificar que el dueño se creó
            expect(owner).toBeDefined();
            expect(owner.id).toBeDefined();
            expect(owner.firstName).toBe(validOwnerData.firstName);
            expect(owner.lastName).toBe(validOwnerData.lastName);
            expect(owner.primaryPhone).toBe(validOwnerData.primaryPhone);
            expect(owner.email).toBe(validOwnerData.email);
            expect(owner.address).toBe(validOwnerData.address);
            expect(owner.city).toBe(validOwnerData.city);
            expect(owner.state).toBe(validOwnerData.state);
            expect(owner.postalCode).toBe(validOwnerData.postalCode);
            expect(owner.secondaryPhone).toBe(validOwnerData.secondaryPhone);
            expect(owner.additionalNotes).toBe(validOwnerData.additionalNotes);
            expect(owner.status).toBe(validOwnerData.status);
            
            // Verificar que se crearon los timestamps
            expect(owner.createdAt).toBeDefined();
            expect(owner.updatedAt).toBeDefined();
        });

        test('debería rechazar crear un dueño con datos inválidos', async () => {
            await expect(createOwnerDB(invalidOwnerData)).rejects.toThrow();
        });

        test('debería rechazar crear un dueño con email duplicado', async () => {
            // Crear primer dueño
            await createOwnerDB(validOwnerData);
            
            // Intentar crear segundo dueño con mismo email
            const duplicateData = {
                ...validOwnerData,
                firstName: 'María',
                lastName: 'García'
            };
            
            await expect(createOwnerDB(duplicateData)).rejects.toThrow();
        });

        test('debería rechazar crear un dueño con datos undefined', async () => {
            await expect(createOwnerDB(undefined)).rejects.toThrow('Errores de validación: No se proporcionaron datos de dueño');
        });
    });

    describe('API REST - Endpoints de dueños', () => {
        test('POST /owners debería crear un dueño válido', async () => {
            const response = await request(app)
                .post('/owners')
                .send(validOwnerData)
                .expect(201);

            // Verificar respuesta
            expect(response.body).toBeDefined();
            expect(response.body.id).toBeDefined();
            expect(response.body.firstName).toBe(validOwnerData.firstName);
            expect(response.body.lastName).toBe(validOwnerData.lastName);
            expect(response.body.email).toBe(validOwnerData.email);
        });

        test('POST /owners debería rechazar datos inválidos', async () => {
            const response = await request(app)
                .post('/owners')
                .send(invalidOwnerData)
                .expect(400);

            expect(response.body.error).toBeDefined();
            expect(response.body.error).toContain('Errores de validación');
        });

        test('POST /owners debería rechazar request sin body', async () => {
            const response = await request(app)
                .post('/owners')
                .send()
                .expect(400);

            expect(response.body.error).toBe('No se proporcionaron datos para crear el dueño');
        });

        test('POST /owners debería rechazar body vacío', async () => {
            const response = await request(app)
                .post('/owners')
                .send({})
                .expect(400);

            expect(response.body.error).toBe('No se proporcionaron datos para crear el dueño');
        });

        test('POST /owners/bulk debería crear múltiples dueños válidos', async () => {
            const bulkData = [
                { ...validOwnerData, email: 'juan1@example.com' },
                { ...validOwnerData, firstName: 'María', email: 'maria@example.com' },
                { ...validOwnerData, firstName: 'Carlos', email: 'carlos@example.com' }
            ];

            const response = await request(app)
                .post('/owners/bulk')
                .send(bulkData)
                .expect(201);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(3);
            expect(response.body[0].firstName).toBe('Juan');
            expect(response.body[1].firstName).toBe('María');
            expect(response.body[2].firstName).toBe('Carlos');
        });

        test('POST /owners/bulk debería rechazar array vacío', async () => {
            const response = await request(app)
                .post('/owners/bulk')
                .send([])
                .expect(400);

            expect(response.body.error).toBe('Se requiere un array con datos de dueños para crear múltiples registros');
        });

        test('POST /owners/bulk debería rechazar datos que no sean array', async () => {
            const response = await request(app)
                .post('/owners/bulk')
                .send(validOwnerData)
                .expect(400);

            expect(response.body.error).toBe('Se requiere un array con datos de dueños para crear múltiples registros');
        });

        test('GET /owners debería obtener todos los dueños', async () => {
            // Crear algunos dueños primero
            await createOwnerDB(validOwnerData);
            await createOwnerDB({ ...validOwnerData, firstName: 'María', email: 'maria@example.com' });

            const response = await request(app)
                .get('/owners')
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThanOrEqual(2);
        });

        test('GET /owners/:id debería obtener un dueño específico', async () => {
            // Crear un dueño
            const createdOwner = await createOwnerDB(validOwnerData);

            const response = await request(app)
                .get(`/owners/${createdOwner.id}`)
                .expect(200);

            expect(response.body.id).toBe(createdOwner.id);
            expect(response.body.firstName).toBe(validOwnerData.firstName);
            expect(response.body.lastName).toBe(validOwnerData.lastName);
        });

        test('GET /owners/:id debería retornar 400 para ID inexistente', async () => {
            const response = await request(app)
                .get('/owners/123e4567-e89b-12d3-a456-426614174000')
                .expect(400);

            expect(response.body.error).toBeDefined();
        });
    });

    describe('Validaciones de formato', () => {
        test('debería validar formato de email correcto', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'user+tag@example.org'
            ];

            validEmails.forEach(email => {
                const data = { ...validOwnerData, email };
                const result = validatePerson(data);
                expect(result).toBe(true);
            });
        });

        test('debería rechazar formatos de email incorrectos', () => {
            const invalidEmails = [
                'invalid-email',
                '@example.com',
                'user@',
                'user@.com',
                'user..name@example.com'
            ];

            invalidEmails.forEach(email => {
                const data = { ...validOwnerData, email };
                const result = validatePerson(data);
                expect(result).toContain('El correo electrónico');
                expect(result).toContain('no es válido');
            });
        });

        test('debería validar formato de teléfono correcto', () => {
            const validPhones = [
                '1234567890',
                '123456789012345',
                '5551234567'
            ];

            validPhones.forEach(phone => {
                const data = { ...validOwnerData, primaryPhone: phone };
                const result = validatePerson(data);
                expect(result).toBe(true);
            });
        });

        test('debería rechazar formatos de teléfono incorrectos', () => {
            const invalidPhones = [
                '123',
                '1234567890123456', // Demasiado largo
                'abc1234567', // Contiene letras
                '123-456-7890', // Contiene guiones
                '(123) 456-7890' // Contiene paréntesis y espacios
            ];

            invalidPhones.forEach(phone => {
                const data = { ...validOwnerData, primaryPhone: phone };
                const result = validatePerson(data);
                expect(result).toContain('El teléfono');
                expect(result).toContain('no es válido');
            });
        });
    });
}); 