const express = require('express');
const {getToDos, getToDo, createToDo, deleteToDo, updateToDo, Clear} = require('../controllers/todoControllers')

const router = express.Router() 

// Get All ToDo
// router.get('/:id', getToDos);

// GET a single ToDo
router.get('/:id', getToDo);

// POST new ToDo
router.post('/', createToDo);

// Delete ToDo
router.delete('/one/:id', deleteToDo);
router.delete('/all/:id', Clear);

// Update a ToDo
router.patch('/:id', updateToDo);

module.exports = router