const { Router } = require('express');
const petsRouter = Router();


petsRouter.get('/', (req, res) => {
    res.status(200).send('List of pets');
});

module.exports = petsRouter;