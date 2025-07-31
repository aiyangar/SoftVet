const { Router } = require('express');
const staffRouter = Router();
const {
    getStaffHandler,
    getStaffByIdHandler,
    createStaffHandler,
    createStaffBulkHandler
} = require('../handlers/staffHandler');

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Retorna una lista de todos los empleados registrados en el sistema
 *     tags: [Staff]
 *     parameters:
 *       - in: query
 *         name: firstName
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *       - in: query
 *         name: lastName
 *         schema:
 *           type: string
 *         description: Filtrar por apellido
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email
 *       - in: query
 *         name: primaryPhone
 *         schema:
 *           type: string
 *         description: Filtrar por teléfono
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [Veterinarian, Technician, Receptionist, Admin]
 *         description: Filtrar por rol
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
staffRouter.get('/', getStaffHandler);

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     description: Retorna los datos de un empleado específico por su ID
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del empleado
 *     responses:
 *       200:
 *         description: Empleado encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Error en la solicitud o empleado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
staffRouter.get('/:id', getStaffByIdHandler);

/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crea un nuevo empleado en el sistema con validación de datos
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *           example:
 *             firstName: "María"
 *             lastName: "García"
 *             primaryPhone: "5551234567"
 *             email: "maria.garcia@example.com"
 *             address: "Calle Secundaria 456"
 *             city: "Guadalajara"
 *             state: "Jalisco"
 *             postalCode: "44100"
 *             secondaryPhone: "5559876543"
 *             additionalNotes: "Veterinaria especializada en gatos"
 *             status: "Active"
 *             role: "Veterinarian"
 *             licenseNumber: "VET123456"
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
staffRouter.post('/', createStaffHandler);

/**
 * @swagger
 * /staff/bulk:
 *   post:
 *     summary: Crear múltiples empleados
 *     description: Crea varios empleados en el sistema en una sola operación
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Staff'
 *           example:
 *             - firstName: "María"
 *               lastName: "García"
 *               primaryPhone: "5551234567"
 *               email: "maria.garcia@example.com"
 *               role: "Veterinarian"
 *               status: "Active"
 *             - firstName: "Carlos"
 *               lastName: "López"
 *               primaryPhone: "5559876543"
 *               email: "carlos.lopez@example.com"
 *               role: "Technician"
 *               status: "Active"
 *     responses:
 *       201:
 *         description: Empleados creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
staffRouter.post('/bulk', createStaffBulkHandler);

module.exports = staffRouter;