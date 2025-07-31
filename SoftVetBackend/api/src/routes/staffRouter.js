const { Router } = require('express');
const staffRouter = Router();
const {
    getStaffHandler,
    getStaffByIdHandler,
    createStaffHandler,
    createStaffBulkHandler
} = require('../handlers/staffHandler');

staffRouter.get('/', getStaffHandler);
staffRouter.get('/:id', getStaffByIdHandler);
staffRouter.post('/', createStaffHandler);
staffRouter.post('/bulk', createStaffBulkHandler);

module.exports = staffRouter;