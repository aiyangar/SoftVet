const { Router } = require('express');
const ownersRouter = Router();
const {
    getOwnersHandler, 
    getOwnerByIdHandler, 
    createOwnerHandler,
    createOwnersBulkHandler
} = require('../handlers/ownersHandler');

/**
 * @swagger
 * /owners:
 *   get:
 *     summary: Obtener todos los dueños
 *     description: Retorna una lista de todos los dueños registrados en el sistema
 *     tags: [Owners]
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
 *     responses:
 *       200:
 *         description: Lista de dueños obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ownersRouter.get('/', getOwnersHandler);

/**
 * @swagger
 * /owners/{id}:
 *   get:
 *     summary: Obtener un dueño por ID
 *     description: Retorna los datos de un dueño específico por su ID
 *     tags: [Owners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del dueño
 *     responses:
 *       200:
 *         description: Dueño encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Error en la solicitud o dueño no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ownersRouter.get('/:id', getOwnerByIdHandler);

/**
 * @swagger
 * /owners:
 *   post:
 *     summary: Crear un nuevo dueño
 *     description: Crea un nuevo dueño en el sistema con validación de datos
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *           example:
 *             firstName: "Juan"
 *             lastName: "Pérez"
 *             primaryPhone: "1234567890"
 *             email: "juan.perez@example.com"
 *             address: "Calle Principal 123"
 *             city: "Ciudad de México"
 *             state: "CDMX"
 *             postalCode: "12345"
 *             secondaryPhone: "0987654321"
 *             additionalNotes: "Cliente frecuente"
 *             status: "Active"
 *     responses:
 *       201:
 *         description: Dueño creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ownersRouter.post('/', createOwnerHandler);

/**
 * @swagger
 * /owners/bulk:
 *   post:
 *     summary: Crear múltiples dueños
 *     description: Crea varios dueños en el sistema en una sola operación
 *     tags: [Owners]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Owner'
 *           example:
 *             - firstName: "Juan"
 *               lastName: "Pérez"
 *               primaryPhone: "1234567890"
 *               email: "juan.perez@example.com"
 *               status: "Active"
 *             - firstName: "María"
 *               lastName: "García"
 *               primaryPhone: "5551234567"
 *               email: "maria.garcia@example.com"
 *               status: "Active"
 *     responses:
 *       201:
 *         description: Dueños creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Owner'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
ownersRouter.post('/bulk', createOwnersBulkHandler);

module.exports = ownersRouter;