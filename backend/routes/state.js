const express = require('express');
const router = express.Router();
const sequelize = require('../store/database')
const State = require('../models/state')

/**
 * @swagger
 * /state:
 *   get:
 *     summary: Get all states
 *     description: Retrieveall states.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name: 
 *                   type: string
 *                 createdAt:
 *                   type: datetime
 *                 updatedAt:
 *                   type: datetime
 */
router.get('/', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        return State.findAll();
    })
    .then(states => {
        res.send(JSON.stringify(states, null, 2));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        res.status(500).send('Internal Server Error');
    });
});

/**
 * @swagger
 * /state/{id}:
 *   get:
 *     summary: Get state by id
 *     description: Retrieve a single state by its ID.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name: 
 *                   type: string
 *                 createdAt:
 *                   type: datetime
 *                 updatedAt:
 *                   type: datetime
 */
router.get('/:id', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        return State.findOne({ where: { id: req.params.id } })
    })
    .then(state => {
        if (state) {
            res.json(state);
        } else {
            res.status(404).json({ error: 'State not found' });
        }
    })
    .catch(error => {
        console.error('Error querying State by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
