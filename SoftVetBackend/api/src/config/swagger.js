const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SoftVet API',
            version: '1.0.0',
            description: 'API para la gestión integral de clínicas veterinarias',
            contact: {
                name: 'SoftVet Team',
                email: 'support@softvet.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            },
            {
                url: 'https://api.softvet.com',
                description: 'Servidor de producción'
            }
        ],
        components: {
            schemas: {
                Owner: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'primaryPhone', 'email'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único del dueño'
                        },
                        firstName: {
                            type: 'string',
                            description: 'Nombre del dueño',
                            example: 'Juan'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Apellido del dueño',
                            example: 'Pérez'
                        },
                        address: {
                            type: 'string',
                            description: 'Dirección completa',
                            example: 'Calle Principal 123'
                        },
                        city: {
                            type: 'string',
                            description: 'Ciudad',
                            example: 'Ciudad de México'
                        },
                        state: {
                            type: 'string',
                            description: 'Estado/Provincia',
                            example: 'CDMX'
                        },
                        postalCode: {
                            type: 'string',
                            description: 'Código postal',
                            example: '12345'
                        },
                        primaryPhone: {
                            type: 'string',
                            description: 'Teléfono principal (solo dígitos, 10-15 caracteres)',
                            example: '1234567890'
                        },
                        secondaryPhone: {
                            type: 'string',
                            description: 'Teléfono secundario (opcional)',
                            example: '0987654321'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Correo electrónico único',
                            example: 'juan.perez@example.com'
                        },
                        additionalNotes: {
                            type: 'string',
                            description: 'Notas adicionales',
                            example: 'Cliente frecuente'
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive'],
                            description: 'Estado del dueño',
                            example: 'Active'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización'
                        }
                    }
                },
                Staff: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'primaryPhone', 'email', 'role'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único del empleado'
                        },
                        firstName: {
                            type: 'string',
                            description: 'Nombre del empleado',
                            example: 'María'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Apellido del empleado',
                            example: 'García'
                        },
                        address: {
                            type: 'string',
                            description: 'Dirección completa',
                            example: 'Calle Secundaria 456'
                        },
                        city: {
                            type: 'string',
                            description: 'Ciudad',
                            example: 'Guadalajara'
                        },
                        state: {
                            type: 'string',
                            description: 'Estado/Provincia',
                            example: 'Jalisco'
                        },
                        postalCode: {
                            type: 'string',
                            description: 'Código postal',
                            example: '44100'
                        },
                        primaryPhone: {
                            type: 'string',
                            description: 'Teléfono principal (solo dígitos, 10-15 caracteres)',
                            example: '5551234567'
                        },
                        secondaryPhone: {
                            type: 'string',
                            description: 'Teléfono secundario (opcional)',
                            example: '5559876543'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Correo electrónico único',
                            example: 'maria.garcia@example.com'
                        },
                        additionalNotes: {
                            type: 'string',
                            description: 'Notas adicionales',
                            example: 'Veterinaria especializada en gatos'
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'On Leave'],
                            description: 'Estado del empleado',
                            example: 'Active'
                        },
                        role: {
                            type: 'string',
                            enum: ['Veterinarian', 'Technician', 'Receptionist', 'Admin'],
                            description: 'Rol del empleado',
                            example: 'Veterinarian'
                        },
                        licenseNumber: {
                            type: 'string',
                            description: 'Número de licencia profesional (opcional)',
                            example: 'VET123456'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización'
                        }
                    }
                },
                Pet: {
                    type: 'object',
                    required: ['name', 'ownerId', 'speciesId', 'breedId'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID único de la mascota'
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre de la mascota',
                            example: 'Luna'
                        },
                        ownerId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID del dueño de la mascota'
                        },
                        speciesId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID de la especie'
                        },
                        breedId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID de la raza'
                        },
                        originId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID del origen (opcional)'
                        },
                        environmentId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID del ambiente (opcional)'
                        },
                        activityLevelId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID del nivel de actividad (opcional)'
                        },
                        birthDate: {
                            type: 'string',
                            format: 'date',
                            description: 'Fecha de nacimiento',
                            example: '2020-03-15'
                        },
                        weight: {
                            type: 'number',
                            description: 'Peso en kilogramos',
                            example: 4.5
                        },
                        color: {
                            type: 'string',
                            description: 'Color de la mascota',
                            example: 'Negro y blanco'
                        },
                        microchipNumber: {
                            type: 'string',
                            description: 'Número de microchip (opcional)',
                            example: '123456789012345'
                        },
                        additionalNotes: {
                            type: 'string',
                            description: 'Notas adicionales',
                            example: 'Mascota muy activa y juguetona'
                        },
                        status: {
                            type: 'string',
                            enum: ['Active', 'Inactive', 'Deceased'],
                            description: 'Estado de la mascota',
                            example: 'Active'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de creación'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Fecha de última actualización'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Mensaje de error',
                            example: 'Errores de validación: El nombre es obligatorio, El teléfono es obligatorio'
                        }
                    }
                }
            }
        }
    },
    apis: [
        './src/routes/*.js',
        './src/handlers/*.js',
        './src/controllers/*.js'
    ]
};

const specs = swaggerJsdoc(options);

module.exports = specs; 