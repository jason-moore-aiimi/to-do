const express = require('express');
const router = express.Router();
const sequelize = require('../store/database')
const Task = require('../models/task')

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieveall tasks.
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
 *                 title: 
 *                   type: string
 *                 description: 
 *                   type: string
 *                 createdAt:
 *                   type: datetime
 *                 updatedAt:
 *                   type: datetime
 */
router.get('/', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        return Task.findAll();
    })
    .then(tasks => {
        res.send(JSON.stringify(tasks, null, 2));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        res.status(500).send('Internal Server Error');
    });
});


/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a single task
 *     description: Retrieve a single task by ID.
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
 *                 title: 
 *                   type: string
 *                 description: 
 *                   type: string
 *                 createdAt:
 *                   type: datetime
 *                 updatedAt:
 *                   type: datetime
 */
router.get('/:id', (req, res) => {
    sequelize.authenticate()
    .then(() => {
        return Task.findOne({ where: { id: req.params.id } })
    })
    .then(state => {
        if (state) {
            res.json(state);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    })
    .catch(error => {
        console.error('Error querying task by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;