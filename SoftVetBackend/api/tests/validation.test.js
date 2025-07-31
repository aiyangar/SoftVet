// Test específico para validación de usuarios
const { validatePerson } = require('../src/validators/validateDB');

describe('Tests de validación de usuarios (dueños)', () => {
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

    describe('Validación de datos válidos', () => {
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

        test('debería validar emails con diferentes formatos válidos', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'user+tag@example.org',
                'test123@domain.net',
                'user-name@domain.com'
            ];

            validEmails.forEach(email => {
                const data = { ...validOwnerData, email };
                const result = validatePerson(data);
                expect(result).toBe(true);
            });
        });

        test('debería validar teléfonos con diferentes longitudes válidas', () => {
            const validPhones = [
                '1234567890',      // 10 dígitos
                '123456789012345', // 15 dígitos
                '5551234567',      // 10 dígitos
                '123456789012'     // 12 dígitos
            ];

            validPhones.forEach(phone => {
                const data = { ...validOwnerData, primaryPhone: phone };
                const result = validatePerson(data);
                expect(result).toBe(true);
            });
        });
    });

    describe('Validación de datos inválidos', () => {
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

        test('debería rechazar nombre vacío', () => {
            const data = { ...validOwnerData, firstName: '' };
            const result = validatePerson(data);
            expect(result).toContain('El nombre es obligatorio');
        });

        test('debería rechazar apellido vacío', () => {
            const data = { ...validOwnerData, lastName: '' };
            const result = validatePerson(data);
            expect(result).toContain('El apellido es obligatorio');
        });

        test('debería rechazar teléfono vacío', () => {
            const data = { ...validOwnerData, primaryPhone: '' };
            const result = validatePerson(data);
            expect(result).toContain('El teléfono es obligatorio');
        });

        test('debería rechazar email vacío', () => {
            const data = { ...validOwnerData, email: '' };
            const result = validatePerson(data);
            expect(result).toContain('El correo electrónico es obligatorio');
        });
    });

    describe('Validación de formato de email', () => {
        test('debería rechazar emails con formato inválido', () => {
            const invalidEmails = [
                'invalid-email',        // Sin @
                'user@',               // Sin dominio
                '@example.com',        // Sin usuario
                'user@example.',       // Sin TLD después del punto
                'user name@example.com' // Con espacios
            ];

            invalidEmails.forEach(email => {
                const data = { ...validOwnerData, email };
                const result = validatePerson(data);
                expect(result).toContain('El correo electrónico');
                expect(result).toContain('no es válido');
            });
        });

        test('debería validar emails con caracteres especiales válidos', () => {
            const validEmails = [
                'user+tag@example.com',
                'user.name@example.com',
                'user-name@example.com',
                'user123@example.com',
                'user_name@example.com'
            ];

            validEmails.forEach(email => {
                const data = { ...validOwnerData, email };
                const result = validatePerson(data);
                expect(result).toBe(true);
            });
        });
    });

    describe('Validación de formato de teléfono', () => {
        test('debería rechazar teléfonos con formato inválido', () => {
            const invalidPhones = [
                '123',                    // Demasiado corto
                '1234567890123456',       // Demasiado largo
                'abc1234567',             // Contiene letras
                '123-456-7890',           // Contiene guiones
                '(123) 456-7890',         // Contiene paréntesis y espacios
                '123 456 7890',           // Contiene espacios
                '123.456.7890',           // Contiene puntos
                '+1-234-567-8900',        // Contiene símbolos internacionales
                '1234567890a',            // Termina con letra
                'a1234567890'             // Empieza con letra
            ];

            invalidPhones.forEach(phone => {
                const data = { ...validOwnerData, primaryPhone: phone };
                const result = validatePerson(data);
                expect(result).toContain('El teléfono');
                expect(result).toContain('no es válido');
            });
        });

        test('debería validar teléfonos con solo dígitos', () => {
            const validPhones = [
                '1234567890',
                '123456789012345',
                '5551234567',
                '123456789012'
            ];

            validPhones.forEach(phone => {
                const data = { ...validOwnerData, primaryPhone: phone };
                const result = validatePerson(data);
                expect(result).toBe(true);
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

        test('debería manejar strings muy largos', () => {
            const longString = 'a'.repeat(1000);
            const dataWithLongStrings = {
                firstName: longString,
                lastName: longString,
                primaryPhone: '1234567890',
                email: 'juan@example.com'
            };
            const result = validatePerson(dataWithLongStrings);
            expect(result).toBe(true); // Debería ser válido si no hay restricciones de longitud
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