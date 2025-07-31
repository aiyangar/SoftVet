// Test simplificado para dueños sin dependencia de base de datos
const { validatePerson } = require('../src/validators/validateDB');

describe('Tests simplificados para creación de dueños', () => {
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

    describe('Validación de datos', () => {
        test('debería validar datos completos y correctos', () => {
            const result = validatePerson(validOwnerData);
            expect(result).toBe(true);
        });

        test('debería validar datos mínimos requeridos', () => {
            const minimalData = {
                firstName: 'María',
                lastName: 'García',
                primaryPhone: '5551234567',
                email: 'maria@example.com'
            };
            const result = validatePerson(minimalData);
            expect(result).toBe(true);
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

    describe('Validación de formato', () => {
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
                'user name@example.com'
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

    describe('Validación de casos edge', () => {
        test('debería manejar espacios en blanco en campos obligatorios', () => {
            const dataWithSpaces = {
                firstName: '   ',
                lastName: 'Pérez',
                primaryPhone: '1234567890',
                email: 'juan@example.com'
            };
            const result = validatePerson(dataWithSpaces);
            expect(result).toContain('El nombre es obligatorio');
        });

        test('debería manejar caracteres especiales en nombres', () => {
            const dataWithSpecialChars = {
                firstName: 'José-María',
                lastName: 'O\'Connor',
                primaryPhone: '1234567890',
                email: 'jose@example.com'
            };
            const result = validatePerson(dataWithSpecialChars);
            expect(result).toBe(true);
        });
    });

    describe('Validación de múltiples errores', () => {
        test('debería reportar múltiples errores cuando hay varios problemas', () => {
            const invalidData = {
                firstName: '',           // Vacío
                lastName: '',            // Vacío
                primaryPhone: '123',     // Muy corto
                email: 'invalid-email'   // Formato inválido
            };
            const result = validatePerson(invalidData);
            
            expect(result).toContain('Errores de validación');
            expect(result).toContain('El nombre es obligatorio');
            expect(result).toContain('El apellido es obligatorio');
            expect(result).toContain('El teléfono 123 no es válido');
            expect(result).toContain('El correo electrónico invalid-email no es válido');
        });

        test('debería reportar solo los errores que existen', () => {
            const partiallyInvalidData = {
                firstName: 'Juan',       // Válido
                lastName: '',            // Vacío
                primaryPhone: '1234567890', // Válido
                email: 'invalid-email'   // Formato inválido
            };
            const result = validatePerson(partiallyInvalidData);
            
            expect(result).toContain('Errores de validación');
            expect(result).toContain('El apellido es obligatorio');
            expect(result).toContain('El correo electrónico invalid-email no es válido');
            expect(result).not.toContain('El nombre es obligatorio');
            expect(result).not.toContain('El teléfono');
        });
    });
}); 