const { Router } = require('express');
const ownersRouter = Router();

ownersRouter.get('/', (req, res) => {
    res.status(200).send('List of owners');
});

ownersRouter.get('/:id', (req, res) => {
    const ownerId = req.params.id;
    res.status(200).send(`Details of owner with ID: ${ownerId}`);
});

ownersRouter.post('/', (req, res) => {
    res.status(201).send('Owner created successfully');
});

module.exports = ownersRouter;