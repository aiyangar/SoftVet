const { Router } = require('express');
const petsRouter = Router();
const {
    getPetsHandler, 
    getPetByIdHandler, 
    createPetHandler,
    createPetsBulkHandler
} = require('../handlers/petsHandler');

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     description: Retorna una lista de todas las mascotas registradas en el sistema
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de mascota
 *       - in: query
 *         name: ownerId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por ID del dueño
 *       - in: query
 *         name: speciesId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por especie
 *       - in: query
 *         name: breedId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filtrar por raza
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Active, Inactive, Deceased]
 *         description: Filtrar por estado
 *     responses:
 *       200:
 *         description: Lista de mascotas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
petsRouter.get('/', getPetsHandler);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obtener una mascota por ID
 *     description: Retorna los datos de una mascota específica por su ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único de la mascota
 *     responses:
 *       200:
 *         description: Mascota encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Error en la solicitud o mascota no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
petsRouter.get('/:id', getPetByIdHandler);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Crear una nueva mascota
 *     description: Crea una nueva mascota en el sistema con validación de datos
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *           example:
 *             name: "Luna"
 *             ownerId: "123e4567-e89b-12d3-a456-426614174000"
 *             speciesId: "456e7890-e89b-12d3-a456-426614174001"
 *             breedId: "789e0123-e89b-12d3-a456-426614174002"
 *             originId: "012e3456-e89b-12d3-a456-426614174003"
 *             environmentId: "345e6789-e89b-12d3-a456-426614174004"
 *             activityLevelId: "678e9012-e89b-12d3-a456-426614174005"
 *             birthDate: "2020-03-15"
 *             weight: 4.5
 *             color: "Negro y blanco"
 *             microchipNumber: "123456789012345"
 *             additionalNotes: "Mascota muy activa y juguetona"
 *             status: "Active"
 *     responses:
 *       201:
 *         description: Mascota creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
petsRouter.post('/', createPetHandler);

/**
 * @swagger
 * /pets/bulk:
 *   post:
 *     summary: Crear múltiples mascotas
 *     description: Crea varias mascotas en el sistema en una sola operación
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Pet'
 *           example:
 *             - name: "Luna"
 *               ownerId: "123e4567-e89b-12d3-a456-426614174000"
 *               speciesId: "456e7890-e89b-12d3-a456-426614174001"
 *               breedId: "789e0123-e89b-12d3-a456-426614174002"
 *               status: "Active"
 *             - name: "Max"
 *               ownerId: "123e4567-e89b-12d3-a456-426614174000"
 *               speciesId: "456e7890-e89b-12d3-a456-426614174001"
 *               breedId: "789e0123-e89b-12d3-a456-426614174002"
 *               status: "Active"
 *     responses:
 *       201:
 *         description: Mascotas creadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Error de validación o datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
petsRouter.post('/bulk', createPetsBulkHandler);

module.exports = petsRouter;