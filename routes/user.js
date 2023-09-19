const express = require('express');
const {getUsers, getUser, createUser, deleteUser, updateUser, signIn, verifyUser, logout} = require('../controllers/userControllers');

const router = express.Router() 

// Get All ToDo
router.get('/', getUsers);

// GET a single ToDo
router.get('/:id', getUser);

// POST new ToDo
router.post('/', createUser);

// Delete ToDo
router.delete('/:id', deleteUser);

// Update a ToDo
router.post('/signin', signIn);

//Verify
router.put('/verify', verifyUser);

router.put('/logout', logout);

module.exports = router